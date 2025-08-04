import cs from 'cupparis-primevue';
//import ModelUser from './ModelConfs/ModelUser';
//import ModelUser3 from './ModelConfs/ModelUser3';
import appLang from './assets/it-translations.json';
import models from './config/models.json';
import "./ModelConfs";
import customComponents from "./components";
import viewsConfs from './config/index'

export default {
    install(app, callback) {
        console.debug('CrudVars',cs.CrudVars)
        cs.CrudVars.lang = Object.assign(cs.CrudVars.lang, appLang);
        customComponents.install(app);
        let viewConfs = this.setDefaultModelConfs(cs.CrudVars.viewConfs);
        cs.CrudVars.viewConfs = viewConfs;
        //throw "errore";
        callback();
    },
    /**
     * configurazioni generali delle viste base,record,list, dei modelli
     * @param modelConfs
     * @returns {*}
     */
    setDefaultModelConfs(modelConfs) {
        modelConfs = viewsConfs.install(modelConfs);
        return modelConfs;
    }
}
