<template>
  <div class="min-h-screen flex relative lg:static bg-surface-50 dark:bg-surface-950">
    <div id="app-sidebar-6" class="h-screen hidden lg:block shrink-0 absolute lg:static left-0 top-0 z-10 select-none w-[10.54rem] bg-primary animate-duration-300 animate-ease-in-out">
      <div class="flex flex-col h-full">
        <div class="flex items-center justify-center shrink-0 p-4">
          <svg xmlns="http://www.w3.org/2000/svg" width="33" height="32" viewBox="0 0 33 32" fill="none">
            <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M7.59219 2.87829C6.44766 3.67858 5.4127 4.62478 4.51426 5.68992C8.1857 5.34906 12.8501 5.90564 18.2655 8.61335C24.0484 11.5047 28.705 11.6025 31.9458 10.9773C31.6517 10.087 31.2815 9.23135 30.843 8.41791C27.1332 8.80919 22.3772 8.29127 16.8345 5.51998C13.3148 3.76014 10.2122 3.03521 7.59219 2.87829ZM28.6759 5.33332C25.7462 2.06 21.4887 0 16.75 0C15.3584 0 14.0081 0.177686 12.7209 0.511584C14.4643 0.987269 16.3163 1.68319 18.2655 2.65781C22.3236 4.68682 25.8271 5.34013 28.6759 5.33332ZM32.6387 14.1025C28.7235 14.8756 23.317 14.7168 16.8345 11.4755C10.774 8.44527 5.95035 8.48343 2.69712 9.20639C2.5292 9.24367 2.36523 9.28287 2.20522 9.32367C1.7793 10.25 1.43931 11.2241 1.19536 12.2356C1.45591 12.166 1.72514 12.0998 2.00293 12.0381C5.94966 11.161 11.5261 11.1991 18.2655 14.5689C24.3261 17.5991 29.1497 17.561 32.4029 16.838C32.5144 16.8133 32.6242 16.7877 32.7322 16.7613C32.7441 16.509 32.75 16.2552 32.75 16C32.75 15.358 32.7122 14.7248 32.6387 14.1025ZM32.2098 20.1378C28.3326 20.8157 23.0836 20.5555 16.8345 17.431C10.774 14.4008 5.95035 14.439 2.69712 15.1619C1.975 15.3223 1.32539 15.5178 0.752344 15.7241C0.750782 15.8158 0.75 15.9078 0.75 16C0.75 24.8366 7.91344 32 16.75 32C24.1557 32 30.3862 26.9687 32.2098 20.1378Z"
                class="fill-primary-contrast"
            />
          </svg>
        </div>

        <div class="p-4">
          <IconField icon-position="left">
            <InputIcon class="pi pi-search text-primary-contrast!" />
            <InputText type="text" class="border-0! bg-primary-400! dark:bg-primary-300! rounded-lg! text-primary-contrast! placeholder:text-primary-contrast/60! w-full" placeholder="Search" />
          </IconField>
        </div>

        <div class="overflow-y-auto flex-1 p-4">
            <SidebarMenu></SidebarMenu>
        </div>

        <div class="p-4 border-t border-primary-400">
          <div class="flex items-center justify-between">
            <a
                class="p-2 rounded-lg border border-primary-400 dark:border-primary-300 inline-flex items-center justify-center hover:bg-primary-emphasis text-primary-contrast transition-colors duration-150 cursor-pointer"
            >
              <img src="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png" class="w-5 h-5 rounded-full" />
            </a>
            <a
                class="p-2 rounded-lg border border-primary-400 dark:border-primary-300 inline-flex items-center justify-center hover:bg-primary-emphasis text-primary-contrast transition-colors duration-150 cursor-pointer"
            >
              <i class="pi pi-slack text-xl! leading-none! text-primary-100 dark:text-primary-contrast" />
            </a>
            <a
                class="p-2 rounded-lg border border-primary-400 dark:border-primary-300 inline-flex items-center justify-center hover:bg-primary-emphasis text-primary-contrast transition-colors duration-150 cursor-pointer"
            >
              <i class="pi pi-github text-xl! leading-none! text-primary-100 dark:text-primary-contrast" />
            </a>
          </div>
        </div>
      </div>
    </div>




    <div class="h-screen flex flex-col relative flex-auto overflow-auto">

      <div class="flex justify-end items-center py-4 px-8 bg-surface-0 dark:bg-surface-900 relative lg:static border-b border-surface-200 dark:border-surface-700">





          <div v-if="userLoaded" class="flex items-center justify-between gap-8 w-full lg:w-auto">
          <a
              v-styleclass="{
                            selector: '#app-sidebar-6',
                            enterFromClass: 'hidden',
                            enterActiveClass: 'animate-fadeinleft',
                            leaveToClass: 'hidden',
                            leaveActiveClass: 'animate-fadeoutleft',
                            hideOnOutsideClick: true
                        }"
              class="cursor-pointer flex items-center justify-center lg:hidden text-surface-700 dark:text-surface-100 mr-auto"
          >
            <i class="pi pi-bars text-xl! leading-none!" />
          </a>
          <i class="pi pi-bell text-xl! leading-tight! text-surface-500 dark:text-surface-400 cursor-pointer" />
              <div class="flex layout-profile-name gap-1 cursor-pointer" @click="toggle">
                  <span class="mt-1">{{ userInfo.name }}</span>
                  <img src="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png" class="w-8 h-8 rounded-full cursor-pointer" />
              </div>
              <Menu ref="menu" id="overlay_menu" :model="menuItems" :popup="true" />
        </div>
      </div>

      <div class="p-8 flex flex-col flex-auto">

          <router-view :key="$route.fullPath"/>

      </div>
    </div>
  </div>
</template>

<script setup>
import SidebarMenu from './includes/SidebarMenu.vue'
import IconField from 'primevue/iconfield';
import InputIcon from 'primevue/inputicon';
import InputText from 'primevue/inputtext';
import {onMounted,ref} from 'vue'
import {userApp} from  "../stores/userApp";
import { useRouter } from 'vue-router'

import cs from 'cupparis-primevue'
const router = useRouter();
const userInfo = ref({});
const userLoaded = ref(false);
const menu = ref();

const menuItems = ref([
    {
        label: '',
        items: [
            {
                label: 'Profilo',
                icon: 'pi pi-refresh',
                command() {
                    router.push('/profilo')
                }
            },
            {
                label: 'Logout',
                icon: 'pi pi-upload',
                command() {
                    router.push('/logout')
                }
            }
        ]
    }
]);

//import cs from 'cupparis-primevue'
//const Wait = cs.Wait;
function isDev() {
    return (import.meta.env.VITE_MODE === 'dev')
}

const toggle = (event) => {
    menu.value.toggle(event);
};


onMounted(() => {
    userApp().getUserInfo().then(() => {
        userInfo.value = userApp().userInfo;
        let menuTitle = (userInfo.value.mainrole?userInfo.value.mainrole.name:'');
        if (isDev()) {
            menuTitle+=' Dev';
        }
        menuItems.value[0].label =  menuTitle;
        userLoaded.value = true;
    })
})
</script>
