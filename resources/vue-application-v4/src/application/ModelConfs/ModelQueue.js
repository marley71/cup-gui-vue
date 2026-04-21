
export default () => {
    return {
        "modelName" : "queue",
        "search": {
            "modelName" : "queue",
            "type" : "v-search",
            "fields": [], //["id","start","end","error","msg","job_type","input_data","output_data","progress","user_id","job_id","created_at","updated_at"],
            "fieldsConfig": {},
        },
        "list": {
            "modelName" : "queue",
            "type" : "v-list",
            "actions" : [
                "action-start-stop",
                "action-view",
                //"action-delete",
                //"action-delete-selected",
            ],
            "fields": ["error","start","end","info", "user"], //"job_id","error","job_type","input_data","output_data","msg",
            "fieldsConfig": {
                info : {
                    type : 'w-object',
                    label : 'Info',
                    showInPanel : true,
                    fields : ['job_id','start','end','error','job_type',"input_data","output_data"],
                    bind_all_data : true,
                    getFieldValue : function(field) {
                        if (field == 'input_data' || field == 'output_data') {
                            return JSON.stringify(this.value[field],"\t",2);
                        }
                        return this.value[field];
                    },
                },
                start : {
                    type : 'w-date-text',
                    displayFormat : 'DD/MM/YYYY HH:mm:ss',
                },
                end : {
                    type : 'w-date-text',
                    displayFormat : 'DD/MM/YYYY HH:mm:ss',
                    
                },
                user : {
                    type : 'w-belongsto',
                    modelName : 'user',
                    labelFields : ['name'],
                },
                error : {
                    ready() {
                        if (!this.modelData.end) {
                            this.value = 2; // in progress
                        }
                        switch (this.value) {
                            case 0:
                                this.value = '<i class="fa fa-2x fa-circle-check text-green-600"></i>';
                                break;
                            case 1:
                                this.value = '<i class="fa fa-2x fa-circle-xmark text-red-600"></i>';
                                break;
                            case 2:
                                this.value = '<img src="/assets/spinner.gif" class="w-10 h-10">';
                                break;
                        }
                        
                        console.debug("error",this.modelData.end,this.value);
                    },
                    label : 'Status',
                    type : 'w-custom'
                },
            },
            "orderFields" : {},
        },
        "edit": {
            "type" : "v-edit",
            "modelName" : "queue",
            "actions" : ["action-save","action-back"],
            "fields": ["job_id","start","end","error","msg","job_type","user_id","progress","input_data","output_data"],
            "fieldsConfig":{},
        },
    }
}
