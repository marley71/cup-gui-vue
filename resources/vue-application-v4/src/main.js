
import './primeblocks4/style.css'
import { createApp } from 'vue';
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import App from './application/App.vue'
import PrimeVue from 'primevue/config';
import "@fortawesome/fontawesome-free/css/all.css"
import router from "./primeblocks4/router";
import {appStatus} from "./application/stores/appStatus";
import application from "./application";
import cs from "cupparis-primevue";
import CrudInit from './primeblocks4/crud/CrudInit.js';
import themeColors from "./application/themeColors";
import './application/assets/styles.scss';

const app = createApp(App);
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate)

app.use(pinia);
app.use(router);
console.debug('colors',themeColors.getTheme());

app.use(PrimeVue, {
    ripple: true,
    inputStyle: 'outlined',
    theme: {
        //preset: MyPreset
        preset: themeColors.getTheme(),
        options : {
            darkModeSelector: '.app-dark'
        },
    }
});

function mountApp(error) {
    console.debug('mountApp',error);
    app.mount('#app');
    if (error) {
        router.push('/error');
    } else {
        console.debug('Applicazione installata senza errori redirect to /')
        //router.push('/');
    }
}

const appStatusInstance = appStatus();
appStatusInstance.clear();
CrudInit.install(app).then(function () {
    cs.install(app);
    if (cs.CrudHelpers.hasDarkMode()) {
        document.documentElement.classList.add('app-dark');
    }
    CrudInit.loadMenu().then(function() {
        try {
            console.debug('installo applicazione ... ')
            application.install(app,function (result) {
                console.debug('result',result);
                console.debug('modelConfs caricati',cs.CrudVars.modelConfs)
                mountApp(false);
            })
        } catch (error) {
            console.debug('installo applicazione ...errore ')
            console.error(error);
            appStatusInstance.setError('Caricamento menu applicazione fallito',error);
            mountApp(true);
        }

    }).catch(error => {
        console.error(error);
        console.error('Caricamento menu applicazione fallito',error);
        const appStatusInstance = appStatus();
        appStatusInstance.setError('Caricamento menu applicazione fallito',error.message);
        mountApp(true);
        console.error(error);
    })
})
