import cs from "cupparis-primevue";
import {user} from "../../../stores/user";
import CrudCore from "cupparis-primevue/src/lib/CrudCore";

export default {
    modelName : 'order',
    list : {
        type : 'v-list',
        modelName : 'order',
        pagination : true,
        actions: [
            'action-apri',
            //'action-movimento'
        ],
        actionsConfig: {
            'action-apri': {
                type: 'record',
                controlType: 'link',
                href() {
                    return "/order-detail/" + this.modelData.id;
                },
                text: 'Apri',

            },
            'action-movimento': {
                type: 'record',
                icon: 'fas fa-money-bill-wave',
                title: 'Nuovo movimento finanziario',
                execute() {
                    let that = this;
                    let appDialogs = cs.CrudVars.appDialogs;
                    appDialogs.showMovimentoDialog({
                        'profile_id': that.modelData.owner_id,
                        'team_id': that.modelData.team_id,
                        'project_id': that.modelData.project_id,
                        'order_id': that.modelData.id,
                        title : 'Nuovo movimento finanzario associato all\'ordine',
                    }, function (result) {
                        if (result) {
                            that.view.reload();
                        }
                    });
                },
                visible() {
                    return this.modelData.status === 'ongoing';
                }
            },
        },


        orderFields: {
            'created_at' : 'created_at',
            'description' : 'description',
            'start_date' : 'start_date',
            'smart_id' : 'smart_id',
            'owner' : 'owner',
        },
        fields: [
            'smart_id','description','status','start_date','owner',
            'importo',
            //'disponibilita_residua','owner','buyer','project',
            //        'created_at',     'team', 'consigliere_socio',
            'saldo_ordine',
            //'disponibilita_residua_contabile',
            'backend_user_id',
            'riferimenti'
        ],
        fieldsConfig : {
            riferimenti: {
                label:'Riferimenti',
                ready() {
                    let that = this;
                    let v = '';
                    v+= '<table class="text-sm">';
                    //v+= '<tr><td>Socio</td><td>' + that.modelData.owner.nome + ' ' + that.modelData.owner.cognome +'</td>';
                    v+= '<tr><td>Cliente</td><td>' + that.modelData.buyer.nome_visualizzato +'</td>';
                    v+= '<tr><td>Progetto</td><td>' + that.modelData.project.description +'</td>';
                    v+= '<tr><td>Team</td><td>' + that.modelData.team.description +'</td>';
                    v+= '</table>'
                    this.value = v;
                },
                type : 'w-custom',
            },
            smart_id:{
                label :'Id'
            },
            consigliere_socio : {
                label: 'Consigliere di riferimento',
            },
            description : {
                type : 'w-custom',
                ready() {
                    let descr = this.value?this.value:'';
                    this.value = '';
                    var ordClass = "flex gap-2 justify-content-between";
                    let title = descr || "";
                    if (this.modelData.in_review_da_smart) {
                        ordClass += ' text-red-500';
                        title += ' (questo ordine è stato portato in revisione da smart)';
                    }
                    title = title.replace(/"/g, '&quot;');
                    this.value += '<div class="' + ordClass +'" title="'+title+'">'
                    // this.value += '<a class="p-0 px-1 p-button" href="/#/order-detail/' +  this.modelData.id + '">Apri</a>';
                    this.value += '<div class="flex-grow-1">';
                    if (this.modelData.diritti_autore) {
                        this.value += '<span id="pv_id_8_badge" ' +
                            'title="Sono presenti diritti di autore da contrattualizzare" ' +
                            'class="p-badge p-component p-badge-danger p-badge-no-gutter mr-1">D</span >'
                    }
                    if (descr.length > 100) {
                        this.value += descr.substring(0,97)+' ...</div>';

                    } else {
                        this.value += descr+'</div>';
                    }
                    //this.value += cs.CrudHelpers.lining(descr,40)+'</div>';

                },
                label : 'Ordine'
            },
            created_at : 'w-date-text',
            start_date : 'w-date-text',
            saldo_ordine : {
                label : 'Saldo Ordine',
                ready() {
                    this.value = 0;
                    if (this.modelData.budget) {
                        this.value = this.modelData.budget.disponibilita_residua;
                    }
                    this.value = CrudCore.euroFormat(this.value);
                }
            },
            owner : {
                type : 'w-belongsto',
                labelFields : ['nome','cognome'],
                href() {
                    return '/#/profile-detail/' + this.value.id;
                }
            },
            buyer : {
                type : 'w-belongsto',
                labelFields : ['nome_visualizzato'],
                href() {
                    return '/#/customer-detail/' + this.value.id;
                }
            },
            status : {
                type : 'w-select',
                modelName : 'order',
                oldValue : null,

                ready() {
                    if (this.value === 'pending') {
                        var sHistory = this.modelData.status_history;
                        // console.log("STATUS HISTORY::: ",sHistory,this.value);
                        var c = 0;
                        for (var i in sHistory) {
                            var s = sHistory[i];
                            if (s.status_code === this.value) {
                                c++;
                                // console.log("STATUS HISTORY C::: ",c);
                            }
                        }
                    } else {
                        c = 0;
                    }
                    var suffix = '';
                    if (c > 1) {
                        suffix = ' (' + c + ')';
                    }
                    this.oldValue = this.value;
                    let dmS = this.view.metadata.next_states[this.value];

                    var options = [];
                    this.domainValues = {};
                    for(let k in dmS) {
                        var realSuffix = '';
                        if (k === this.value) {
                            realSuffix = suffix;
                        }
                        options.push({
                            id : k,
                            label : dmS[k] + realSuffix,
                        })
                        this.domainValues[k] = dmS[k] + realSuffix;
                    }
                    this.options = options;
                    this.disabled = !this.modelData.can_update;
                },
                change() {
                    let that = this;
                    let appDialogs = cs.CrudVars.appDialogs;
                    let st = that.getValue();
                    if (st == that.oldValue) {
                        return ;
                    }
                    if (st == 'approve_order') {
                        if (['non_affidabile','sospeso','contenzioso'].indexOf(this.modelData.buyer.status) >= 0) {
                            that.alertWarning('Questo ordine non può essere approvato perchè ha un cliente in stato non affidabile,sospeso o contenzioso',6000);
                            this.setValue(that.oldValue);
                            return ;
                        }
                        if (!that.modelData.service_type_id) {
                            that.alertWarning('Questo ordine non può essere approvato perchè non ha una tipologia di servizio associata',6000);
                            this.setValue(that.oldValue);
                            return
                        }
                    }


                    appDialogs.showStatusDialog({
                        title : 'Modifica stato Ordine',
                        from : that.oldValue,
                        to : st,
                        modelName : 'order',
                        pk : that.modelData.id
                    }, function (result) {
                        if (result) {
                            that.view.reload();
                        } else {
                            //console.debug('oldvaue',that.oldValue);
                            that.value = that.oldValue;
                            //that.setValue(that.oldValue);
                        }
                    });
                },
                disabled() {
                    if (this.value === 'in_review') {
                        return true;
                    }
                    return false;
                }
            },
            team : {
                type : 'w-belongsto',
                label : 'Team',
                labelFields : ['description'],
                href() {
                    return '/#/team-detail/' + this.value.id;
                }

            },
            project : {
                type : 'w-custom',
                ready() {
                    if (!this.modelData.project.description) {
                        this.value = '<span class="text-red-700">Nessun progetto associato</span>';
                        return;
                    }

                    this.value ='';
                    this.value += '<span>' + this.modelData.project.description + '</span>';
                    if (this.modelData.is_new_project) {
                        this.value += '&nbsp;<i class="fa fa-asterisk text-yellow-500" title="Primo ordine di un nuovo progetto"></i>'
                    }

                }
            },
            importo : {
                type : 'w-text',
                numberFormat : {
                    language : 'it-IT',
                    options : { style: "currency", currency: "EUR" }
                }
            },
            backend_user_id : {
                type : 'w-swap-select',
                modelName : 'order',
                disabled() {
                    return !user().isAdmin();
                },
                labelBottom() {
                    return 'Consigliere di riferimento:<br>' + this.modelData.consigliere_socio;
                }
            },
        }
    },
    search : {
        type : 'v-search',
        modelName : 'order',
        searchType :'advanced',
        searchLabel : false,
        actions : ['action-reset'],
        actionsConfig : {
            'action-reset' : {
                text : 'Azzera ricerca'
            }
        },
        fields : [
            'status','backend_user_id',
            'cliente_da_verificare',
            //'project_id',
            'project|description',
            //'team_id',
            'team|description',
            //'buyer_id',
            'buyer|nome_visualizzato',
            //'owner_id',
            'owner|cognome',
            'description'
        ],
        fieldsConfig : {
            description : {
                type: 'w-input',
                label: 'Ordine',
            },
            buyer_id : {
                type : 'w-autocomplete',
                foormName : 'order',
                viewType : 'search',
                labelFields : ['nome_visualizzato'],
                change() {
                    let that = this;
                    that.view.search();
                }
            },
            status : {
                type : 'w-select',
                // layout : {
                //   colClass : 'col-10'
                // },
                change() {
                    let that = this;
                    setTimeout(function () {
                        that.view.search();
                    },10)

                }
            },
            backend_user_id : {
                type : 'w-radio',
                layout : {
                    colClass : 'col-2'
                },
                change() {
                    let that = this;
                    setTimeout(function () {
                        that.view.search();
                    },10)

                }
            },
            cliente_da_verificare : {
                type : 'w-radio',
                layout : {
                    colClass : 'col-2'
                },
                change() {
                    let that = this;
                    setTimeout(function () {
                        that.view.search();
                    },10)

                },
                label: 'Cliente da verificare',
            },
            // project_id : {
            //     type : 'w-select',
            //     change() {
            //         let that = this;
            //         //setTimeout(function () {
            //             that.view.search();
            //         //},10)
            //
            //     }
            // },
            // team_id : {
            //     type : 'w-select',
            //     change() {
            //         let that = this;
            //         //setTimeout(function () {
            //         that.view.search();
            //         //},10)
            //
            //     }
            // },
            project_id : {
                type : 'w-autocomplete',
                foormName : 'order',
                viewType : 'search',
                labelFields : ['description'],
                change() {
                    let that = this;
                    //setTimeout(function () {
                    that.view.search();
                    //},10)

                }
            },
            owner_id : {
                type : 'w-autocomplete',
                foormName : 'order',
                viewType : 'search',
                labelFields : ['cognome','nome','codice_fiscale'],
                extraBind: {
                    'placeholder': "Digita le iniziali di un socio...",
                    'dropdown': true,
                    'option-label': function (obj) {
                        if (!obj.nome) {
                            return null;
                        }
                        return obj.cognome + ' ' + obj.nome + ' - '
                            + ' (CF: ' + (obj.codice_fiscale?obj.codice_fiscale:'Non disp.') + ')';
                    },
                    'option-value': 'id',
                },
                change() {
                    let that = this;
                    //setTimeout(function () {
                    that.view.search();
                    //},10)

                },
                label: 'Socio'
            },
            team_id : {
                type : 'w-autocomplete',
                foormName : 'order',
                viewType : 'search',
                labelFields : ['description'],
                change() {
                    let that = this;
                    //setTimeout(function () {
                    that.view.search();
                    //},10)

                },
                label: 'Team'
            }
        }
    },
    edit : {
        type : 'v-edit',
        modelName : 'order'
    },
    /* --- decommentare se serve avere una form new diversa dall'edit
    edit : {
        type : 'v-edit',
        modelName : 'order'
    },
     */
    /* ---- decommentare se vogliamo la lista con edit inline
    listEdit : {
        type : 'v-list-edit',
        modelName: 'order',
        fieldsConfigEditMode : {
            'id' : 'w-text',
            'email' : 'w-input',
            'banned' : 'w-text'
        },
        fieldsConfig : {
            'email' : 'w-text',
        }
    }
    */
}

