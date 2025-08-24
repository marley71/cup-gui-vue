import ApplicationLayout from "@/application/layout/ApplicationLayout.vue";
export default [
    {
        path: '/',
        component: ApplicationLayout,
        children: [
            {
                path: '/admin/ruoli',
                name: 'ruoli',
                component: () => import('../pages/superadmin/RuoliPage.vue'),
            },
            {
                path: '/admin/models-confs',
                name: 'model-confs',
                component: () => import('../pages/superadmin/ModelsConfiguration.vue'),
            },
            {
                path: '/admin/deploy',
                name: 'deploy',
                component: () => import('../pages/superadmin/DeployPage.vue'),
            },
        ],
        meta : {
            requiredAuth : true,
        }
    }
]
