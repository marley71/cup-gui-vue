<?php namespace Marley71\CupSocketServer\Providers;


use Illuminate\Support\ServiceProvider;
use Marley71\CupSocketServer\Console\Commands\InstallGui;
use Marley71\CupSocketServer\Console\Commands\SocketServer;

class CupGuiVueProvider extends ServiceProvider {
    protected $commands = [
        SocketServer::class,
        InstallGui::class
    ];

    public function register()
    {
        $this->commands($this->commands);
        $this->publishes([
            __DIR__.'/../../config/cup-gui-vue.php' => config_path('cup-gui-vue.php'),
        ], 'config');
    }

    public function boot()
    {
        //
    }
}
