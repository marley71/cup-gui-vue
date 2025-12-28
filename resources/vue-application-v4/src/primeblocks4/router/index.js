import { createRouter, createWebHashHistory } from 'vue-router';
import applicationRoutes from "@/application/routes";
import CorePages from "./CorePages";
import DevPages from "./DevPages";
import PrimeVuePages from "./PrimeVuePages";
import SuperAdminPages from "./SuperAdminPages";

import ApplicationLayout from "@/application/layout/ApplicationLayout.vue";
import cs from 'cupparis-primevue';
import {userApp} from "@/application/stores/userApp";
import {appStatus} from "@/application/stores/appStatus";

let appRoutes = applicationRoutes.concat(CorePages);
// inserimento routes default dei modelli, manage,view,edit,list,insert,import
appRoutes = appRoutes.concat([
    {
        path: '/',
        //component: SidebarLayout,
        component : ApplicationLayout,
        children: cs.routerConf,    // routes della libreria cupparis le facciamo tutte con utente loggato
        meta : {
            requiredAuth : true,
        }
    }
])
if (parseInt(import.meta.env.VITE_APP_DEV_MENU)) {
    appRoutes= appRoutes.concat(PrimeVuePages);
    appRoutes = appRoutes.concat(DevPages);
}

if (import.meta.env.VITE_MODE == 'dev') {
    appRoutes= appRoutes.concat(SuperAdminPages)
}

console.debug(import.meta.env.VITE_MODE,'router appRoutes',appRoutes)
const router = createRouter({
    history: createWebHashHistory(),
    routes : appRoutes,
    scrollBehavior() {
        return { left: 0, top: 0 };
    },
});


// Navigation guard per proteggere le route
router.beforeEach((to, from, next) => {
    const user = userApp();
    const status = appStatus();
    console.debug('router beforeEach ',user.isLogged());
    if (status.error && to.name != 'error') {
        next({name : 'error'})
    } else {
        if (to.matched.some(record => record.meta.requiredAuth)) {
            // Verifica se l'utente è autenticato
            console.debug('need auth loggato ',user.isLogged());
            if (!user || !user.isLogged()) {
                next({ name: 'login' });
            } else {
                console.debug('need auth NO vado login');
                next();
            }
        } else {
            next();
        }
    }
});


cs.CrudCore.event().on('route-error',(event) => {
    console.debug('route-error ',event);
    //router.next({name : 'error',params : {msg : event.msg}});
    router.push({name : 'notfound',params : {msg : event.msg}});
});

export default router;
