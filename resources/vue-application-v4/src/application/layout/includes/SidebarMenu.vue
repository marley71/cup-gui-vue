

<template>
    <div class="grid grid-cols-2 gap-3">
            <template v-for="mainItem in menu" >
                    <template v-if="mainItem.items">
                        <div v-for="child in mainItem.items" class="flex flex-col items-center">
                            <template v-if="child.to">
                                <router-link :to="child.to"
                                             class="p-4 px-5 rounded-lg border border-primary-400 dark:border-primary-300 inline-flex items-center justify-center hover:bg-primary-emphasis text-primary-contrast transition-colors duration-150 shrink-0 cursor-pointer"
                                >
                                    <i :class="child.icon?child.icon:'fa fa-gear'" class="text-xl! leading-tight! text-primary-contrast dark:text-primary-contrast" />
                                </router-link>
                                <div class="mt-2 text-primary-100 dark:text-primary-contrast text-sm font-medium text-center">{{child.label}}</div>
                            </template>
                            <template v-else> <!-- menu terzo livello -->
                                <div  class="p-2 px-3 rounded-lg border border-primary-400 dark:border-primary-300 inline-flex items-center justify-center hover:bg-primary-emphasis text-primary-contrast transition-colors duration-150 shrink-0 cursor-pointer">
                                    <Button
                                        type="button" :icon="child.icon" @click="toggleTerzoLivello($event,child.mId)" aria-haspopup="true" aria-controls="overlay_menu" />
                                </div>
                                <div class="mt-2 text-primary-100 dark:text-primary-contrast text-sm font-medium text-center">{{child.label}}</div>
                                <Menu :ref="'menu'+child.mId" :id="'overlay_menu'+child.mId" :model="child.items" :popup="true" >
                                    <template #item="{item,props}">

                                        <router-link :to="item.to"
                                                     class="rounded-lg dark:border-primary-300 inline-flex items-center justify-center hover:bg-primary-emphasis text-primary transition-colors duration-150 shrink-0 cursor-pointer"
                                        >
                                            <i :class="item.icon" class="text-xl! leading-tight! text-primary-contrast dark:text-primary-contrast" />
                                            {{item.label}}
                                        </router-link>
                                    </template>
                                </Menu>

                            </template>
                        </div>
                    </template>
                    <div v-else class="flex flex-col items-center">
                        <router-link :to="mainItem.to"
                                     class="p-4 px-5 rounded-lg border border-primary-400 dark:border-primary-300 inline-flex items-center justify-center hover:bg-primary-emphasis text-primary-contrast transition-colors duration-150 shrink-0 cursor-pointer"
                        >
                            <i :class="mainItem.icon" class="pi pi-home text-xl! leading-tight! text-primary-contrast dark:text-primary-contrast" />
                        </router-link>
                        <div class="mt-2 text-primary-100 dark:text-primary-contrast text-sm font-medium text-center">{{mainItem.label}}</div>
                    </div>
            </template>


<!--        <div class="flex flex-col items-center">-->
<!--            <a-->
<!--                class="p-4 px-5 rounded-lg border border-primary-400 dark:border-primary-300 inline-flex items-center justify-center hover:bg-primary-emphasis text-primary-contrast transition-colors duration-150 shrink-0 cursor-pointer"-->
<!--            >-->
<!--                <i class="pi pi-home text-xl! leading-tight! text-primary-contrast dark:text-primary-contrast" />-->
<!--            </a>-->
<!--            <div class="mt-2 text-primary-100 dark:text-primary-contrast text-sm font-medium text-center">Home</div>-->
<!--        </div>-->

<!--        <div class="flex flex-col items-center">-->
<!--            <a-->
<!--                class="p-4 px-5 rounded-lg border border-primary-400 dark:border-primary-300 inline-flex items-center justify-center hover:bg-primary-emphasis text-primary-contrast transition-colors duration-150 shrink-0 cursor-pointer"-->
<!--            >-->
<!--                <i class="pi pi-bookmark text-xl! leading-tight! text-primary-100 dark:text-primary-contrast" />-->
<!--            </a>-->
<!--            <div class="mt-2 text-primary-100 dark:text-primary-contrast text-sm font-medium text-center">Favorite</div>-->
<!--        </div>-->

<!--        <div class="flex flex-col items-center">-->
<!--            <a-->
<!--                class="p-4 px-5 rounded-lg border border-primary-400 dark:border-primary-300 inline-flex items-center justify-center hover:bg-primary-emphasis text-primary-contrast transition-colors duration-150 shrink-0 cursor-pointer"-->
<!--            >-->
<!--                <i class="pi pi-users text-xl! leading-tight! text-primary-100 dark:text-primary-contrast" />-->
<!--            </a>-->
<!--            <div class="mt-2 text-primary-100 dark:text-primary-contrast text-sm font-medium text-center">People</div>-->
<!--        </div>-->

<!--        <div class="flex flex-col items-center">-->
<!--            <a-->
<!--                class="p-4 px-5 rounded-lg border border-primary-400 dark:border-primary-300 inline-flex items-center justify-center hover:bg-primary-emphasis text-primary-contrast transition-colors duration-150 shrink-0 cursor-pointer"-->
<!--            >-->
<!--                <i class="pi pi-comments text-xl! leading-tight! text-primary-100 dark:text-primary-contrast" />-->
<!--            </a>-->
<!--            <div class="mt-2 text-primary-100 dark:text-primary-contrast text-sm font-medium text-center">Chat</div>-->
<!--        </div>-->

<!--        <div class="flex flex-col items-center">-->
<!--            <a-->
<!--                class="p-4 px-5 rounded-lg border border-primary-400 dark:border-primary-300 inline-flex items-center justify-center hover:bg-primary-emphasis text-primary-contrast transition-colors duration-150 shrink-0 cursor-pointer"-->
<!--            >-->
<!--                <i class="pi pi-calendar text-xl! leading-tight! text-primary-100 dark:text-primary-contrast" />-->
<!--            </a>-->
<!--            <div class="mt-2 text-primary-100 dark:text-primary-contrast text-sm font-medium text-center">Calendar</div>-->
<!--        </div>-->

<!--        <div class="flex flex-col items-center">-->
<!--            <a-->
<!--                class="p-4 px-5 rounded-lg border border-primary-400 dark:border-primary-300 inline-flex items-center justify-center hover:bg-primary-emphasis text-primary-contrast transition-colors duration-150 shrink-0 cursor-pointer"-->
<!--            >-->
<!--                <i class="pi pi-cog text-xl! leading-tight! text-primary-100 dark:text-primary-contrast" />-->
<!--            </a>-->
<!--            <div class="mt-2 text-primary-100 dark:text-primary-contrast text-sm font-medium text-center">Settings</div>-->
<!--        </div>-->
    </div>
</template>

<script >
import menuSuperAdmin from "../../config/menuSuperAdmin";
import {userApp} from "../../stores/userApp";
import cs from 'cupparis-primevue';

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

        console.debug('CONFIG Menu',dt)
        return dt;

    },
    methods : {
        toggleTerzoLivello(event,refMenu) {
            console.debug('tottle',this.$refs,event,refMenu);
            this.$refs['menu'+refMenu][0].toggle(event);
        }
    }
}
</script>

<style scoped>

</style>
