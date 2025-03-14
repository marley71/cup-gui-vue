<?php

namespace Marley71\CupSocketServer\Services;

use Illuminate\Support\Facades\File;
use Illuminate\Support\Str;

class CodeGenerator
{
    private $template;
    private $params;
    private $outputPath;

    public function __construct(string $templatePath, array $params, string $outputPath)
    {
        $this->template = File::get($templatePath);
        $this->params = $params;
        $this->outputPath = $outputPath;
    }

    public function generate(): bool
    {
        $classContent = $this->replaceParams($this->template, $this->params);
        return File::put($this->outputPath, $classContent) !== false;
    }

    private function replaceParams(string $template, array $params): string
    {
        foreach ($params as $key => $value) {
            $template = str_replace("{{" . $key . "}}", $value, $template);
        }
        return $template;
    }
}
