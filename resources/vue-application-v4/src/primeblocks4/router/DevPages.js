import ApplicationLayout from "@/application/layout/ApplicationLayout.vue";

export default [
    {
        path: '/',
        component: ApplicationLayout,
        children: [
        
            // {
            //     path: '/test2-manage-constraint/:created_by',
            //     name: 'test2-manage-constraint',
            //     component: () => import('@/primeblocks4/pages/help/ManageConstraint.vue')
            // },
            {
                path: '/test2-widgets/:case*',
                name: 'test2-widgets',
                component: () => import('@/primeblocks4/pages/help/TestWidgets.vue')
            },
            {
                path: '/test2-actions',
                name: 'test2-actions',
                component: () => import('@/primeblocks4/pages/help/TestActions.vue')
            },
            {
                path: '/test2-views/:case*',
                name: 'test2-views',
                component: () => import('@/primeblocks4/pages/help/TestViews.vue')
            },
            {
                path: '/test2-manage/:case*',
                name: 'test2-manage',
                component: () => import('@/primeblocks4/pages/help/TestManage.vue')
            },
            {
                path: '/test2-import/:case*',
                name: 'test2-import',
                component: () => import('@/primeblocks4/pages/help/TestImport.vue')
            },
            {
                path: '/test2-esperimenti',
                name: 'test2-esperimenti',
                component: () => import('@/primeblocks4/pages/help/Esperimenti.vue')
            },
            {
                path: '/test2-dialogs',
                name: 'test2-dialogs',
                component: () => import('@/primeblocks4/pages/help/TestDialogs.vue')
            },
            {
                path: '/test2-dt',
                name: 'test2-dt',
                component: () => import('@/primeblocks4/pages/help/DynamicTemplate.vue')
            },
        ],
        meta : {
            requiredAuth : true,
        }
    }
]
