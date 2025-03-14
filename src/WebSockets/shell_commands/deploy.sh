#!/bin/bash

### variabili da settare come env nel comando
#LARAVEL_DIR = directory applicazione laravel
#CRUD_DIR = directory main dell'interfaccia esempio resources/roma-vue-4.0.0
echo "LARAVEL_DIR $LARAVEL_DIR";
echo "PHP_BIN $PHP_BIN";

if [ -z "$1" ]
then
      echo "publish application"
      cd ..
      sh publish.sh
else
      #echo "\$1 command"
      case $1 in
         translate)
            echo "translate "
            cd $LARAVEL_DIR
            $PHP_BIN artisan translations
            echo "put translations in $APPLICATION_PATH/assets/"
            mv public/js/*-translations.json "$APPLICATION_PATH/assets/"
            ;;
         templates)
            echo "generating template"
            cd $CRUD_DIR
            echo "call sass application dir $CRUD_DIR"
            sass --update "$APPLICATION_PATH/public/layout/css"
            sass --update "$APPLICATION_PATH/public/theme"

#            sass --update public/layout:public/layout
#            sass --update public/theme:public/theme
#            sass --update "$APPLICATION_PATH/public/layout:public/layout/"
#            sass --update "$APPLICATION_PATH/public/theme:public/theme/"
            ;;
        publish)
            echo "publish application in $CRUD_DIR"
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


