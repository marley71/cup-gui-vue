import cs from 'cupparis-primevue';


export default () => {
    return {
        "modelName" : "user",
        "search": {
            "modelName" : "user",
            "type" : "v-search",
            fields : [],
            //"fields": ["id","name","email","email_verified_at","banned"],
            "fieldsConfig": {},
        },
        "list": {
            "modelName" : "user",
            "type" : "v-list",
            "actions" : [
                "action-insert",
                "action-edit",
                "action-delete",
                "action-delete-selected",
            ],
            "actionsConfig": {
                
            },
            "fields": ["name","email","mainrole","banned"],
            "fieldsConfig": {
                banned : {
                    type:'w-swap',
                    modelName : 'user',
                },
            },
            "orderFields" : {},
        },
        "edit": {
            "type" : "v-edit",
            "modelName" : "user",
            "actions" : ["action-save","action-back"],
            "fields": ["name","email","password","password_confirmation","mainrole"],
            "fieldsConfig" : {
                mainrole : {
                    type : 'w-select',
                    layout : {
                        colClass : 'col-span-12'
                    }
                }
            },
            layout : {
                cols : 2,
            }
        },
    }
}
