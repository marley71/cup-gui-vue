<?php namespace Marley71\CupSocketServer\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Process;
use Marley71\CupSocketServer\WebSockets\ServiceInterface;
use Marley71\CupSocketServer\WebSockets\WebSocketServer;
use Ratchet\Http\HttpServer;
use Ratchet\Server\IoServer;
use Ratchet\WebSocket\WsServer;


class SocketServer extends Command {
    protected $signature = 'cup:wss-server';

    protected $name = 'wss';

    protected $description = 'Lancia websocket server per i comandi da gui';

    protected $wb = null;

    public function __construct()
    {
        parent::__construct();
        $this->wb = new WebSocketServer();
    }

    public function handle() {
        $this->comment('coping env...');
        $this->copyEnv();
        $this->comment('copied');
        $this->comment("start gui...");
        $this->startGui();
        $this->comment('started');
        $this->comment("start websocket...");
        $server = IoServer::factory(
            new HttpServer(
                new WsServer(
                    new WebSocketServer()
                )
            ),
            env('WEB_SOCKET_PORT',7071) // Assicurati che questa sia la porta corretta
        );
        $this->comment('connect to ' . env('APP_URL') . ':' . env('VUEAPP_PORT',8001));
        $server->run();
    }

    protected function startGui() {
        $a = new \ReflectionClass(WebSocketServer::class);
        $attr = pathinfo($a->getFileName());
        if ($attr) {
            //echo $attr['dirname'] . "\n";
            $shell_command =$attr['dirname'] . '/shell_commands/gui_start.sh';
            $result = Process::forever()->env(ServiceInterface::getEnvVars())
                ->start('bash ' . "$shell_command", function (string $type, string $output) {
                    if ($type != 'out') {
                        throw new \Exception($output);
                    }
                });
        }
    }

    protected function copyEnv() {
        $env = config('websocket.env.local');
        $content = "";
        foreach ($env as $key => $value) {
            $content .= "$key=$value\n";
        }
        $fileEnv = base_path(env('VUEAPP_FOLDER') . '/.env.local') ;
        //echo $fileEnv . "\n";
        file_put_contents($fileEnv,$content);

        $env = config('websocket.env.production');
        $content = "";
        foreach ($env as $key => $value) {
            $content .= "$key=$value\n";
        }
        $fileEnv = base_path(env('VUEAPP_FOLDER') . '/.env.production') ;
        file_put_contents($fileEnv,$content);
    }
}
