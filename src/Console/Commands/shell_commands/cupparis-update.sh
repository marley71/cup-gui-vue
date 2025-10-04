echo "update cupparis-primevue in $APP_FOLDER il branch $CUPPARIS_BRANCH"
cd $APP_FOLDER/cupparis-primevue
git pull
git checkout $CUPPARIS_BRANCH
git pull
#cln -s "$APP_FOLDER/cupparis-primevue/src/dist_base" "$APP_FOLDER/cupparis-primevue/src/dist"

