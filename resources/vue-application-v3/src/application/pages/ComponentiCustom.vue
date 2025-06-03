<script>
import cs from "cupparis-primevue"
//import ComponentExample from "../../components/ComponentExample.vue";
export default {
    name: "ComponentiCustom",
    //components: {ComponentExample},
    //components : {cView},
    data() {
        //let conf = cs.CrudCore.clone(cs.CrudVars.modelConfs.ModelUser);
        return {
            //confView : conf.list,
        }
    }
}
</script>

<template>
    <div>
        Pagina di esempio come inserire componenti custom sia nativi vue sia estendendo componenti di cupparis-primevue.
    </div>
    <component-example class="m-3 p-3 border-red-500 border-1"></component-example>
</template>

<style scoped>

</style>
