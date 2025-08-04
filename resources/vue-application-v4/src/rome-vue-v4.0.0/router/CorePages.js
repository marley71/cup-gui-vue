import AppLayout from '@/application/layout/AppLayout.vue';
import AppLogin from "@/application/layout/AppLogin.vue";
import AppError from '@/application/layout/AppError.vue';

export default [
    {
        path: '/',
        component: AppLayout,
        children: [
            // {
            //     path: '/test-socket',
            //     name: 'test_socket',
            //     component: () => import('@/rome-vue-v4.0.0/pages/TestSocket.vue')
            // },
            // {
            //     path: '/layoutConfig',
            //     name: 'layoutConfig',
            //     component: () => import('@/views/pages/app/ConfigPage.vue')
            // },
            {
                path: '/logout',
                name: 'logout',
                component: () => import('@/application/pages/auth/Logout.vue')
            },
            {
                path: '/profilo',
                name: 'profilo',
                component: () => import('@/application/pages/auth/Profilo.vue')
            },
        ],
        meta : {
            requiredAuth : true,
        }
    },
    {
        path: "/:catchAll(.*)",
        component: () => import('@/application/pages/NotFound.vue'),
    },
    {
        path: '/auth',
        component: AppLogin,
        children: [
            {
                path: '/auth/login',
                name: 'login',
                component: () => import('@/application/pages/auth/Login.vue')
            },
            {
                path: '/auth/access',
                name: 'accessDenied',
                component: () => import('@/application/pages/auth/Access.vue')
            },
            {
                path: '/auth/error',
                name: 'error',
                component: () => import('@/application/pages/auth/Error.vue')
            },
        ]
    },
    {
        path: '/error',
        component: AppError,
        name : 'error',
    }
]
