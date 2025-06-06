<script setup>
import {ref, computed, onMounted, onUnmounted} from 'vue';
import cs from 'cupparis-primevue';
import { useRouter } from 'vue-router'
import CrudInit from '@/rome-vue-v4.0.0/crud/CrudInit.js';

const email = ref('');
const password = ref('');
const error = ref(false);
const errorMsg = ref('');
const router = useRouter();
const checked = ref(false);
const csrfToken = ref(null);
const isProd = ref(import.meta.env.PROD);
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
      window.addEventListener('keydown', swithPage);
  }
  cs.CrudCore.messageDialog('Questa pagina ha due modalità dev e produzione in quanto cambia il modo in cui viene fatta la chiamata. per vedere come si vedrà in produzione e in sviluppo premere il tasto P (produzione) o D (development)')
});

onUnmounted( () => {
    if (! isProd.value) {
        window.removeEventListener('keydown', swithPage);
    }
})

function login() {
    error.value = false;
    console.log('login',email.value,password.value)
    cs.Server.post('/api/login',{
        email : email.value,
        password : password.value,
    },function(json) {
        console.log('json respons',json);
        if (json.error) {
            error.value = true;
            errorMsg.value = json.msg;
            return ;
        }
        if (json.access_token) {
            window.localStorage.setItem('token',json.access_token);
            CrudInit.loadMenu().then(() => {
                router.push('/');
            })

        }
    })
}

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
    <div class="login-body">
        <div class="card login-panel p-fluid">
            <div class="login-panel-content">
                <div v-if="isProd" class="grid">
                  <form class="w-full" action="/login" method="POST">
                    <input type="hidden" name="_token" :value="csrfToken">
                    <div class="col-12 sm:col-6 md:col-6 logo-container">
                      <img src="/layout/images/logo-roma.svg" alt="roma" />
                      <span class="guest-sign-in">Cupparis Application</span>
                    </div>
                    <div class="col-12 username-container">
                      <label>Username</label>
                      <div class="login-input">
                        <input class="p-inputtext p-component" type="text" name="email">
                      </div>
                    </div>
                    <div class="col-12 password-container">
                      <label>Password</label>
                      <div class="login-input">
                        <input class="p-inputtext p-component" type="password" name="password">
                      </div>
                    </div>
                    <div class="col-6 rememberme-container">
                      <Checkbox v-model="checked" :binary="true" />
                      <label> Remember me</label>
                    </div>

                    <div class="col-6 mt-1 forgetpassword-container">
                      <a href="#" class="forget-password">Forget Password</a>
                    </div>

                    <div class="col-12 sm:col-6">
                      <button class="p-button p-component" type="submit" >
                        <span class="pi pi-check p-button-icon p-button-icon-left"></span>
                        Sign In
                      </button>
                    </div>
                  </form>
                </div>
                <div v-else class="grid">
                    <div v-if="error" class="text-red-500">
                        <div>{{ errorMsg }}</div>
                    </div>
                    <div class="col-12 sm:col-6 md:col-6 logo-container">
                        <img src="/layout/images/logo-roma.svg" alt="roma" />
                        <span class="guest-sign-in">Welcome, please use the form to sign-in Roma network</span>
                    </div>
                    <div class="col-12 username-container">
                        <label>Username</label>
                        <div class="login-input">
                            <InputText id="input" type="text" v-model="email"/>
                        </div>
                    </div>
                    <div class="col-12 password-container">
                        <label>Password</label>
                        <div class="login-input">
                            <InputText type="password" v-model="password" />
                        </div>
                    </div>
                    <div class="col-6 rememberme-container">
                        <Checkbox v-model="checked" :binary="true" />
                        <label> Remember me</label>
                    </div>

                    <div class="col-6 mt-1 forgetpassword-container">
                        <a href="#" class="forget-password">Forget Password</a>
                    </div>

                    <div class="col-12 sm:col-6">
                        <Button label="Sign In" icon="pi pi-check" @click="login" />
                    </div>
                </div>
            </div>
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
