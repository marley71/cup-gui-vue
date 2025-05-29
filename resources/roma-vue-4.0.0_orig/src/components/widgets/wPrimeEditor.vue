
<script>

import Editor from 'primevue/editor';
import cs from "cupparis-primevue"
//import SshPre from 'simple-syntax-highlighter'
//import 'simple-syntax-highlighter/dist/sshpre.css'
const wBase = cs.wBase;

export default {
    name: 'wPrimeEditor',
    extends : wBase,
    components : {Editor},
    data() {
        console.debug('wBase',this.conf);

        let editorConf = {
            showHtml: false,
            headerOptions: [
                // ['bold', 'italic', 'underline', 'strike'], // Gruppo base di stili
                // [{ 'header': 1 }, { 'header': 2 }],        // Opzioni di intestazione
                // [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                // ['clean'],                                // Rimozione di formattazioni
                // // Aggiungi il tuo bottone personalizzato qui
                // [{ 'your-custom-button': 'Custom' }]
            ],
            modules : {
                toolbar : [

                    ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
                    ['blockquote', 'code-block'],
                    ['link', 'image', 'video', 'formula'],

                    [{ 'header': 1 }, { 'header': 2 }],               // custom button values
                    [{ 'list': 'ordered'}, { 'list': 'bullet' }, { 'list': 'check' }],
                    [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
                    [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
                    [{ 'direction': 'rtl' }],                         // text direction

                    [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
                    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

                    [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
                    [{ 'font': [] }],
                    [{ 'align': [] }],

                    ['clean'],



                        // Aggiungi il tuo bottone personalizzato qui
                    [{ 'your-custom-button': 'Custom' }]
                ]
            }
        };
        return Object.assign(editorConf,this.conf);
    },
    mounted() {
        let that =this;
        console.debug('wPrimeEditor',this.value);
        setTimeout(function () {
            that.addCustomButton();
        },1000)
    },
    methods: {
        addCustomButton() {
            let that = this;
            const customButton = document.querySelector('.ql-your-custom-button');
            console.debug('custom button',customButton);
            if (customButton) {
                customButton.innerHTML = 'cc'
                customButton.addEventListener('click', () => {
                    // Inserisci qui la logica del tuo bottone
                    console.log('Il tuo bottone personalizzato è stato cliccato!');
                    that.showHtml = !that.showHtml;
                });
            }
        },
        saveHtml(event) {
            console.debug('saveHtml',event);
            this.value = event;
            this.showHtml = false;
        },
    }
}
</script>

<template>
    <input type="hidden" :name="name" v-model="value"/>
    <Editor v-show="!showHtml" v-model="value" :modules="modules" @text-change="_change">
        <template #toolbar>
            <div></div> <!-- mi serve per nascondere la toolbar di default -->
        </template>
        {{value}}
    </Editor>
</template>

<style scoped>

</style>
