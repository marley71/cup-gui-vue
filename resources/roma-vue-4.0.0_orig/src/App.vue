<script setup>
import cs from 'cupparis-primevue'
const Wait = cs.Wait;
// onMounted(() => {
//     let router = useRouter();
//     const appStatusInstance = appStatus();
//     console.debug('statusApp',appStatusInstance.error)
//     if (appStatusInstance.error ){
//         console.debug('aaa');
//         router.push('/error')
//     }
// });
</script>
<template>
    <Wait></Wait>
    <router-view :key="$route.fullPath"/>
    <Toast position="top-right" group="tr" />
    <ConfirmDialog ref="confirmDialog"></ConfirmDialog>
</template>
