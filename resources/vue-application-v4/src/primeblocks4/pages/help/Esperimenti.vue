<template>
    <div class="grid grid-cols-1">
        <EsperimentiPage></EsperimentiPage>
    </div>
</template>

<script>
import cupparis from 'cupparis-primevue'
const EsperimentiPage = cupparis.EsperimentiPage;
export default {
    name: "Esperimenti",
    components : {EsperimentiPage},
    data() {
        return {}
    }
}
</script>

<style scoped>

</style>
