<template>
    <div class="min-h-screen flex relative lg:static bg-surface-50 dark:bg-surface-950">
    <div id="app-sidebar-colored" class="w-[280px] bg-primary h-screen hidden lg:block shrink-0 absolute lg:static left-0 top-0 z-10 select-none">
        <div class="flex flex-col h-full">
            <div class="p-4 flex items-center gap-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="43" height="43" viewBox="0 0 43 43" fill="none" class="w-10 h-10">
                    <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M21.5 42.0498C33.098 42.0498 42.5 32.6477 42.5 21.0498C42.5 9.45183 33.098 0.0498047 21.5 0.0498047C9.902 0.0498047 0.5 9.45183 0.5 21.0498C0.5 32.6477 9.902 42.0498 21.5 42.0498ZM28.0513 9.83248C28.3702 8.69975 27.2709 8.02994 26.267 8.74516L12.2528 18.7288C11.164 19.5045 11.3353 21.0498 12.51 21.0498H16.2003V21.0212H23.3926L17.5323 23.089L14.9487 32.2671C14.6299 33.3999 15.729 34.0697 16.733 33.3544L30.7472 23.3708C31.836 22.5951 31.6646 21.0498 30.49 21.0498H24.8937L28.0513 9.83248Z"
                        class="fill-primary-contrast"
                    />
                </svg>
                <span class="text-lg font-semibold leading-tight text-primary-contrast">ZenTrail</span>
            </div>
            <SidebarGroupedMenu></SidebarGroupedMenu>
            <div class="py-2 mt-auto has-[ul.hidden]:border-t border-primary-400 dark:border-primary-300">
                <ul class="list-none p-2 m-0 hidden origin-bottom animate-duration-150 border-t border-primary-400 dark:border-primary-300">
                    <li>
                        <a class="flex items-center cursor-pointer p-3 gap-2 rounded-lg text-primary-contrast hover:bg-primary-emphasis transition-colors duration-150">
                            <i class="pi pi-user text-base! leading-none! text-primary-contrast" />
                            <span class="font-medium text-base leading-tight">Profile</span>
                        </a>
                    </li>
                    <li>
                        <a class="flex items-center cursor-pointer p-3 gap-2 rounded-lg text-primary-contrast hover:bg-primary-emphasis transition-colors duration-150">
                            <i class="pi pi-cog text-base! leading-none! text-primary-contrast" />
                            <span class="font-medium text-base leading-tight">Settings</span>
                        </a>
                    </li>
                    <li>
                        <a class="flex items-center cursor-pointer p-3 gap-2 rounded-lg text-primary-contrast hover:bg-primary-emphasis transition-colors duration-150">
                            <i class="pi pi-sign-out text-base! leading-none! text-primary-contrast" />
                            <span class="font-medium text-base leading-tight">Sign Out</span>
                        </a>
                    </li>
                </ul>
                <a
                    v-styleclass="{
                                selector: '@prev',
                                enterFromClass: 'hidden',
                                enterActiveClass: 'animate-scalein',
                                leaveToClass: 'hidden',
                                leaveActiveClass: 'animate-fadeout'
                            }"
                    class="flex items-center cursor-pointer p-2 gap-2 text-primary-contrast"
                >
                    <img src="https://fqjltiegiezfetthbags.supabase.co/storage/v1/render/image/public/block.images/blocks/avatars/avatar-amyels.png" class="w-8 h-8 rounded-full" />
                    <span class="font-medium text-base leading-tight">Amy Elsner</span>
                    <i class="pi pi-angle-up text-base! leading-none! text-primary-contrast ml-auto" />
                </a>
            </div>
        </div>
    </div>
    <div class="min-h-screen flex flex-col relative flex-auto">
        <div class="flex justify-between items-center py-4 px-8 bg-surface-0 dark:bg-surface-900 border-b border-surface-200 dark:border-surface-700 relative lg:static">
            <div class="flex items-center">
                <a
                    v-styleclass="{
                                selector: '#app-sidebar-colored',
                                enterFromClass: 'hidden',
                                enterActiveClass: 'animate-fadeinleft',
                                leaveToClass: 'hidden',
                                leaveActiveClass: 'animate-fadeoutleft',
                                hideOnOutsideClick: true
                            }"
                    class="cursor-pointer block lg:hidden text-surface-700 dark:text-surface-100 mr-4"
                >
                    <i class="pi pi-bars text-xl!" />
                </a>
            </div>
            <div class="flex items-center gap-8">
                <i class="pi pi-bell text-lg! leading-none! text-surface-500 dark:text-surface-400 cursor-pointer" />
                <img src="https://fqjltiegiezfetthbags.supabase.co/storage/v1/render/image/public/block.images/blocks/avatars/avatar-amyels.png" class="w-8 h-8 rounded-full cursor-pointer" />
            </div>
        </div>
        <div class="p-8 flex flex-col flex-auto">
            <router-view :key="$route.fullPath"/>
<!--            <div class="border-2 border-dashed border-surface-200 dark:border-surface-700 rounded-2xl bg-surface-50 dark:bg-surface-800 flex-auto" />-->
        </div>
    </div>
    </div>
</template>

<script setup>
import SidebarGroupedMenu from "./includes/SidebarGroupedMenu.vue";
import { useRouter } from 'vue-router'
const router = useRouter();
</script>
