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
        echo "
        - git clone git@github.com:marley71/cupparis-primevue.git
        - branch " . config('cup-gui-vue.cupparis-primevue-branch') . "
          nella cartella " . config('cup-gui-vue.cupparis_primevue_path')  . "
        - git clone git@gitlab.cupparis.it:gui/roma-vue-4.0.0.git
        - branch " . config('cup-gui-vue.roma-vue-branch') . "
          nella cartella " .config('cup-gui-vue.roma_path')  . "
        - ln -s " . env('APPLICATION_PATH') . "/public
        - ln -s " . env('APPLICATION_PATH') . "/package.json";
        if (!$this->confirm("Il comando eseguirà le azioni sopraindicate. Continuare?")) {
            $this->comment('Comando abortito');
            return ;
        }
        $this->comment('checkout libreria cupparis-primevue');
        $this->gitCupparis();
        $this->comment('-----------------');
        $this->comment('checkout libreria roma-vue-4.0.0');
        $this->gitRoma();
        $this->comment('-----------------');
        $this->comment('create simlinks');
        $this->createSimLinks();

    }

    protected function gitCupparis() {
        $p = Process::forever()->path(config('cup-gui-vue.app_folder'));
        $command = 'git clone git@github.com:marley71/cupparis-primevue.git';
        $this->comment('execute ' . $command . ' ...');
        $p->run($command);
        $this->comment('done ');

        $p = Process::forever()->path(config('cup-gui-vue.cupparis_primevue_path') );
        $command = 'git checkout ' . config('cup-gui-vue.cupparis-primevue-branch');
        $this->comment('execute ' . $command);
        $p->run($command);
        $this->comment('done ');

        $p = Process::forever()->path(config('cup-gui-vue.cupparis_primevue_path') );
        $command = 'git pull';
        $this->comment('execute ' . $command);
        $p->run($command);
        $this->comment('done ');

        $p = Process::forever()->path(config('cup-gui-vue.cupparis_primevue_path') );
        $command = 'npm install';
        $this->comment('execute ' . $command);
        $p->run($command);
        $this->comment('done ');
    }

    protected function gitRoma() {
        $p = Process::forever()->path(config('cup-gui-vue.app_folder'));
        $command = 'git clone git@gitlab.cupparis.it:gui/roma-vue-4.0.0.git';
        $this->comment('execute ' . $command . ' ...');
        $p->run($command);
        $this->comment('done ');

        $p = Process::forever()->path(config('cup-gui-vue.roma_path') );
        $command = 'git checkout ' . config('cup-gui-vue.roma-vue-branch');
        $this->comment('execute ' . $command);
        $p->run($command);
        $this->comment('done ');

        $p = Process::forever()->path(config('cup-gui-vue.roma_path') );
        $command = 'git pull';
        $this->comment('execute ' . $command);
        $p->run($command);
        $this->comment('done ');

        $p = Process::forever()->path(config('cup-gui-vue.roma_path'));
        $command = 'npm install';
        $this->comment('execute ' . $command);
        $p->run($command);
        $this->comment('done ');
    }

    protected function createSimLinks() {
        $p = Process::forever()->path(config('cup-gui-vue.roma_path') );
        $command = "ln -s " .  config('cup-gui-vue.application_path') . "/public";
        $this->comment('execute ' . $command);
        $p->run($command);
        $this->comment('done ');

        $p = Process::forever()->path(config('cup-gui-vue.roma_path') );
        $command = "ln -s " . config('cup-gui-vue.application_path') . "/package.json";
        $this->comment('execute ' . $command);
        $p->run($command);
        $this->comment('done ');
    }
}
