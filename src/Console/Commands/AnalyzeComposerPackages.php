<?php namespace Marley71\CupSocketServer\Console\Commands;



use Illuminate\Console\Command;
use Illuminate\Support\Facades\File;

class AnalyzeComposerPackages extends Command
{
    protected $signature = 'cup:composer-analyze';
    protected $description = 'Analyze installed packages from composer.json';

    public function handle()
    {
        $composerPath = base_path('composer.json');

        if (!File::exists($composerPath)) {
            $this->error('composer.json file not found!');
            return 1;
        }

        $composerContent = File::get($composerPath);
        $composerData = json_decode($composerContent, true);

        if (json_last_error() !== JSON_ERROR_NONE) {
            $this->error('Error parsing composer.json: ' . json_last_error_msg());
            return 1;
        }

        $this->info('Analyzing composer.json...');
        $this->line('');

        $this->analyzeRequire($composerData['require'] ?? []);
        $this->analyzeRequireDev($composerData['require-dev'] ?? []);

        return 0;
    }

    private function analyzeRequire($packages)
    {
        $this->info('Production Packages:');
        $this->displayPackages($packages);
    }

    private function analyzeRequireDev($packages)
    {
        $this->info('Development Packages:');
        $this->displayPackages($packages);
    }

    private function displayPackages($packages)
    {
        if (empty($packages)) {
            $this->warn('  No packages found.');
            return;
        }

        foreach ($packages as $package => $version) {
            $this->line("  - $package: $version");
        }
        $this->line('');
    }
}
