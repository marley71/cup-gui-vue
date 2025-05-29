LARAVELDIR="$PWD/../../../"
CRUDIDR="$PWD/../src/crud/"
TRANSLATIONSDIR="resources/roma-vue-4.0.0/src/crud"
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
            cd $LARAVELDIR
            php artisan translations
            mv public/js/*-translations.json $TRANSLATIONSDIR
            ;;
         templates)
            echo "generating template"
            cd ../
            sass --update public/layout:public/layout
            sass --update public/theme:public/theme
            ;;
#         pattern3)
#            Statement(s) to be executed if pattern3 matches
#            ;;
         *)
           echo "($1) non trovato"
           ;;
      esac
fi


