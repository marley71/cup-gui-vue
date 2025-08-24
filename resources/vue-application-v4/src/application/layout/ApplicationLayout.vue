<script setup>
import SidebarLayout from './SidebarLayout.vue'
import SidebarGroupedLayout from "./SidebarGroupedLayout.vue";
import templateConfig from '../config/templateConfig.json'
</script>

<template>
    <SidebarLayout v-if="templateConfig.layout==='SidebarLayout'"></SidebarLayout>
    <SidebarGroupedLayout v-else-if="templateConfig.layout==='SidebarGroupedLayout'"></SidebarGroupedLayout>
    <div v-else>Template applicazione non trovato</div>
</template>

<style scoped>

</style>
