
export default {
    "modelName" : "user4",
    "search": {
        "modelName" : "user4",
        "type" : "v-search",
        "fields": ["id","name","email","email_verified_at","banned","password","remember_token","created_at","updated_at","created_by","updated_by"],
        "fieldsConfig": {},
    },
    "list": {
        "modelName" : "user4",
        "type" : "v-list",
        "actions" : [
            "action-insert",
            "action-edit",
            "action-delete",
            "action-delete-selected",
        ],
        "fields": ["id","name","email","email_verified_at","banned","password","remember_token","created_at","updated_at","created_by","updated_by"],
        "fieldsConfig": {},
        "orderFields" : {},
    },
    "edit": {
        "type" : "v-edit",
        "modelName" : "user4",
        "actions" : ["action-save","action-back"],
        "fields": ["id","name","email","email_verified_at","banned","password","remember_token","created_at","updated_at","created_by","updated_by"],
        "fieldsConfig":{},
    },
}
