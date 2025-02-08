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
                'description' => 'Salvataggio configurazione template',
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
            switch (Arr::get($data,'action')) {
                case 'publish':
                case 'translate':
                case 'templates':
                    $shell_command = dirname(__FILE__) . '/shell_commands/deploy.sh';
                    $shell_param = $data['action'];
                    $result = Process::forever()->env($this->envVars)
                        ->run('bash ' . "$shell_command $shell_param", function (string $type, string $output) use ($conn) {
                            //echo $output;
                            $response = [
                                'msg' => $output,
                                'error' => $type == 'out'?0:1,
                                'type' => $type,
                                'command' => 'publish',
                            ];
                            $conn->send(json_encode($response));
                        });
                    $response = [
                        'msg' => 'command publish exit code ' . $result->exitCode(),
                        'error' => 0,
                    ];
                    $conn->send(json_encode($response));
                    //var_dump($result);
                    break;
                case 'save-config':
                    $config = Arr::get(Arr::get($data,'params',[]),'config',[]);
                    Log::info('config ');
                    Log::info(print_r($config,true));
                    $guiFolder = base_path(env('VUEAPP_FOLDER','resources/roma-vue-4.0.0'));
                    file_put_contents($guiFolder.'/src/data/template-config.json',json_encode($config,JSON_PRETTY_PRINT));
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
}


