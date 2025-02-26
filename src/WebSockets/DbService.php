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

class DbService extends ServiceInterface
{
    public function __construct()
    {
        parent::__construct();
        $this->envVars = [];
        $this->prefix = 'db';
        $this->commands = [
            [
                'command' => 'list-tables',
                'description' => 'Lista delle tabelle del db',
                'params' => [],
            ],
            [
                'command' => 'list-fields',
                'description' => 'Lista dei campi della tabella',
                'params' => [
                    'table' => 'string',
                ],
            ],
            [
                'command' => 'check',
                'description' => 'Controlla tutte le dipendenze del modello',
                'params' => [
                    'table' => 'string',
                    'model' => 'string'
                ],
            ],
            [
                'command' => 'generate',
                'description' => 'Generazione dell\'implentazione degli oggetti passati',
                'params' => [
                    'table' => 'string',
                    'model' => 'string',
                    'deploy' => 'json'
                ],
            ],
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
    public function doAction(string $action,array $data,ConnectionInterface $conn)
    {
        switch ($action) {
            case 'list-tables':
                $response = [
                    'msg' => $this->getTables(),
                    'error' => 0,
                    'type' => 'out',
                    'command' => $action,
                ];
                $conn->send(json_encode($response));
                break;
            case 'list-fields':
                $table = Arr::get(Arr::get($data,'params',[]),'table',null);
                echo "table " . $table . "\n";
                $response = [
                    'msg' => self::getFields($table),
                    'error' => 0,
                    'type' => 'out',
                    'command' => $action,
                ];
                $conn->send(json_encode($response));
                break;
            case 'check':
                $table = Arr::get(Arr::get($data,'params',[]),'table',null);
                $model = Arr::get(Arr::get($data,'params',[]),'model',null);
                // @todo fare la validation
                $result = $this->check([
                    'table' => $table,
                    'model' => $model
                ]);
                $response = [
                    'msg' => $result,
                    'confs' => $this->checkConf([
                            'table' => $table,
                            'model' => $model
                        ]),
                    'error' => 0,
                    'type' => 'out',
                    'command' => $action,
                ];
                $conn->send(json_encode($response));
                break;
            case 'generate':
                $model = Arr::get(Arr::get($data,'params',[]),'model',null);
                $table = Arr::get(Arr::get($data,'params',[]),'table',null);
                $deploy = Arr::get(Arr::get($data,'params',[]),'deploy',null);
                $modelConf = Arr::get(Arr::get($data,'params',[]),'modelConf',null);
                if (!$model || !$table || !$deploy) {
                    throw new \Exception('Parametri mancanti');
                }
                $response = [
                    'msg' => $this->generate([
                        'model' => $model,
                        'table' => $table,
                        'deploy' => $deploy,
                        'modelConf' => $modelConf
                    ]),
                    'error' => 0,
                    'type' => 'out',
                    'command' => $action,
                ];
                $conn->send(json_encode($response));
                break;
            default:
                throw new \Exception( 'mysql service action non gestita ' . Arr::get($data,'action'));
        }
    }

    public static function getEnvVars() {
        return array_merge(parent::getEnvVars(),[
            'APPLICATION_PATH' => config('cup-gui-vue.application_path')
        ]);
    }


    public function getTables() {
        $tableList =  Schema::getAllTables();
        $tables = [];
        foreach ($tableList as $table) {
            $tableName = $table->{'Tables_in_' . env('DB_DATABASE')};
            $tables[] = [
              'name' =>  $tableName
            ];
        }
        return $tables;
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
        $jsFilename = config('cup-gui-vue.application_path') . '/ModelConfs/Model' . Str::studly($params['model']). '.js';
        $result = [
          'jsConf' => []
        ];
        if (file_exists($jsFilename)) {
            $jsParser = new JavaScriptConfigParser();
            $content = file_get_contents($jsFilename);
            echo $content;
            $jsParser->parse($content);

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
//        Artisan::call('cup:generate-implementation',$callParams,$output);
//        echo 'chiamo cup:generate-implementation';
//        print_r($callParams);
//        return $output->fetch();
    }
}


