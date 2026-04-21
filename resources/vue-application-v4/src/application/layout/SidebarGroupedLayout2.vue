<template>
  <div class="resize-container-2 min-h-screen flex relative lg:static bg-background
">
<!--    dark:bg-linear-to-br from-surface-900 to-surface-500-->
    <div id="app-sidebar-colored" class="w-[231px] bg-primary dark:bg-background  h-screen hidden lg:block shrink-0 absolute lg:static left-0 top-0 z-10 select-none">
      <div class="flex flex-col h-full">
        <div class="p-4 flex items-center gap-4">
          <img src="/assets/images/logo-cupparis.png" alt="Logo" class="h-10" />
          <!-- <svg xmlns="http://www.w3.org/2000/svg" width="43" height="43" viewBox="0 0 43 43" fill="none" class="w-10 h-10">
            <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M21.5 42.0498C33.098 42.0498 42.5 32.6477 42.5 21.0498C42.5 9.45183 33.098 0.0498047 21.5 0.0498047C9.902 0.0498047 0.5 9.45183 0.5 21.0498C0.5 32.6477 9.902 42.0498 21.5 42.0498ZM28.0513 9.83248C28.3702 8.69975 27.2709 8.02994 26.267 8.74516L12.2528 18.7288C11.164 19.5045 11.3353 21.0498 12.51 21.0498H16.2003V21.0212H23.3926L17.5323 23.089L14.9487 32.2671C14.6299 33.3999 15.729 34.0697 16.733 33.3544L30.7472 23.3708C31.836 22.5951 31.6646 21.0498 30.49 21.0498H24.8937L28.0513 9.83248Z"
                class="fill-primary-contrast"
            />
          </svg> -->
          <div class="flex flex-col">
            <div class="text-lg font-semibold leading-tight text-primary-contrast ">CUPPARIS</div>
            <div stye="font-size: .5em !important;" class="text-sm font-semibold leading-tight text-primary-contrast ">{{ getEnte() }}</div>
            <div stye="font-size: .5em !important;" class="text-sm font-semibold leading-tight text-primary-contrast ">Ver. {{ getVersion() }}</div>
          </div>
        </div>
        <SidebarGroupedMenu></SidebarGroupedMenu>
        <div v-if="templateConfig.layoutsConf.SidebarGroupedLayout2.profileMenu==='sidebar'"
             class="py-2 mt-auto border-t border-primary-400 dark:border-primary-300">
          <ul class="list-none p-2 m-0 hidden animate-duration-150 overflow-hidden">
            <li>
              <router-link to="/profilo"
                           class="flex items-center cursor-pointer p-3 gap-2 rounded-lg text-primary-contrast hover:bg-primary-emphasis transition-colors duration-150">
                <i class="pi pi-user text-base! leading-none! text-primary-contrast "/>
                <span class="font-medium text-base leading-tight">{{ translate('app.profile') }}</span>
              </router-link>
            </li>
            <!--                    <li>-->
            <!--                        <a class="flex items-center cursor-pointer p-3 gap-2 rounded-lg text-primary-contrast hover:bg-primary-emphasis transition-colors duration-150">-->
            <!--                            <i class="pi pi-cog text-base! leading-none! text-primary-contrast" />-->
            <!--                            <span class="font-medium text-base leading-tight">Settings</span>-->
            <!--                        </a>-->
            <!--                    </li>-->
            <li>
              <router-link to="/logout"
                           class="flex items-center cursor-pointer p-3 gap-2 rounded-lg text-primary-contrast hover:bg-primary-emphasis transition-colors duration-150">
                <i class="pi pi-sign-out text-base! leading-none! text-primary-contrast "/>
                <span class="font-medium text-base leading-tight">{{ translate('app.logout') }}</span>
              </router-link>
            </li>
          </ul>
          <a
              v-styleclass="{
                                selector: '@prev',
                                enterFromClass: 'hidden',
                            enterActiveClass: 'animate-slidedown',
                                leaveToClass: 'hidden',
                            leaveActiveClass: 'animate-slideup'
                            }"
              class="flex items-center cursor-pointer p-2 gap-2 text-primary-contrast"
          >
            <Avatar v-if="userInfo.fotos && userInfo.fotos.length > 0" :image="getImg()" shape="circle"></Avatar>
            <Avatar v-else :label="getLetter()" shape="circle"></Avatar>
            <!--                    <img  src="https://fqjltiegiezfetthbags.supabase.co/storage/v1/render/image/public/block.images/blocks/avatars/avatar-amyels.png" class="w-8 h-8 rounded-full" />-->
            <span class="font-medium text-base leading-tight">{{ userName }}</span>
            <i class="fa fa-angle-up text-base! leading-none! text-primary-contrast ml-auto"/>
          </a>
        </div>
      </div>
    </div>
    <div class="min-h-screen flex flex-col relative flex-auto">
      <div class="flex justify-between items-center py-4 px-8 bg-surface-0 dark:bg-surface-900 border-b border-yellow-200 dark:border-surface-700 border-b-3 relative lg:static">
        <div class="flex items-center">
          <a
              v-styleclass="{
                            selector: '#app-sidebar-colored',
                            enterFromClass: 'hidden',
                            enterActiveClass: 'animate-fadeinleft',
                            leaveToClass: 'hidden',
                            leaveActiveClass: 'animate-fadeoutleft',
                            hideOnOutsideClick: true,
                            resizeSelector: '.resize-container-2',
                            hideOnResize: true
                        }"
              class="cursor-pointer block lg:hidden text-surface-700 dark:text-surface-100 mr-4"
          >
            <i class="fa fa-bars text-xl!" />
          </a>
            <div class="flex flex-col">
               <span>{{ userInfo.name }}</span>
                <span class="text-sm italic">{{getRoleName()}}</span>
            </div>
        </div>
        <div class="py-2 mt-auto border-primary-400 dark:border-primary-300">
          <ul class="list-none p-2 px-4 m-0 hidden animate-duration-150 bg-white overflow-hidden absolute right-0 top-[65px] z-50 border-b border-l border-primary-700">
            <li>
              <router-link to="/profilo"
                           class="flex items-center cursor-pointer p-3 gap-2 rounded-lg text-primary-800 hover:text-primary-contrast hover:bg-primary-emphasis transition-colors duration-150">
                <i class="fa fa-user text-base! leading-none! "/>
                <span class="font-medium text-base leading-tight">{{ translate('app.profile') }}</span>
              </router-link>
            </li>
            <!--                    <li>-->
            <!--                        <a class="flex items-center cursor-pointer p-3 gap-2 rounded-lg text-primary-contrast hover:bg-primary-emphasis transition-colors duration-150">-->
            <!--                            <i class="pi pi-cog text-base! leading-none! text-primary-contrast" />-->
            <!--                            <span class="font-medium text-base leading-tight">Settings</span>-->
            <!--                        </a>-->
            <!--                    </li>-->
            <li>
              <router-link to="/logout"
                           class="flex items-center cursor-pointer p-3 gap-2 rounded-lg text-primary-800 hover:text-primary-contrast hover:bg-primary-emphasis transition-colors duration-150">
                <i class="fa fa-arrow-circle-right text-base! leading-none!"/>
                <span class="font-medium text-base leading-tight">{{ translate('app.logout') }}</span>
              </router-link>
            </li>
          </ul>
          <a
              v-styleclass="{
                                selector: '@prev',
                                enterFromClass: 'hidden',
                                enterActiveClass: 'animate-fadeinright',
                                leaveToClass: 'hidden',
                                leaveActiveClass: 'animate-fadeoutright',
                                hideOnOutsideClick: true
                            }"
              class="cursor-pointer block-inline text-surface-700 dark:text-surface-100 mr-4"
          >
            <i class="fa fa-user text-xl!"/>
          </a>

<!--          <a-->
<!--              class="cursor-pointer block-inline text-surface-700 dark:text-surface-100 mr-4"-->
<!--              @click="CrudHelpers.toggleDarkMode()"-->
<!--          >-->
<!--            <i class="fa text-xl!" :class="CrudHelpers.hasDarkMode() ? 'fa-sun' : 'fa-moon'" id="dark-mode-icon"/>-->
<!--          </a>-->
        </div>
        <div v-if="templateConfig.layoutsConf.SidebarGroupedLayout.profileMenu==='top'"
             class="flex items-center gap-1 cursor-pointer" @click="toggle" :title="userName">

          <Menu ref="menu" id="overlay_menu" :model="menuItems" :popup="true"/>
          {{ userName }}
          <!--                <img src="https://fqjltiegiezfetthbags.supabase.co/storage/v1/render/image/public/block.images/blocks/avatars/avatar-amyels.png" class="w-8 h-8 rounded-full cursor-pointer" />-->
          <Avatar v-if="userInfo.fotos && userInfo.fotos.length > 0" :image="getImg()" shape="circle"></Avatar>
          <Avatar v-else :label="getLetter()" shape="circle"></Avatar>
        </div>
      </div>

<!--      <TopbarColored></TopbarColored>-->
          <div class="p-6 pt-2 flex flex-col app-container m-auto overflow-auto">
            <router-view class="" :key="$route.fullPath"/>
          </div>

    </div>
  </div>
</template>

<script setup>
import TopbarColored from "@/application/layout/includes/TopbarColored.vue";
import SidebarGroupedMenu from "./includes/SidebarGroupedMenu.vue";
import templateConfig from '@/application/config/templateConfig.json';
import {useRouter} from 'vue-router'
import {onMounted, ref} from "vue";
import {userApp} from "../stores/userApp";
import cs from 'cupparis-primevue';
import StyleClass from 'primevue/styleclass';
import CrudHelpers from "@cupparis-lib/lib/CrudHelpers";


const menu = ref();
const router = useRouter();
const userInfo = ref({})
const userName = ref('');
const menuItems = ref([
  {
    label: '',
    items: [
      {
        label: cs.CrudCore.translate('app.profile'),
        icon: 'pi pi-refresh',
        command() {
          router.push('/profilo')
        }
      },
      {
        label: cs.CrudCore.translate('app.logout'),
        icon: 'pi pi-upload',
        command() {
          router.push('/logout')
        }
      }
    ]
  }
]);

onMounted(() => {
  userApp().getUserInfo().then(() => {
    userInfo.value = userApp().userInfo;
    userName.value = (userInfo.value.mainrole ? userInfo.value.mainrole.name : '');
    if (isDev()) {
      userName.value += ' Dev';
    }
    // menuItems.value[0].label =  menuTitle;
    // userLoaded.value = true;
  })
})

function isDev() {
  return (import.meta.env.VITE_MODE === 'dev')
}

function translate(key) {
  return cs.CrudCore.translate(key)
}

function getImg() {
  if (isDev()) {
    return import.meta.env.VITE_APP_TARGET + userInfo.value.fotos[0].resource.url;
  }

  return userInfo.fotos[0].resource.url;

}

function getVersion() {
  return import.meta.env.VITE_VERSION;
}

function getEnte() {
  
  return cs.CrudVars.env.ente;
}

function getLetter() {
  let l = userName.value.split(' ');
  let label = ''
  for (let word of l) {
    label += word.charAt(0).toUpperCase()
  }
  return label;
}

const toggle = (event) => {
  menu.value.toggle(event);
};

function getRoleName() {
    if (userInfo.value && userInfo.value.role) {
        return userInfo.value.role.name
    }
    return '';
}
</script>

<style>
.app-container {
  height: calc(100vh - 75px) !important;

  width: 100vw;

  @media (min-width: 1024px) {
    width: calc(100vw - 231px);

    max-width: 1600px;
  }

}
html {
  font-size: 14px;
}

</style>
