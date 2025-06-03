import AppLayout from '@/application/layout/AppLayout.vue';
export default [
    {
        path: '/',
        component: AppLayout,
        children: [
            {
                path: '/formlayout',
                name: 'formlayout',
                component: () => import('@/rome-vue-v4.0.0/pages/uikit/FormLayoutDemo.vue'),
            },
            {
                path: '/invalidstate',
                name: 'invalidstate',
                component: () => import('@/rome-vue-v4.0.0/pages/uikit/InvalidStateDemo.vue'),
            },
            {
                path: '/input',
                name: 'input',
                component: () => import('@/rome-vue-v4.0.0/pages/uikit/InputDemo.vue'),
            },
            {
                path: '/floatlabel',
                name: 'floatlabel',
                component: () => import('@/rome-vue-v4.0.0/pages/uikit/FloatLabelDemo.vue'),
            },
            {
                path: '/button',
                name: 'button',
                component: () => import('@/rome-vue-v4.0.0/pages/uikit/ButtonDemo.vue'),
            },
            {
                path: '/table',
                name: 'table',
                component: () => import('@/rome-vue-v4.0.0/pages/uikit/TableDemo.vue'),
            },
            {
                path: '/list',
                name: 'list',
                component: () => import('@/rome-vue-v4.0.0/pages/uikit/ListDemo.vue'),
            },
            {
                path: '/timeline',
                name: 'timeline',
                component: () => import('@/rome-vue-v4.0.0/pages/TimelineDemo.vue'),
            },
            {
                path: '/tree',
                name: 'tree',
                component: () => import('@/rome-vue-v4.0.0/pages/uikit/TreeDemo.vue'),
            },
            {
                path: '/panel',
                name: 'panel',
                component: () => import('@/rome-vue-v4.0.0/pages/uikit/PanelsDemo.vue'),
            },
            {
                path: '/overlay',
                name: 'overlay',
                component: () => import('@/rome-vue-v4.0.0/pages/uikit/OverlayDemo.vue'),
            },
            {
                path: '/media',
                name: 'media',
                component: () => import('@/rome-vue-v4.0.0/pages/uikit/MediaDemo.vue'),
            },
            {
                path: '/menu',
                component: () => import('@/rome-vue-v4.0.0/pages/uikit/MenuDemo.vue'),
                children: [
                    {
                        path: '',
                        component: () => import('@/rome-vue-v4.0.0/pages/uikit/menu/PersonalDemo.vue'),
                    },
                    {
                        path: '/menu/seat',
                        component: () => import('@/rome-vue-v4.0.0/pages/uikit/menu/SeatDemo.vue'),
                    },
                    {
                        path: '/menu/payment',
                        component: () => import('@/rome-vue-v4.0.0/pages/uikit/menu/PaymentDemo.vue'),
                    },
                    {
                        path: '/menu/confirmation',
                        component: () => import('@/rome-vue-v4.0.0/pages/uikit/menu/ConfirmationDemo.vue'),
                    },
                ],
            },
            {
                path: '/messages',
                name: 'messages',
                component: () => import('@/rome-vue-v4.0.0/pages/uikit/MessagesDemo.vue'),
            },
            {
                path: '/file',
                name: 'file',
                component: () => import('@/rome-vue-v4.0.0/pages/uikit/FileDemo.vue'),
            },
            {
                path: '/chart',
                name: 'chart',
                component: () => import('@/rome-vue-v4.0.0/pages/uikit/ChartDemo.vue'),
            },
            {
                path: '/misc',
                name: 'misc',
                component: () => import('@/rome-vue-v4.0.0/pages/uikit/MiscDemo.vue'),
            },
            {
                path: '/icons',
                name: 'icons',
                component: () => import('@/rome-vue-v4.0.0/pages/utilities/Icons.vue'),
            },
            {
                path: '/crud',
                name: 'crud',
                component: () => import('@/rome-vue-v4.0.0/pages/CrudDemo.vue'),
            },
            {
                path: '/calendar',
                name: 'calendar',
                component: () => import('@/rome-vue-v4.0.0/pages/CalendarDemo.vue'),
            },
            {
                path: '/invoice',
                name: 'invoice',
                component: () => import('@/rome-vue-v4.0.0/pages/Invoice.vue'),
            },
            {
                path: '/help',
                name: 'help',
                component: () => import('@/rome-vue-v4.0.0/pages/Help.vue'),
            },
            {
                path: '/empty',
                name: 'empty',
                component: () => import('@/rome-vue-v4.0.0/pages/EmptyPage.vue'),
            },
            {
                path: '/documentation',
                name: 'documentation',
                component: () => import('@/rome-vue-v4.0.0/pages/utilities/Documentation.vue'),
            },

            {
                path: '/blocks',
                name: 'blocks',
                component: () => import('@/rome-vue-v4.0.0/pages/utilities/BlocksDemo.vue'),
            },
            //    ],
            //},
            // {
            //     path: '/login2',
            //     name: 'login2',
            //     component: () => import('@/rome-vue-v4.0.0/pages/Login.vue'),
            // },
            // {
            //     path: '/error',
            //     name: 'error',
            //     component: () => import('@/rome-vue-v4.0.0/pages/Error.vue'),
            // },
            {
                path: '/notfound',
                name: 'notfound',
                component: () => import('@/rome-vue-v4.0.0/pages/NotFound.vue'),
            },
            // {
            //     path: '/access',
            //     name: 'access',
            //     component: () => import('@/rome-vue-v4.0.0/pages/Access.vue'),
            // },
        ]
    }
];
