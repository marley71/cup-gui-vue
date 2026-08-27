<?php namespace Marley71\CupGuiVue\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Process;

class InstallGui extends Command {
    protected $signature = 'cup:install-gui 
                    {--update-cupparis : aggiorna solo il git della libreria cupparis-primevue al branch}
                    {--install-cupparis : installa solo la libreria cupparis-primevue}';

    protected $name = 'InstallGui';

    protected $description = 'Scarica i moduli per eseguire l\'interfaccia web e configura i link iniziali';

    protected $cupparisEnv = [];

    public function handle() {
        $this->cupparisEnv['CUPPARIS_GIT'] =  config('cup-gui-vue.cupparis-primevue-git') ;
        $this->cupparisEnv['APP_FOLDER'] = config('cup-gui-vue.app_folder') . '/vue-application-v4';
        $this->cupparisEnv['CUPPARIS_BRANCH'] =   config('cup-gui-vue.cupparis-primevue-branch');

        if ($this->option('update-cupparis') ) {
            $this->comment('eseguo aggiornamento della libreria cupparis-primevue');
            $this->updateCupparis();
            return ;
        }

        if ($this->option('install-cupparis') ) {
            $this->comment('eseguo installazione della libreria cupparis-primevue');
            $this->gitCupparis();
            return ;
        }

        echo "
        - copia cartella vue-application-v4 in " . config('cup-gui-vue.app_folder') . "
        - git clone " . config('cup-gui-vue.cupparis-primevue-git') . "
        - branch " . config('cup-gui-vue.cupparis-primevue-branch') . "
          nella cartella " . config('cup-gui-vue.cupparis_primevue_path');
        if (!$this->confirm("Il comando eseguirà le azioni sopraindicate. Continuare?")) {
            $this->comment('Comando abortito');
            return ;
        }


        $this->comment('copia folder application');
        $this->copyApplicationFolder();
        $this->comment('checkout libreria cupparis-primevue');
        $this->gitCupparis();
        $this->comment('installazione client');
        $this->installClient();
    }

    protected function copyApplicationFolder() {
        config('cup-gui-vue.app_folder');
        $p = Process::forever();
        $command = "cp -Ra " . dirname(__FILE__) . '/../../../resources/vue-application-v4 ' . config('cup-gui-vue.app_folder') . ' .';
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
        $p = Process::forever()->env($this->cupparisEnv);
        $command = "sh " . dirname(__FILE__) . '/shell_commands/cupparis-install.sh';
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
    }

    protected function updateCupparis() {
        $p = Process::forever()->env($this->cupparisEnv);
        $command = "sh " . dirname(__FILE__) . '/shell_commands/cupparis-update.sh';
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
}
