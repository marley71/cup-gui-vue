import { createApp } from 'vue';
import { createPinia } from 'pinia'
import App from "./application/App.vue";
import "@fortawesome/fontawesome-free/css/all.css"
import "@/rome-vue-v4.0.0/styles.scss"
import CrudInit from './rome-vue-v4.0.0/crud/CrudInit.js';
import cs from "cupparis-primevue";
import router from "./rome-vue-v4.0.0/router";
import {appStatus} from "./application/stores/appStatus";
import application from "./application";

const app = createApp(App);
const pinia = createPinia();
app.use(pinia);
app.use(router);

function mountApp(error) {
    app.mount('#app');
    if (error) {
        router.push('/error');
    }
}

CrudInit.install(app).then(function () {
    cs.install(app);
    CrudInit.loadMenu().then(function() {
        console.debug('installo applicazione ... ')
        application.install(app,function (result) {
            console.debug('result',result);
            console.debug('modelConfs caricati',cs.CrudVars.modelConfs)
            mountApp();
        })
    }).catch(error => {
        console.error('Caricamento menu applicazione fallito',error);
        const appStatusInstance = appStatus();
        appStatusInstance.setError('Caricamento menu applicazione fallito',error.message);
        mountApp(true);
        console.error(error);
    })
})



// app.mount('#app');
// router.push('/');
