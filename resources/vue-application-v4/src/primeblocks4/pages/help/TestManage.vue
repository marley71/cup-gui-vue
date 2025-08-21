<template>
    <div class="grid">
        <div class="col-12">
            <ManagePage></ManagePage>
        </div>
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
