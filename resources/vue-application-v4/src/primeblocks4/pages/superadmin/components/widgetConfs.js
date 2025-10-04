

export default {
    wHiddenConf() {
        return {
            type : 'w-hidden',
            name : 'field1',
            value: "testone",
        }
    },
    wAutocompleteConf() {
        return {
            type : 'w-autocomplete',
            name: 'email',
            labelFields: ['email'],
            value: 2,
            foormName: 'user',
            viewType: 'edit',
            referredData: {
                id: 2,
                email: 'ciullo@gmail.com',
                name : 'Pier Paolo Ciullo',
            },
            clearButton : true,
            extraBind : {
                "option-label" : "name",
            },
            change(event) {
                let that = this;
                console.debug('evento change valore campo',that.getValue(),'valore record selezionate',that.autocompleteValue);
            }
        };
    },

    wImage() {
        return {
            type : 'w-image',
            name : 'field1',
            imageType : 'normal',
            value: 'http://www.repstatic.it/cless/main/common/component/header-footer/2020-v1/img/logo-repubblica.svg',
        }
    },
    wImageAvatarConf() {
        return {
            type : 'w-image',
            name : 'field1',
            imageType : 'avatar',
            value: 'http://www.repstatic.it/cless/main/common/component/header-footer/2020-v1/img/logo-repubblica.svg',
        }
    },
    wTable() {
        return {
            type : 'w-table',
            name : 'field1',
            value : [
                {
                    col1 : 'rowA1',
                    col2 : 'rowA2',
                    col3 : 'rowA3',
                    col4 : 'rowA4'
                },
                {
                    col1 : 'rowB1',
                    col2 : 'rowB2',
                    col3 : 'rowB3',
                    col4 : 'rowB4'
                },
                {
                    col1 : 'rowC1',
                    col2 : 'rowC2',
                    col3 : 'rowC3',
                    col4 : 'rowC4'
                },
                {
                    col1 : 'rowD1',
                    col2 : 'rowD2',
                    col3 : 'rowD3',
                    col4 : 'rowD4'
                }
            ]
        }
    },
    wTextConf() {
        return {
            type : "w-text",
            name : 'field1',
            value: "testone",
        }
    },
    wInputConf() {
        return {
            type : 'w-input',
            inputType: 'text',
            value: "220",
            change(event) {
                let that = this;
                console.log('value',that.getValue(),'that',that,'event',event);
            }
        }
    },
    wInputSetConf() {
        return {
            type : 'w-input-set',
            value: 0,
            name: 'banned',
            modelName: 'user',
            routeName : 'set',
            modelData : {
                id : 3,
            },
            change () {
                console.log('change ',this.getValue())
            }
        }
    },
    wSelectConf() {
        return {
            value: 20,
            name: 'field1',
            type : 'w-select',
            domainValues: {
                10: "Dieci",
                20: "Venti",
                30: "Trenta",
            },
            change() {
                console.log('value', this.value);
            }
        };
    },
    wSelectButtonConf() {
        return {
            value: 20,
            name: 'field1',
            type : 'w-select-button',
            domainValues: {
                10: "Dieci",
                20: "Venti",
                30: "Trenta",
            },
            change() {
                console.log('value', this.value);
            }
        };
    },

    wCheckboxConf() {
        return {
            type : 'w-checkbox',
            value : ["1","4"],
            domainValues : {
                1 : 'Uno',
                2 : 'Due',
                3 : 'Tre',
                4 : 'Quattro',
                5 : 'Cinque'
            },
            change() {
                console.log(this.value);
            }
        };
    },
    wRadioConf() {
        return {
            type : 'w-radio',
            value: '1',
            name: 'field1',
            domainValues: {
                0: 'Zero',
                1: 'Uno',
                2: 'Due',
                3: 'Tre'
            },
            domainValuesOrder: [3, 2, 1, 0],
            change() {
                console.log('change ', this.getValue())
            }
        }

    },
    wHasmany(hasmanyType) {
        let wh =  {
            name: 'field1',
            label : 'Hasmany',
            type : 'w-hasmany',
            hasmanyType : hasmanyType,
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
                        //type : 'w-input',
                        rules:"required",
                    },
                    resource: {
                        //type : 'w-input',
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
            limit: 10,

            change() {
                console.log('change ' , this.getValue())
            }

        }
        if (hasmanyType == 'list') {
            wh.hasmanyConf.actions = ['action-insert','action-delete-selected'];
        }
        return wh;
    },
    wBelongstoConf() {
        return {
            name: 'user',
            type : 'w-belongsto',
            cRef: 'wTest',
            separator : '--',
            labelFields : ['email'],
            value : {
                "id": 3,
                "email": "amministratore@amministratore.it",
            },
        }
    },
    wBelongstoManyConf() {
        return {
            name: 'user',
            type : 'w-belongsto-many',
            separator : '--',
            labelFields : ['col1','col2'],
            value : [
                {
                    col1 : 'rowA1',
                    col2 : 'rowA2',
                    col3 : 'rowA3',
                    col4 : 'rowA4'
                },
                {
                    col1 : 'rowB1',
                    col2 : 'rowB2',
                    col3 : 'rowB3',
                    col4 : 'rowB4'
                },
                {
                    col1 : 'rowC1',
                    col2 : 'rowC2',
                    col3 : 'rowC3',
                    col4 : 'rowC4'
                },
                {
                    col1 : 'rowD1',
                    col2 : 'rowD2',
                    col3 : 'rowD3',
                    col4 : 'rowD4'
                }
            ]
        }
    },
    wCustomConf() {
        return {
            type : 'w-custom',
            value : "ciao <b>tutti</b>",
        }
    },
    wColorPickerConf() {
        return {
            type : 'w-color-picker',
            value : "#FF00FF",
            change() {
                console.debug('color picker value',this.getValue());
            }
        }
    },
    wDatePickerConf() {
        return {
            value : '2020-12-20',
            buttonClear : true,
            type : 'w-date-picker',
            change() {
                console.log('date-picker',this.value)
            }
            // buttonClear: false,
        };
    },
    wDateRangePickerConf() {
        return {
            value : [
                '2020-12-20','2020-12-25'
            ],
            buttonClear : true,
            type : 'w-date-range-picker',
            change() {
                console.log('date-range-picker',this.value)
            }
            // buttonClear: false,
        };
    },
    wDateTextConf() {
        return {
            type : 'w-date-text',
            value : '2021-12-09',
            displayFormat : 'LLL'
        }
    },
    wDateTextConf2() {
        return {
            type : 'w-date-text',
            value: '2021-12-18',
            displayFormat: 'giorno DD [anno] YYYY [mese] MM'
        }
    },
    wTextareaConf() {
        return  {
            type : 'w-textarea',
            value : 'text area prvoa',
            change() {
                console.log('textarea value ', this.getValue());
            }
        }
    },
    wMultiSelectConf() {
        return {
            value: [20,30],
            name: 'field1',
            type : 'w-multi-select',
            domainValues: {
                10: "Dieci",
                20: "Venti",
                30: "Trenta",
                40: 'Quaranta'
            },
            change() {
                console.log('change ' , this.getValue())
            }
        };
    },
    wSwapConf() {
        return {
            type : 'w-swap',
            value: 0,
            name: 'banned',
            onIcon : 'fa fa-circle',
            modelData: {
                id: 4
            },
            modelName: 'user',
            routeName : 'set',
            change () {
                console.log('change swap ',this.getValue())
            }
        }
    },
    wSwapSelectConf() {
        return {
            type : 'w-swap-select',
            value: 0,
            name: 'banned',
            onIcon : 'fa fa-circle',
            modelData: {
                id: 4
            },
            modelName: 'user',
            routeName : 'set',
            domainValues : {
                0 : 'No',
                1 : 'Si',
                2 : 'Si e No'
            },
            change () {
                console.log('change ',this.getValue())
            }
        }
    },
    wStatusConf() {
        return {
            value : 7,
            statusType: 'icon',
            type : 'w-status',
            domainValues: {
                5: 'fa fa-times text-red-600',
                6: 'fa fa-gear text-green-600',
                7: 'fa fa-question text-yellow-600'
            },
        };
    },
    wStatusTextConf() {
        return {
            value : 5,
            statusType: 'text',
            type : 'w-status',
            domainValues: {
                5: 'Ciao bello',
                6: 'Prova',
                7: 'Sette'
            },
        };
    },
    wTexthtmlConf() {
        return {
            value : 'text area prvoa',
            name : 'field1',
            type : 'w-texthtml',
            change() {
                let that = this;
                console.log('change',that.getValue())
            }
        };
    },
    wEditor() {

        return {
            value : 'text area prvoa',
            name : 'field1',
            type : 'w-editor',
            change() {
                let that = this;
                console.log('change',that.getValue())
            }
        };
    },
    wUploadConf() {
        return {
            name: 'field1',
            type : 'w-upload',
            maxFileSize: "2M",
            extensions: ['pdf', 'xls', 'png'],
            modelName : 'user',
            value : {
                "id": "files/allegati/allegato_1_1643619308.pdf",
                "url": "downloadmediable/attachment/1",
                "mimetype": "application/pdf"
            },
            // campi da inviare nella richiesta ajax di upload file
            ajaxFields: {
                //upload_type : 'attachment',
                resource_type: 'attachment',
                field:'name',
            },
            methods: {
                change: function () {
                    console.log('my change', this.getValue())
                },
            }
        };
    },
    wUploadAjaxConf() {
        return {
            name: 'field1',
            type : 'w-upload-ajax',
            maxFileSize: "2M",
            extensions: ['pdf', 'xls', 'png'],
            modelName : 'user',
            value : {
                "id": "files/allegati/allegato_1_1643619308.pdf",
                "url": "downloadmediable/attachment/1",
                "mimetype": "application/pdf"
            },
            // campi da inviare nella richiesta ajax di upload file
            ajaxFields: {
                //upload_type : 'attachment',
                resource_type: 'attachment',
                field:'name',
            },
            methods: {
                change: function () {
                    console.log('my change', this.getValue())
                },
            }
        };
    },
    wChipConf() {
        return {
            type : 'w-chip',
            name : 'field1',
            value: ["testone"],
            change() {
                console.log('chip value',this.getValue())
            }
        }
    },
    wObject() {
        return {
            type : 'w-object',
            name : 'oggetto',
            value: {
                titolo : 'oggetto generico',
                nome : 'proprietà nome',
                anni : 20,
                soldi : 0
            },
        }
    },
    wLeafLeft() {
        return {
            type : 'w-leaf-let',
            name : 'mappa',
            value: [
                [43.3,11.7],
                [38.3,7.5]
            ],
        }
    },
    wLeafLeftIcon() {
        return {
            type : 'w-leaf-let',
            name : 'mappa',
            "markerIcon":"http://www.repstatic.it/cless/main/common/component/header-footer/2020-v1/img/logo-repubblica.svg",
            value: [
                [43.3,11.7],
                [38.3,7.5]
            ],
        }
    }
}



