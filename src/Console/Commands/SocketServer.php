<?php namespace Marley71\CupGuiVue\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Process;
use Marley71\CupGuiVue\WebSockets\ServiceInterface;
use Marley71\CupGuiVue\WebSockets\WebSocketServer;
use Ratchet\Http\HttpServer;
use Ratchet\Server\IoServer;
use Ratchet\WebSocket\WsServer;
use React\EventLoop\Factory;
use React\EventLoop\Loop;
use React\Socket\SocketServer as ReactSocketServer;

// // Il tuo handler WebSocket
// class WebSocketServer implements Ratchet\MessageComponentInterface {
//     public function onOpen(Ratchet\ConnectionInterface $conn) {}
//     public function onMessage(Ratchet\ConnectionInterface $from, $msg) {
//         $from->send("Echo: $msg");
//     }
//     public function onClose(Ratchet\ConnectionInterface $conn) {}
//     public function onError(Ratchet\ConnectionInterface $conn, \Exception $e) {
//         $conn->close();
//     }
// }



class SocketServer extends Command {
    protected $signature = 'cup:wss-server {--mobile} {--secure} {--wss-only : Avvia solo il loop WebSocket (processo figlio)}';

    protected $name = 'wss';

    protected $description = 'Lancia websocket server per i comandi da gui';

    protected $wb = null;

    public function __construct()
    {
        parent::__construct();
        //$this->wb = new WebSocketServer();
        
    }

    public function handle() {
        if ($this->option('wss-only')) {
            if ($this->option('mobile')) {
                $this->runWssLoopMobile();
            } else {
                $this->runWssLoop($this->option('secure'));
            }
            return;
        }
        if ($this->option('mobile')) {
            $this->runServerMobile();
            return;
        }
        $this->runServer();
    }

    protected function runServerMobile() {
        $this->comment('coping env...');
        $this->copyEnvMobile();
        $this->comment('copied');
        $this->comment('start gui...');
        $guiResult = $this->startMobileGui();
        $this->comment('start websocket...');
        $wssResult = $this->startWebSocketServer(true);
        $this->comment('started');
        $this->comment('Gui vue on ' . env('APP_URL') . ':' . env('VUEAPP_PORT_MOBILE', 8001));
        $this->waitForProcesses($guiResult, $wssResult);
        $this->comment('mobile script terminated');
    }

    protected function runServer() {
        $this->comment('coping env...');
        $this->copyEnv();
        $this->comment('copied');
        $this->comment('start gui...');
        $guiResult = $this->startGui();
        $this->comment('start websocket...');
        $wssResult = $this->startWebSocketServer(false);
        $this->comment('started');
        $this->comment('Gui vue on ' . env('APP_URL') . ':' . env('VUEAPP_PORT', 8001));
        $this->waitForProcesses($guiResult, $wssResult);
        $this->comment('gui script terminated');
    }

    protected function runWssLoop(bool $secure = false) {
        if ($secure) {
            $server = $this->getSecureServer();
        } else {
            $server = $this->getHttpServer();
        }
        $server->run();
    }

    protected function runWssLoopMobile() {
        $httpServer = new HttpServer(
            new WsServer(
                new WebSocketServer()
            )
        );
        $server = IoServer::factory(
            $httpServer,
            env('VUEAPP_WEBSOCKET_PORT_MOBILE', 7071)
        );
        $this->comment(
            'Websocket awaiting connection on ws://'
            . env('VUEAPP_DOMAIN', 'localhost')
            . ':'
            . env('VUEAPP_WEBSOCKET_PORT_MOBILE')
        );
        $server->run();
    }

    /**
     * @param  \Illuminate\Process\InvokedProcess|null  $guiResult
     * @param  \Illuminate\Process\InvokedProcess|null  $wssResult
     */
    protected function waitForProcesses($guiResult, $wssResult): void {
        while (($guiResult && $guiResult->running()) || ($wssResult && $wssResult->running())) {
            usleep(100_000);
        }
    }

    protected function startWebSocketServer(bool $mobile) {
        $artisan = base_path('artisan');
        $command = sprintf(
            '%s %s cup:wss-server --wss-only%s',
            PHP_BINARY,
            escapeshellarg($artisan),
            $mobile ? ' --mobile' : ($this->option('secure') ? ' --secure' : '')
        );

        return Process::forever()
            ->path(base_path())
            ->start($command, $this->processOutputCallback());
    }

    protected function processOutputCallback(): callable {
        return function (string $type, string $output) {
            echo "$type $output";
            flush();
        };
    }

    protected function getSecureServer() {
        $host = '0.0.0.0';
        $port = (int) env('VUEAPP_WEBSOCKET_PORT', 7071);
        $certFolder = env('VUEAPP_CERT_FOLDER');

        if (empty($certFolder) || ! is_dir($certFolder)) {
            throw new \RuntimeException(
                'Modalità --secure: imposta VUEAPP_CERT_FOLDER nel .env con il percorso alla cartella che contiene cert.pem e key.pem.'
            );
        }

        $certFolder = rtrim($certFolder, '/\\');
        $cert = $certFolder . '/cert.pem';
        $key = $certFolder . '/key.pem';

        foreach (['cert.pem' => $cert, 'key.pem' => $key] as $label => $path) {
            if (! is_readable($path)) {
                throw new \RuntimeException("File TLS non leggibile ({$label}): {$path}");
            }
        }

        $loop = class_exists(Loop::class) ? Loop::get() : Factory::create();

        // SocketServer con schema tls:// applica SecureServer su TcpServer (react/socket)
        $socket = new ReactSocketServer(
            'tls://' . $host . ':' . $port,
            [
                'tls' => [
                    'local_cert' => $cert,
                    'local_pk' => $key,
                ],
            ],
            $loop
        );

        $httpServer = new HttpServer(
            new WsServer(new WebSocketServer())
        );

        $server = new IoServer($httpServer, $socket, $loop);

        $domain = env('VUEAPP_DOMAIN', 'localhost');
        $this->comment('Websocket (TLS) in ascolto su wss://' . $domain . ':' . $port);

        return $server;
    }

    protected function getHttpServer() {
        $httpServer = new HttpServer(
            new WsServer(
                new WebSocketServer()
            ));
        $server = IoServer::factory($httpServer,
            env('VUEAPP_WEBSOCKET_PORT',7071) // Assicurati che questa sia la porta corretta
        );
        $this->comment('Websocket awaiting connection on ws://' . env('VUEAPP_DOMAIN','localhost') . ':' . env('VUEAPP_WEBSOCKET_PORT'));
        return $server;
    }

    protected function startGui() {
        try {
            $a = new \ReflectionClass(WebSocketServer::class);
            $attr = pathinfo($a->getFileName());
            if ($attr) {
                //echo $attr['dirname'] . "\n";
                $shell_command =$attr['dirname'] . '/shell_commands/gui_start.sh';
                $result = Process::forever()->env(ServiceInterface::getEnvVars())
                    ->start('bash ' . "$shell_command", $this->processOutputCallback());
                return $result;
            }
        } catch (\Exception $e) {
            throw $e;
        }

    }

    protected function copyEnv() {
        $env = config('cup-gui-vue.env.local');
        $content = "";
        foreach ($env as $key => $value) {
            $content .= "$key=$value\n";
        }
        $fileEnv = config('cup-gui-vue.application_path')  . '/.env.local';
        //echo $fileEnv . "\n";
        file_put_contents($fileEnv,$content);

        $env = config('cup-gui-vue.env.production');
        $content = "";
        foreach ($env as $key => $value) {
            $content .= "$key=$value\n";
        }
        $fileEnv = config('cup-gui-vue.application_path')  . '/.env.production';
        file_put_contents($fileEnv,$content);
    }

    protected function copyEnvMobile() {
        $env = config('cup-gui-vue.env.mobile_local');
        $content = "";
        foreach ($env as $key => $value) {
            $content .= "$key=$value\n";
        }
        $fileEnv = config('cup-gui-vue.application_path_mobile')  . '/.env.local';
        file_put_contents($fileEnv,$content);
        $env = config('cup-gui-vue.env.mobile_production');
        $content = "";
        foreach ($env as $key => $value) {
            $content .= "$key=$value\n";
        }
        $fileEnv = config('cup-gui-vue.application_path_mobile')  . '/.env.production';
        file_put_contents($fileEnv,$content);
    }

    protected function startMobileGui() {
        try {
            $a = new \ReflectionClass(WebSocketServer::class);
            $attr = pathinfo($a->getFileName());
            if ($attr) {
                //echo $attr['dirname'] . "\n";
                $shell_command =$attr['dirname'] . '/shell_commands/mobile_start.sh';
                $env = ServiceInterface::getEnvVarsMobile();
                $result = Process::forever()->env(ServiceInterface::getEnvVarsMobile())
                    ->start('bash ' . "$shell_command", $this->processOutputCallback());
                return $result;
            }
        } catch (\Exception $e) {
            throw $e;
        }
    }
}






