<?php

namespace Marley71\CupSocketServer\Services;

use Illuminate\Support\Arr;

class JavaScriptConfigParser
{
    protected $config;
    protected $lastError;
    public function parse($content)
    {

        // Rimuovi i commenti
        $content = $this->removeComments($content);

        // Rimuovi "export default" e converti in JSON
        $jsonString = preg_replace('/export\s+default\s*/', '', $content);

        // Converti le funzioni in stringhe
        $jsonString = $this->convertFunctionsToStrings($jsonString);

        // Converti le chiavi in formato JSON
        $jsonString = preg_replace('/(\w+)\s*:/', '"$1":', $jsonString);

        // Converti le stringhe con apici singoli in doppie virgolette
        $jsonString = preg_replace('/\'([^\']+)\'/','\"$1\"', $jsonString);

        // Rimuovi le virgole finali
        $jsonString = $this->removeTrailingCommas($jsonString);

        echo "---------hhh---\n";
        echo $jsonString;
        echo "---------fine---\n";

        try {
            $this->config = json_decode($jsonString, true, 512, JSON_THROW_ON_ERROR);
            $this->lastError = null;
        } catch (\JsonException $e) {
            $this->config = null;
            $this->lastError = $e->getMessage();
            echo $e->getLine() . " " .  $e->getMessage() . "\n";
            echo $e->getTraceAsString();
        }

        return $this;
//
//        $content = $this->removeComments($content);
//        // Rimuovi "export default" e converti in JSON
//        $jsonString = preg_replace('/export\s+default\s*/', '', $content);
//
//        // Converti le funzioni in stringhe
//        $jsonString = $this->convertFunctionsToStrings($jsonString);
//
//        // Converti le chiavi in formato JSON
//        $jsonString = preg_replace('/(\w+)\s*:/', '"$1":', $jsonString);
//        // Converti le stringhe con apici singoli in doppie virgolette
//        $jsonString = preg_replace('/\'([^\']+)\'/', '\"$1\"', $jsonString);
//        //$jsonString = preg_replace('/\'([^\']+)\'/', '"$1"', $jsonString);
//        //echo $jsonString;
//        // Converti le funzioni in stringhe
//        $jsonString = preg_replace('/:\s*function\s*\([^\)]*\)\s*{[^}]*}/', ':"[Function]"', $jsonString);
//        $jsonString = preg_replace('/(\w+)\s*\([^\)]*\)\s*{[^}]*}/', '"$1":"[Function]"', $jsonString);
//
//        // Rimuovi la virgola finale
//        $jsonString = $this->removeTrailingCommas($jsonString);
//        echo "---------hhh---\n";
//        echo $jsonString;
//        echo "---------fine---\n";
//        try {
//            $this->config = json_decode($jsonString, true, 512, JSON_THROW_ON_ERROR);
//            $this->lastError = null;
//        } catch (\JsonException $e) {
//            $this->config = null;
//            echo $e->getLine() . " " .  $e->getMessage() . "\n";
//            echo $e->getTraceAsString();
//        }
//        return $this;
    }

    public function getModelName()
    {
        return $this->config['modelName'] ?? null;
    }

    public function getSearchConfig()
    {
        return $this->config['search'] ?? [];
    }

    public function getViewConfig()
    {
        return $this->config['view'] ?? [];
    }

    public function getListConfig()
    {
        return $this->config['list'] ?? [];
    }

    public function getEditConfig()
    {
        return $this->config['edit'] ?? [];
    }

    public function getListEditConfig()
    {
        return $this->config['listEdit'] ?? [];
    }

    public function getFields($section)
    {
        return $this->config[$section]['fields'] ?? [];
    }

    public function getActions($section)
    {
        return $this->config[$section]['actions'] ?? [];
    }

    public function getFieldsConfig($section)
    {
        return $this->config[$section]['fieldsConfig'] ?? [];
    }

    public function getActionsConfig($section)
    {
        return $this->config[$section]['actionsConfig'] ?? [];
    }

    public function getMethods($section)
    {
        return $this->config[$section]['methods'] ?? [];
    }

    public function getType($section)
    {
        return $this->config[$section]['type'] ?? null;
    }

    public function getAllConfig()
    {
        return $this->config;
    }

    protected function removeTrailingCommas($json)
    {
        $json = preg_replace('/,(\s*[\]}])/m', '$1', $json);
        return $json;
    }

    protected function removeComments($content)
    {
        // Rimuovi commenti su una singola riga
        $content = preg_replace('/\/\/.*$/m', '', $content);

        // Rimuovi commenti multi-riga
        $content = preg_replace('/\/\*[\s\S]*?\*\//', '', $content);

        return $content;
    }

    protected function convertFunctionsToStrings($content)
    {
        // Gestisce sia la sintassi delle funzioni tradizionali che quella più recente
        $pattern = '/
            ([\w\s]+:)?\s*                 # Cattura opzionale del nome della funzione seguito da ":"
            (function\s*)?                 # "function" keyword opzionale
            (\([^\)]*\))                   # Parametri della funzione
            \s*{                           # Apertura parentesi graffe
            ((?:[^{}]+|(?R))*)             # Corpo della funzione (ricorsivo per gestire funzioni annidate)
            }
        /x';

        return preg_replace_callback($pattern, function($matches) {
            $functionName = trim($matches[1] ?? '');
            $functionName = rtrim($functionName, ':');

            if ($functionName) {
                return "\"$functionName\": \"[Function]\"";
            } else {
                return "\"[Function]\"";
            }
        }, $content);
    }
}
