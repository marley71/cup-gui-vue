<template>
    <div class="grid">
        <div class="col-12">
            <ViewsPage></ViewsPage>
        </div>
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
