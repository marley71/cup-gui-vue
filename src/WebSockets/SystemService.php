<?php namespace Marley71\CupSocketServer\WebSockets;

use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Process;
use Ratchet\ConnectionInterface;

class SystemService extends ServiceInterface
{
    public function __construct()
    {
        parent::__construct();
        $this->envVars = [];
        $this->prefix = 'system';
        $this->commands = [
            [
                'command' => 'publish',
                'description' => 'Pubblica l\'interfaccia nel modulo web da importare',
                'params' => [],
            ],
            [
                'command' => 'translate',
                'description' => 'Aggiorna le traduzioni',
                'params' => [],
            ],
            [
                'command' => 'templates',
                'description' => 'Compilazione sass template e layout',
                'params' => [],
            ],
            [
                'command' => 'save-config',
                'description' => 'Salvataggio impostazioni template',
                'params' => [
                    'config' => 'json',
                ],
            ],
        ];
    }

    /**
     * Implementazione del metodo astratto do.
     *
     * @param string $action
     * @return void
     */
    public function do(array $data,ConnectionInterface $conn)
    {
        try {
            echo $this->prefix . ' ' . Arr::get($data,'action');
            $action = Arr::get($data,'action');
            switch ($action) {
                case 'publish':
                case 'translate':
                case 'templates':
                    $shell_command = dirname(__FILE__) . '/shell_commands/deploy.sh';
                    $shell_param = $action;
                    echo "command " . $shell_command .  " shell param " . $shell_param;
                    $result = Process::forever()->env(self::getEnvVars())
                        ->run('bash ' . "$shell_command $shell_param", function (string $type, string $output) use ($conn,$action) {
                            //echo $output;
                            $response = [
                                'msg' => $output,
                                'error' => $type == 'out'?0:1,
                                'type' => $type,
                                'command' => $action,
                            ];
                            $conn->send(json_encode($response));
                        });
                    $response = [
                        'msg' => "command $action exit code " . $result->exitCode(),
                        'type' => 'end',
                        'command' => $action,
                        'error' => 0,
                    ];
                    $conn->send(json_encode($response));


//                $conn->send(json_encode([
//                        'msg' => 'Ok',
//                        'error' => 0,
//                        'type' => 'finish',
//                        'command' => $action,
//                    ]));
                    //var_dump($result);
                    break;
                case 'save-config':
                    $config = Arr::get(Arr::get($data,'params',[]),'config',[]);
                    Log::info('config ');
                    Log::info(print_r($config,true));
                    $guiFolder = config('cup-gui-vue.application_path');
                    file_put_contents($guiFolder.'/config/template-config.json',json_encode($config,JSON_PRETTY_PRINT));
                    break;
                case 'info':
                    $conn->send(json_encode($this->dumpInfo()));
                    break;
                default:
                    throw new \Exception( 'system service action non gestita ' . Arr::get($data,'action'));
            }
        } catch (\Exception $e) {
            Log::error($e);
            throw $e;
        }

    }

    public static function getEnvVars() {
        return array_merge(parent::getEnvVars(),[
            'APPLICATION_PATH' => config('cup-gui-vue.application_path')
        ]);
    }
}


