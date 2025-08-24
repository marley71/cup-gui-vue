import ApplicationLayout from "./layout/ApplicationLayout.vue";
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
]
