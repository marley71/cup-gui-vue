<?php namespace Marley71\CupSocketServer\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Process;

class InstallGui extends Command {
    protected $signature = 'cup:install-gui';

    protected $name = 'InstallGui';

    protected $description = 'Scarica i moduli per eseguire l\'interfaccia web e configura i link iniziali';

    protected $cupparisEnv = [];

    public function handle() {
        echo "
        - copia cartella vue-application-v3 in " . config('cup-gui-vue.app_folder') . "
        - git clone " . config('cup-gui-vue.cupparis-primevue-git') . "
        - branch " . config('cup-gui-vue.cupparis-primevue-branch') . "
          nella cartella " . config('cup-gui-vue.cupparis_primevue_path')  . "
        - git clone " . config('cup-gui-vue.roma-vue-git') . "
        - branch " . config('cup-gui-vue.roma-vue-branch') . "
          nella cartella " .config('cup-gui-vue.roma_path')  . "
        - ln -s " . env('APPLICATION_PATH') . "/public
        - ln -s " . env('APPLICATION_PATH') . "/package.json";
        if (!$this->confirm("Il comando eseguirà le azioni sopraindicate. Continuare?")) {
            $this->comment('Comando abortito');
            return ;
        }
        $this->cupparisEnv['CUPPARIS_GIT'] =  config('cup-gui-vue.cupparis-primevue-git') ;
        $this->cupparisEnv['APP_FOLDER'] = config('cup-gui-vue.app_folder') . '/vue-application-v3';
        $this->cupparisEnv['CUPPARIS_BRANCH'] =   config('cup-gui-vue.cupparis-primevue-branch');

        $this->comment('copia folder application');
        $this->copyApplicationFolder();
        $this->comment('checkout libreria cupparis-primevue');
        $this->gitCupparis();
        $this->comment('installazione client');
        $this->installClient();
//        $this->comment('-----------------');
//        $this->comment('checkout libreria roma-vue-4.0.0');
//        $this->gitRoma();
//        $this->comment('-----------------');
//        $this->comment('create simlinks');
//        $this->createSimLinks();

    }

    protected function copyApplicationFolder() {
        config('cup-gui-vue.app_folder');
        $p = Process::forever();
        $command = "cp -ra " . dirname(__FILE__) . '/../../../resources/vue-application-v3 ' . config('cup-gui-vue.app_folder');
        $this->comment('execute ' . $command );
        $result = $p->run($command);
        if (!$result->successful()) {
            // Il processo ha fallito
            $this->error($result->errorOutput());
            exit(1);
        } else {
            $this->comment($result->output());
            $this->comment('done ');
        }
    }

    protected function gitCupparis() {
//        $p = Process::forever()->env($this->cupparisEnv);
//        $command = "sh " . dirname(__FILE__) . '/shell_commands/cupparis-install.sh';
//        $this->comment('execute ' . $command );
//        $result = $p->run($command);
//        if (!$result->successful()) {
//            // Il processo ha fallito
//            $this->error($result->errorOutput());
//            exit(1);
//        } else {
//            $this->comment($result->output());
//            $this->comment('done ');
//        }


        $path = config('cup-gui-vue.app_folder') . '/vue-application-v3';
        $p = Process::forever()->path($path);
        $command = 'git clone ' . config('cup-gui-vue.cupparis-primevue-git');
        $this->comment('execute ' . $command );
        $result = $p->run($command);
        if (!$result->successful()) {
            // Il processo ha fallito
            $this->error($result->errorOutput());
            exit(1);
        } else {
            $this->comment($result->output());
            $this->comment('done ');
        }


        $this->comment("cupparis-primevue path " . $path . '/cupparis-primevue');

        $p = Process::forever()->path($path . '/cupparis-primevue' );
        $command = 'git checkout ' . config('cup-gui-vue.cupparis-primevue-branch');
        $this->comment('execute ' . $command);
        $p->run($command);
        if (!$result->successful()) {
            // Il processo ha fallito
            $this->error($result->errorOutput());
            exit(1);
        } else {
            $this->comment($result->output());
            $this->comment('done ');
        }

        $p = Process::forever()->path($path . '/cupparis-primevue' );
        $command = 'git pull';
        $this->comment('execute ' . $command);
        $p->run($command);
        if (!$result->successful()) {
            // Il processo ha fallito
            $this->error($result->errorOutput());
            exit(1);
        } else {
            $this->comment($result->output());
            $this->comment('done ');
        }
    }

    protected function installClient() {
        $p = Process::forever()->env($this->cupparisEnv);
        $command = "sh " . dirname(__FILE__) . '/shell_commands/client-install.sh';
        $this->comment('execute ' . $command );
        $result = $p->run($command);
        if (!$result->successful()) {
            // Il processo ha fallito
            $this->error($result->errorOutput());
            exit(1);
        } else {
            $this->comment($result->output());
            $this->comment('done ');
        }


//        $path = config('cup-gui-vue.app_folder');
//        $p = Process::forever()->path($path );
//        $command = 'npm install';
//        $this->comment('execute ' . $command);
//        $result = $p->run($command);
//        if (!$result->successful()) {
//            // Il processo ha fallito
//            $this->error($result->errorOutput());
//            exit(1);
//        } else {
//            $this->comment($result->output());
//            $this->comment('done ');
//        }
    }
}
