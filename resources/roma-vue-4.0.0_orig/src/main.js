import { createApp } from 'vue';
import { createPinia } from 'pinia'

import App from './App.vue';
import "@fortawesome/fontawesome-free/css/all.css"
import CrudInit from './crud/CrudInit.js';
import cupparisPrimevue from "cupparis-primevue";
import InsertEditUser from "@/views/pages/tests2/components/InsertEditUser.vue";
import ListUser from "@/views/pages/tests2/components/ListUser.vue";
import ActionSelect from "@/views/pages/tests2/components/ActionSelect.vue";
import ManageCustomEdit from "./views/pages/tests2/components/ManageCustomEdit.vue";
import ManageCustomComponent from "./views/pages/tests2/components/ManageCustomComponent.vue";
import cs from "cupparis-primevue";
import router from "./router";
import {appStatus} from "./stores/appStatus";

const app = createApp(App);
const pinia = createPinia();
app.use(pinia);

function mountApp(error) {
    app.component('insert-edit-user',InsertEditUser)
    app.component('ListUser',ListUser)
    app.component('ManageCustomEdit',ManageCustomEdit)
    app.component('ManageCustomComponent',ManageCustomComponent)
    app.component('ActionSelect',ActionSelect)
    app.mount('#app');
    if (error) {
        router.push('/error');
    }
}

//CrudInit.sakaiInit(app);
CrudInit.install(app).then(function () {
    cupparisPrimevue.install(app);
    CrudInit.loadMenu().then(function() {
        console.debug('installo applicazione ... ')
        import(/* @vite-ignore */'@external/application.js')
            .then((appModule) => {
                // Usa il modulo qui
                console.log(appModule);
                appModule.default.install(app,function (result) {
                    console.debug('result',result);
                    console.debug('modelConfs caricati',cs.CrudVars.modelConfs)
                    mountApp();
                })
            })
            .catch((error) => {
                const appStatusInstance = appStatus();
                console.error('Caricamento modulo application fallito.', error);
                appStatusInstance.setError('Caricamento modulo application fallito.',error.message);
                mountApp(true);
            });
    }).catch(error => {
        console.error('Caricamento menu applicazione fallito',error);
        const appStatusInstance = appStatus();
        appStatusInstance.setError('Caricamento menu applicazione fallito',error.message);
        mountApp(true);
        console.error(error);
    })
})
