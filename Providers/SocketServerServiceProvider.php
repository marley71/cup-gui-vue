<?php namespace Modules\CupSocketServer\Providers;


use Illuminate\Support\ServiceProvider;
use Modules\CupSocketServer\Console\Commands\SocketServer;

class SocketServerServiceProvider extends ServiceProvider {
    protected $commands = [
        SocketServer::class
    ];

    public function register()
    {
        $this->commands($this->commands);
    }

    public function boot()
    {
        //
    }
}
