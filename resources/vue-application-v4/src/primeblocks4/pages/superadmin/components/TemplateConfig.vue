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
        <div>
            <h3>Layout applicazione {{localModel.layout}}</h3>
            <template v-for="(item,key) in localModel.layouts">
                <div class="flex">
                    <RadioButton v-model="localModel.layout" :value="key" ></RadioButton>
                    <label>{{item}}</label>
                </div>
            </template>
        </div>
    </div>
</template>

<style scoped>

</style>
