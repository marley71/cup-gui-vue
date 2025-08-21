<script>
export default {
    name: "Structure",
    props : ['response','fields'],
    emits : ['genera','preview'],
    watch: {
        response(newValue) {
            console.debug('wathc',newValue);
            if (newValue) {
                for(let k in newValue.msg) {
                    this.generaImplementazione[k] = !newValue.msg[k];
                }
                this._setConf();
            }
        }
    },
    mounted() {
        if (this.response) {
            for(let k in this.response.msg) {
                this.generaImplementazione[k] = !this.response.msg[k];
            }
            this._setConf()
        }
    },
    data() {
        return {
            generaImplementazione : {},
            confsFields : {
                searchFields : [[],[]],
                listFields : [[],[]],
                editFields : [[],[]],
            },
        }
    },
    methods: {
        _setConf() {
            let data = this.response;
            this.confsFields.searchFields = [[],[]];
            this.confsFields.listFields = [[],[]];
            this.confsFields.editFields = [[],[]];

            console.debug('_setConf',this.fields,data.confs.jsConf.searchFields);
            if (data.confs.jsConf.searchFields) {
                for (let i in this.fields) {
                    if (data.confs.jsConf.searchFields.indexOf(this.fields[i].name) >= 0) {
                        this.confsFields.searchFields[1].push(this.fields[i]);
                    } else {
                        this.confsFields.searchFields[0].push(this.fields[i]);
                    }
                }
            } else {
                this.confsFields.searchFields[0] = [];
                this.confsFields.searchFields[1] = this.fields;
            }

            if (data.confs.jsConf.listFields) {
                for (let i in this.fields) {
                    if (data.confs.jsConf.listFields.indexOf(this.fields[i].name) >= 0) {
                        this.confsFields.listFields[1].push(this.fields[i]);
                    } else {
                        this.confsFields.listFields[0].push(this.fields[i]);
                    }
                }
            } else {
                this.confsFields.listFields[0] = [];
                this.confsFields.listFields[1] = this.fields;
            }

            if (data.confs.jsConf.editFields) {
                for (let i in this.fields) {
                    if (data.confs.jsConf.editFields.indexOf(this.fields[i].name) >= 0) {
                        this.confsFields.editFields[1].push(this.fields[i]);
                    } else {
                        this.confsFields.editFields[0].push(this.fields[i]);
                    }
                }
            } else {
                this.confsFields.editFields[0] = [];
                this.confsFields.editFields[1] = this.fields;
            }
            //
            //
            // this.confsFields.listFields[0] = [];
            // this.confsFields.listFields[1] = this.fields;
            // this.confsFields.editFields[0] = [];
            // this.confsFields.editFields[1] = this.fields;
        }
    }
}
</script>

<template>
    <div class="flex flex-column" v-if="response">
        <div class="mt-3" >
            <div class="flex w-full align-content-center">
                <div class="flex-grow-1">
                    <h6>Implementazioni esistenti</h6>
                    <div class="flex gap-4">
                        <div class="flex flex-column align-items-center" v-for="(value,key) in response.msg" :key="key">
                            <div>{{key}}</div>
                            <i v-if="value" class="fa fa-check-circle"></i>
                            <i v-else class="fa fa-times"></i>
                        </div>
                    </div>
                </div>

                <div class="flex-grow-1">
                    <h6>Scegli cosa generare</h6>
                    <div class="flex">
                        <div v-for="(value,key) in generaImplementazione" :key="key">
                            {{key}} <Checkbox v-model="generaImplementazione[key]" :value="value" :binary="true"></Checkbox>
                        </div>
                    </div>
                </div>

            </div>

        </div>
        <hr>
        <div class="flex flex-column gap-2 w-full">
            <h6>Configurazione lato client</h6>
            <TabView>
                <TabPanel header="Search">
                    <PickList v-model="confsFields.searchFields" listStyle="height:342px" dataKey="name" breakpoint="1400px">
                        <template #sourceheader> Available </template>
                        <template #targetheader> Selected </template>
                        <template #item="slotProps">
                            <div class="flex flex-wrap p-2 align-items-center gap-3">
                                <!--                                <img class="w-4rem flex-shrink-0 border-round" :src="'https://primefaces.org/cdn/primevue/images/product/' + slotProps.item.image" :alt="slotProps.item.name" />-->
                                <div class="flex-1 flex flex-column gap-2">
                                    <span class="font-bold">{{ slotProps.item.name }}</span>
                                    <div class="flex align-items-center gap-2">
                                        <i class="pi pi-tag text-sm"></i>
                                        <span>{{ slotProps.item.type }}</span>
                                    </div>
                                </div>
                                <!--                                <span class="font-bold">$ {{ slotProps.item.price }}</span>-->
                            </div>
                        </template>
                    </PickList>
                </TabPanel>
                <TabPanel header="Lista">
                    <PickList v-model="confsFields.listFields" listStyle="height:342px" dataKey="name" breakpoint="1400px">
                        <template #sourceheader> Available </template>
                        <template #targetheader> Selected </template>
                        <template #item="slotProps">
                            <div class="flex flex-wrap p-2 align-items-center gap-3">
                                <!--                                <img class="w-4rem flex-shrink-0 border-round" :src="'https://primefaces.org/cdn/primevue/images/product/' + slotProps.item.image" :alt="slotProps.item.name" />-->
                                <div class="flex-1 flex flex-column gap-2">
                                    <span class="font-bold">{{ slotProps.item.name }}</span>
                                    <div class="flex align-items-center gap-2">
                                        <i class="pi pi-tag text-sm"></i>
                                        <span>{{ slotProps.item.type }}</span>
                                    </div>
                                </div>
                                <!--                                <span class="font-bold">$ {{ slotProps.item.price }}</span>-->
                            </div>
                        </template>
                    </PickList>
                </TabPanel>
                <TabPanel header="Edit">
                    <PickList v-model="confsFields.editFields" listStyle="height:342px" dataKey="name" breakpoint="1400px">
                        <template #sourceheader> Available </template>
                        <template #targetheader> Selected </template>
                        <template #item="slotProps">
                            <div class="flex flex-wrap p-2 align-items-center gap-3">
                                <!--                                <img class="w-4rem flex-shrink-0 border-round" :src="'https://primefaces.org/cdn/primevue/images/product/' + slotProps.item.image" :alt="slotProps.item.name" />-->
                                <div class="flex-1 flex flex-column gap-2">
                                    <span class="font-bold">{{ slotProps.item.name }}</span>
                                    <div class="flex align-items-center gap-2">
                                        <i class="pi pi-tag text-sm"></i>
                                        <span>{{ slotProps.item.type }}</span>
                                    </div>
                                </div>
                                <!--                                <span class="font-bold">$ {{ slotProps.item.price }}</span>-->
                            </div>
                        </template>
                    </PickList>
                </TabPanel>
            </TabView>
        </div>
        <div class="mt-3 flex gap-2">
            <Button @click="$emit('genera')" :disabled="Object.values(generaImplementazione).filter(a => a).length == 0">Genera Implementazione</Button>
            <Button @click="$emit('preview')" :disabled="Object.values(response.msg).filter(a => a).length < Object.values(response.msg).length">Preview</Button>
        </div>
    </div>
</template>

<style scoped>

</style>
