import AppLayout from '@/application/layout/AppLayout.vue';
export default [
    {
        path: '/',
        component: AppLayout,
        children: [
            {
                path: '/admin/ruoli',
                name: 'ruoli',
                component: () => import('@/rome-vue-v4.0.0/pages/superadmin/RuoliPage.vue'),
            },
            {
                path: '/admin/models-confs',
                name: 'model-confs',
                component: () => import('@/rome-vue-v4.0.0/pages/superadmin/ModelsConfiguration.vue'),
            },
            {
                path: '/admin/deploy',
                name: 'deploy',
                component: () => import('@/rome-vue-v4.0.0/pages/superadmin/DeployPage.vue'),
            },
        ],
        meta : {
            requiredAuth : true,
        }
    }
]
