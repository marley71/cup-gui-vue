<script setup>
import cs from 'cupparis-primevue'
const Wait = cs.Wait;
</script>
<template>
    <Wait></Wait>
    <router-view :key="$route.fullPath"/>
    <Toast position="top-right" group="tr" />
    <ConfirmDialog ref="confirmDialog"></ConfirmDialog>
</template>
