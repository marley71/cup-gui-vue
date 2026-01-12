TARGET="../cupparis-primevue/htmlhelp"   # dove punta il link
LINK="htmlhelp"     # nome del link simbolico
cd $APP_FOLDER/public
# Se il link simbolico NON esiste, lo crea
if [ ! -L "$LINK" ]; then
    echo "Creo link simbolico: $LINK -> $TARGET"
    ln -s "$TARGET" "$LINK"
else
    echo "Link simbolico già esistente: $LINK"
fi