<?php namespace  Marley71\CupSocketServer\WebSockets; ;

use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Log;
use Ratchet\ConnectionInterface;

abstract class ServiceInterface
{
    // Proprietà che sarà definita nelle classi concrete
    protected $prefix;
    protected $commands = [];
    protected $envVars = [];
    public function __construct()
    {
        $this->envVars = self::getEnvVars();
    }

    /**
     * Metodo astratto che deve essere implementato dalle classi concrete.
     *
     * @param string $action
     * @return mixed
     */
    public function do(array $data,ConnectionInterface $conn) {
        try {
            echo $this->prefix . ' ' . Arr::get($data, 'action');
            $action = Arr::get($data, 'action');
            switch ($action) {
                case 'info':
                    $conn->send(json_encode($this->dumpInfo()));
                    break;
                default:
                    $this->doAction($action,$data,$conn);
                    break;
            }
        } catch (\Exception $e) {
            Log::error($e);
            throw $e;
        }
    }


    abstract public function doAction(string $action,array $data,ConnectionInterface $conn);

    /**
     * Metodo per ottenere il prefisso.
     *
     * @return string
     */
    public function getPrefix(): string
    {
        return $this->prefix;
    }

    public function dumpInfo() {
        $output = 'Servizio ' . $this->prefix . "\n";

        $output .= $this->multi_explode($this->commands,"\n");
        $response = [
            'msg' => $output,
            'error' => 0,
            'type' => 'out',
            'command' => 'info',
            'command_list' => $this->commands,
            'service_name' => $this->prefix,
        ];
        return $response;
    }

    protected function multi_explode($array, $glue) {
        $ret = '';

        foreach ($array as $key => $item) {
            if (is_array($item)) {
                if (! is_numeric($key)) {
                    $ret .= $key . $glue;
                }
                $ret .= $this->multi_explode($item, $glue) . $glue;
            } else {
                if (is_numeric($key)) {
                    $ret .= $item . $glue;
                } else {
                    $ret .= $key . ' : ' . $item . $glue;
                }

            }
        }

        $ret = substr($ret, 0, 0-strlen($glue));

        return $ret;
    }

    public static function getEnvVars() {
        return [
            'LARAVEL_DIR' => base_path(),
            'CRUD_DIR' => config('cup-gui-vue.roma_path')
        ];
    }
}
