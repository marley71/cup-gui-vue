<script setup>

import Badge from "primevue/badge";
import { ref, onMounted } from 'vue';
import menuSuperAdmin from "../../config/menuSuperAdmin";
import cs from "cupparis-primevue";
import {userApp} from  "../../stores/userApp";
import { useRouter } from 'vue-router'
import {TopbarStatus} from "./TopbarStatus";

const menu = ref();
const userInfo = ref({});
const userLoaded = ref(false);
const router = useRouter();
const menuPath = ref([]);
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


const navs = ref([
    // {
    //     label: 'Dashboard',
    //     icon: 'pi pi-th-large',
    //     to: ''
    // },
    // {
    //     label: 'Bookmarks',
    //     icon: 'pi pi-bookmark',
    //     to: ''
    // },
    // {
    //     label: 'Team',
    //     icon: 'pi pi-users',
    //     to: ''
    // },
    // {
    //     label: 'Messages',
    //     icon: 'pi pi-comments',
    //     badge: '6',
    //     to: ''
    // }
]);

const selectedNav = ref('Dashboard');
onMounted(() => {
    setMenu();
    setPath();
    setUserMenu();
})

function setMenu() {
    if (import.meta.env.VITE_MODE == 'dev') {
        navs.value.push(menuSuperAdmin)
    }
    navs.value = navs.value.concat(cs.CrudVars.env.appMenu);
// assegno un id per problemi di ref nei menu di terzo livello
    let mId = 0;
    for (let i in navs.value) {
        navs.value[i].mId = mId++;
        if (navs.value[i].to) {
            navs.value[i].command = () => {
                router.push(navs.value[i].to);
                menuPath.value = [navs.value[i].label];
                TopbarStatus().setMenuPath(menuPath.value)
            }
        }

        let items = navs.value[i].items?navs.value[i].items:[];
        for (let j in items) {
            navs.value[i].items[j].mId = mId++;
            if (navs.value[i].items[j].to) {
                navs.value[i].items[j].command = () => {
                    router.push(navs.value[i].items[j].to);
                    menuPath.value = [navs.value[i].label,navs.value[i].items[j].label];
                    TopbarStatus().setMenuPath(menuPath.value)
                }
            }
            if (navs.value[i].items[j].items) {
                let subItems = navs.value[i].items[j].items;
                for (let k in subItems) {
                    subItems[k].command = () => {
                        router.push(subItems[k].to);
                        menuPath.value = [navs.value[i].label, navs.value[i].items[j].label, subItems[k].label];
                        TopbarStatus().setMenuPath(menuPath.value)
                    }
                }
            }
        }
    }
}

function setPath() {
    menuPath.value = TopbarStatus().menuPath;
    // let currentPath = router.currentRoute.value.path;
    // console.debug(currentPath,'menu',navs.value)
    // for (let i in navs.value) {
    //     if (navs.value[i].to && navs.value[i].to==currentPath) {
    //         menuPath.value = [navs.value[i].label];
    //         break;
    //     }
    //     let items = navs.value[i].items?navs.value[i].items:[];
    //     for (let j in items) {
    //         if (navs.value[i].items[j].to && navs.value[i].items[j].to==currentPath) {
    //             menuPath.value = [navs.value[i].label,navs.value[i].items[j].label];
    //             break;
    //         }
    //         if (navs.value[i].items[j].items) {
    //             let subItems = navs.value[i].items[j].items;
    //             for (let k in subItems) {
    //                 if (subItems[k].to && subItems[k].to==currentPath) {
    //                     menuPath.value = [navs.value[i].label, navs.value[i].items[j].label, subItems[k].label];
    //                 }
    //             }
    //         }
    //     }
    // }
}

function setUserMenu() {
    userApp().getUserInfo().then(() => {
        userInfo.value = userApp().userInfo;
        let menuTitle = (userInfo.value.mainrole?userInfo.value.mainrole.name:'');
        if (isDev()) {
            menuTitle+=' Dev';
        }
        menuItems.value[0].label =  menuTitle;
        userLoaded.value = true;
    })
}

function isDev() {
    return (import.meta.env.VITE_MODE === 'dev')
}

const toggle = (event) => {
    menu.value.toggle(event);
};
</script>

<template>
    <nav class="relative flex items-center justify-between gap-8 px-8 lg:px-20 py-4 bg-primary-500">
        <div class="flex items-center gap-4">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M6.84219 2.87829C5.69766 3.67858 4.6627 4.62478 3.76426 5.68992C7.4357 5.34906 12.1001 5.90564 17.5155 8.61335C23.2984 11.5047 27.955 11.6025 31.1958 10.9773C30.9017 10.087 30.5315 9.23135 30.093 8.41791C26.3832 8.80919 21.6272 8.29127 16.0845 5.51998C12.5648 3.76014 9.46221 3.03521 6.84219 2.87829ZM27.9259 5.33332C24.9962 2.06 20.7387 0 16 0C14.6084 0 13.2581 0.177686 11.9709 0.511584C13.7143 0.987269 15.5663 1.68319 17.5155 2.65781C21.5736 4.68682 25.0771 5.34013 27.9259 5.33332ZM31.8887 14.1025C27.9735 14.8756 22.567 14.7168 16.0845 11.4755C10.024 8.44527 5.20035 8.48343 1.94712 9.20639C1.7792 9.24367 1.61523 9.28287 1.45522 9.32367C1.0293 10.25 0.689308 11.2241 0.445362 12.2356C0.705909 12.166 0.975145 12.0998 1.25293 12.0381C5.19966 11.161 10.7761 11.1991 17.5155 14.5689C23.5761 17.5991 28.3997 17.561 31.6529 16.838C31.7644 16.8133 31.8742 16.7877 31.9822 16.7613C31.9941 16.509 32 16.2552 32 16C32 15.358 31.9622 14.7248 31.8887 14.1025ZM31.4598 20.1378C27.5826 20.8157 22.3336 20.5555 16.0845 17.431C10.024 14.4008 5.20035 14.439 1.94712 15.1619C1.225 15.3223 0.575392 15.5178 0.002344 15.7241C0.000781601 15.8158 0 15.9078 0 16C0 24.8366 7.16344 32 16 32C23.4057 32 29.6362 26.9687 31.4598 20.1378Z"
                    class="fill-primary-contrast"
                />
            </svg>
            <div class="text-primary-contrast font-semibold text-lg">Trimzales</div>
        </div>

        <a
            v-styleclass="{
                    selector: '@next',
                    enterFromClass: 'hidden',
                    enterActiveClass: 'animate-fadein',
                    leaveToClass: 'hidden',
                    leaveActiveClass: 'animate-fadeout',
                    hideOnOutsideClick: true,
                    resizeSelector: '.resize-container-1',
                    hideOnResize: true
                }"
            class="cursor-pointer block lg:hidden text-primary-contrast"
        >
            <i class="pi pi-bars text-xl! leading-normal!" />
        </a>

        <div
            class="hidden lg:flex flex-1 items-center justify-between absolute lg:static w-full bg-primary-500 left-0 top-full z-10 shadow-sm lg:shadow-none border lg:border-0 border-primary-400"
        >
            <Menubar :model="navs" class="bg-primary-500"></Menubar>
<!--            <div class="flex-1 flex items-start gap-4 px-6 lg:px-0 py-4 lg:py-0 flex-col lg:flex-row">-->
<!--                <a-->
<!--                    v-for="(item, i) in navs"-->
<!--                    :key="i"-->
<!--                    :class="[-->
<!--                            'flex items-center gap-2 p-2 rounded-lg cursor-pointer transition-colors duration-150 w-full lg:w-auto',-->
<!--                            selectedNav === item.label ? 'bg-primary-600 dark:bg-primary-400 text-primary-contrast' : 'text-primary-contrast/90 hover:bg-primary-600 dark:hover:bg-primary-400 hover:text-primary-contrast'-->
<!--                        ]"-->
<!--                    @click="selectedNav = item.label"-->
<!--                >-->
<!--                    <i :class="[`${item.icon} text-base! leading-normal!`, selectedNav === item.label ? 'text-primary-contrast' : 'text-primary-contrast/90']" />-->
<!--                    <span class="font-medium">{{ item.label }}</span>-->
<!--                    <Badge v-if="item.badge" :value="item.badge" severity="contrast" class="ml-2" />-->
<!--                </a>-->
<!--            </div>-->
            <div  class="text-white hidden lg:flex flex-1 absolute lg:static w-full bg-primary-500 left-0 top-full z-10 shadow-sm lg:shadow-none border lg:border-0 border-primary-400"
            >
                <span v-for="(label,index) in menuPath">{{label}}{{ index==menuPath.length-1?'':'&nbsp;/&nbsp;' }}</span>
            </div>
            <div class="flex items-center gap-8 px-6 lg:px-0 py-4 lg:py-0 border-t lg:border-t-0 border-primary-400 flex-row">
                <div class="w-full lg:w-auto">
                    <i class="pi pi-bell text-xl! leading-normal! text-primary-contrast/90 cursor-pointer" />
                </div>
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
        </div>
    </nav>
</template>

<style scoped>
.p-menubar {
    background: var(--bg-primary-500) !important;
    border : none;
    color:white !important;
}

.p-menubar-submenu {
    background: var(--bg-primary-500) !important;
    border : none;
    color:white !important;
}

.p-menubar-item-content {
    background: var(--bg-primary-500) !important;
    border : none;
    color:white !important;
}

.p-menubar-item, .p-menubar-item-link {
    background: var(--bg-primary-500) !important;
    border : none;
    color:white !important;
}
span .p-menubar-item-label {
    color:white !important;
}
.p-menubar-item-link {
    color:white !important;
}
</style>
