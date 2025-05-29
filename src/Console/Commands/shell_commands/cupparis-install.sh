echo "installo cupparis-primevue in $APP_FOLDER dal repository $CUPPARIS_GIT il branch $CUPPARIS_BRANCH"
cd $APP_FOLDER
git clone $CUPPARIS_GIT
cd cupparis-primevue
git pull
git checkout $CUPPARIS_BRANCH

