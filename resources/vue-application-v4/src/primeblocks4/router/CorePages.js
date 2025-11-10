import ApplicationLayout from "@/application/layout/ApplicationLayout.vue";
import LoginLayout from "@/application/layout/LoginLayout.vue";
import ErrorLayout from '@/application/layout/ErrorLayout.vue';

export default [
    {
        path: '/',
        component: ApplicationLayout,
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
        component: LoginLayout,
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
            {
                path: '/auth/forgot-password',
                name: 'forgot-password',
                component: () => import('@/application/pages/auth/ForgotPassword.vue')
            },
            {
                path: '/auth/reset-password/:token',
                name: 'reset-password',
                component: () => import('@/application/pages/auth/ResetPassword.vue')
            },
        ]
    },
    {
        path: '/error',
        component: ErrorLayout,
        name : 'error',
    }
]
