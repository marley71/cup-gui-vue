import AppLayout from '@/application/layout/AppLayout.vue';

export default [
    {
        path: '/',
        component: AppLayout,
        children: [
            {
                path: '/pages/notfound',
                name: 'notfound',
                component: () => import('@/application/pages/NotFound.vue')
            },
            {
                path: '/test2-manage-constraint/:created_by',
                name: 'test2-manage-constraint',
                component: () => import('@/rome-vue-v4.0.0/pages/help/ManageConstraint.vue')
            },
            {
                path: '/test2-widgets/:case*',
                name: 'test2-widgets',
                component: () => import('@/rome-vue-v4.0.0/pages/help/TestWidgets.vue')
            },
            {
                path: '/test2-actions',
                name: 'test2-actions',
                component: () => import('@/rome-vue-v4.0.0/pages/help/TestActions.vue')
            },
            {
                path: '/test2-views/:case*',
                name: 'test2-views',
                component: () => import('@/rome-vue-v4.0.0/pages/help/TestViews.vue')
            },
            {
                path: '/test2-manage/:case*',
                name: 'test2-manage',
                component: () => import('@/rome-vue-v4.0.0/pages/help/TestManage.vue')
            },
            {
                path: '/test2-import',
                name: 'test2-import',
                component: () => import('@/rome-vue-v4.0.0/pages/help/TestImport.vue')
            },
            {
                path: '/test2-esperimenti',
                name: 'test2-esperimenti',
                component: () => import('@/rome-vue-v4.0.0/pages/help/Esperimenti.vue')
            },
            {
                path: '/test2-dialogs',
                name: 'test2-dialogs',
                component: () => import('@/rome-vue-v4.0.0/pages/help/TestDialogs.vue')
            },
            {
                path: '/test2-dt',
                name: 'test2-dt',
                component: () => import('@/rome-vue-v4.0.0/pages/help/DynamicTemplate.vue')
            },
        ],
        meta : {
            requiredAuth : true,
        }
    }
]
