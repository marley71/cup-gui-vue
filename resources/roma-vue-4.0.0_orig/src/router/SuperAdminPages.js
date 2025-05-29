import AppLayout from '@external/layout/AppLayout.vue';
export default [
    {
        path: '/',
        component: AppLayout,
        children: [
            {
                path: '/admin/ruoli',
                name: 'ruoli',
                component: () => import('@/views/pages/superadmin/RuoliPage.vue'),
            },
            {
                path: '/admin/models-confs',
                name: 'model-confs',
                component: () => import('@/views/pages/superadmin/ModelsConfiguration.vue'),
            },
            {
                path: '/admin/deploy',
                name: 'deploy',
                component: () => import('@/views/pages/superadmin/DeployPage.vue'),
            },
        ],
        meta : {
            requiredAuth : true,
        }
    }
]
