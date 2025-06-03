<template>
    <div>
        <v-list :conf="rolesConf"></v-list>
        <v-list ref="pView" :conf="permissionsConf">
            <!-- :value="value" :metadata="metadata" :widgetsConfig="widgetsConfig"  -->
            <template #content="slotProps">
                Contenuto
            </template>
        </v-list>
        <DataView :value="permessi" :layout="layout">
            <template #header>
                <div class="flex justify-content-end">
                    <DataViewLayoutOptions v-model="layout" />
                </div>
            </template>

            <template #list="slotProps">

                <div class="grid grid-nogutter">
                    <div v-for="(item, index) in slotProps.items" :key="index" class="col-12">
                        <div class="flex flex-column sm:flex-row sm:align-items-center p-4 gap-3" :class="{ 'border-top-1 surface-border': index !== 0 }">
                            <div>lista</div>
                            <!--                            <div class="md:w-10rem relative">-->
<!--                                <img class="block xl:block mx-auto border-round w-full" :src="`https://primefaces.org/cdn/primevue/images/product/${item.image}`" :alt="item.name" />-->
<!--                                <Tag :value="item.inventoryStatus" :severity="getSeverity(item)" class="absolute" style="left: 4px; top: 4px"></Tag>-->
<!--                            </div>-->
<!--                            <div class="flex flex-column md:flex-row justify-content-between md:align-items-center flex-1 gap-4">-->
<!--                                <div class="flex flex-row md:flex-column justify-content-between align-items-start gap-2">-->
<!--                                    <div>-->
<!--                                        <span class="font-medium text-secondary text-sm">{{ item.category }}</span>-->
<!--                                        <div class="text-lg font-medium text-900 mt-2">{{ item.name }}</div>-->
<!--                                    </div>-->
<!--                                    <div class="surface-100 p-1" style="border-radius: 30px">-->
<!--                                        <div class="surface-0 flex align-items-center gap-2 justify-content-center py-1 px-2" style="border-radius: 30px; box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.04), 0px 1px 2px 0px rgba(0, 0, 0, 0.06)">-->
<!--                                            <span class="text-900 font-medium text-sm">{{ item.rating }}</span>-->
<!--                                            <i class="pi pi-star-fill text-yellow-500"></i>-->
<!--                                        </div>-->
<!--                                    </div>-->
<!--                                </div>-->
<!--                                <div class="flex flex-column md:align-items-end gap-5">-->
<!--                                    <span class="text-xl font-semibold text-900">${{ item.price }}</span>-->
<!--                                    <div class="flex flex-row-reverse md:flex-row gap-2">-->
<!--                                        <Button icon="pi pi-heart" outlined></Button>-->
<!--                                        <Button icon="pi pi-shopping-cart" label="Buy Now" :disabled="item.inventoryStatus === 'OUTOFSTOCK'" class="flex-auto md:flex-initial white-space-nowrap"></Button>-->
<!--                                    </div>-->
<!--                                </div>-->
<!--                            </div>-->
                        </div>
                    </div>
                </div>
            </template>

            <template #grid="slotProps">
                <div class="grid grid-nogutter">
                    <div class="col-12 p-2"> <!--v-for="(item, index) in slotProps" :key="index" -->
                        <div class="p-4 border-1 surface-border surface-card border-round flex flex-column">
                            <div class="surface-50 flex justify-content-center border-round p-3">
                                <div class="relative mx-auto"> {{slotProps.data.model}}
<!--                                    <img class="border-round w-full" :src="`https://primefaces.org/cdn/primevue/images/product/${item.image}`" :alt="item.name" style="max-width: 300px"/>-->
<!--                                    <Tag :value="item.inventoryStatus" :severity="getSeverity(item)" class="absolute" style="left: 4px; top: 4px"></Tag>-->
                                </div>
                            </div>
                            <div class="pt-4">
                                <div class="flex flex-row justify-content-between align-items-start gap-2">
                                    <div v-for="permesso in slotProps.data.permessi" :key="permesso.id">
                                        <Checkbox  v-model="permesso.value" :binary="true"></Checkbox> {{permesso.id}}
                                    </div>

<!--                                    <div>-->
<!--                                        <span class="font-medium text-secondary text-sm">{{ item.category }}</span>-->
<!--                                        <div class="text-lg font-medium text-900 mt-1">{{ item.name }}</div>-->
<!--                                    </div>-->
<!--                                    <div class="surface-100 p-1" style="border-radius: 30px">-->
<!--                                        <div class="surface-0 flex align-items-center gap-2 justify-content-center py-1 px-2" style="border-radius: 30px; box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.04), 0px 1px 2px 0px rgba(0, 0, 0, 0.06)">-->
<!--                                            <span class="text-900 font-medium text-sm">{{ item.rating }}</span>-->
<!--                                            <i class="pi pi-star-fill text-yellow-500"></i>-->
<!--                                        </div>-->
<!--                                    </div>-->
                                </div>
                                <div class="flex flex-column gap-4 mt-4">
<!--                                    <span class="text-2xl font-semibold text-900">${{ item.price }}</span>-->
                                    <div class="flex gap-2">
                                        <Button icon="pi pi-delete" class="flex-auto white-space-nowrap">Delete</Button>
<!--                                        <Button icon="pi pi-shopping-cart" label="Buy Now" :disabled="item.inventoryStatus === 'OUTOFSTOCK'" class="flex-auto white-space-nowrap"></Button>-->
<!--                                        <Button icon="pi pi-heart" outlined></Button>-->
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </template>
        </DataView>

    </div>



    <Dialog v-model:visible="display" :modal="true" :style="{width: '40vw'}">
        <template #header>
            <h3>{{ title }}</h3>
        </template>
        <div class="flex mb-3">
            <label>Modello</label>
            <Dropdown class="w-7 ml-2" v-model="modelSelected" :options="modelOptions"
            optionLabel="label" optionValue="id" @change="modelSelect"/>
        </div>
        <div class="grid">
            <div class="col-2" v-for="(permission) in permissions" :key="permessi.id">
                <Checkbox v-model="permissionsSelected" :value="permission.code" />
                <label>{{permission.label}}</label>
            </div>
        </div>
        <template #footer>
            <Button :label="cupparis.CrudCore.translate('app.ok')" icon="pi pi-check" autofocus v-on:click="addPermessi()" />
        </template>
    </Dialog>
</template>
<script setup>
import {ref, onMounted, watch} from 'vue'
import cupparis from 'cupparis-primevue'
import DataView from "primevue/dataview";
import Checkbox from "primevue/checkbox";

const pView = ref();
const display = ref(false);
const title = ref(cupparis.CrudCore.translate('seleziona modello e permessi') );
const modelOptions = ref([
    {
        id : 'aa',
        label : 'Prova'
    }
]);
const modelSelected = ref(null);
const permissionsSelected = ref([]);
const roleSelected = ref({});

const permessi = ref([]);
const layout = ref('grid');

const permissions = ref([
    // {
    //     code : 'list',
    //     label : 'list'
    // },
    // {
    //     code : 'create',
    //     label : 'create'
    // },
    // {
    //     code : 'delete',
    //     label : 'delete'
    // },
    // {
    //     code : 'view',
    //     label : 'view'
    // },
])
const rolesConf = {
    modelName : 'role',
    type : 'v-list',
    actions : ['action-view'],
    actionsConfig : {
        'action-view' : {
            execute() {
                console.debug('roles',this.modelData);
                roleSelected.value = this.modelData;
                //pView.value.setParams({'s_roles|id':this.modelData.id})
                //pView.value.constraintValue = this.modelData.id;
                title.value = this.modelData.name + ': ' + cupparis.CrudCore.translate('seleziona modello e permessi');
                pView.value.load();
            }
        }
    }
}

const permissionsConf =  {
    modelName : 'permission',
    type : 'v-list',
    actions : ['action-delete','action-insert'],
    autoload : false,
    afterLoadData() {
        getModels();
        //getModelPermessi('user');
    },
    actionsConfig : {
        'action-insert' : {
            execute() {
                display.value = true;
            }
        }
    }
}
const baseRoute = '/api/superadmin';

onMounted(() => {
    console.debug('onmounted');
    cupparis.Server.get(baseRoute+'/models-permessi',{},(json) => {
        console.debug('json',json);
        modelOptions.value = json.models;
        for (let i in json.permessi) {
            permissions.value.push({
                code : json.permessi[i],
                label : json.permessi[i],
            })
        }
    })
})

//
// watch(roleSelected, () => {
//     getModels();
// })

/**
 * dato un modello ritorna tutti i permessi presi dalla chiamata models/permessi attribuito ad un ruolo
 */
function getModelPermessi(model) {
    let perms = pView.value.value.filter(a => a.name.includes(model) );
    console.debug('permessi',perms,pView.value.value);
    let result = [];
    for (let permesso of perms) {
        let tmp = permesso.name.split(' ');
        result.push({
            id : tmp[0],
            value : true,
        })
        //result[tmp[0]] = true;
    }
    return result;
}

function getModels() {
    let models = {};
    permessi.value = [];
    for(let permesso of pView.value.value) {

        let tmp = permesso.name.split(' ');
        models[tmp[1]] = tmp[1];
    }
    for (let model in models) {
        console.debug('model',model);
        permessi.value.push({
            model : model,
            permessi : getModelPermessi(model),
        })
    }
    console.debug('models', models, permessi.value);
}

function addPermessi() {
    display.value = false;
    cupparis.Server.post(baseRoute+'/save-permessi',{
        role_id : roleSelected.value.id,
        modelName : modelSelected.value,
        permessi : permissionsSelected.value,
    },(json) => {

    })
}

function modelSelect(event) {
    console.debug('selezionato modello',modelSelected.value);
}
</script>
<style>
div.p-dropdown-panel {
    z-index:10000 !important;
}
</style>
