<script>
import cs from "cupparis-primevue"

const vList = cs.vList;
export default {
    name: "PaginaLinkata",
    components : {vList},
    mounted() {
        let that = this;
       cs.CrudCore.fetchHtml('htmlPaginaLinkata.html',function (contenuto) {
           that.htmlDinamico = contenuto;
       })
    },
    data() {
        let conf = cs.CrudCore.clone(cs.CrudVars.modelConfs.ModelUser);
        conf.list.fields = ['id','username','email'];
        return {
            confView : conf.list,
            htmlDinamico : '',
        }
    }
}
</script>

<template>
    <div>
        <div class="card">
            <h5>Pagina Linkata 2</h5>
            <div v-html="htmlDinamico"></div>
            <p>
                <v-list :conf="confView"></v-list>
            </p>
        </div>
    </div>
</template>

<style scoped>

</style>
