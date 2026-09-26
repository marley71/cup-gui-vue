import ApplicationLayout from "./layout/ApplicationLayout.vue";
import SingleComponentLayout from "./layout/SingleComponentLayout.vue";
export default [
    {
        path: '/',
        component : ApplicationLayout,
        children: [
            {
                path: '/',
                name: 'dashboard',
                component: () => import('./pages/Dashboard1.vue'),
                meta : {
                    requiredAuth : true,
                }
            },
            {
                path: '/pagina-linkata',
                name: 'pagina-linkata',
                component: () => import('./pages/PaginaLinkata.vue'),
                meta : {
                    requiredAuth : true,
                }
            },
            {
                path: '/componenti-custom',
                name: 'componenti-custom',
                component: () => import('./pages/ComponentiCustom.vue'),
                meta : {
                    requiredAuth : true,
                }
            },
        ]
    },
    {
        path: '/',
        component : SingleComponentLayout,
        children: [
            {
                path: '/single-component/:component',
                name: 'single-component',
                component: () => import(`./pages/single-component/SingleComponent.vue`),
            }
        ]
    }
]
