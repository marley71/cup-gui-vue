#!/bin/bash

### variabili da settare come env nel comando
#LARAVEL_DIR = directory applicazione laravel
#CRUD_DIR = directory main dell'interfaccia esempio resources/roma-vue-4.0.0

if [ -z "$1" ]
then
      echo "publish application"
      cd ..
      sh publish.sh
else
      #echo "\$1 command"
      case $1 in
         translate)
            echo "translate"
            cd $LARAVEL_DIR
            php artisan translations
            mv public/js/*-translations.json "$CRUD_DIR/src/crud"
            ;;
         templates)
            echo "generating template"
            cd $CRUD_DIR
            sass --update public/layout:public/layout
            sass --update public/theme:public/theme
            ;;
        publish)
            echo "publish application"
            cd $CRUD_DIR
            sh publish.sh
            ;;
#         pattern3)
#            Statement(s) to be executed if pattern3 matches
#            ;;
         *)
           echo "($1) non trovato"
           ;;
      esac
fi


