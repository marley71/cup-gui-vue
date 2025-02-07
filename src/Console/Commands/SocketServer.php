<?php namespace Marley71\CupSocketServer\Console\Commands;

use \Illuminate\Console\Command;

class SocketServer extends Command {
    protected $signature = 'ss:socket-server';

    // La descrizione del comando
    protected $description = 'lancia il server per i comandi';

    // Esecuzione del commando
    public function handle()
    {
        // Logica del comando
        $this->info('L\'elenco dei post nel blog è qui...');
    }
}
