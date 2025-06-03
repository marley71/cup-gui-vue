import { createRouter, createWebHashHistory } from 'vue-router';
import AppLayout from "@/application/layout/AppLayout.vue";

let appRoutes = [];//let appRoutes = appiclationRoutes.concat(CorePages);
// inserimento routes default dei modelli, manage,view,edit,list,insert,import

appRoutes = appRoutes.concat([
    {
        path: '/',
        component: AppLayout,
        children: [
            {
                path: '/',
                name: 'dashboard',
                component: () => import('@/application/pages/Dashboard.vue')
            },
        ],
        meta : {
            requiredAuth : true,
        }
    }
])

const router = createRouter({
    history: createWebHashHistory(),
    routes : appRoutes,
    scrollBehavior() {
        return { left: 0, top: 0 };
    },
});


// Navigation guard per proteggere le route
// router.beforeEach((to, from, next) => {
//     const user = userApp();
//     const status = appStatus();
//     if (status.error && to.name != 'error') {
//         next({name : 'error'})
//     } else {
//         if (to.matched.some(record => record.meta.requiredAuth)) {
//             // Verifica se l'utente è autenticato
//             //console.debug('need auth loggato ',user.isLogged());
//             if (!user || !user.isLogged()) {
//                 next({ name: 'login' });
//             } else {
//                 //console.debug('need auth NO vado login');
//                 next();
//             }
//         } else {
//             next();
//         }
//     }
// });

export default router;
