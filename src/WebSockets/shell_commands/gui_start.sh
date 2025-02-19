#!/bin/bash

### variabili da settare come env nel comando
#LARAVEL_DIR = directory laravel
#CRUD_DIR = directory main dell'interfaccia esempio resources/roma-vue-4.0.0/src/crud

if [ -z "${CRUD_DIR+x}" ]; then echo "CRUD_DIR is unset"; exit; else echo "var is set to '$CRUD_DIR'"; fi
echo "start gui in $CRUD_DIR ...."
cd $CRUD_DIR
npx vite
