<template>
  <div class="min-h-screen h-full bg-surface-50 dark:bg-surface-950">
      <router-view :key="$route.fullPath"/>
  </div>
</template>

<script setup>

import IconField from 'primevue/iconfield';
import InputIcon from 'primevue/inputicon';
import InputText from 'primevue/inputtext';
</script>
