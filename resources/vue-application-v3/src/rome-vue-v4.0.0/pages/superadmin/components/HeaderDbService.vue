<script>
export default {
    name: "HeaderDbService",
    props : ['response'],
    emits : ['genera','preview'],
    watch: {
        response(newValue) {
            console.debug('wathc',newValue);
            if (newValue) {
                for(let k in newValue.msg) {
                    this.generaImplementazione[k] = !newValue.msg[k];
                }
            }
        }
    },
    mounted() {
        if (this.response) {
            for(let k in this.response.msg) {
                this.generaImplementazione[k] = !this.response.msg[k];
            }
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

    }
}
</script>

<template>
    <div class="flex flex-column" v-if="response">
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
            <div class="mt-3 flex gap-2">
                <Button @click="$emit('genera')" :disabled="Object.values(generaImplementazione).filter(a => a).length == 0">Genera Implementazione</Button>
                <Button @click="$emit('preview')" :disabled="Object.values(response.msg).filter(a => a).length < Object.values(response.msg).length">Preview</Button>
            </div>
        </div>

    </div>
</template>

<style scoped>

</style>

