<script>
import cs from "cupparis-primevue"
import Checkbox from "primevue/checkbox";
const vList = cs.vList;
export default {
    name: "RolesService",
    components: {Checkbox, vList},
    props : ['data'],
    emits : ['call-action'],
    watch: {
      data(value) {
          this.response(value);
      }
    },
    mounted() {
        //this.$emit('call-action',['db','info',[] ]);
        //this.getTables();
        this.getConf();
    },
    data() {
        let that = this;
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
            models:[],
            modelsPick : [[],[]],
            permissions : [],
            permissionsPick : [[],[]],
            roles : [],
            roleSelected : null,
            rolesLoaded : false,
            title : cs.CrudCore.translate('seleziona modello e permessi'),
            roleModels : {},  // lista dei modelli con i permessi di un ruolo
            rolesConf : {
                modelName : 'role',
                type : 'v-list',
                actions : ['action-view'],
                actionsConfig : {
                    'action-view' : {
                        execute() {
                            let tv = this;
                            that.roleSelected = tv.modelData;
                            that.loadRoles(that.roleSelected.name);
                            // console.debug('roles',tv.modelData);
                            // that.title = this.modelData.name + ': ' + cs.CrudCore.translate('seleziona modello e permessi');
                            //pView.value.load();
                        }
                    }
                }
            }
        }
    },
    methods : {
        check() {
            if (!this.model || !this.tableSelected) {
                cs.alertError('definire tutte le variabile');
                return ;
            }
            this.$emit('call-action',{
                service : 'roles',
                action : 'check',
                params : {
                    table : this.tableSelected.name,
                    model : this.model
                }
            })
        },

        getConf() {
            this.$emit('call-action',{
                service : 'roles',
                action : 'conf',
                params : {}
            });
        },
        getTables() {
            this.$emit('call-action',{
                service : 'roles',
                action : 'list-tables',
                params : {}
            });
        },
        getFields() {
            this.$emit('call-action',{
                service : 'roles',
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

        saveGlobal() {
            let that = this;
            if (that.modelsPick[1].length == 0 || that.permissionsPick[1].length == 0) {
                cs.CrudCore.errorDialog('Devi selezionare almeno un modello e un permesso');
                return ;
            }
            cs.CrudCore.confirmDialog('Sovrascrivo tutti i permessi?',{},{
                ok() {
                    let args = {
                        service : 'roles',
                        action : 'save-glob',
                        params : {
                            'models': that.modelsPick[1],
                            'permissions' :that.permissionsPick[1],
                        }
                    };
                    that.$emit('call-action',args);
                }
            });
        },

        response(data) {
            console.debug('ricevuto data',data);
            if (data.error) {
                cs.CrudCore.alertError(data.msg);
                return ;
            }
            switch (data.command) {
                case 'info' :
                    this.info = data.msg;
                    break;
                case 'conf':
                    //this.tables = data.msg;
                    console.debug('conf',data.msg);
                    this.models = data.msg.models;
                    this.permissions = data.msg.permissions;
                    this.preparePick();
                    break;
                case 'list-fields':
                    this.fields = data.msg;
                    this.models = data.msg.models;
                    this.permissions = data.msg.permissions;
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

        loadRoles(roleName) {
            let that = this;
            cs.Server.post('/api/cup-gui/permissions/'+roleName,{},(json) => {
                console.debug('jsong',json);
                if (json.error) {
                    cs.CrudCore.alertError(json.msg);
                    return ;
                }
                that.rolesLoaded = true;
                that.roleModels = json.permissions;
            })
        },
        preparePick() {
            let that = this;
            that.modelsPick[0] = [];
            that.modelsPick[1] = [];
            that.permissionsPick[0] = [];
            that.permissionsPick[1] = [];
            for (let model of that.models) {
                that.modelsPick[0].push({
                    id : model,
                    name : model,
                    label : model
                })
            }
            for (let permission of that.permissions) {
                that.permissionsPick[0].push({
                    id : permission,
                    name : permission,
                    label : permission
                })
            }
        },

        updatePermessi(model) {
            console.debug('updatePermessi ',this.roleModels[model]);
        }
    },
}
</script>

<template>
    <div class="flex flex-column gap-3">
        <vList class="w-full" :conf="rolesConf"></vList>
        <div v-if="rolesLoaded">
            <h2>{{roleSelected.name}}</h2>
            <div class="grid">
                <div class="col-6 h-full">
                    <PickList class="h-full" v-model="modelsPick" dataKey="id">
                        <template #item="slotProps">
                            <div>{{ slotProps.item.name }}</div>
                        </template>
                    </PickList>
                </div>
                <div class="col-6 h-full">
                    <PickList class="h-full" v-model="permissionsPick" dataKey="id" data-label="name">
                        <template #item="slotProps">
                            <div>{{ slotProps.item.name }}</div>
                        </template>
                    </PickList>
                </div>
            </div>
            <div class="my-3">
                <Button @click="saveGlobal()">Associa globalment al modello {{roleSelected.name}} i modelli e permessi selezionati</Button>
            </div>
            <h3>Situazione corrente</h3>
            <div class="grid">
                <Panel v-for="(permessi,model) in roleModels" class="col-3" :key="model" :header="model">
                    <div v-for="(permesso,key) in permessi" :key="key">
                        <Checkbox  v-model="permessi[key]" :value="key" @change="updatePermessi(model)" :binary="true"></Checkbox> {{key}}
                    </div>
                </Panel>
            </div>
        </div>
    </div>
<!--    <Toolbar>-->
<!--        <template #start>-->
<!--            <Button icon="fa-solid fa-folder-tree" class="mr-2" severity="secondary" @click="mode='structure'"/>-->
<!--            <Button icon="fa-brands fa-js" class="mr-2" severity="secondary" @click="mode='codejs'" />-->
<!--            <Button icon="fa-brands fa-php" class="mr-2" severity="secondary" @click="mode='codephp'" />-->
<!--            <Button icon="fa fa-save" severity="secondary"  @click="saveCode" />-->
<!--        </template>-->

<!--        <template #center>-->
<!--            <div class="flex gap-2">-->
<!--                <div class="pt-2">Tabella</div>-->
<!--                <div><Dropdown :options="tables" v-model="tableSelected" optionLabel="name" @change="getFields"></Dropdown></div>-->
<!--            </div>-->
<!--            <div class="flex gap-2 ml-3">-->
<!--                <div class="pt-2">Modello</div>-->
<!--                <div><InputText v-model="model" @change="checkResult=null"/></div>-->
<!--            </div>-->
<!--        </template>-->

<!--        <template #end>-->
<!--            <div class="flex flex-column gap-2">-->
<!--                <div title="clicca su check per sapere l'implementazione di questo modello/table"><Button @click="check" label="Check" :disabled="!model || !tableSelected"> </Button></div>-->
<!--            </div>-->
<!--&lt;!&ndash;            <SplitButton label="Save" :model="items"></SplitButton>&ndash;&gt;-->
<!--        </template>-->
<!--    </Toolbar>-->
<!--    <InlineMessage severity="danger" v-if="error">{{error}}</InlineMessage>-->
</template>

<style scoped>

</style>
