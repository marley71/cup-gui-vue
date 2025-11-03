<template>
    <div id="menu-sidebar" class="overflow-y-auto flex-1 p-2 flex flex-col gap-4 scrollbar-custom">
        <template v-for="mainItem in menu" >

                <ul class="list-none m-0 flex flex-col gap-1">
                    <li v-if="mainItem.items">
                        <div
                            @click="changeMenuStatus(mainItem.mId,$event)"
                            v-styleclass="{
                                        selector: '@next',
                                        enterFromClass: 'hidden',
                                        enterActiveClass: 'animate-slidedown',
                                        leaveToClass: 'hidden',
                                        leaveActiveClass: 'animate-slideup'
                                    }"
                            class="flex items-center cursor-pointer p-3 gap-4 rounded-lg text-surface-0 hover:bg-primary-emphasis transition-colors duration-150"
                        >
                            <span class="font-semibold text-base leading-tight text-primary-contrast">{{mainItem.label}}</span>
                            <i class="fa fa-angle-down text-base! leading-none! text-primary-contrast ml-auto" />
                        </div>
                        <ul :id="mainItem.mId" class="list-none m-0 overflow-hidden  flex-col gap-1 mt-1" :class="menuStatus.opened[mainItem.mId]?'flex':'hidden'">

                            <li v-for="child in mainItem.items">
                                <template v-if="child.to">
                                    <router-link :name="child.to" :to="child.to" class="flex items-center cursor-pointer p-3 gap-2 rounded-lg text-primary-contrast hover:bg-primary-emphasis transition-colors duration-150">
                                        <i class="pi pi-home text-base! leading-none! text-primary-contrast" />
                                        <span class="font-medium text-base leading-tight">{{child.label}}</span>
                                    </router-link>
                                </template>
                                <template v-else>
                                    <div
                                        @click="changeMenuStatus(child.mId,$event)"
                                        v-styleclass="{
                                        selector: '@next',
                                        enterFromClass: 'hidden',
                                        enterActiveClass: 'animate-slidedown',
                                        leaveToClass: 'hidden',
                                        leaveActiveClass: 'animate-slideup'
                                    }"
                                        class="ml-2 flex items-center cursor-pointer p-3 gap-4 rounded-lg text-surface-0 hover:bg-primary-emphasis transition-colors duration-150"
                                    >
                                        <span class="font-semibold text-base leading-tight text-primary-contrast">{{child.label}}</span>
                                        <i class="fa fa-angle-down text-base! leading-none! text-primary-contrast ml-auto" />
                                    </div>
                                    <ul :id="child.mId" class="list-none m-0 overflow-hidden flex-col gap-1 mt-1 ml-5" :class="menuStatus.opened[child.mId]?'flex':'hidden'">

                                        <li v-for="item in child.items">

                                            <router-link :name="item.to" :to="item.to" class="flex items-center cursor-pointer p-1 gap-1 rounded-lg text-primary-contrast hover:bg-primary-emphasis transition-colors duration-150">
                                                <i :class="item.icon" class="text-base! leading-none! text-primary-contrast" />
                                                <span class="font-light text-sm leading-tight">{{item.label}}</span>
                                            </router-link>
                                        </li>

                                    </ul>
                                </template>
                            </li>

                        </ul>
                    </li>
                    <li v-else>
<!--                        <a class="flex items-center cursor-pointer p-3 gap-2 rounded-lg text-primary-contrast hover:bg-primary-emphasis transition-colors duration-150">-->
<!--                            <i class="pi pi-home text-base! leading-none! text-primary-contrast" />-->
<!--                            <span class="font-medium text-base leading-tight">{{mainItem.label}}</span>-->
<!--                        </a>-->
                        <router-link :name="mainItem.to" :to="mainItem.to"
                                     class="flex items-center cursor-pointer p-3 gap-2 rounded-lg text-primary-contrast hover:bg-primary-emphasis transition-colors duration-150"
                        >
                            <i :class="mainItem.icon" class="text-base! leading-none! text-primary-contrast" />
                            <span class="font-medium text-base leading-tight">{{mainItem.label}}</span>

                        </router-link>
                    </li>
                </ul>
                <hr class="border-t border-primary-400 dark:border-primary-300 my-0" />
        </template>
    </div>
</template>

<script >
import menuSuperAdmin from "../../config/menuSuperAdmin";
import {userApp} from "../../stores/userApp";
import cs from 'cupparis-primevue';
import {SidebarGroupedStatus} from "./SidebarGroupedStatus";

export default {

    data() {

        let menu = [];
        console.debug('mode',import.meta.env.VITE_MODE)
        if (import.meta.env.VITE_MODE == 'dev') {
            menu.push(menuSuperAdmin)
        }
        menu = menu.concat(cs.CrudVars.env.appMenu);
        // assegno un id per problemi di ref nei menu di terzo livello
        let mId = 0;
        for (let i in menu) {
            menu[i].mId = mId++;
            let items = menu[i].items?menu[i].items:[];
            for (let j in items) {
                menu[i].items[j].mId = mId++;
            }
        }


        // if (import.meta.env.VITE_MODE == 'dev') {
        //     menu = menu.concat(menuOriginal)
        // }
        let dt = {}; //templateConfig;
        dt.menu = menu;
        dt.user = userApp().getUserInfo();
        dt.menuStatus = SidebarGroupedStatus();
        console.debug('CONFIG Menu',dt)
        for (let i in dt.menuStatus.opened) {
            console.debug('key ',i,dt.menuStatus.opened[i]);
        }
        return dt;

    },
    mounted() {
        let path = this.$router.currentRoute.value.path;
        setTimeout(function () {
            console.debug('path',path,);
            const container = document.getElementById('menu-sidebar');
            const elemento = document.querySelector('a[name="' + path +'"]');
            if (!container || !elemento) return;
            const containerRect = container.getBoundingClientRect();
            const elementoRect = elemento.getBoundingClientRect();
            const isVisible = (
                elementoRect.top >= containerRect.top &&
                elementoRect.bottom <= containerRect.bottom
            );
            if (!isVisible) {
                elemento.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
            }
            elemento.classList.add('highlight');
        },200)
    },
    methods : {
        changeMenuStatus(menuId,event) {
            event.preventDefault();
            console.debug('changeMenuStatus',event);
            let that = this;
            setTimeout(function () {
                that.menuStatus.setOpen(menuId,!that.menuStatus.opened[menuId])
                console.debug('sitauazione',that.menuStatus.opened[menuId],document.getElementById(menuId));
                if (document.getElementById(menuId)) {
                    document.getElementById(menuId).style['max-height'] = '1000px';
                }
            },200)


        },
    }
}
</script>
<style>
/*
.scrollbar-custom {
    scrollbar-width: thin;
}
*/
.scrollbar-custom::-webkit-scrollbar {
    width: 1px;
    height: 1px; /* per la scrollbar orizzontale */
}

/* Puoi anche personalizzare i thumb */
.scrollbar-custom::-webkit-scrollbar-thumb {
    background: transparent !important; /* colore del thumb per visibilità */
}

::-webkit-scrollbar {
    width: 1px; /* larghezza del scroll */
}

::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.5); /* colore thumb */
    border-radius: 4px; /* angoli arrotondati */
}

::-webkit-scrollbar-track {
    background: transparent; /* traccia trasparente */
}

.highlight span {
    font-weight: bold;
    font-size : 1.02em;
}
</style>
