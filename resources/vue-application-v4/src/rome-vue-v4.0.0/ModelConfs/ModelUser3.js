
export default {
    modelName : 'user3',
    search: {
        modelName : 'user3',
        type : 'v-search',
        fields: [],
        fieldsConfig: {}
    },
    list: {
        autoload : true,
        modelName : 'user3',
        type : 'v-list',
        //layout : 'fusion',
        actions : [
            'action-insert',
            'action-edit',
            'action-delete',
            'action-delete-selected',
        ],
        fields: null,
        fieldsConfig: {},
        orderFields : {},
    },
    edit: {
        type : 'v-edit',
        modelName : 'user3',
        actions : ['action-save','action-back'],
        fields: ['prova'],
        fieldsConfig:{
            prova :  {
                type : 'w-hasmany',
                hasmanyConf: {
                    //modelName : 'user',
                    fields: ['id', 'nome', 'descrizione', 'resource'],
                    defaultWidgetType : 'w-input',
                    //selectionMode : false,
                    fieldsConfig: {
                        id : {
                            type : 'w-hidden'
                        },
                        nome : {
                            type : 'w-input'
                        },
                        resource: {
                            type : 'w-input',
                            // template: 'tpl-base',
                            // type: 'w-upload-ajax',
                            // extensions: ['jpg', 'png'],
                            // maxFileSize: '2M',
                            // ajaxFields: {
                            //     resource_type: 'foto',
                            //     field: 'resource'
                            // },
                            // modelName: 'user'
                        }
                    }
                },
                value: [
                    {
                        //id: 35,
                        nome : 'nome uno',
                        descrizione : 'descrizione presente',
                        resource : 'de ma de'
                    },
                    {
                        //id: 37,
                        nome : 'nome u432',
                        descrizione : 'descrizione presensssste',
                        resource : 'de ma de'
                    }
                ],
            }

        },
    },
}
