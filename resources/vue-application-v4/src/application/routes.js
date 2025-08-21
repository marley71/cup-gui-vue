import SidebarLayout from "./layout/SidebarLayout.vue";
export default [
    {
        path: '/',
        component: SidebarLayout,
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
