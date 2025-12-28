
export default {
    "modelName" : "roles",
    "search": {
        "modelName" : "roles",
        "type" : "v-search",
        "fields": ["id","name","guard_name","created_at","updated_at"],
        "fieldsConfig": {},
    },
    "list": {
        "modelName" : "roles",
        "type" : "v-list",
        "actions" : [
            "action-insert",
            "action-edit",
            "action-delete",
            "action-delete-selected",
        ],
        "fields": ["id","name","guard_name","created_at","updated_at"],
        "fieldsConfig": {},
        "orderFields" : {},
    },
    "edit": {
        "type" : "v-edit",
        "modelName" : "roles",
        "actions" : ["action-save","action-back"],
        "fields": ["id","name","guard_name","created_at","updated_at"],
        "fieldsConfig":{},
    },
}
