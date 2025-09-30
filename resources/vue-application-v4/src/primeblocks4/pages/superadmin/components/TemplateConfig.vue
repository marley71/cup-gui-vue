<script>
export default {
    props: {
        modelValue: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            localModel: { ...this.modelValue }  // Copia locale per tracking
        };
    },
    watch: {
        localModel: {
            handler(newValue) {
                this.$emit('update:modelValue', newValue);
            },
            deep: true
        }
    }
};
</script>

<template>
    <div class="w-full p-6">
        <h1 class="text-3xl text-center">Configurazione del template</h1>
        <div class="flex gap-2 align-content-center justify-between">
            <div>
                <h3 class="mb-2">Layout applicazione <span class="font-bold">{{localModel.layout}}</span></h3>
                <template v-for="(item,key) in localModel.layouts">
                    <div class="flex">
                        <RadioButton v-model="localModel.layout" :value="key" ></RadioButton>
                        <label>{{item}}</label>
                    </div>
                </template>
            </div>
            <div>
                <template v-if="localModel.layout === 'SidebarLayout'">
                    <div></div>
                </template>
                <template v-if="localModel.layout === 'SidebarGroupedLayout'">
                    <h3 class="mb-2">Menu utente<span class="font-bold">{{localModel.layoutsConf.SidebarGroupedLayout.profileMenu}}</span></h3>
                    <div>
                        <template v-for="(item,key) in {'top':'Top','sidebar':'Sidebar'}">
                            <div class="flex">
                                <RadioButton v-model="localModel.layoutsConf.SidebarGroupedLayout.profileMenu" :value="key" ></RadioButton>
                                <label>{{item}}</label>
                            </div>
                        </template>
                    </div>
                </template>
                <template v-if="localModel.layout === 'TopbarLayout'">
                    <div></div>
                </template>
            </div>
            <div>
                <h3 class="mb-2">Colori applicazione <span class="font-bold">{{localModel.themeColor}}</span></h3>
                <template v-for="(item,key) in localModel.themeColors">
                    <div class="flex">
                        <RadioButton v-model="localModel.themeColor" :value="key" ></RadioButton>
                        <label>{{item}}</label>
                    </div>
                </template>
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>
