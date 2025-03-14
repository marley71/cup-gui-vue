<?php namespace Marley71\CupSocketServer\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Process;
use Illuminate\Support\Str;
use Marley71\CupSocketServer\Services\JavaScriptParser;

class Test extends Command {
    protected $signature = 'cup:test {param}';

    protected $name = 'test';

    protected $description = 'Test codice ';

    public function handle() {

    $this->parserjs();
    }
    public function parserjs() {
        //$filePath = config('cup-gui-vue.application_path') . '/ModelConfs/Model' . Str::studly($this->argument('param')). '.js'; // Sostituisci con il percorso corretto
        $filePath = config('cup-gui-vue.application_path') . '/ModelConfs/' . $this->argument('param');
        echo $filePath . "\n";
        $parser = new JavaScriptParser();
        $data = $parser->parse($filePath);
        print_r($data);
    }
}
