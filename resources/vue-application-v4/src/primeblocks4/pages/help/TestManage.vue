<template>
    <div class="grid grid-cols-1">
        <ManagePage></ManagePage>
    </div>
</template>

<script>

import cupparisPrimevue from "cupparis-primevue";
const ManagePage = cupparisPrimevue.ManagePage;

export default {
    name: "TestManage",
    components: {ManagePage},
    data() {
        return {
        }
    }
}

</script>

<style scoped>

</style>
