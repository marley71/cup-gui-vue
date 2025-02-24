<?php namespace Marley71\CupSocketServer\Console\Commands;

use Illuminate\Console\Command;
use App\Services\ClassGenerator;
use Illuminate\Support\Arr;
use Illuminate\Support\Str;
use Marley71\CupSocketServer\Services\CodeGenerator;
use Marley71\CupSocketServer\WebSockets\DbService;

class GenerateImplementation extends Command
{
    protected $signature = 'cup:generate-implementation {table} {model} {--exclude=}';
    protected $description = 'Genera l\'implementazione del model,policy,js-conf,foorm-conf,foorm-classes';

    public function handle()
    {
        $exclude = explode(',',$this->option('exclude',''));

        if (!Arr::exists($exclude,'model')) {
            $this->createModel();
        }

        if (!Arr::exists($exclude,'serverConf')) {
            $this->createServerConf();
        }

        if (!Arr::exists($exclude,'clientConf')) {
            $this->createClientConf();
        }
    }

    protected function createModel() {
        //$modelStub = dirname(__FILE__) . '../../resources/stubs/model.stub';
        $className = Str::studly($this->argument('model'));
        $table = $this->argument('table');
        $namespace = 'App\\Models';
        $outputPath = app_path('/Models/' . $className . '.php');

        $params = [
            '$namespace' => $namespace,
            '$modelClass' => $className,
            '$traits' => '',
            '$migrationTable' => $table,
            '$timestamps' => 'true',
            '$ownerships' => 'false',
            '$relationsData' => '',
            '$columnsForSelectList' => "'id'",
            '$defaultOrderColumns' => "'id'",
            '$columnsSearchAutoComplete' => "'id'",
        ];

        $generator = new CodeGenerator(
            dirname(__FILE__) . '/../../../resources/stubs/model.stub',
            $params,
            $outputPath
        );

        if ($generator->generate()) {
            $this->info("Class {$className} generated successfully!");
        } else {
            $this->error("Failed to generate class {$className}.");
        }
    }
    protected function createServerConf() {
        $model = $this->argument('model');
        $confName = Str::camel($model);
        $table = $this->argument('table');
        $outputPath = config_path('foorms/'.$confName.'.php');
        $fields = DbService::getFields($table);
        $fieldsConvert = [];
        foreach ($fields as $field) {
            $fieldsConvert[] = "'" . $field['name'] . "' => []";
        }
        $relations = '[]';
        $relationsEdit = '[]';
        $params = [
            '$fields' => "[\n" . join(",\n",$fieldsConvert) . "]\n",
            '$fieldsSearch' => "[\n" . join(",\n",$fieldsConvert) . "]\n",
            '$relations' => $relations,
            '$relationsEdit' => $relationsEdit,
        ];

        $generator = new CodeGenerator(
            dirname(__FILE__) . '/../../../resources/stubs/foorm.stub',
            $params,
            $outputPath
        );

        if ($generator->generate()) {
            $this->info("foorm configuration {$confName} generated successfully!");
        } else {
            $this->error("Failed to generate foorm configuration {$confName}.");
        }
    }


    protected function createClientConf() {
        //$modelStub = dirname(__FILE__) . '../../resources/stubs/model.stub';
        $modelName = $this->argument('model');
        $table = $this->argument('table');
        $modelClass = 'Model' . Str::studly($modelName);
        $table = $this->argument('table');
        $namespace = 'App\\Models';
        $outputPath = config('cup-gui-vue.application_path') . '/ModelConfs/'.$modelClass.'.js';
        $fields = DbService::getFields($table);
        $fieldsConvert = [];
        foreach ($fields as $field) {
            $fieldsConvert[] = "'" . $field['name'] . "' => []";
        }
        $params = [
            '$modelClass' => $modelClass,
            '$modelName' => $modelName,
            '$listFields' => "\n",
            '$listOrderFields' => "\n",
            '$searchFields' => "\n",
            '$editFields' => "\n",
            '$searchFieldsType' => "\n",
            '$listFieldsType' => "\n",
            '$editFieldsType' => "\n",
        ];

        $generator = new CodeGenerator(
            dirname(__FILE__) . '/../../../resources/stubs/model-js.stub',
            $params,
            $outputPath
        );

        $models = json_decode(file_get_contents(config('cup-gui-vue.application_path') . '/config/models.json'),true);
        $found = false;
        foreach ($models as $key => $filename) {
            if ($key == $modelClass) {
                $found = true;
                break;
            }
        }

        if (!$found) {
            $models[$modelClass] = $modelClass . '.js';
            file_put_contents(config('cup-gui-vue.application_path') . '/config/models.json',json_encode($models,JSON_PRETTY_PRINT));

        }



        if ($generator->generate()) {
            $this->info("Model Client configuration {$modelClass} generated successfully!");
        } else {
            $this->error("Failed to generate Model Client configuration {$modelClass}.");
        }
    }

}
