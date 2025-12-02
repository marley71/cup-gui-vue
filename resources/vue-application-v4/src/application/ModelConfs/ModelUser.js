export default () => {
    return {
        "modelName": "user",
        "search": {
            modelName: 'user',
            type: "v-search",
            fields: [
                "roles|id",
            ],
            fieldsConfig: {
                'roles|id': {
                    type: "w-select",
                },

            },
            advancedFields: [],
            actionsConfig: {},
            searchWithButton: true,
        },
        "list": {
            "modelName": "user",
            "type": "v-list",
            "actions": [
                "action-insert",
                "action-edit",
                "action-delete",
                "action-delete-selected",
            ],
            "fields": [
                "id",
                "name",
                "email",
                "email_verified_at",
                "banned",
                "mainrole"
            ],
            "fieldsConfig": {
                email_verified_at: {
                    type: 'w-swap',
                    modelName: 'user',
                },
                banned: {
                    type: 'w-swap',
                    modelName: 'user',
                    switchClass: 'form-switch-danger banned',
                    dataSwitched: true,
                    label: 'Bloccato',
                },
            },
            "orderFields": {},
        },
        edit: {
            modelName: 'user',
            type: 'v-edit',
            actions: ['action-save', 'action-save-back', 'action-back'],
            fields: [//'info',
                'email',
                'name',
                'password', 'password_confirmation',
                'mainrole',
                // 'empty',
                // 'fotos','attachments'
            ],
            afterDraw() {

            },

            methods: {
                fillData: function (route, json) {
                    var that = this;
                    if (json.metadata.is_auth) {
                        that.fieldsConfig.mainrole = 'w-hidden';
                    }
                    that.$options.methods.fillData.apply(that, [route, json]);
                },
                completed() {
                    // console.log('widget mainrole',this.getWidget('mainrole'))
                    // var widget = this.getWidget('mainrole');
                    // if (widget.type === 'w-hidden') {
                    //     this.getWidget('asl_id').jQe().closest('.asl_id').addClass('d-none');
                    // } else
                    //     widget.showHideUsl();
                }
            },
            fieldsConfig: {
                mainrole: {
                    type: 'w-select',
                    change() {
                        console.log('mainrole value', this.getValue())
                        var value = this.getValue();
                        if (value === 5) {
                            this.view.showWidget('scuola_id');
                        } else {
                            this.view.hideWidget('scuola_id');
                        }
                    }

                },
                banned: 'w-radio',
                password: {
                    type: 'w-input',
                    inputType: 'password',
                },
                password_confirmation: {
                    type: 'w-input',
                    inputType: 'password',
                },
                //roles : 'w-select',
            },
            actionsConfig: {}
        },

    }
}
