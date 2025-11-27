import cs from 'cupparis-primevue';
import CrudCore from "@cupparis-lib/lib/CrudCore";
import Server from "@cupparis-lib/lib/Server";
export default {
    modelName: 'cupparis_entity',
    search: {
        modelName: 'cupparis_entity',
        type: "v-search",
        fields: [],
        fieldsConfig: {
            'nome': {
                type: "w-input",
            },

        },
        advancedFields: [],
        actionsConfig: {},
        searchWithButton: true,

    },

    list: {
        modelName: 'cupparis_entity',
        type: "v-list",
        actions: [
            'action-insert',
            'action-edit',
            'action-delete',
            'action-delete-selected',
            'action-migrate',
            'action-rollback',
        ],
        actionsConfig: {
            'action-migrate' : {
                actionType : 'record',
                title : 'Migrate',
                buttonClass: 'p-button-outlined p-button-success',
                icon : 'fa fa-wrench',
                text : 'Migrate',
                json : null,
                autoreloadView : true,
                execute (event) {
                    let tA = this;
                    return new Promise(function (resolve,reject) {
                        tA._migrate(function (esito) {
                            console.log('migrate Event',event,esito);
                            if (esito) {
                                resolve();
                            } else {
                                reject();
                            }

                        })
                    })

                },

                _migrate (callback) {
                    var that = this;
                    var r = that.createRoute('foormaction_record');
                    r.setValues({
                        modelName: that.view.modelName,
                        actionName: 'migrate',
                    });
                    r.setParams({
                        id: that.modelData.id,
                    });
                    that.waitStart()
                    Server.route(r, function (json) {
                        that.waitEnd();
                        that.json = json;
                        if (json.error) {
                            that.errorDialog(json.msg);
                            return;
                        }
                        CrudCore.alertSuccess("Migrazione eseguita con successo")
                        that.view.reload();
                    })
                }

            },

            'action-rollback' : {
                actionType : 'record',
                title : 'Rollback',
                buttonClass: 'p-button-outlined p-button-danger',
                icon : 'fa fa-arrow-down',
                text : 'Rollback',
                json : null,
                autoreloadView : true,
                execute (event) {
                    let tA = this;
                    return new Promise(function (resolve,reject) {
                        tA._rollback(function (esito) {
                            console.log('rollback Event',event,esito);
                            if (esito) {
                                resolve();
                            } else {
                                reject();
                            }

                        })
                    })

                },

                _rollback (callback) {
                    var that = this;
                    var r = that.createRoute('foormaction_record');
                    r.setValues({
                        modelName: that.view.modelName,
                        actionName: 'rollback',
                    });
                    r.setParams({
                        id: that.modelData.id,
                    });
                    that.waitStart()
                    Server.route(r, function (json) {
                        that.waitEnd();
                        that.json = json;
                        if (json.error) {
                            that.errorDialog(json.msg);
                            return;
                        }
                        CrudCore.alertSuccess("Rollback eseguito con successo")
                        that.view.reload();
                    })
                }

            },

            'action-insert' : {
                execute() {
                    let that = this;
                    let conf = cs.CrudVars.modelConfs.ModelCupparisEntity.popupInsert;
                    conf.actionsConfig['action-save'] = {
                        afterExecute() {
                            let thatA = this;
                            console.debug('component json',this.json,thatA);
                            cs.CrudCore.waitStart();
                            thatA.view.dialog.hide();
                            setTimeout(function () {
                                document.location.href = '/#/manage/edit/ModelCupparisEntity/' + thatA.json.result.id;
                                cs.CrudCore.waitEnd();
                            },100)
                        }
                    }
                    cs.CrudCore.componentDialog('v-insert',conf,'Inserimento rapido campi');
                }
            },
        },
        fields: [
            'id',
            'nome',
            'model_class',

        ],
        fieldsConfig: {
            id: {
                type: 'w-hidden',
            },
            'nome': {
                type: "w-text",
            },
            'model_class': {
                type: "w-text",
            },

        },
        orderFields: {
            'nome': 'nome',

        }

    },

    popupInsert : {
        type : 'v-insert',
        modelName : 'cupparis_entity',
        foormName: 'insert_express',
        actions: ['action-save'],
        actionsConfig : {},
        fields : [
            'nome',
            'fields_text',
        ],
        fieldsConfig : {
            nome : {
                type: 'w-input',
                rules : 'required',
            },
            fields_text : {
                type : 'w-textarea',
                rules : 'required',
            },
        }
    },

    edit: {
        modelName: 'cupparis_entity',
        type: "v-edit",
        actions: ['action-save-back', 'action-back'],
        actionsConfig: {},
        fields: [
            'id',
            'nome',
            'model_class',
            'lang_singolare',
            'lang_plurale',
            'fields',
            'timestamps',
            'ownerships',


            'columns_list',
            'columns_order',

            'has_foto',
            'has_attachments',
        ],
        fieldsConfig: {
            id: {
                type: 'w-hidden',
            },
            timestamps : {
                type: 'w-select',
            },
            ownerships : {
                type: 'w-select',
            },
            has_foto : {
              type: 'w-radio',
            },
            has_attachments : {
                type: 'w-radio',
            },
            'nome': {
                type: "w-input",
                change() {
                    var that = this;

                    var mc = that.view.getWidget('model_class');
                    // if (mc.getValue()) {
                    //     return;
                    // }

                    mc.setValue(cs.CrudCore.pascalCase(that.value));
                }
            },
            'model_class': {
                type: "w-input",
            },
            'columns_list': {
              type: 'w-multi-select',
            },
            'columns_order': {
                type: 'w-multi-select',
            },
            fields: {
                type: 'w-hasmany',
                hasmanyType: 'list',
                layout: {
                  colClass: 'col-span-12',
                },
                hasmanyConf: {
                    actions : [
                      'action-delete',
                        'action-insert'
                    ],
                    actionsConfig : {
                      'action-delete' : {
                          actionType: 'record',
                      }
                    },
                    fields: [
                        'id',
                        'nome',
                        'tipo',
                        'informazioni',
                        'default',
                        'nullable',
                        'index',
                        'relazione_tabella',
                        'relazione_campo',
                        'on_delete',
                        'on_update',
                        'model_conf_search',
                        'model_conf_list',
                        'model_conf_edit',
                        'status'
                    ],
                    fieldsConfig: {
                        status: {
                            type: 'w-hidden',
                        },
                        id: {
                            type: 'w-hidden',
                        },
                        tipo : {
                            type: 'w-select',
                        },
                        nullable : {
                            type: 'w-select',
                        },
                        index : {
                            type: 'w-select',
                        },
                        default : {
                            type: 'w-input',
                        },
                        on_delete : {
                            type: 'w-select',
                        },
                        on_update : {
                            type: 'w-select',
                        },
                        'relazione_tabella' : {
                            type: 'w-select',
                        },
                        'model_conf_search' : {
                            type: 'w-select',
                        },
                        'model_conf_list' : {
                            type: 'w-select',
                        },
                        'model_conf_edit' : {
                            type: 'w-select',
                        },

                    }
                }
            },


        }

    },
}
