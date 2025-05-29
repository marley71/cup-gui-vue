<template>
    <div class="layout-topbar">
        <button v-if="config.boolean.rightMenu" class="p-link layout-right-panel-button layout-topbar-icon" id="menu-button" @click="onRightMenuButtonClick">
            <i class="pi pi-ellipsis-v"></i>
        </button>

        <button class="p-link layout-menu-button layout-topbar-icon" @click="onMenuButtonClick">
            <i class="pi pi-bars"></i>
        </button>

        <router-link to="/" class="p-link layout-topbar-logo" :class="orizzontalMenu?'m-0 p-0':'m-0 p-0'" >
            <img id="topbar-logo" :src="logoImage" alt="cupparis-vue" />
        </router-link>

        <span class="layout-topbar-search" v-if="config.boolean.globalSearch">
            <i class="pi pi-search"></i>
            <input type="text" placeholder="Enter your search term" />
        </span>

        <ul class="topbar-menu">
            <li v-if="config.boolean.profileMenu" :class="['user-profile', { 'active-topmenuitem fadeInDown': activeTopbarItem === 'profile' }]">
                <button class="p-link" v-if="!this.inlineUser" @click="$emit('topbar-item-click', { originalEvent: $event, item: 'profile' })">
                    <img src="/layout/images/avatar.png" alt="roma-layout" />
                    <div class="layout-profile-userinfo" >
                        <span class="layout-profile-name">{{ userInfo.name }}</span>
                        <span class="layout-profile-role">{{userInfo.mainrole?userInfo.mainrole.name:''}}</span>
                        <span class="layout-profile-role" v-if="isDev">DEV MODE</span>
                    </div>
                </button>
                <transition name="layout-submenu-container">
                    <ul class="fadeInDown" v-show="activeTopbarItem === 'profile'">
                        <li role="menuitem">
                            <button class="p-link" @click="$router.push('/profilo')">
                                <i class="pi pi-fw pi-user"></i>
                                <span>Profile</span>
                            </button>
                        </li>
                        <li role="menuitem">
                            <button class="p-link" @click="$router.push('/logout')">
                                <i class="fa-solid fa-right-from-bracket"></i>
                                <span>Logout</span>
                            </button>
                        </li>
<!--                        <li role="menuitem">-->
<!--                            <button class="p-link">-->
<!--                                <i class="pi pi-fw pi-cog"></i>-->
<!--                                <span>Settings</span>-->
<!--                            </button>-->
<!--                        </li>-->
<!--                        <li role="menuitem">-->
<!--                            <button class="p-link">-->
<!--                                <i class="pi pi-fw pi-envelope"></i>-->
<!--                                <span>Messages</span>-->
<!--                            </button>-->
<!--                        </li>-->
<!--                        <li role="menuitem">-->
<!--                            <button class="p-link">-->
<!--                                <i class="pi pi-fw pi-bell"></i>-->
<!--                                <span>Notifications</span>-->
<!--                            </button>-->
<!--                        </li>-->
                    </ul>
                </transition>
            </li>

            <li v-if="config.boolean.notification" :class="[{ 'active-topmenuitem fadeInDown': activeTopbarItem === 'settings' }]">
                <button class="p-link layout-topbar-icon" @click="$emit('topbar-item-click', { originalEvent: $event, item: 'settings' })">
                    <i class="topbar-icon pi pi-fw pi-bell"></i>
                </button>
                <transition name="layout-submenu-container">
                    <ul class="fadeInDown" v-show="activeTopbarItem === 'settings'">
                        <li role="menuitem">
                            <button class="p-link">
                                <img src="/layout/images/avatar-1.png" alt="roma-vue" />
                                <div class="topbar-menu-info">
                                    <span class="topbar-menu-name">Bithika Abhedananda</span>
                                    <span class="topbar-menu-role">User interface review is done.</span>
                                </div>
                            </button>
                        </li>
                        <li role="menuitem">
                            <button class="p-link">
                                <img src="/layout/images/avatar-2.png" alt="roma-vue" />
                                <div class="topbar-menu-info">
                                    <span class="topbar-menu-name">Dai Jiang</span>
                                    <span class="topbar-menu-role">Uh, we have sort of a problem here.</span>
                                </div>
                            </button>
                        </li>
                        <li role="menuitem">
                            <button class="p-link">
                                <img src="/layout/images/avatar-3.png" alt="roma-vue" />
                                <div class="topbar-menu-info">
                                    <span class="topbar-menu-name">Karlien Nijhuis</span>
                                    <span class="topbar-menu-role">You apparently didn’t put the thing</span>
                                </div>
                            </button>
                        </li>
                        <li role="menuitem">
                            <button class="p-link">
                                <img src="/layout/images/avatar-4.png" alt="roma-vue" />
                                <div class="topbar-menu-info">
                                    <span class="topbar-menu-name">Tom Chun</span>
                                    <span class="topbar-menu-role">Please check the files</span>
                                </div>
                            </button>
                        </li>
                        <li role="menuitem">
                            <button class="p-link">
                                <img src="/layout/images/avatar-5.png" alt="roma-vue" />
                                <div class="topbar-menu-info">
                                    <span class="topbar-menu-name">Maria Trofimova</span>
                                    <span class="topbar-menu-role">Meeting reports attached.</span>
                                </div>
                            </button>
                        </li>
                    </ul>
                </transition>
            </li>
        </ul>
    </div>

</template>

<script>
//import config from '@/data/topbar.json'
import templateConfig from '@/data/template-config.json';

import cs from 'cupparis-primevue'
import Utility from "@/service/Utility";
export default {
    emits: ['menubutton-click', 'topbar-menubutton-click', 'topbar-item-click', 'right-menubutton-click'],
    props: {
        topbarMenuActive: Boolean,
        activeTopbarItem: String,
        inlineUser: Boolean,
        orizzontalMenu : Boolean,
    },
    methods: {
        onMenuButtonClick(event) {
            this.$emit('menubutton-click', event);
        },
        onTopbarMenuButtonClick(event) {
            this.$emit('topbar-menubutton-click', event);
        },
        onRightMenuButtonClick(event) {
            this.$emit('right-menubutton-click', event);
        },
        isDev() {
            return (import.meta.env.VITE_MODE == 'dev')
        },
        utility() {
          return Utility;
        },
        async loadResources() {
            this.logoImage = await this.utility().resolve(this.config.generic.logo);
            console.debug('image',this.logoImage);
        }
    },
    data() {
      let topbarConfig = {
          "generic": templateConfig.topbarGenericConfig,
          "boolean": {}
      };
      for (let k in templateConfig.topbarBooleanConfig) {
        topbarConfig.boolean[templateConfig.topbarBooleanConfig[k].label] = templateConfig.topbarBooleanConfig[k].value
      }
      console.debug('topbarConfig ',topbarConfig)
        return {
            config : topbarConfig,
            userInfo : {},
            logoImage :null
        }
    },
    mounted() {
        let that = this;
        cs.Server.get('/api/me',{},(json) => {
            console.debug('userInfo',json);
            that.userInfo = json;
        })
        this.loadResources();
    }
};
</script>
<style>
#topbar-logo {
    height : 54px
}
</style>
