import AppLayout from '@external/layout/AppLayout.vue';
import AppLogin from "@external/layout/AppLogin.vue";
import AppError from '@external/layout/AppError.vue';

export default [
    {
        path: '/',
        component: AppLayout,
        children: [
            {
                path: '/test-socket',
                name: 'test_socket',
                component: () => import('@/views/pages/TestSocket.vue')
            },
            {
                path: '/layoutConfig',
                name: 'layoutConfig',
                component: () => import('@/views/pages/app/ConfigPage.vue')
            },
            {
                path: '/logout',
                name: 'logout',
                component: () => import('@/views/Logout.vue')
            },
            {
                path: '/profilo',
                name: 'profilo',
                component: () => import('@/views/pages/auth/Profilo.vue')
            },
        ],
        meta : {
            requiredAuth : true,
        }
    },
    {
        path: "/:catchAll(.*)",
        component: () => import('@external/src/pages/NotFound.vue'),
    },
    {
        path: '/auth',
        component: AppLogin,
        children: [
            {
                path: '/auth/login',
                name: 'login',
                component: () => import('@external/src/pages/auth/Login.vue')
            },
            {
                path: '/auth/access',
                name: 'accessDenied',
                component: () => import('@external/src/pages/auth/Access.vue')
            },
            {
                path: '/auth/error',
                name: 'error',
                component: () => import('@external/src/pages/auth/Error.vue')
            },
        ]
    },
    {
        path: '/error',
        component: AppError,
        name : 'error',
    }
]
