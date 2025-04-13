<?php namespace Marley71\CupSocketServer\WebSockets;

use Faker\Provider\Miscellaneous;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Process;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Str;
use Marley71\CupSocketServer\Services\GenerateImplementation;
use Marley71\CupSocketServer\Services\JavaScriptConfigParser;
use Ratchet\ConnectionInterface;

class RolesService extends ServiceInterface
{
    public function __construct()
    {
        parent::__construct();
        $this->envVars = [];
        $this->prefix = 'roles';
        $this->commands = [
            [
                'command' => 'conf',
                'description' => 'Ritorna la lista dei modelli,ruoli e permessi dell\'applicazione',
                'params' => [],
            ],
//            [
//                'command' => 'list-fields',
//                'description' => 'Lista dei campi della tabella',
//                'params' => [
//                    'table' => 'string',
//                ],
//            ],
//            [
//                'command' => 'check',
//                'description' => 'Controlla tutte le dipendenze del modello',
//                'params' => [
//                    'table' => 'string',
//                    'model' => 'string'
//                ],
//            ],
//            [
//                'command' => 'generate',
//                'description' => 'Generazione dell\'implentazione degli oggetti passati',
//                'params' => [
//                    'table' => 'string',
//                    'model' => 'string',
//                    'deploy' => 'json'
//                ],
//            ],
//            [
//                'command' => 'load-conf',
//                'description' => 'carica la configurazione del modello',
//                'params' => [
//                    'model' => 'string',
//                    'type' => 'string'
//                ],
//            ],

//            [
//                'command' => 'save-config',
//                'description' => 'Salvataggio impostazioni template',
//                'params' => [
//                    'config' => 'json',
//                ],
//            ],
        ];
    }

    /**
     * Implementazione del metodo astratto do.
     *
     * @param string $action
     * @return void
     */
    public function doAction(string $action,array $data)
    {
        switch ($action) {
            case 'conf':
                $response = [
                    'msg' => $this->getRolesConf(),
                    'error' => 0,
                    'type' => 'out',
                    'command' => $action,
                ];
                $this->send($response);
                break;
//            case 'list-fields':
//                $table = Arr::get(Arr::get($data,'params',[]),'table',null);
//                echo "table " . $table . "\n";
//                $response = [
//                    'msg' => self::getFields($table),
//                    'error' => 0,
//                    'type' => 'out',
//                    'command' => $action,
//                ];
//                $this->send($response);
//                break;
//            case 'check':
//                $table = Arr::get(Arr::get($data,'params',[]),'table',null);
//                $model = Arr::get(Arr::get($data,'params',[]),'model',null);
//                // @todo fare la validation
//                $result = $this->check([
//                    'table' => $table,
//                    'model' => $model
//                ]);
//                $response = [
//                    'msg' => $result,
//                    'confs' => $this->checkConf([
//                            'table' => $table,
//                            'model' => $model
//                        ]),
//                    'error' => 0,
//                    'type' => 'out',
//                    'command' => $action,
//                ];
//                $this->send($response);
//                break;
//            case 'generate':
//                $model = Arr::get(Arr::get($data,'params',[]),'model',null);
//                $table = Arr::get(Arr::get($data,'params',[]),'table',null);
//                $deploy = Arr::get(Arr::get($data,'params',[]),'deploy',null);
//                $modelConf = Arr::get(Arr::get($data,'params',[]),'modelConf',null);
//                if (!$model || !$table || !$deploy) {
//                    throw new \Exception('Parametri mancanti');
//                }
//                $response = [
//                    'msg' => $this->generate([
//                        'model' => $model,
//                        'table' => $table,
//                        'deploy' => $deploy,
//                        'modelConf' => $modelConf
//                    ]),
//                    'error' => 0,
//                    'type' => 'out',
//                    'command' => $action,
//                ];
//                $this->send($response);
//                break;
//            case 'save-conf':
//                $model = Arr::get(Arr::get($data,'params',[]),'model',null);
//                $table = Arr::get(Arr::get($data,'params',[]),'table',null);
//                $confType = Arr::get(Arr::get($data,'params',[]),'conf-type',null);
//                $conf = Arr::get(Arr::get($data,'params',[]),'conf',null);
//                try {
//                    $result = $this->saveCode([
//                        'table' => $table,
//                        'model' => $model,
//                        'confType' => $confType,
//                        'conf' => $conf,
//                    ]);
//                    $response = [
//                        'msg' => $result,
//                        'error' => 0,
//                        'type' => 'out',
//                        'command' => $action,
//                    ];
//                    $this->send($response);
//                } catch (\Exception $e) {
//                    $response = [
//                        'msg' => $e->getMessage(),
//                        'error' => 1,
//                        'type' => 'error',
//                        'command' => $action,
//                    ];
//                    $this->send($response);
//                }
//
//                break;
//            case 'load-conf':
//                $model = Arr::get(Arr::get($data,'params',[]),'model',null);
//                $type = Arr::get(Arr::get($data,'params',[]),'type',null);
//                try {
//                    $response = [
//                        'msg' => $this->loadConf($model,$type),
//                        'error' => 0,
//                        'type' => 'out',
//                        'command' => $action,
//                    ];
//                    $this->send($response);
//                } catch (\Exception $e) {
//                    $response = [
//                        'msg' => $e->getMessage(),
//                        'error' => 1,
//                        'type' => 'error',
//                        'command' => $action,
//                    ];
//                    $this->send($response);
//                }
//
//                break;
            default:
                throw new \Exception( 'roles service action non gestita ' . Arr::get($data,'action'));
        }
    }

//    public static function getEnvVars() {
//        return array_merge(parent::getEnvVars(),[
//            'APPLICATION_PATH' => config('cup-gui-vue.application_path')
//        ]);
//    }


    public function getRolesConf() {
        $conf = [
            'models' => config('permission.cupparis.models',[]),
            'permissions' => config('permission.cupparis.models_permissions_prefixes.web',[]),
            'roles' => config('permission.cupparis.roles.web')
        ];
        return $conf;
    }

    public static function getFields($tableName) {
        $fields = [];
        $columns = Schema::getColumnListing($tableName);
        foreach ($columns as $column) {
            $type = Schema::getColumnType($tableName, $column);
            $fields[] = [
                'name' => $column,
                'type' => $type,
            ];
        }
        return $fields;
    }

    public function check($params) {
        //esistenza form
        $foormExist = file_exists(config_path('foorms/'.$params['model'].'.php'));
        // esistenza modello
        $modelExist = file_exists(base_path('app/Models/'.Str::studly($params['model']).'.php'));
        $policyExist = file_exists(base_path('app/Policies/'.Str::studly($params['model']).'Policy.php'));
        $clientExist = file_exists(config('cup-gui-vue.application_path') . '/ModelConfs/Model' . Str::studly($params['model']). '.js');
        return [
            'Model' => $modelExist,
            'ServerConf' => $foormExist,
            'ClientConf' => $clientExist,
            'Policy' => $policyExist,
            //'Foorm' => false,
        ];
    }

    public function checkConf($params) {
        $model = $params['model'];
        $jsFilename = config('cup-gui-vue.application_path') . '/ModelConfs/Model' . Str::studly($model). '.js';
        $phpFilename = config_path('foorms/'.$model . '.php');
        $result = [
          'jsConf' => [],
            'jsContent' => '',
            'phpContent' => '',
        ];
        if (file_exists($jsFilename)) {
            $jsParser = new JavaScriptConfigParser();
            $content = file_get_contents($jsFilename);
            //echo $content;
            $jsParser->parse($content);
            $result['jsContent'] = $content;
// Ora puoi accedere alle varie parti della configurazione
            $result['jsConf'] = [
                "modelName" => $jsParser->getModelName(),
                "searchConfig" => $jsParser->getSearchConfig(),
                "viewConfig" => $jsParser->getViewConfig(),
                "listConfig" => $jsParser->getListConfig(),
                "editConfig" => $jsParser->getEditConfig(),
                "listEditConfig" => $jsParser->getListEditConfig(),

    // Puoi anche ottenere configurazioni specifiche per ciascuna sezione
                "listFields" => $jsParser->getFields('list'),
                "searchFields" => $jsParser->getFields('search'),
                "editFields" => $jsParser->getFields('edit'),
                "editActions" => $jsParser->getActions('edit'),
                "searchFieldsConfig" => $jsParser->getFieldsConfig('search'),
            ];
        }
        if (file_exists($phpFilename)) {
            $result['phpContent'] = file_get_contents($phpFilename);
        }
        return $result;
    }

    public function generate($params) {
        $output = new \Symfony\Component\Console\Output\BufferedOutput;
        $exclude = '';
        foreach ($params['deploy'] as $key=>$value) {
            if (!$value) {
                $exclude .= $exclude?','.$key:$key;
            }
        }
        $callParams = [
            'table' => $params['table'],
            'model' => $params['model']
        ];
        if ($exclude) {
            $callParams['--exclude'] = $exclude;
        }

        $callParams['modelConf'] = $params['modelConf'];
        $gi = new GenerateImplementation($callParams);
        $gi->generate();
        return join("\n",$gi->logs);
    }

    public function saveCode($params) {
        // todo creare un file backup
        switch ($params['confType']) {
            case 'js':
                $modelClass = 'Model' . Str::studly($params['model']);
                $table = $params['table'];
                $outputPath = config('cup-gui-vue.application_path') . '/ModelConfs/'.$modelClass.'.js';
                file_put_contents($outputPath,$params['conf']);
                break;
            case 'php':
                $model = $params['model'];
                $outputPath = config_path('foorms/'.$model . '.php');;
                file_put_contents($outputPath,$params['conf']);
                break;
            default:
                throw new \Exception('codeType non riconosciuto ' . $params['confType']);
        }
        return 'ok';
    }

    public function loadConf($model,$type) {
        switch ($type) {
            case 'js':
                $modelClass = 'Model' . Str::studly($model);
                $filePath = config('cup-gui-vue.application_path') . '/ModelConfs/'.$modelClass.'.js';
                return file_get_contents($filePath);
            default:
                throw new \Exception('Tipo di conf ' . $type . ' non valida');
        }
    }


    protected function updateConfigFile($key, $value)
    {
        $configPath = config_path('cup-gui-vue.php');
        $configContent = file_get_contents($configPath);

        // Aggiorna il valore nel file di configurazione
        $pattern = "/('{$key}'\\s*=>\\s*)[^,]+,/";
        $replacement = "\${1}'{$value}',";
        $newConfigContent = preg_replace($pattern, $replacement, $configContent);

        file_put_contents($configPath, $newConfigContent);
    }
}


