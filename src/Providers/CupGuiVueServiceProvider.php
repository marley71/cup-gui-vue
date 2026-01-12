<?php namespace Marley71\CupGuiVue\Providers;


use Illuminate\Support\Facades\Log;
use Illuminate\Support\ServiceProvider;
use Marley71\CupGuiVue\Console\Commands\AnalyzeComposerPackages;
use Marley71\CupGuiVue\Console\Commands\GenerateImplementationCommand;
use Marley71\CupGuiVue\Console\Commands\InstallGui;
use Marley71\CupGuiVue\Console\Commands\SocketServer;
use Marley71\CupGuiVue\Console\Commands\Test;
use Marley71\CupGuiVue\Console\Commands\LinkHelp;

class CupGuiVueServiceProvider extends ServiceProvider {
    protected $commands = [
        SocketServer::class,
        InstallGui::class,
        AnalyzeComposerPackages::class,
        GenerateImplementationCommand::class,
        LinkHelp::class,
        Test::class,
    ];

    public function register()
    {
        $this->commands($this->commands);
        $this->publishes([
            __DIR__.'/../../config/cup-gui-vue.php' => config_path('cup-gui-vue.php'),
        ], 'config');
        $this->loadRoutesFrom(__DIR__ . '/../../routes/routes.php');
    }

    public function boot()
    {
        //
    }
}
