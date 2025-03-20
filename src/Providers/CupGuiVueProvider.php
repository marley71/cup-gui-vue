<?php namespace Marley71\CupSocketServer\Providers;


use Illuminate\Support\ServiceProvider;
use Marley71\CupSocketServer\Console\Commands\AnalyzeComposerPackages;
use Marley71\CupSocketServer\Console\Commands\GenerateImplementationCommand;
use Marley71\CupSocketServer\Console\Commands\InstallGui;
use Marley71\CupSocketServer\Console\Commands\SocketServer;
use Marley71\CupSocketServer\Console\Commands\Test;
class CupGuiVueProvider extends ServiceProvider {
    protected $commands = [
        SocketServer::class,
        InstallGui::class,
        AnalyzeComposerPackages::class,
        GenerateImplementationCommand::class,
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
