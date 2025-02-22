<?php namespace Marley71\CupSocketServer\Console\Commands;

use Illuminate\Console\Command;
use App\Services\ClassGenerator;

class GenerateImplementation extends Command
{
    protected $signature = 'cup:generate-implementation {table} {model} {--exclude=}';
    protected $description = 'Genera l\'implementazione del model,policy,js-conf,foorm-conf,foorm-classes';

    public function handle()
    {
        $className = $this->argument('name');
        $namespace = 'App\\CustomClasses';
        $outputPath = app_path('CustomClasses/' . $className . '.php');

        $params = [
            'namespace' => $namespace,
            'className' => $className,
            'properties' => "private \$exampleProperty;\n",
            'constructor' => "\$this->exampleProperty = 'Hello World';\n",
            'methods' => "public function getExampleProperty()\n    {\n        return \$this->exampleProperty;\n    }\n",
        ];

        $generator = new ClassGenerator(
            resource_path('stubs/class_template.stub'),
            $params,
            $outputPath
        );

        if ($generator->generate()) {
            $this->info("Class {$className} generated successfully!");
        } else {
            $this->error("Failed to generate class {$className}.");
        }
    }
}
