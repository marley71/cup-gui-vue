import AppLayout from '@external/layout/AppLayout.vue';

export default [
    {
        path: '/',
        component: AppLayout,
        children: [
            {
                path: '/pages/notfound',
                name: 'notfound',
                component: () => import('@/views/pages/NotFound.vue')
            },
            {
                path: '/test2-manage-constraint/:created_by',
                name: 'test2-manage-constraint',
                component: () => import('@/views/pages/tests2/ManageConstraint.vue')
            },
            {
                path: '/test2-widgets/:case*',
                name: 'test2-widgets',
                component: () => import('@/views/pages/tests2/TestWidgets.vue')
            },
            {
                path: '/test2-actions',
                name: 'test2-actions',
                component: () => import('@/views/pages/tests2/TestActions.vue')
            },
            {
                path: '/test2-views/:case*',
                name: 'test2-views',
                component: () => import('@/views/pages/tests2/TestViews.vue')
            },
            {
                path: '/test2-manage/:case*',
                name: 'test2-manage',
                component: () => import('@/views/pages/tests2/TestManage.vue')
            },
            {
                path: '/test2-import',
                name: 'test2-import',
                component: () => import('@/views/pages/tests2/TestImport.vue')
            },
            {
                path: '/test2-esperimenti',
                name: 'test2-esperimenti',
                component: () => import('@/views/pages/tests2/Esperimenti.vue')
            },
            {
                path: '/test2-dialogs',
                name: 'test2-dialogs',
                component: () => import('@/views/pages/tests2/TestDialogs.vue')
            },
            {
                path: '/test2-dt',
                name: 'test2-dt',
                component: () => import('@/views/pages/tests2/DynamicTemplate.vue')
            },
        ],
        meta : {
            requiredAuth : true,
        }
    }
]
