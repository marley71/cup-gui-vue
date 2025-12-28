export default {
    label : 'Superadmin',
    icon : 'fa fa-gears',
    items :[
        {
            'label' : 'Ruoli',
            'icon' : 'fa fa-gear',
            'to' : '/admin/ruoli'
        },
        // {
        //     'label' : 'Models Configuration',
        //     'icon': 'fa fa-gear',
        //     'to': '/admin/models-confs'
        // },
        {
            'label': 'Deploy',
            'icon': 'fa fa-gear',
            'to': '/admin/deploy'
        },
        {
            'label': 'Help',
            'icon': 'fa fa-question',
            items: [
                // {
                //     label: 'Manage Constraint', icon: 'fa-solid fa-vial', to: '/test2-manage-constraint/1'
                // },
                {
                    label: 'Test2 Widgets', icon: 'fa-solid fa-vial', to: '/test2-widgets'
                },
                {
                    label: 'Test2 Actions', icon: 'fa-solid fa-vial', to: '/test2-actions'
                },
                {
                    label: 'Test2 Views', icon: 'fa-solid fa-vial', to: '/test2-views'
                },
                // {
                //     label : 'Test Templates', icon : 'fa-solid fa-vial', to: '/test-templates'
                // },
                {
                    label: 'Test2 Manage', icon: 'fa-solid fa-vial', to: '/test2-manage'
                },
                {
                    label: 'Test2 Import', icon: 'fa-solid fa-vial', to: '/test2-import'
                },
                {
                    label: 'Test Dialogs', icon: 'fa-solid fa-vial', to: '/test2-dialogs'
                },
                {
                    label: 'Esperimenti', icon: 'fa-solid fa-vial', to: '/test2-esperimenti'
                },
            ]
        },
        {
            'label': 'Help Doc',
            'icon': 'fa fa-gear',
            'href': '/htmlhelp/index.html',
            'target': '_blank'
        },
    ]
}
