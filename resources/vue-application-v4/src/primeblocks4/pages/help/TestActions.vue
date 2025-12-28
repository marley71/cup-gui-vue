<template>
    <div class="grid grid-cols-1">
        <ActionsPage></ActionsPage>
    </div>
</template>

<script>

import cupparisPrimevue from 'cupparis-primevue';
const ActionsPage = cupparisPrimevue.ActionsPage;
//const Widget = cuppariSakai.c
export default {
    name: "TestActions",
    extends : cupparisPrimevue.CrudComponent,
    components: {ActionsPage},
    data() {
        return {};
    },
}
</script>

<style scoped>

</style>
