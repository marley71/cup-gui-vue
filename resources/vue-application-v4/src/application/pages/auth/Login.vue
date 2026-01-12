<script setup>
import {ref, onMounted} from 'vue';
import LoginComponent from "./includes/LoginComponent.vue";

const loginProdUrl = ref('/login-web');
const loginDevUrl = ref('/api/login');
const loginUrl = ref(null);

const csrfToken = ref(null);
const isProd = ref(import.meta.env.PROD);

onMounted (() => {
  let selector = document.querySelector('meta[name="csrf-token"]');
  csrfToken.value = (selector ? selector.content : '');
  if (! isProd.value) {
    loginUrl.value = loginDevUrl.value;
  } else {
    loginUrl.value = loginProdUrl.value;
  }
});
</script>

<template>
  <div class="bg-surface-50 dark:bg-surface-950 px-6 py-20 md:px-20 lg:px-80">
    <div class="bg-surface-0 dark:bg-surface-900 p-8 md:p-12 shadow-sm rounded-2xl w-full max-w-[48rem] mx-auto flex flex-col gap-8">
        <LoginComponent :loginUrl="loginUrl" />
    </div>
  </div>
</template>

<style scoped></style>
