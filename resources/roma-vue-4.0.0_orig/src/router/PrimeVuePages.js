import AppLayout from '@external/layout/AppLayout.vue';
export default [
    {
        path: '/',
        component: AppLayout,
        children: [
            {
                path: '/formlayout',
                name: 'formlayout',
                component: () => import('@/views/uikit/FormLayoutDemo.vue'),
            },
            {
                path: '/invalidstate',
                name: 'invalidstate',
                component: () => import('@/views/uikit/InvalidStateDemo.vue'),
            },
            {
                path: '/input',
                name: 'input',
                component: () => import('@/views/uikit/InputDemo.vue'),
            },
            {
                path: '/floatlabel',
                name: 'floatlabel',
                component: () => import('@/views/uikit/FloatLabelDemo.vue'),
            },
            {
                path: '/button',
                name: 'button',
                component: () => import('@/views/uikit/ButtonDemo.vue'),
            },
            {
                path: '/table',
                name: 'table',
                component: () => import('@/views/uikit/TableDemo.vue'),
            },
            {
                path: '/list',
                name: 'list',
                component: () => import('@/views/uikit/ListDemo.vue'),
            },
            {
                path: '/timeline',
                name: 'timeline',
                component: () => import('@/views/pages/TimelineDemo.vue'),
            },
            {
                path: '/tree',
                name: 'tree',
                component: () => import('@/views/uikit/TreeDemo.vue'),
            },
            {
                path: '/panel',
                name: 'panel',
                component: () => import('@/views/uikit/PanelsDemo.vue'),
            },
            {
                path: '/overlay',
                name: 'overlay',
                component: () => import('@/views/uikit/OverlayDemo.vue'),
            },
            {
                path: '/media',
                name: 'media',
                component: () => import('@/views/uikit/MediaDemo.vue'),
            },
            {
                path: '/menu',
                component: () => import('@/views/uikit/MenuDemo.vue'),
                children: [
                    {
                        path: '',
                        component: () => import('@/views/uikit/menu/PersonalDemo.vue'),
                    },
                    {
                        path: '/menu/seat',
                        component: () => import('@/views/uikit/menu/SeatDemo.vue'),
                    },
                    {
                        path: '/menu/payment',
                        component: () => import('@/views/uikit/menu/PaymentDemo.vue'),
                    },
                    {
                        path: '/menu/confirmation',
                        component: () => import('@/views/uikit/menu/ConfirmationDemo.vue'),
                    },
                ],
            },
            {
                path: '/messages',
                name: 'messages',
                component: () => import('@/views/uikit/MessagesDemo.vue'),
            },
            {
                path: '/file',
                name: 'file',
                component: () => import('@/views/uikit/FileDemo.vue'),
            },
            {
                path: '/chart',
                name: 'chart',
                component: () => import('@/views/uikit/ChartDemo.vue'),
            },
            {
                path: '/misc',
                name: 'misc',
                component: () => import('@/views/uikit/MiscDemo.vue'),
            },
            {
                path: '/icons',
                name: 'icons',
                component: () => import('@/views/utilities/Icons.vue'),
            },
            {
                path: '/crud',
                name: 'crud',
                component: () => import('@/views/pages/CrudDemo.vue'),
            },
            {
                path: '/calendar',
                name: 'calendar',
                component: () => import('@/views/pages/CalendarDemo.vue'),
            },
            {
                path: '/invoice',
                name: 'invoice',
                component: () => import('@/views/pages/Invoice.vue'),
            },
            {
                path: '/help',
                name: 'help',
                component: () => import('@/views/pages/Help.vue'),
            },
            {
                path: '/empty',
                name: 'empty',
                component: () => import('@/views/pages/EmptyPage.vue'),
            },
            {
                path: '/documentation',
                name: 'documentation',
                component: () => import('@/views/utilities/Documentation.vue'),
            },

            {
                path: '/blocks',
                name: 'blocks',
                component: () => import('@/views/utilities/BlocksDemo.vue'),
            },
            //    ],
            //},
            // {
            //     path: '/login2',
            //     name: 'login2',
            //     component: () => import('@/views/pages/Login.vue'),
            // },
            // {
            //     path: '/error',
            //     name: 'error',
            //     component: () => import('@/views/pages/Error.vue'),
            // },
            {
                path: '/notfound',
                name: 'notfound',
                component: () => import('@/views/pages/NotFound.vue'),
            },
            // {
            //     path: '/access',
            //     name: 'access',
            //     component: () => import('@/views/pages/Access.vue'),
            // },
        ]
    }
];
