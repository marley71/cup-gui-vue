import { fileURLToPath, URL } from 'node:url';

import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import copy from 'rollup-plugin-copy';
import path from 'path';
import fs from 'fs';

// https://vitejs.dev/config/



export default defineConfig(({ command }) => {
    let mode = command == 'build' ? 'production' : 'dev';
    const env = loadEnv(mode, process.cwd(), '')
    console.log('command', command);
    console.log('env', env);
    let https = null;
    if (env.APP_CERT_PATH) {
        https =  {
            key: fs.readFileSync(path.resolve(__dirname, env.APP_CERT_PATH + '/key.pem')),
            cert: fs.readFileSync(path.resolve(__dirname, env.APP_CERT_PATH + '/cert.pem')),
        }
    };
    return {
        plugins: [
            vue(),
            copy({
                targets: [
                    //{ src: env.APP_RESOURCES_PATH + '/assets/*', dest: 'dist/assets' }, // Copia tutto in /external-assets nella cartella /dist/assets
                    // { src: env.APP_RESOURCES_PATH + '/public/layout/*', dest: 'public/layout' },
                    // { src: env.APP_RESOURCES_PATH + '/public/theme/*', dest: 'public/theme' }
                ],
                hook: 'writeBundle', // Esegui il copy durante il writeBundle,
                //hook: 'transform', // Esegui il copy durante il writeBundle,
            })
        ],
        base: command === 'serve' ? '' : '/roma-vue/',
        resolve: {
            alias: {
                '@' : path.resolve(__dirname, './src'),
                '@cupparis-lib' : path.resolve(__dirname, './cupparis-primevue/src'),
                '@templates' : path.resolve(__dirname, './cupparis-primevue/src/templates'),
            },
            dedupe: [
                'vue'
            ]
        },
        server: {
            host: '0.0.0.0',
            hot: true,
            port: env.APP_PORT,
            allowedHosts : [env.APP_DOMAIN],
            https : https,
            watch: {
                usePolling: true,
                //ignored: ['@external/ModelConfs',env.APP_RESOURCES_PATH + '/ModelConfs']
            },
            fs: {
                allow: [
                    '.', // Permetti la directory del progetto
                    //path.resolve(__dirname, env.APP_RESOURCES_PATH),
                    //path.resolve(__dirname,'/home/vagrant/workspace/newgit/cupparis10/resources/roma-vue-4.0.0'),

                ]
            },
            proxy: {
                '/api': {
                    target: env.APP_TARGET,
                    changeOrigin: true,
                    secure: false,
                    ws: true,
                    rewrite: (path) => {
                        path = path.replace(/^\/api/, 'api');
                        console.log('path ', path);
                        return path;
                    },
                },
            },
        },
        rollupOptions: {
            external: [env.APP_RESOURCES_PATH], // Specifica qui la libreria da esternalizzare
            output: {
                globals: {
                    jquery: 'window.$',
                },
            },
        },
        css: {
            preprocessorOptions: {
                scss : {
                    api : "modern",
                    quietDeps : true,
                    //additionalData : `import('@/src/styles.scss');`,
                }
            }
        }
    };
});
