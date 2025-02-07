<?php namespace Marley71\CupSocketServer\Providers;


use Illuminate\Support\ServiceProvider;
use Marley71\CupSocketServer\Console\Commands\SocketServer;

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
