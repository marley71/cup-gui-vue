<script setup>
import {onMounted, ref} from "vue";
import cs from "cupparis-primevue";
import CrudInit from '@/primeblocks4/crud/CrudInit.js';
import { useRouter } from 'vue-router';
import {userApp} from "../../../stores/userApp";

const router = useRouter();
const csrfToken = ref(null);
const email = ref('');
const password = ref('');
const loading = ref(false);
const error = ref(false);
const errorMsg = ref('');

onMounted (() => {
    let selector = document.querySelector('meta[name="csrf-token"]');
    csrfToken.value = (selector ? selector.content : '');
});

function handleLogin(event) {
    event.preventDefault();
    userApp().reset();
    error.value = false;
    errorMsg.value = '';
    loading.value = true;
    
    // Prepara i dati del form
    const formData = new FormData();
    formData.append('email', email.value);
    formData.append('password', password.value);
    formData.append('_token', csrfToken.value);
    
    // Usa fetch per mantenere compatibilità con form tradizionale
    fetch('/login', {
        method: 'POST',
        body: formData,
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'Accept': 'application/json'
        },
        redirect: 'manual'
    })
    .then(async response => {
        // Controlla se la risposta è un redirect (status 302, 301, etc.)
        if (response.status >= 300 && response.status < 400) {
            loading.value = false;
            // Login riuscito, ottieni l'URL di destinazione dall'header Location
            const redirectUrl = response.headers.get('Location') || '/';
            window.location.href = redirectUrl;
            return;
        }
        
        // Prova a parsare come JSON
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
            const json = await response.json();
            
            // Se c'è un errore di validazione
            if (!response.ok || json.error || json.message) {
                loading.value = false;
                error.value = true;
                // Gestisci errori di validazione Laravel
                if (json.errors) {
                    const firstError = Object.values(json.errors)[0];
                    errorMsg.value = Array.isArray(firstError) ? firstError[0] : firstError;
                } else {
                    errorMsg.value = json.message || json.msg || 'Errore durante il login 3';
                }
                return;
            }
            console.debug('json di ritorno da login',json);
            // Se c'è un access_token (caso API)
            if (json.access_token) {
                
                loading.value = false;
                window.localStorage.setItem('token', json.access_token);
                userApp().setUserInfo(json);
                CrudInit.loadMenu().then(() => {
                    router.push('/');
                });
                return;
            }
            
            // Login riuscito senza token (session-based)
            loading.value = false;
            //window.location.reload();
            return;
        }
        console.debug('response',response);
        // Se non è JSON e non è un redirect, probabilmente è HTML (errore)
        if (!response.ok) {
            userApp().getUserInfo().then(() => {
                document.location.href = '/';
            }).catch((error) => {
                console.error('Login error:', error);
                loading.value = false;
                error.value = true;
                errorMsg.value = error.message || 'Errore durante il login 1';
                return;
            })
            return;
        }
        
        // Login riuscito, ricarica la pagina
        loading.value = false;
        window.location.reload();
    })
    .catch(err => {
        loading.value = false;
        error.value = true;
        errorMsg.value = err.message || 'Errore durante il login 2';
        console.error('Login error:', err);
        document.location.href = '/';
    });
}
</script>

<template>
        <div class="w-[1/3]">
            <div class="flex flex-col items-center gap-4 w-full">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-14 w-14" width="33" height="32" viewBox="0 0 33 32" fill="none">
                    <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M7.09219 2.87829C5.94766 3.67858 4.9127 4.62478 4.01426 5.68992C7.6857 5.34906 12.3501 5.90564 17.7655 8.61335C23.5484 11.5047 28.205 11.6025 31.4458 10.9773C31.1517 10.087 30.7815 9.23135 30.343 8.41791C26.6332 8.80919 21.8772 8.29127 16.3345 5.51998C12.8148 3.76014 9.71221 3.03521 7.09219 2.87829ZM28.1759 5.33332C25.2462 2.06 20.9887 0 16.25 0C14.8584 0 13.5081 0.177686 12.2209 0.511584C13.9643 0.987269 15.8163 1.68319 17.7655 2.65781C21.8236 4.68682 25.3271 5.34013 28.1759 5.33332ZM32.1387 14.1025C28.2235 14.8756 22.817 14.7168 16.3345 11.4755C10.274 8.44527 5.45035 8.48343 2.19712 9.20639C2.0292 9.24367 1.86523 9.28287 1.70522 9.32367C1.2793 10.25 0.939308 11.2241 0.695362 12.2356C0.955909 12.166 1.22514 12.0998 1.50293 12.0381C5.44966 11.161 11.0261 11.1991 17.7655 14.5689C23.8261 17.5991 28.6497 17.561 31.9029 16.838C32.0144 16.8133 32.1242 16.7877 32.2322 16.7613C32.2441 16.509 32.25 16.2552 32.25 16C32.25 15.358 32.2122 14.7248 32.1387 14.1025ZM31.7098 20.1378C27.8326 20.8157 22.5836 20.5555 16.3345 17.431C10.274 14.4008 5.45035 14.439 2.19712 15.1619C1.475 15.3223 0.825392 15.5178 0.252344 15.7241C0.250782 15.8158 0.25 15.9078 0.25 16C0.25 24.8366 7.41344 32 16.25 32C23.6557 32 29.8862 26.9687 31.7098 20.1378Z"
                        class="fill-surface-0"
                    />
                </svg>
                <div class="flex flex-col gap-2 w-full">
                    <div class="text-center text-3xl font-medium text-black leading-tight">Benvenuto su  RLST</div>
<!--                    <div class="text-center">-->
<!--                        <span class="text-black/80">Don't have an account? </span>-->
<!--                        <a class="text-black/80 cursor-pointer hover:text-black/90 underline">Sign up</a>-->
<!--                    </div>-->
                </div>
            </div>
            <div class="flex flex-col items-center gap-8 w-full">
                <div v-if="error" class="w-full p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                    {{ errorMsg }}
                </div>
                
                    <input type="hidden" name="_token" :value="csrfToken">
                    <div class="flex flex-col gap-7 w-full">
                        <IconField>
                            <InputIcon class="fa fa-user text-black/70!" />
                            <InputText v-model="email" name="email" type="text" class="appearance-none! border! border-primary/10! w-full! outline-0! bg-primary/10! text-black! placeholder:text-black/70! rounded-3xl! shadow-xs!" placeholder="Username" />
                        </IconField>
                        <IconField>
                            <InputIcon class="fa fa-lock text-black/70!" />
                            <InputText
                                v-model="password"
                                name="password"
                                type="password"
                                class="appearance-none! border! border-primary/10! w-full! outline-0! bg-primary/10! text-black! placeholder:text-black/70! rounded-3xl! shadow-xs!"
                                placeholder="Password"
                            />
                        </IconField>
                    </div>
                    <Button @click="handleLogin" :label="loading ? 'Accesso in corso...' : 'Login'" :disabled="loading" class="w-full! rounded-3xl! bg-primary-600! border! border-primary-600! text-white! hover:bg-primary-600/80!" />

                
            </div>
            <div class="text-center mt-3">
                <a class="text-black/80 cursor-pointer hover:text-black/90">Password Dimenticata?</a>
            </div>
        </div>
</template>

<style scoped>

</style>
