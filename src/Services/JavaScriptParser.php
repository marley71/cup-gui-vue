<?php

namespace Marley71\CupSocketServer\Services;

use Illuminate\Support\Arr;

class JavaScriptParser
{
    public function parse($fileContent)
    {
        $parsedData = [];

        // Estrazione delle informazioni principali
        if (preg_match("/modelName\s*:\s*'(\w+)'/", $fileContent, $modelNameMatch)) {
            $parsedData['modelName'] = $modelNameMatch[1];
        } else {
            echo "Model name not found.\n";
        }

        // Estrazione delle informazioni della lista
        if (preg_match("/list\s*:\s*{\s*([\s\S]+?)\s*}/", $fileContent, $listMatch)) {
            $parsedData['list'] = $this->parseListSection($listMatch[1]);
        } else {
            echo "List section not found.\n";
        }

        // Estrazione delle informazioni di ricerca
        if (preg_match("/search\s*:\s*{\s*([\s\S]+?)\s*}/", $fileContent, $searchMatch)) {
            $parsedData['search'] = $this->parseSearchSection($searchMatch[1]);
        } else {
            echo "Search section not found.\n";
        }

        // Estrazione delle informazioni di modifica
        if (preg_match("/edit\s*:\s*{\s*([\s\S]+?)\s*}/", $fileContent, $editMatch)) {
            $parsedData['edit'] = $this->parseEditSection($editMatch[1]);
        } else {
            echo "Edit section not found.\n";
        }

        return $parsedData;
    }

    private function parseListSection($listContent)
    {
        $listData = [];

        // Estrazione del tipo di lista
        if (preg_match("/type\s*:\s*'(\w+)'/", $listContent, $typeMatch)) {
            $listData['type'] = $typeMatch[1];
        } else {
            echo "List type not found.\n";
        }

        // Estrazione delle azioni
        if (preg_match("/actions\s*:\s*\[(.*?)\]/s", $listContent, $actionsMatch)) {
            $listData['actions'] = array_map('trim', explode(',', $actionsMatch[1]));
            $listData['actions'] = array_map(function ($action) {
                return str_replace("'", '', $action);
            }, $listData['actions']);
        } else {
            echo "Actions not found.\n";
        }

        // Estrazione delle configurazioni delle azioni
        if (preg_match("/actionsConfig\s*:\s*{\s*([\s\S]+?)\s*}/", $listContent, $actionsConfigMatch)) {
            $listData['actionsConfig'] = $this->parseActionsConfig($actionsConfigMatch[1]);
        } else {
            echo "Actions config not found.\n";
        }

        // Estrazione dei campi
        if (preg_match("/fields\s*:\s*\[(.*?)\]/s", $listContent, $fieldsMatch)) {
            $listData['fields'] = array_map('trim', explode(',', $fieldsMatch[1]));
            $listData['fields'] = array_map(function ($field) {
                return str_replace("'", '', $field);
            }, $listData['fields']);
        } else {
            echo "Fields not found.\n";
        }

        // Estrazione delle configurazioni dei campi
        if (preg_match("/fieldsConfig\s*:\s*{\s*([\s\S]+?)\s*}/", $listContent, $fieldsConfigMatch)) {
            $listData['fieldsConfig'] = $this->parseFieldsConfig($fieldsConfigMatch[1]);
        } else {
            echo "Fields config not found.\n";
        }

        return $listData;
    }

    private function parseActionsConfig($actionsConfigContent)
    {
        $actionsConfig = [];
        if (preg_match_all("/'(\w+)'\s*:\s*{[\s\S]+?}/", $actionsConfigContent, $actionConfigs)) {
            foreach ($actionConfigs[1] as $actionName) {
                $actionsConfig[$actionName] = [];

                // Estrazione delle proprietà dell'azione
                if (preg_match("/type\s*:\s*'(\w+)'/", $actionsConfigContent, $typeMatch)) {
                    $actionsConfig[$actionName]['type'] = $typeMatch[1];
                }

                if (preg_match("/controlType\s*:\s*'(\w+)'/", $actionsConfigContent, $controlTypeMatch)) {
                    $actionsConfig[$actionName]['controlType'] = $controlTypeMatch[1];
                }

                if (preg_match("/href\s*:\s*function\s*\(\)\s*{[\s\S]+?}/", $actionsConfigContent, $hrefMatch)) {
                    $actionsConfig[$actionName]['href'] = $hrefMatch[0];
                }

                if (preg_match("/text\s*:\s*'([\s\S]+?)'/", $actionsConfigContent, $textMatch)) {
                    $actionsConfig[$actionName]['text'] = $textMatch[1];
                }

                if (preg_match("/execute\s*:\s*function\s*\(\)\s*{[\s\S]+?}/", $actionsConfigContent, $executeMatch)) {
                    $actionsConfig[$actionName]['execute'] = $executeMatch[0];
                }

                if (preg_match("/visible\s*:\s*function\s*\(\)\s*{[\s\S]+?}/", $actionsConfigContent, $visibleMatch)) {
                    $actionsConfig[$actionName]['visible'] = $visibleMatch[0];
                }
            }
        } else {
            echo "No action configs found.\n";
        }

        return $actionsConfig;
    }

    private function parseFieldsConfig($fieldsConfigContent)
    {
        $fieldsConfig = [];
        if (preg_match_all("/'(\w+)'\s*:\s*{[\s\S]+?}/", $fieldsConfigContent, $fieldConfigs)) {
            foreach ($fieldConfigs[1] as $fieldName) {
                $fieldsConfig[$fieldName] = [];

                // Estrazione delle proprietà del campo
                if (preg_match("/type\s*:\s*'(\w+)'/", $fieldsConfigContent, $typeMatch)) {
                    $fieldsConfig[$fieldName]['type'] = $typeMatch[1];
                }

                if (preg_match("/label\s*:\s*'([\s\S]+?)'/", $fieldsConfigContent, $labelMatch)) {
                    $fieldsConfig[$fieldName]['label'] = $labelMatch[1];
                }

                if (preg_match("/ready\s*:\s*function\s*\(\)\s*{[\s\S]+?}/", $fieldsConfigContent, $readyMatch)) {
                    $fieldsConfig[$fieldName]['ready'] = $readyMatch[0];
                }

                if (preg_match("/href\s*:\s*function\s*\(\)\s*{[\s\S]+?}/", $fieldsConfigContent, $hrefMatch)) {
                    $fieldsConfig[$fieldName]['href'] = $hrefMatch[0];
                }

                if (preg_match("/change\s*:\s*function\s*\(\)\s*{[\s\S]+?}/", $fieldsConfigContent, $changeMatch)) {
                    $fieldsConfig[$fieldName]['change'] = $changeMatch[0];
                }

                if (preg_match("/disabled\s*:\s*function\s*\(\)\s*{[\s\S]+?}/", $fieldsConfigContent, $disabledMatch)) {
                    $fieldsConfig[$fieldName]['disabled'] = $disabledMatch[0];
                }
            }
        } else {
            echo "No field configs found.\n";
        }

        return $fieldsConfig;
    }

    private function parseSearchSection($searchContent)
    {
        $searchData = [];

        // Estrazione del tipo di ricerca
        if (preg_match("/type\s*:\s*'(\w+)'/", $searchContent, $typeMatch)) {
            $searchData['type'] = $typeMatch[1];
        } else {
            echo "Search type not found.\n";
        }

        // Estrazione delle azioni
        if (preg_match("/actions\s*:\s*\[(.*?)\]/s", $searchContent, $actionsMatch)) {
            $searchData['actions'] = array_map('trim', explode(',', $actionsMatch[1]));
            $searchData['actions'] = array_map(function ($action) {
                return str_replace("'", '', $action);
            }, $searchData['actions']);
        } else {
            echo "Search actions not found.\n";
        }

        // Estrazione delle configurazioni delle azioni
        if (preg_match("/actionsConfig\s*:\s*{\s*([\s\S]+?)\s*}/", $searchContent, $actionsConfigMatch)) {
            $searchData['actionsConfig'] = $this->parseActionsConfig($actionsConfigMatch[1]);
        } else {
            echo "Search actions config not found.\n";
        }

        // Estrazione dei campi
        if (preg_match("/fields\s*:\s*\[(.*?)\]/s", $searchContent, $fieldsMatch)) {
            $searchData['fields'] = array_map('trim', explode(',', $fieldsMatch[1]));
            $searchData['fields'] = array_map(function ($field) {
                return str_replace("'", '', $field);
            }, $searchData['fields']);
        } else {
            echo "Search fields not found.\n";
        }

        // Estrazione delle configurazioni dei campi
        if (preg_match("/fieldsConfig\s*:\s*{\s*([\s\S]+?)\s*}/", $searchContent, $fieldsConfigMatch)) {
            $searchData['fieldsConfig'] = $this->parseFieldsConfig($fieldsConfigMatch[1]);
        } else {
            echo "Search fields config not found.\n";
        }

        return $searchData;
    }

    private function parseEditSection($editContent)
    {
        $editData = [];

        // Estrazione del tipo di modifica
        if (preg_match("/type\s*:\s*'(\w+)'/", $editContent, $typeMatch)) {
            $editData['type'] = $typeMatch[1];
        } else {
            echo "Edit type not found.\n";
        }

        // Estrazione del nome del modello
        if (preg_match("/modelName\s*:\s*'(\w+)'/", $editContent, $modelNameMatch)) {
            $editData['modelName'] = $modelNameMatch[1];
        } else {
            echo "Edit model name not found.\n";
        }

        return $editData;
    }
}
