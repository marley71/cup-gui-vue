<script setup>
import cs from 'cupparis-primevue'
const Wait = cs.Wait;
</script>
<template>
    <Wait></Wait>
    <router-view :key="$route.fullPath"/>
    <Toast position="top-right" group="tr" />
    <ConfirmDialog ref="confirmDialog">
      <!-- se vogliamo personalizzare la confirm dialog
      <template #message="slotProps">

        <div class="flex flex-col items-center w-full gap-4 border-b border-surface-200 dark:border-surface-700">
          <i :class="slotProps.message.icon" class="text-6xl! text-primary-500"></i>
          <p>{{ slotProps.message.message }}</p>
        </div>
      </template> -->
    </ConfirmDialog>
</template>
<style>
html {
  font-size: 15px;
}
</style>
