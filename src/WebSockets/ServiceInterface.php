<?php namespace  Marley71\CupSocketServer\WebSockets; ;

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
    abstract public function do(array $data,ConnectionInterface $conn);

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

        foreach ($array as $item) {
            if (is_array($item)) {
                $ret .= $this->multi_explode($item, $glue) . $glue;
            } else {
                $ret .= $item . $glue;
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
