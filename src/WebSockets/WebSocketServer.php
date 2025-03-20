<?php namespace Marley71\CupSocketServer\WebSockets;

use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Log;
use Ratchet\ConnectionInterface;
use Ratchet\MessageComponentInterface;

class WebSocketServer implements MessageComponentInterface
{
    protected $clients;
    protected $services = [];

    public function __construct()
    {
        $this->clients = new \SplObjectStorage;
        $servicesClass = config('cup-gui-vue.services',[]);
        foreach ($servicesClass as $srvCls) {
            $obj = new $srvCls();
            $this->services[$obj->getPrefix()] = $obj;
        }
    }

    public function onOpen(ConnectionInterface $conn)
    {
        // Memorizza la nuova connessione non appena si apre
        $this->clients->attach($conn);
        echo "Nuova connessione! ({$conn->resourceId})\n";
        $response = [
            'msg' => 'connected',
            'error' => 0,
        ];
        $conn->send(json_encode($response));
    }

    public function onMessage(ConnectionInterface $from, $msg): void
    {
        try {
            $req = json_decode($msg, true);
            if (!Arr::exists($req, 'service')) {
                throw new \Exception('Servizio non definito');
            }
            $srv = $req['service'] ;
            if (!$srv || !Arr::get($this->services,$srv)) {
                throw new \Exception('Servizio null non valido ' . $srv);
            }
            $this->services[$srv]->do($req,$from);

        } catch (\Exception $e) {
            Log::error('webSocket ' . $e->getMessage());
            throw $e;
        }

        echo sprintf('Connessione %d invia messaggio "%s"' . "\n", $from->resourceId, $msg);

        foreach ($this->clients as $client) {
            if ($from != $client) {
                // Invia il messaggio agli altri client, escludendo chi lo ha inviato
                $client->send($msg);
            }
        }
    }

    public function onClose(ConnectionInterface $conn)
    {
        // Rimuovi la connessione quando chiusa
        $this->clients->detach($conn);

        echo "Connessione {$conn->resourceId} chiusa\n";
    }

    public function onError(ConnectionInterface $conn, \Exception $e)
    {
        echo "Errore: {$e->getMessage()}\n";
        $conn->close();
    }
}
