<script>
import cs from "cupparis-primevue"

const vList = cs.vList;
export default {
    name: "PaginaLinkata",
    components : {vList},
    data() {
        let conf = cs.CrudCore.clone(cs.CrudVars.modelConfs.ModelUser);
        return {
            confView : conf.list,
        }
    }
}
</script>

<template>
    <div>
        <div class="card">
            <h5>Pagina Linkata 2</h5>
            <p>
                <v-list :conf="confView"></v-list>
            </p>
        </div>
    </div>
</template>

<style scoped>

</style>
