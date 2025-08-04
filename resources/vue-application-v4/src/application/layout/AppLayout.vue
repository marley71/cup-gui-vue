<template>
    <div :class="containerClass" @click="onDocumentClick">
        <AppTopBar
            :topbarMenuActive="topbarMenuActive"
            :activeTopbarItem="activeTopbarItem"
            :inlineUser="inlineUser"
            :orizzontal-menu="layoutMode==='horizontal'"
            @right-menubutton-click="onRightMenuButtonClick"
            @menubutton-click="onMenuButtonClick"
            @topbar-menubutton-click="onTopbarMenuButtonClick"
            @topbar-item-click="onTopbarItemClick"
        ></AppTopBar>

        <AppRightMenu :rightPanelMenuActive="rightPanelMenuActive" @rightmenu-click="onRightMenuClick"></AppRightMenu>

        <transition name="layout-menu-container">
            <div class="layout-menu-container" @click="onMenuClick" v-show="isMenuVisible()">
                <div class="menu-scroll-content">
                    <div class="layout-profile" v-if="inlineUser">
                        <button class="p-link layout-profile-button" @click="onInlineUserClick">
                            <img src="/layout/images/avatar.png" alt="roma-layout" />
                            <span class="layout-profile-userinfo">
                                <span class="layout-profile-name">{{user.name}}</span>
                                <span class="layout-profile-role">{{user.mainrole?user.mainrole.name:'-'}}</span>
                            </span>
                        </button>
                        <transition name="layout-profile-menu">
                            <ul :class="['layout-profile-menu', { 'profile-menu-active': inlineUserMenuActive }]" v-show="inlineUserMenuActive">
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

<!--                                <li>-->
<!--                                    <button class="p-link"><i class="pi pi-fw pi-user"></i><span>Profile</span></button>-->
<!--                                </li>-->
<!--                                <li>-->
<!--                                    <button class="p-link"><i class="pi pi-fw pi-cog"></i><span>Settings</span></button>-->
<!--                                </li>-->
<!--                                <li>-->
<!--                                    <button class="p-link"><i class="pi pi-fw pi-envelope"></i><span>Messages</span></button>-->
<!--                                </li>-->
<!--                                <li>-->
<!--                                    <button class="p-link"><i class="pi pi-fw pi-bell"></i><span>Notifications</span></button>-->
<!--                                </li>-->
                            </ul>
                        </transition>
                    </div>
                    <AppMenu :model="menu" :layoutMode="layoutMode" :active="menuActive" :mobileMenuActive="staticMenuMobileActive" @menuitem-click="onMenuItemClick" @root-menuitem-click="onRootMenuItemClick"></AppMenu>
                </div>
            </div>
        </transition>

        <div class="layout-main">
            <div class="layout-content">
                <router-view :key="$route.fullPath"/>
            </div>
            <AppFooter />
        </div>

        <div class="layout-content-mask"></div>
    </div>
</template>
<script>
import AppTopBar from './AppTopbar.vue';
import AppRightMenu from './AppRightMenu.vue';
import AppMenu from './AppMenu.vue';
import AppFooter from './AppFooter.vue';
import EventBus from './event-bus';
//import AppConfig from './AppConfig.vue';
import cs from 'cupparis-primevue';
import templateConfig from '../config/template-config.json';
import menuSuperAdmin from "../config/menuSuperAdmin";
import menuOriginal from "../config/menuOriginal";
import {userApp} from "../stores/userApp";

export default {
  mounted() {
      console.debug('theme',this.theme)
      this.changeStyleSheetUrl('layout-css', this.theme, 'layout');
      this.changeStyleSheetUrl('theme-css', this.theme, 'theme');
    console.debug('menu',this.menu);
  },
  data() {

    let menu = [];
    console.debug('mode',import.meta.env.VITE_MODE)
    if (import.meta.env.VITE_MODE == 'dev') {
      menu.push(menuSuperAdmin)
    }
    menu = menu.concat(cs.CrudVars.env.appMenu);

    if (import.meta.env.VITE_MODE == 'dev') {
      // menu = menu.concat(devMenu);
      menu = menu.concat(menuOriginal)
    }
    let dt = templateConfig;
    dt.menu = menu;
    dt.user = userApp().getUserInfo();

    console.debug('CONFIG Menu',dt)
    return dt;

    },
    watch: {
        $route() {
            this.menuActive = false;
            this.$toast.removeAllGroups();
        },
    },
    methods: {

        onDocumentClick() {
            if (!this.topbarItemClick) {
                this.activeTopbarItem = null;
                this.topbarMenuActive = false;
            }

            if (!this.rightMenuClick) {
                this.rightPanelMenuActive = false;
            }

            if (!this.userMenuClick && this.isSlim() && !this.isMobile()) {
                this.inlineUserMenuActive = false;
            }

            if (!this.menuClick) {
                if (this.isHorizontal() || this.isSlim()) {
                    this.menuActive = false;
                }

                if (this.overlayMenuActive || this.staticMenuMobileActive) {
                    this.hideOverlayMenu();
                }

                EventBus.emit('reset-active-index');
                this.unblockBodyScroll();
            }

            if (this.userMenuClick) {
                this.menuActive = false;
                EventBus.emit('reset-active-index');
            }

            this.topbarItemClick = false;
            this.menuClick = false;
            this.rightMenuClick = false;
            this.userMenuClick = false;
        },
        onMenuButtonClick(event) {
            this.menuClick = true;
            this.topbarMenuActive = false;
            this.rightPanelMenuActive = false;

            if (this.layoutMode === 'overlay') {
                this.overlayMenuActive = !this.overlayMenuActive;
            }

            if (this.isDesktop()) this.staticMenuDesktopInactive = !this.staticMenuDesktopInactive;
            else {
                this.staticMenuMobileActive = !this.staticMenuMobileActive;
                if (this.staticMenuMobileActive) {
                    this.blockBodyScroll();
                } else {
                    this.unblockBodyScroll();
                }
            }

            event.preventDefault();
        },
        onTopbarMenuButtonClick(event) {
            this.topbarItemClick = true;
            this.topbarMenuActive = !this.topbarMenuActive;
            this.hideOverlayMenu();
            event.preventDefault();
        },
        onTopbarItemClick(event) {
            this.topbarItemClick = true;

            if (this.activeTopbarItem === event.item) this.activeTopbarItem = null;
            else this.activeTopbarItem = event.item;

            event.originalEvent.preventDefault();
        },
        onMenuClick() {
            this.menuClick = true;
        },
        onInlineUserClick() {
            this.userMenuClick = true;
            this.inlineUserMenuActive = !this.inlineUserMenuActive;
        },
        blockBodyScroll() {
            this.addClass(document.body, 'blocked-scroll');
        },
        unblockBodyScroll() {
            this.removeClass(document.body, 'blocked-scroll');
        },
        onRightMenuButtonClick(event) {
            this.rightMenuClick = true;
            this.rightPanelMenuActive = !this.rightPanelMenuActive;

            this.hideOverlayMenu();

            event.preventDefault();
        },
        onRightMenuClick() {
            this.rightMenuClick = true;
        },
        hideOverlayMenu() {
            this.overlayMenuActive = false;
            this.staticMenuMobileActive = false;
        },
        onMenuItemClick(event) {
            if (!event.item.items) {
                EventBus.emit('reset-active-index');
                this.hideOverlayMenu();
            }
            if (!event.item.items && (this.isHorizontal() || this.isSlim())) {
                this.menuActive = false;
            }
        },
        onRootMenuItemClick() {
            this.menuActive = !this.menuActive;
        },
        isTablet() {
            let width = window.innerWidth;
            return width <= 1024 && width > 640;
        },
        isDesktop() {
            return window.innerWidth > 896;
        },
        isMobile() {
            return window.innerWidth <= 1025;
        },
        isHorizontal() {
            return this.layoutMode === 'horizontal';
        },
        isSlim() {
            return this.layoutMode === 'slim';
        },
        isMenuVisible() {
            if (this.isDesktop()) {
                if (this.layoutMode === 'static') return !this.staticMenuDesktopInactive;
                else if (this.layoutMode === 'overlay') return this.overlayMenuActive;
                else return true;
            } else {
                return true;
            }
        },
        onLayoutChange(layoutMode) {
            this.layoutMode = layoutMode;
            this.staticMenuDesktopInactive = false;
            this.overlayMenuActive = false;

            if (this.isSlim() || this.isHorizontal()) {
                this.inlineUser = false;
                this.inlineUserMenuActive = false;
            }
        },
        onMenuColorChange(menuColor) {
            this.lightMenu = menuColor;
        },
        onProfileModeChange(profileMode) {
            this.inlineUser = profileMode;
        },
        onChangeOrientation(orientation) {
            this.isRTL = orientation;
        },
        onTopbarColorChange(topbarColor, logo) {
            this.topbarColor = topbarColor;
            const topbarLogoLink = document.getElementById('topbar-logo');
            topbarLogoLink.src = '/layout/images/' + logo + '.svg';
        },
        onThemeChange(theme) {
            this.theme = theme;
            this.changeStyleSheetUrl('layout-css', theme, 'layout');
            this.changeStyleSheetUrl('theme-css', theme, 'theme');
        },
        changeStyleSheetUrl(id, value, prefix) {
            let element = document.getElementById(id);
            let urlTokens = element.getAttribute('href').split('/');
            urlTokens[urlTokens.length - 1] = prefix + '-' + value + '.css';
            let newURL = urlTokens.join('/');

            this.replaceLink(element, newURL);
        },
        replaceLink(linkElement, href) {
            const id = linkElement.getAttribute('id');
            const cloneLinkElement = linkElement.cloneNode(true);

            cloneLinkElement.setAttribute('href', href);
            cloneLinkElement.setAttribute('id', id + '-clone');

            linkElement.parentNode.insertBefore(cloneLinkElement, linkElement.nextSibling);

            cloneLinkElement.addEventListener('load', () => {
                linkElement.remove();
                cloneLinkElement.setAttribute('id', id);
            });
        },
        addClass(element, className) {
            if (element.classList) element.classList.add(className);
            else element.className += ' ' + className;
        },
        removeClass(element, className) {
            if (element.classList) element.classList.remove(className);
            else element.className = element.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
        },
        // saveConfig() {
        //     templateConfig.layoutMode = this.layoutMode;
        //     templateConfig.staticMenuDesktopInactive = this.staticMenuDesktopInactive;
        //     templateConfig.overlayMenuActive = this.overlayMenuActive;
        //     templateConfig.inlineUser = this.inlineUser;
        //     templateConfig.inlineUserMenuActive = this.inlineUserMenuActive;
        //     templateConfig.lightMenu = this.lightMenu;
        //     templateConfig.isRTL = this.isRTL;
        //     templateConfig.inlineUser = this.inlineUser;
        //     templateConfig.topbarMenuActive = this.topbarMenuActive;
        //     templateConfig.activeTopbarItem = this.activeTopbarItem;
        //     templateConfig.rightPanelMenuActive = this.rightPanelMenuActive;
        //     templateConfig.inlineUserMenuActive = this.inlineUserMenuActive;
        //     templateConfig.menuActive = this.menuActive;
        //     templateConfig.topbarColor = this.topbarColor;
        //     templateConfig.theme = this.theme;
        //     console.debug('TEMPLATECONFIG',templateConfig);
        //     Utility.connectToServer().then( (ws) => {
        //         let json = {
        //             action : 'save-config',
        //             data : templateConfig
        //         }
        //         ws.send(JSON.stringify(json));
        //     }).catch((e) => {
        //         console.error(e);
        //         cs.CrudCore.alertError(e);
        //     })
        // }
    },
    computed: {
        containerClass() {
            return [
                'layout-wrapper',
                {
                    'layout-horizontal': this.layoutMode === 'horizontal',
                    'layout-overlay': this.layoutMode === 'overlay',
                    'layout-static': this.layoutMode === 'static',
                    'layout-slim': this.layoutMode === 'slim',
                    'layout-menu-light': this.lightMenu === true,
                    'layout-menu-dark': this.lightMenu === false,
                    'layout-overlay-active': this.overlayMenuActive,
                    'layout-mobile-active': this.staticMenuMobileActive,
                    'layout-static-inactive': this.staticMenuDesktopInactive,
                    'layout-rtl': this.isRTL,
                    'p-input-filled': this.$primevue.config.inputStyle === 'filled',
                    'p-ripple-disabled': this.$primevue.config.ripple === false,
                },
                this.topbarColor,
            ];
        },
    },
    components: {
        AppTopBar: AppTopBar,
        AppRightMenu: AppRightMenu,
        AppMenu: AppMenu,
        //AppConfig: AppConfig,
        AppFooter: AppFooter,
    },
};
</script>
