<?php namespace  Marley71\CupSocketServer\Services;


use App\Services\ClassGenerator;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Str;
use Marley71\CupSocketServer\WebSockets\DbService;

class GenerateImplementation
{
    protected $params;
    public $logs = [];

    public function __construct($params)
    {
        $this->params = $params;
    }

    public function generate() {
        $exclude = explode(',',Arr::get($this->params,'exclude',''));
        if (!in_array('Model', $exclude)) {
            $this->createModel();
        }

        if (!in_array('ServerConf', $exclude)) {
            $this->createServerConf();
        }

        if (!in_array('ClientConf', $exclude)) {
            $this->createClientConf();
        }

        if (!in_array('Policy', $exclude)) {
            $this->createPolicy();
        }
    }

    protected function createModel() {
        //$modelStub = dirname(__FILE__) . '../../resources/stubs/model.stub';
        $className = Str::studly($this->params['model']);
        $table = $this->params['table'];
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
            dirname(__FILE__) . '/../../resources/stubs/model.stub',
            $params,
            $outputPath
        );

        if ($generator->generate()) {
            $this->logs[] = "Class {$className} generated successfully!";
        } else {
            $this->logs[] = "Failed to generate class {$className}.";
        }
    }
    protected function createServerConf() {
        $model = $this->params['model'];
        $confName = Str::camel($model);
        $table = $this->params['table'];
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
            dirname(__FILE__) . '/../../resources/stubs/foorm.stub',
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

                $this->logs[] = "Configurazione aggiornata con successo.";
                Artisan::call('config:clear');
            } else {
                $this->logs[] = "File di configurazione non trovato.";
            }
        }



        if ($generator->generate()) {
            $this->logs[] = "foorm configuration {$confName} generated successfully!";
        } else {
            $this->logs[] = "Failed to generate foorm configuration {$confName}.";
        }
    }


    /**
     * generazione del modelconf js per la parte client
     * @return void
     */
    protected function createClientConf() {
        $modelName = $this->params['model'];
        $modelClass = 'Model' . Str::studly($modelName);
        $table = $this->params['table'];
        $outputPath = config('cup-gui-vue.application_path') . '/ModelConfs/'.$modelClass.'.js';
        $dotArray = Arr::dot(Arr::get($this->params,'modelConf',[]));
        $dbFields = DbService::getFields($table);
        print_r($dotArray);
        $listFields = collect($dbFields)->pluck('name')->toArray();
        $editFields = collect($dbFields)->pluck('name')->toArray();
        $searchFields = collect($dbFields)->pluck('name')->toArray();
        if (Arr::exists($dotArray,'searchConf.fields.0')) {
            $searchFields = $this->params['modelConf']['searchConf']['fields'];
        }
        if (Arr::exists($dotArray,'listConf.fields.0')) {
            $listFields = $this->params['modelConf']['listConf']['fields'];
        }
        if (Arr::exists($dotArray,'editConf.fields.0')) {
            $editFields = $this->params['modelConf']['editConf']['fields'];
        }
        $params = [
            '$modelClass' => $modelClass,
            '$modelName' => $modelName,
            '$listFields' => '["' . join('","',$listFields) . '"]',
            '$listOrderFields' => "{}",
            '$searchFields' => '["' . join('","',$searchFields ) . '"]',
            '$editFields' => '["' . join('","',$editFields ) . '"]',
            '$searchFieldsType' => "{}",
            '$listFieldsType' => "{}",
            '$editFieldsType' => "{}",
        ];

        $generator = new CodeGenerator(
            dirname(__FILE__) . '/../../resources/stubs/model-js.stub',
            $params,
            $outputPath
        );
        if ($generator->generate()) {
            $this->logs[] = "Generated $outputPath generated successfully!";
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
            dirname(__FILE__) . '/../../resources/stubs/model-index.stub',
            [
                '$import_model_confs' => $import_model_confs,
                '$model_confs_assign' => $model_confs_assign,
            ],
            $outputPath
        );

        if ($generator->generate()) {
            $this->logs[] = "Model Client configuration {$modelClass} generated successfully!";
        } else {
            $this->logs[] = "Failed to generate Model Client configuration {$modelClass}.";
        }
    }

    public function createPolicy() {
        $modelName = $this->params['model'];
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
            dirname(__FILE__) . '/../../resources/stubs/policy.stub',
            $params,
            $outputPath
        );

        if ($generator->generate()) {
            $this->logs[] = "Model Policy {$className} generated successfully!";
        } else {
            $this->logs[] = "Failed to generate Model Policy {$className}.";
        }
    }

}
