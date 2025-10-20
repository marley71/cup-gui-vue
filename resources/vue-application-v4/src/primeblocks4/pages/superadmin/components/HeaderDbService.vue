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
    <div class="flex flex-col gap-5" v-if="response">
        <div class="flex flex-col gap-5 w-full align-content-center">
            <div class="flex-grow-1">
                <h6>Implementazioni esistenti</h6>
                <div class="flex gap-4">
                    <div class="flex flex-column align-items-center" v-for="(value,key) in response.msg" :key="key">
                        <i v-if="value" class="fa fa-check-circle p-1"></i>
                        <i v-else class="fa fa-times p-1"></i>
                        <div>{{key}}</div>
                    </div>
                </div>
            </div>

            <div class="flex-grow-1">
                <h6>Scegli cosa generare</h6>
                <div class="flex">
                    <div class="border-[1px] border-round-2xl p-1 m-1" v-for="(value,key) in generaImplementazione" :key="key">
                        <Checkbox v-model="generaImplementazione[key]" :value="value" :binary="true"></Checkbox> {{key}}
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

