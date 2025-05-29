<script>
import cs from "cupparis-primevue"
import Structure from "./Structure.vue";
import EditorCode from "./EditorCode.vue";
import HeaderDbService from "./HeaderDbService.vue";
export default {
    name: "DbService",
    components: {HeaderDbService, EditorCode, Structure},
    props : ['data'],
    emits : ['call-action'],
    watch: {
      data(value) {
          this.response(value);
      }
    },
    mounted() {
        //this.$emit('call-action',['db','info',[] ]);
        this.getTables();
    },
    data() {
        return {
            info : "",
            tables : [],
            fields : [],
            tableSelected : null,
            model : 'user4',
            mode : 'structure',
            checkResult : null,
            modelConf : {},
            error : null,
            selectedFields : null,
        }
    },
    methods : {
        check() {
            if (!this.model || !this.tableSelected) {
                cs.alertError('definire tutte le variabile');
                return ;
            }
            this.$emit('call-action',{
                service : 'db',
                action : 'check',
                params : {
                    table : this.tableSelected.name,
                    model : this.model
                }
            })
        },

        getInfo() {
            this.$emit('call-action',{
                service : 'db',
                action : 'info',
                params : {}
            });
        },
        getTables() {
            this.$emit('call-action',{
                service : 'db',
                action : 'list-tables',
                params : {}
            });
        },
        getFields() {
            this.$emit('call-action',{
                service : 'db',
                action : 'list-fields',
                params : {
                    'table': this.tableSelected.name
                }
            });
        },
        genera() {
            let that = this;
            let warnings = [];
            for(let k in this.checkResult) {
                if (this.checkResult[k] && this.$refs.structure.generaImplementazione[k]) {
                    warnings.push(k + " verrà sovrascritto");
                }
            }
            if (warnings.length > 0) {
                warnings = ['Attenzione'].concat(warnings);
                cs.CrudCore.confirmDialog(warnings,{},{
                    ok() {
                        that._genera();
                    }
                })
                return ;
            }
            that._genera();
        },

        saveCode() {
            let that = this;
            let msg = "Salvo configurazione lato client?";
            if (that.mode=='codephp') {
                msg = "Salvo configurazione lato server?";
            }
            cs.CrudCore.confirmDialog(msg,{},{
                ok() {
                    let args = {
                        service : 'db',
                        action : 'save-conf',
                        params : {
                            'table': that.tableSelected.name,
                            'model' :that.model,
                            // 'conf-type' : 'js',
                            // 'conf' : that.$refs.code.getCodeJs()
                        }
                    };
                    if (that.mode == 'codejs') {
                        args.params['conf-type'] = 'js';
                        args.params['conf'] = that.$refs.codejs.getCodeJs()
                    } else {
                        args.params['conf-type'] = 'php';
                        args.params['conf'] = that.$refs.codephp.getCodeJs()
                    }
                    that.$emit('call-action',args);
                }
            });
        },

        response(data) {
            console.debug('ricevuto data',data);
            if (data.error) {
                this.error += data.msg; //.split("\r\n").reverse().join("\r\n");
                return ;
            }
            switch (data.command) {
                case 'info' :
                    this.info = data.msg;
                    break;
                case 'list-tables':
                    this.tables = data.msg;
                    break;
                case 'list-fields':
                    this.fields = data.msg;
                    break;
                case 'check':
                    this.checkResult = data;
                    console.debug('carico conf modello','Model'+cs.CrudCore.pascalCase(this.model))
                    this.modelConf = cs.CrudVars.modelConfs['Model'+cs.CrudCore.pascalCase(this.model)] || {};
                    break;
                case 'generate':
                    cs.CrudCore.messageDialog(data.msg);
                    break;
                case 'save-conf':
                    cs.CrudCore.messageDialog(data.msg);
                    break;
                default:
                    cs.CrudCore.alertError('azione non riconsciuta ' + data.command);
                    break;
            }
        },

        preview() {
            let confModel = 'Model'+cs.CrudCore.pascalCase(this.model);
            window.open('/#/manage/' + confModel);

            // console.debug('manage confs',cs.CrudVars.modelConfs,confModel,cs.CrudVars.modelConfs[confModel])
            // cs.CrudCore.componentDialog('c-manage',cs.CrudVars.modelConfs[confModel]);
        },
        _genera() {
            let that = this;
            that.$emit('call-action',{
                service : 'db',
                action : 'generate',
                params : {
                    table: that.tableSelected.name,
                    model : that.model,
                    deploy : that.$refs.structure.generaImplementazione,
                    modelConf : {
                        searchConf : {
                            fields : that.$refs.structure.confsFields.searchFields[1].map(a => a.name),
                        },
                        listConf : {
                            fields : that.$refs.structure.confsFields.listFields[1].map(a => a.name),
                        },
                        editConf : {
                            fields : that.$refs.structure.confsFields.editFields[1].map(a => a.name),
                        }
                    }
                }
            })
        },

    },
}
</script>

<template>
    <div class="flex gap-3">

    </div>
    <Toolbar>
        <template #start>
            <Button icon="fa-solid fa-folder-tree" class="mr-2" severity="secondary" @click="mode='structure'"/>
            <Button icon="fa-brands fa-js" class="mr-2" severity="secondary" @click="mode='codejs'" />
            <Button icon="fa-brands fa-php" class="mr-2" severity="secondary" @click="mode='codephp'" />
            <Button icon="fa fa-save" severity="secondary"  @click="saveCode" />
        </template>

        <template #center>
            <div class="flex gap-2">
                <div class="pt-2">Tabella</div>
                <div><Dropdown :options="tables" v-model="tableSelected" optionLabel="name" @change="getFields"></Dropdown></div>
            </div>
            <div class="flex gap-2 ml-3">
                <div class="pt-2">Modello</div>
                <div><InputText v-model="model" @change="checkResult=null"/></div>
            </div>
<!--            <IconField iconPosition="left">-->
<!--                <InputIcon>-->
<!--                    <i class="pi pi-search" />-->
<!--                </InputIcon>-->
<!--                <InputText placeholder="Search" />-->
<!--            </IconField>-->
        </template>

        <template #end>
            <div class="flex flex-column gap-2">
                <div title="clicca su check per sapere l'implementazione di questo modello/table"><Button @click="check" label="Check" :disabled="!model || !tableSelected"> </Button></div>
            </div>
<!--            <SplitButton label="Save" :model="items"></SplitButton>-->
        </template>
    </Toolbar>
    <HeaderDbService v-if="checkResult" :response="checkResult" @genera="genera" @preview="preview"></HeaderDbService>
<!--    <Structure v-if="checkResult && mode=='structure'" ref="structure" :response="checkResult" :fields="fields" @genera="genera" @preview="preview"></Structure>-->
    <EditorCode v-if="checkResult && mode=='codejs'" ref="codejs" :response="checkResult" :conf="modelConf" mode="js"></EditorCode>
    <EditorCode v-if="checkResult && mode=='codephp'" ref="codephp" :response="checkResult" :conf="modelConf" mode="php"></EditorCode>
    <InlineMessage severity="danger" v-if="error">{{error}}</InlineMessage>
</template>

<style scoped>

</style>
