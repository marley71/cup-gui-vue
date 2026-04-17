<?php namespace Marley71\CupGuiVue\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Process;
use Marley71\CupGuiVue\WebSockets\ServiceInterface;
use Marley71\CupGuiVue\WebSockets\WebSocketServer;
use Ratchet\Http\HttpServer;
use Ratchet\Server\IoServer;
use Ratchet\WebSocket\WsServer;


class SocketServer extends Command {
    protected $signature = 'cup:wss-server {--mobile}';

    protected $name = 'wss';

    protected $description = 'Lancia websocket server per i comandi da gui';

    protected $wb = null;

    public function __construct()
    {
        parent::__construct();
        //$this->wb = new WebSocketServer();
        
    }

    public function handle() {
        if ($this->option('mobile')) {
            $this->runServerMobile();
            return ;
        } 
        $this->runServer();
    }

    protected function runServerMobile() {
        $this->comment('coping env...');
        $this->copyEnvMobile();
        $this->comment('copied');
        $this->comment("start gui...");
        $this->startMobileGui();
        $this->comment('started');
        $this->comment('Gui vue on ' . env('APP_URL') . ':' . env('VUEAPP_PORT_MOBILE',8001));
        $this->comment("start websocket...");
        $httpServer = new HttpServer(
            new WsServer(
                new WebSocketServer()
            ));
        $server = IoServer::factory($httpServer,
            env('VUEAPP_WEBSOCKET_PORT_MOBILE',7071) // Assicurati che questa sia la porta corretta
        );
        $this->comment('Websocket awaiting connection on ws://' . env('VUEAPP_DOMAIN','localhost') . ':' . env('VUEAPP_WEBSOCKET_PORT_MOBILE'));
        $server->run();
    }

    protected function runServer() {
        $this->comment('coping env...');
        $this->copyEnv();
        $this->comment('copied');
        $this->comment("start gui...");
        $this->startGui();
        $this->comment('started');
        $this->comment('Gui vue on ' . env('APP_URL') . ':' . env('VUEAPP_PORT',8001));
        $this->comment("start websocket...");
        $httpServer = new HttpServer(
            new WsServer(
                new WebSocketServer()
            ));
        $server = IoServer::factory($httpServer,
            env('VUEAPP_WEBSOCKET_PORT',7071) // Assicurati che questa sia la porta corretta
        );
        $this->comment('Websocket awaiting connection on ws://' . env('VUEAPP_DOMAIN','localhost') . ':' . env('VUEAPP_WEBSOCKET_PORT'));
        $server->run();
    }

    protected function startGui() {
        try {
            $a = new \ReflectionClass(WebSocketServer::class);
            $attr = pathinfo($a->getFileName());
            if ($attr) {
                //echo $attr['dirname'] . "\n";
                $shell_command =$attr['dirname'] . '/shell_commands/gui_start.sh';
                $result = Process::forever()->env(ServiceInterface::getEnvVars())
                    ->start('bash ' . "$shell_command", function (string $type, string $output) {
                        echo "$type $output";
                        flush();

//                        if ($type != 'out') {
//                            throw new \Exception($output);
//                        } else {
//                            echo $output;
//                        }
                    });
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
                $result = Process::forever()->env(ServiceInterface::getEnvVarsMobile())
                    ->start('bash ' . "$shell_command", function (string $type, string $output) {
                        echo "$type $output";
                        flush();
                    });
            }
        } catch (\Exception $e) {
            throw $e;
        }
    }
}
