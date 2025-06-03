<template>
<!--    <div class="col-12">-->
<!--        <wQuillEditor :conf="editorConf"></wQuillEditor>-->
<!--    </div>-->
<!--        <div class="col-12">-->
<!--            <wSummerNoteEditor :conf="editorConf"></wSummerNoteEditor>-->
<!--        </div>-->
<!--    <div class="col-12">-->
<!--        <wPrimeEditor :conf="editorConf"></wPrimeEditor>-->
<!--    </div>-->
    <div class="grid">
        <div class="col-12">
            <WidgetsPage></WidgetsPage>
        </div>
    </div>
</template>

<script>

import cupparisPrimevue from 'cupparis-primevue';
//import {QuillEditor} from "@vueup/vue-quill";
import wPrimeEditor from '@/rome-vue-v4.0.0/components/widgets/wPrimeEditor.vue';

const WidgetsPage = cupparisPrimevue.WidgetsPage;
export default {
    name: "TestWidgets",
    components: {WidgetsPage,wPrimeEditor},
    data() {
        return {
            editorConf : {
                value : '<b>Ciao</b> a <div class="mia">tutti</div>',
                name : 'prova'
            }
        }
    },
}
</script>

<style scoped>

</style>
