<template>
    <div class="grid grid-cols-1">
        <ViewsPage></ViewsPage>
    </div>
</template>

<script>

import cupparisPrimevue from "cupparis-primevue";
const ViewsPage = cupparisPrimevue.ViewsPage;
export default {
    name: "TestViews",
    components: {ViewsPage},
    inject: ['store'],
    data() {
        return {};
    }
}
</script>

<style scoped>

</style>
