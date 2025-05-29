import axios from "axios";
//import mitt from 'mitt'
import VueAxios from 'vue-axios'
import jQuery from 'jquery'
//import ModelConfs from "../ModelConfs";
import ModelConfs from '@/data/modelsConfs/app/'
import appLang from './it-translations.json';
import cupparisPrimevue from 'cupparis-primevue';
//import router from "../router";
import '@/styles.scss';
import '@external/src/assets/styles.scss';

import RoutesConfs from "./RoutesConfs";
import PrimeVueSetup from "./PrimeVueSetup";

export default {
    install(app) {
        let that = this;
        return new Promise(function(resolve, reject) {
            // do a thing, possibly async, then…
            try {
                cupparisPrimevue.CrudVars.lang = Object.assign(cupparisPrimevue.CrudVars.lang, appLang);
                cupparisPrimevue.CrudVars.useApi = import.meta.env.VITE_APP_USE_API?true:false;
                app.provide('store', cupparisPrimevue.CrudVars)
                app.config.globalProperties.$app = app;
                app.use(VueAxios, axios);

// --- configurazioni iniziali ----
                ModelConfs.install(app);
                PrimeVueSetup.setup(app);
                //crudSakai.install(app);
                RoutesConfs.install(app);
                //ViewConfs.install();

                console.log('appLang', appLang);

                window.app = app;
                window.$ = jQuery;
                window.jQuery = jQuery;

                axios.get(import.meta.env.VITE_APP_DINAMIC_CONF,{}).then((response) => {
                    console.log('response', response);
                    that.setEnv(response.data.result);
                    resolve("Stuff worked!");
                }).catch((error) => {
                    console.log('error', error);
                    resolve("Stuff worked!");
                })
            } catch (e) {
                console.error(e);
                reject(Error("It broke"));
            }
        });
    },

    setEnv(env) {
        for (let k in env) {
            cupparisPrimevue.CrudVars.env[k] = env[k];
        }
    },
    loadMenu() {
        let that = this;
        return new Promise(function(resolve, reject) {
            cupparisPrimevue.Server.get(import.meta.env.VITE_API_MENU,{},function(response) {
                if (response.error) {
                    that.setEnv({appMenu : []});
                    resolve(response.msg);
                    return ;
                }
                that.setEnv({appMenu : response});
                resolve("Stuff worked!");
            })
        })
    },
}
