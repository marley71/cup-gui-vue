<script>

import cs from 'cupparis-primevue';
const jsc = new cs.JsToCode();
export default {
    name: "EditorCode",
    props : ['response','mode'],
    watch: {
        response(newValue) {
            console.debug('editor watch',newValue);
            if (newValue) {
                let codeStr = '{}';
                if (newValue) {
                    if (that.mode=='js') {
                        codeStr = newValue.confs.jsContent; //jsc.getSourceCode(that.response.confs.jsContent)
                    } else {
                        codeStr = newValue.confs.phpContent; //jsc.getSourceCode(that.response.confs.jsContent)
                    }
                    //codeStr = newValue.confs.jsContent; //jsc.getSourceCode(newValue.confs.jsContent)
                }
                this.editor.setValue(codeStr);
            }
        }
    },
    data() {
        return {
            defaultCode : '',
            reload : false,
            editor : null,
            //mode : 'js',
            sections : {
                'js' : ['list','edit','search'],
            },
        }
    },
    mounted() {
        let that = this;
        setTimeout(function() {
            jsc.loadVisLib(function () {
                console.debug('editor ', that.response);
                let codeStr = '{}';
                if (that.response) {
                    if (that.mode=='js') {
                        codeStr = that.response.confs.jsContent; //jsc.getSourceCode(that.response.confs.jsContent)
                    } else {
                        codeStr = that.response.confs.phpContent; //jsc.getSourceCode(that.response.confs.jsContent)
                    }
                }
                that.editor = ace.edit("code", {
                    theme: "ace/theme/textmate",
                    mode: (that.mode=='js'?"ace/mode/javascript":"ace/mode/php"),
                    value: codeStr,
                });
            })

        },200)
    },
    methods: {
        getCodeJs() {
            return this.editor.getValue();
        }
    }

}
</script>

<template>
    <div class="grid">
        <div class="col-12">
            <TabView>
                <TabPanel v-for="section in sections[mode]" :header="section" :key="section">
                    <div>{{section}}</div>
                </TabPanel>
            </TabView>
            <h5>{{mode=='js'?"Configurazione lato client":"Configurazione lato server"}}</h5>
            <div class="font-italic"></div>
            <div id='code' class="h-20rem w-full">

            </div>
        </div>
    </div>
</template>

<style scoped>

</style>
