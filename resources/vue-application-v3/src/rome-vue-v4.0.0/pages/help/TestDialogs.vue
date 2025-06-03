<template>
   <DialogsPage></DialogsPage>
</template>

<script>

import cs from "cupparis-primevue";
const DialogsPage = cs.DialogsPage;

export default {
    name: "TestDialogs",
    extends:cs.CrudComponent,
    components : {DialogsPage},
    //mixins : [crudSakai.coreMixin,crudSakai.dialogsMixin],
    inject: ['store'],
    data() {
        return {};
    },
}
</script>

<style scoped>

</style>
