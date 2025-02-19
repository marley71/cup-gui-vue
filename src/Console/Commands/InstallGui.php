<?php namespace Marley71\CupSocketServer\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Process;
use Marley71\CupSocketServer\WebSockets\ServiceInterface;
use Marley71\CupSocketServer\WebSockets\WebSocketServer;
use Ratchet\Http\HttpServer;
use Ratchet\Server\IoServer;
use Ratchet\WebSocket\WsServer;


class InstallGui extends Command {
    protected $signature = 'cup:install-gui';

    protected $name = 'InstallGui';

    protected $description = 'Scarica i moduli per eseguire l\'interfaccia web e configura i link iniziali';

    public function handle() {
        $domain = env('VUEAPP_DOMAIN','localhost');
        echo "
        - git clone git@github.com:marley71/cupparis-primevue.git
        - branch " . config('cup-gui-vue.cupparis-primevue-branch') . "
        - git clone git@gitlab.cupparis.it:gui/roma-vue-4.0.0.git
        - branch " . config('cup-gui-vue.roma-vue-branch') . "
        - ln -s " . env('APPLICATION_PATH') . "/public
        - ln -s " . env('APPLICATION_PATH') . "/packages.json";
        if (!$this->confirm("Il comando eseguirà le azioni sopraindicate. Continuare?")) {
            $this->comment('Comando abortito');
            return ;
        }
        return ;

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
