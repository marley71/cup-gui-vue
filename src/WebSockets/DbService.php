<?php namespace Marley71\CupSocketServer\WebSockets;

use Illuminate\Support\Arr;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Process;
use Illuminate\Support\Facades\Schema;
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
            case 'check':
                $response = [
                    'msg' => [
                        'Modello' => false,
                        'ServerConf' => true,
                        'ClientConf' => true,
                        'Policy' => false,
                        'Foorm' => false,
                    ],
                    'error' => 0,
                    'type' => 'out',
                    'command' => $action,
                ];
                $conn->send(json_encode($response));
                break;
            case 'generate':
                $modello = Arr::get(Arr::get($data,'params',[]),'model',null);
                $tabella = Arr::get(Arr::get($data,'params',[]),'table',null);
                $deploy = Arr::get(Arr::get($data,'params',[]),'deploy',null);
                if (!$modello || !$tabella || !$deploy) {
                    throw new \Exception('Parametri mancanti');
                }
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

    public function getFields($tableName) {
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

}



/**
 * namespace App\Console\Commands;
 *
 * use Illuminate\Console\Command;
 * use Illuminate\Support\Facades\DB;
 * use Illuminate\Support\Facades\Schema;
 *
 * class AnalyzeDatabase extends Command
 * {
 * protected $signature = 'db:analyze';
 * protected $description = 'Analyze database structure and relationships';
 *
 * public function handle()
 * {
 * $tables = [];
 * $dbName = config('database.connections.mysql.database');
 *
 * // Ottieni la lista di tutte le tabelle
 * $tableList = Schema::getAllTables();
 *
 * foreach ($tableList as $table) {
 * $tableName = $table->Tables_in_database;
 * $tables[$tableName] = [
 * 'fields' => [],
 * 'relations' => []
 * ];
 *
 * // Ottieni informazioni sui campi della tabella
 * $columns = Schema::getColumnListing($tableName);
 * foreach ($columns as $column) {
 * $type = Schema::getColumnType($tableName, $column);
 * $tables[$tableName]['fields'][] = [
 * 'name' => $column,
 * 'type' => $type,
 * ];
 * }
 *
 * // Ottieni informazioni sulle relazioni (chiavi esterne)
 * $relations = DB::select("
 * SELECT
 * COLUMN_NAME,
 * REFERENCED_TABLE_NAME,
 * REFERENCED_COLUMN_NAME
 * FROM
 * INFORMATION_SCHEMA.KEY_COLUMN_USAGE
 * WHERE
 * TABLE_SCHEMA = ? AND
 * TABLE_NAME = ? AND
 * REFERENCED_TABLE_NAME IS NOT NULL
 * ", [$dbName, $tableName]);
 *
 * foreach ($relations as $relation) {
 * $tables[$tableName]['relations'][] = [
 * 'column' => $relation->COLUMN_NAME,
 * 'referenced_table' => $relation->REFERENCED_TABLE_NAME,
 * 'referenced_column' => $relation->REFERENCED_COLUMN_NAME
 * ];
 * }
 * }
 *
 * // Stampa le informazioni
 * foreach ($tables as $tableName => $tableInfo) {
 * $this->info("Tabella: $tableName");
 * $this->line("Campi:");
 * foreach ($tableInfo['fields'] as $field) {
 * $this->line("  - {$field['name']} ({$field['type']})");
 * }
 * $this->line("Relazioni:");
 * foreach ($tableInfo['relations'] as $relation) {
 * $this->line("  - {$relation['column']} -> {$relation['referenced_table']}.{$relation['referenced_column']}");
 * }
 * $this->line("");
 * }
 * }
 * }
 *
 *
 */


