<script>
import cs from "cupparis-primevue"

const cView = cs.cView;
export default {
    name: "PaginaLinkata",
    components : {cView},
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
                <c-view :conf="confView"></c-view>
            </p>
        </div>
    </div>
</template>

<style scoped>

</style>
