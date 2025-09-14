<template>
    <div class="resize-container-1 relative min-h-200 bg-surface-0 dark:bg-surface-950">
        <TopbarMenu class="mb-2"></TopbarMenu>
        <router-view :key="$route.fullPath"/>
    </div>
</template>
<script setup>
import TopbarMenu from "./includes/TopbarMenu.vue";

</script>
