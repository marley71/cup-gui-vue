<script setup>
import SidebarLayout from './SidebarLayout.vue'
import SidebarGroupedLayout from "./SidebarGroupedLayout.vue";
import templateConfig from '../config/templateConfig.json'
import TopbarLayout from "./TopbarLayout.vue";
import SidebarGroupedLayout2 from "./SidebarGroupedLayout2.vue";
import DesktopLayout from "./DesktopLayout.vue";
</script>

<template>
    <SidebarLayout v-if="templateConfig.layout==='SidebarLayout'"></SidebarLayout>
    <SidebarGroupedLayout v-else-if="templateConfig.layout==='SidebarGroupedLayout'"></SidebarGroupedLayout>
    <SidebarGroupedLayout2 v-else-if="templateConfig.layout==='SidebarGroupedLayout2'"></SidebarGroupedLayout2>
    <TopbarLayout v-else-if="templateConfig.layout==='TopbarLayout'"></TopbarLayout>
    <DesktopLayout v-else-if="templateConfig.layout==='DesktopLayout'"></DesktopLayout>
    <div v-else>Template applicazione non trovato</div>
</template>

<style scoped>

</style>
