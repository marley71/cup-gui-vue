<?php namespace Marley71\CupSocketServer\Console\Commands;

use Illuminate\Console\Command;
use App\Services\ClassGenerator;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Str;
use Marley71\CupSocketServer\Services\CodeGenerator;
use Marley71\CupSocketServer\Services\GenerateImplementation;
use Marley71\CupSocketServer\WebSockets\DbService;

class GenerateImplementationCommand extends Command
{
    protected $signature = 'cup:generate-implementation {table} {model} {--exclude=}';
    protected $description = 'Genera l\'implementazione di default del Model,Policy,ClientConf,ServerConf,FoormClasses';

    public function handle()
    {
        $params = [
            'model' => $this->argument('model'),
            'table' => $this->argument('table'),
        ];
        if ($this->option('exclude')) {
            $params['exclude'] = $this->option('exclude');
        }

        $gi = new GenerateImplementation($params);
        $gi->generate();
        foreach ($gi->logs as $line) {
            $this->info($line);
        }


//        $exclude = explode(',',$this->option('exclude',''));
//        //print_r($exclude);
//        if (!in_array('Model', $exclude)) {
//            $this->createModel();
//        }
//
//        if (!in_array('ServerConf', $exclude)) {
//            $this->createServerConf();
//        }
//
//        if (!in_array('ClientConf', $exclude)) {
//            $this->createClientConf();
//        }
//
//        if (!in_array('Policy', $exclude)) {
//            $this->createPolicy();
//        }
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
            '$defaultOrderColumns' => "'id' => 'ASC'",
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


        $foorms = config('foorm.foorms');
        if (!in_array($model, $foorms)) {
            $path = base_path('config/foorm.php');
            if (file_exists($path)) {
                $config = include $path;
                $foorms[] = $model;
                Arr::set($config, 'foorms', $foorms);
                // Genera il nuovo contenuto del file
                $newContent = "<?php\n\nreturn " . var_export($config, true) . ";\n";

                // Scrivi il nuovo contenuto nel file
                file_put_contents($path, $newContent);

                $this->info("Configurazione aggiornata con successo.");
                Artisan::call('config:clear');
            } else {
                $this->error("File di configurazione non trovato.");
            }
        }



        if ($generator->generate()) {
            $this->info("foorm configuration {$confName} generated successfully!");
        } else {
            $this->error("Failed to generate foorm configuration {$confName}.");
        }
    }


    /**
     * generazione del modelconf js per la parte client
     * @return void
     */
    protected function createClientConf() {
        $modelName = $this->argument('model');
        $modelClass = 'Model' . Str::studly($modelName);
        $table = $this->argument('table');
        $outputPath = config('cup-gui-vue.application_path') . '/ModelConfs/'.$modelClass.'.js';
        $fields = DbService::getFields($table);
        $fieldsConvert = [];
        foreach ($fields as $field) {
            $fieldsConvert[] = "'" . $field['name'] . "' => []";
        }
        $params = [
            '$modelClass' => $modelClass,
            '$modelName' => $modelName,
            '$listFields' => '["' . join('","',collect($fields)->pluck('name')->toArray()) . '"]',
            '$listOrderFields' => "{}",
            '$searchFields' => '["' . join('","',collect($fields)->pluck('name')->toArray() ) . '"]',
            '$editFields' => '["' . join('","',collect($fields)->pluck('name')->toArray() ) . '"]',
            '$searchFieldsType' => "{}",
            '$listFieldsType' => "{}",
            '$editFieldsType' => "{}",
        ];

        $generator = new CodeGenerator(
            dirname(__FILE__) . '/../../../resources/stubs/model-js.stub',
            $params,
            $outputPath
        );
        if ($generator->generate()) {
            $this->info("Generated $outputPath generated successfully!");
        }
        $models = json_decode(file_get_contents(config('cup-gui-vue.application_path') . '/config/models.json'),true);
        $found = false;
        foreach ($models as $key => $filename) {
            if ($key == $modelClass) {
                $found = true;
                break;
            }
        }
        // aggiorno il file json per tenere traccia dei modelli da importare.
        if (!$found) {
            $models[$modelClass] = $modelClass . '.js';
            file_put_contents(config('cup-gui-vue.application_path') . '/config/models.json',json_encode($models,JSON_PRETTY_PRINT));
        }

        // sovrascrivo il file index.js di modelconfs per importare i modelli corretti.
        $import_model_confs = '';
        $model_confs_assign = '';
        foreach ($models as $model => $filename) {
            $import_model_confs .= "import $model from './$filename';\n";
            $model_confs_assign .= "cs.CrudVars.modelConfs.$model = $model;\n";
        }
        $outputPath = config('cup-gui-vue.application_path') . '/ModelConfs/index.js';
        $generator = new CodeGenerator(
            dirname(__FILE__) . '/../../../resources/stubs/model-index.stub',
            [
                '$import_model_confs' => $import_model_confs,
                '$model_confs_assign' => $model_confs_assign,
            ],
            $outputPath
        );

        if ($generator->generate()) {
            $this->info("Model Client configuration {$modelClass} generated successfully!");
        } else {
            $this->error("Failed to generate Model Client configuration {$modelClass}.");
        }
    }

    public function createPolicy() {
        $modelName = $this->argument('model');
        $modelNameForPermission = Str::snake($modelName);
        $className = Str::studly($modelName);
        $params = [
            '$modelClass' => $className,
            '$viewPermission' => 'view ' . $modelNameForPermission,
            '$viewAllPermission' => 'view all ' . $modelNameForPermission,
            '$updatePermission' => 'edit ' . $modelNameForPermission,
            '$deletePermission' => 'delete ' . $modelNameForPermission,
            '$createPermission' => 'create ' . $modelNameForPermission,
            '$listingPermission' => 'listing ' . $modelNameForPermission,
        ];
        $outputPath = app_path('/Policies/' . $className . 'Policy' . '.php');

        $generator = new CodeGenerator(
            dirname(__FILE__) . '/../../../resources/stubs/policy.stub',
            $params,
            $outputPath
        );

        if ($generator->generate()) {
            $this->info("Model Policy {$className} generated successfully!");
        } else {
            $this->error("Failed to generate Model Policy {$className}.");
        }
    }

}
