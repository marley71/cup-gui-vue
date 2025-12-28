<template>
    <div class="grid grid-cols-1">
        <WidgetsPage></WidgetsPage>
    </div>
</template>

<script>

import cupparisPrimevue from 'cupparis-primevue';
import wPrimeEditor from '@/primeblocks4/components/widgets/wPrimeEditor.vue';

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
