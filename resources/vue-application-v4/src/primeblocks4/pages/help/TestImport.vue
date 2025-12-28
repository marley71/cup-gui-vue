<template>
    <div class="grid grid-cols-1">
        <ImportPage></ImportPage>
    </div>
</template>

<script>
import cupparisPrimevue from "cupparis-primevue";
const ImportPage = cupparisPrimevue.ImportPage;


export default {
  name: "TestImport",
    components: {ImportPage},
    data() {
      return {};
    }
}
</script>

<style scoped>

</style>
