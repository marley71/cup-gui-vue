#!/bin/bash

### variabili da settare come env nel comando
#LARAVEL_DIR = directory laravel
#CLIENT_DIR = directory main dell'interfaccia esempio resources/roma-vue-4.0.0/src/crud

if [ -z "${CLIENT_DIR+x}" ]; then echo "CLIENT_DIR is unset"; exit; else echo "var is set to '$CLIENT_DIR'"; fi
echo "start gui in $CLIENT_DIR ...."
cd $CLIENT_DIR
npx vite
