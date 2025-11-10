<script setup>
import {ref, computed, onMounted, onUnmounted} from 'vue';
import cs from 'cupparis-primevue';

import LoginDev from "./includes/LoginDev.vue";
import LoginProd from "./includes/LoginProd.vue";


const email = ref('');
const password = ref('');
const error = ref(false);
const errorMsg = ref('');

const checked = ref(false);
const csrfToken = ref(null);
const isProd = ref(import.meta.env.PROD);
const appName = ref(import.meta.env.VITE_APP_NAME);
// const logoUrl = computed(() => {
//     return `${contextPath}layout/images/${layoutConfig.darkTheme.value ? 'logo-white' : 'logo-dark'}.svg`;
// });

const logoUrl = computed(() => {
    return `/assets/images/logo.svg`;
    //return `${contextPath}layout/images/${layoutConfig.darkTheme.value ? 'logo-white' : 'logo-dark'}.svg`;
});

// const isProd = () => {
//   console.debug('isProd',import.meta.env.PROD);
//   return import.meta.env.PROD;
// }

onMounted (() => {
  let selector = document.querySelector('meta[name="csrf-token"]');
  csrfToken.value = (selector ? selector.content : '');
  if (! isProd.value) {
      cs.CrudCore.messageDialog('Questa pagina ha due modalità dev e produzione in quanto cambia il modo in cui viene fatta la chiamata. per vedere come si vedrà in produzione e in sviluppo premere il tasto P (produzione) o D (development)')
      window.addEventListener('keydown', swithPage);
  }
});

onUnmounted( () => {
    if (! isProd.value) {
        window.removeEventListener('keydown', swithPage);
    }
})


function  swithPage(event) {
    // Checks se è D o P
    if (event.key === 'd' || event.key === 'D') {
        // Azione per D
        console.log('Premuto D');
        isProd.value = false;
        cs.CrudCore.alertInfo('Pagina in modalità sviluppo')
    } else if (event.key === 'p' || event.key === 'P') {
        // Azione per P
        console.log('Premuto P');
        isProd.value = true;
        cs.CrudCore.alertInfo('Pagina in modalità produzione')
    }
}
</script>

<template>
  <div class="bg-surface-50 dark:bg-surface-950 px-6 py-20 md:px-20 lg:px-80">
    <div class="bg-surface-0 dark:bg-surface-900 p-8 md:p-12 shadow-sm rounded-2xl w-full max-w-[48rem] mx-auto flex flex-col gap-8">
        <LoginProd  v-if="isProd"></LoginProd>
        <LoginDev v-else></LoginDev>
    </div>
  </div>
</template>

<!--<script>-->
<!--export default {-->
<!--    data() {-->
<!--        return {-->
<!--            checked: false,-->
<!--        };-->
<!--    },-->
<!--    methods: {-->
<!--        goDashboard() {-->
<!--            this.$router.push({ path: '/' });-->
<!--        },-->
<!--    },-->
<!--};-->
<!--</script>-->

<style scoped></style>
