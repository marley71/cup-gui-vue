export default [
    { separator: true },
    {
        label: '--- Componenti Prime vue  ---',
        icon: 'pi pi-fw pi-home',
        items: [],
    },
    { separator: true },
    {
        label: 'Favorites',
        icon: 'pi pi-fw pi-home',
        items: [{ label: 'Dashboard', icon: 'pi pi-fw pi-home', to: '/' }],
    },
    { separator: true },
    {
        label: 'UI Kit',
        icon: 'pi pi-fw pi-star-fill',
        items: [
            { label: 'Form Layout', icon: 'pi pi-fw pi-id-card', to: '/formlayout' },
            { label: 'Input', icon: 'pi pi-fw pi-check-square', to: '/input' },
            { label: 'Float Label', icon: 'pi pi-fw pi-bookmark', to: '/floatlabel' },
            { label: 'Invalid State', icon: 'pi pi-fw pi-exclamation-circle', to: 'invalidstate' },
            { label: 'Button', icon: 'pi pi-fw pi-mobile', to: '/button', class: 'rotated-icon' },
            { label: 'Table', icon: 'pi pi-fw pi-table', to: '/table' },
            { label: 'List', icon: 'pi pi-fw pi-list', to: '/list' },
            { label: 'Tree', icon: 'pi pi-fw pi-share-alt', to: '/tree' },
            { label: 'Panel', icon: 'pi pi-fw pi-tablet', to: '/panel' },
            { label: 'Overlay', icon: 'pi pi-fw pi-clone', to: '/overlay' },
            { label: 'Media', icon: 'pi pi-fw pi-image', to: '/media' },
            { label: 'Menu', icon: 'pi pi-fw pi-bars', to: '/menu' },
            { label: 'Message', icon: 'pi pi-fw pi-comment', to: '/messages' },
            { label: 'File', icon: 'pi pi-fw pi-file', to: '/file' },
            { label: 'Chart', icon: 'pi pi-fw pi-chart-bar', to: '/chart' },
            { label: 'Misc', icon: 'pi pi-fw pi-circle-off', to: '/misc' },
        ],
    },
    { separator: true },
    {
        label: 'Utilities',
        icon: 'pi pi-fw pi-compass',
        items: [
            { label: 'PrimeIcons', icon: 'pi pi-fw pi-prime', to: '/icons' },
            { label: 'PrimeFlex', icon: 'pi pi-fw pi-directions', url: 'https://www.primefaces.org/primeflex/', target: '_blank' },
        ],
    },
    { separator: true },
    {
        label: 'Prime Blocks',
        icon: 'pi pi-prime',
        items: [
            { label: 'Free Blocks', icon: 'pi pi-fw pi-eye', to: '/blocks' },
            { label: 'All Blocks', icon: 'pi pi-fw pi-globe', url: 'https://www.primefaces.org/primeblocks-vue', target: '_blank' },
        ],
    },
    { separator: true },
    {
        label: 'Pages',
        icon: 'pi pi-fw pi-copy',
        items: [
            { label: 'Crud', icon: 'pi pi-fw pi-pencil', to: '/crud' },
            { label: 'Calendar', icon: 'pi pi-fw pi-calendar-plus', to: '/calendar' },
            { label: 'Timeline', icon: 'pi pi-fw pi-calendar', to: '/timeline' },
            { label: 'Landing', icon: 'pi pi-fw pi-globe', url: 'pages/landing.html', target: '_blank' },
            { label: 'Login', icon: 'pi pi-fw pi-sign-in', to: '/login' },
            { label: 'Error', icon: 'pi pi-fw pi-exclamation-triangle', to: '/error' },
            { label: '404', icon: 'pi pi-fw pi-times', to: '/notfound' },
            { label: 'Access Denied', icon: 'pi pi-fw pi-ban', to: '/access' },
            { label: 'Empty', icon: 'pi pi-fw pi-clone', to: '/empty' },
        ],
    },
    { separator: true },
    {
        label: 'Hierarchy',
        icon: 'pi pi-fw pi-sitemap',
        items: [
            {
                label: 'Submenu 1',
                icon: 'pi pi-fw pi-sign-in',
                items: [
                    {
                        label: 'Submenu 1.1',
                        icon: 'pi pi-fw pi-sign-in',
                        items: [
                            { label: 'Submenu 1.1.1', icon: 'pi pi-fw pi-sign-in' },
                            { label: 'Submenu 1.1.2', icon: 'pi pi-fw pi-sign-in' },
                            { label: 'Submenu 1.1.3', icon: 'pi pi-fw pi-sign-in' },
                        ],
                    },
                    {
                        label: 'Submenu 1.2',
                        icon: 'pi pi-fw pi-sign-in',
                        items: [{ label: 'Submenu 1.2.1', icon: 'pi pi-fw pi-sign-in' }],
                    },
                ],
            },
            {
                label: 'Submenu 2',
                icon: 'pi pi-fw pi-sign-in',
                items: [
                    {
                        label: 'Submenu 2.1',
                        icon: 'pi pi-fw pi-sign-in',
                        items: [
                            { label: 'Submenu 2.1.1', icon: 'pi pi-fw pi-sign-in' },
                            { label: 'Submenu 2.1.2', icon: 'pi pi-fw pi-sign-in' },
                        ],
                    },
                    {
                        label: 'Submenu 2.2',
                        icon: 'pi pi-fw pi-sign-in',
                        items: [{ label: 'Submenu 2.2.1', icon: 'pi pi-fw pi-sign-in' }],
                    },
                ],
            },
        ],
    },
    { separator: true },
    {
        label: 'Start',
        icon: 'pi pi-fw pi-download',
        items: [
            {
                label: 'Buy Now',
                icon: 'pi pi-fw pi-shopping-cart',
                command: () => window.open('https://www.primefaces.org/store', '_blank'),
            },
            { label: 'Documentation', icon: 'pi pi-fw pi-file', to: '/documentation' },
        ],
    },
];
