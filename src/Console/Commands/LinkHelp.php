<?php namespace Marley71\CupGuiVue\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Process;

class LinkHelp extends Command {
    protected $signature = 'cup:link-help';

    protected $name = 'LinkHelp';

    protected $description = 'crea il link simbolico per la cartella htmlhelp';

    protected $cupparisEnv = [];

    public function handle() {
        $this->cupparisEnv['CUPPARIS_GIT'] =  config('cup-gui-vue.cupparis-primevue-git') ;
        $this->cupparisEnv['APP_FOLDER'] = config('cup-gui-vue.app_folder') . '/vue-application-v4';
        $this->cupparisEnv['CUPPARIS_BRANCH'] =   config('cup-gui-vue.cupparis-primevue-branch');

        $this->comment('crea il link simbolico per la cartella htmlhelp');
        $this->linkHelp();
        return ;
    }

    protected function linkHelp() {
        $p = Process::forever()->env($this->cupparisEnv);
        $command = "sh " . dirname(__FILE__) . '/shell_commands/link-help.sh';
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
