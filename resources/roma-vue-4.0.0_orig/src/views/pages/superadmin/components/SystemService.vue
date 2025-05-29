<script>
import cs from "cupparis-primevue";
import AppConfigFlat from "@/layout/AppConfigFlat.vue";
import templateConfig from '@external/config/template-config.json';
import topbarColors from '@external/config/topbarColors.json';
import themeColors from '@external/config/themeColors.json';
import ProgressSpinner from 'primevue/progressspinner';

export default {
    name: "SystemService",
    props : ['data'],
    emits : ['call-action'],
    components : {AppConfigFlat,ProgressSpinner},
    watch: {
        data(value) {
            this.response(value);
        }
    },
    data() {
        return  Object.assign(templateConfig,{
            serverStatus : '',
            commandWorking : false,
            commandOutput : [],
            bufferOut : [],
            //bufferErr : '',
            selectedCategories : [],
            items : [],
            info : '',
            //services : services,
            themeColors : themeColors,
            topbarColors : topbarColors,
            serviceResponse : null,
            listConf : {
                modelName : 'user',
                type : 'v-list'
            },
            editConf : {
                modelName : 'user',
                type : 'v-edit',
                pk : 3,
            },
            viewConf : {
                modelName : 'user',
                type : 'v-view',
                pk : 3,
            }
        });
    },
    methods: {
        onLayoutChange(layoutMode) {
            this.layoutMode = layoutMode;
            this.staticMenuDesktopInactive = false;
            this.overlayMenuActive = false;

            if (this.isSlim() || this.isHorizontal()) {
                this.inlineUser = false;
                this.inlineUserMenuActive = false;
            }
            this.saveCurrentConfig();
        },
        onMenuColorChange(menuColor) {
            this.lightMenu = menuColor;
            this.saveCurrentConfig();
        },
        onProfileModeChange(profileMode) {
            this.inlineUser = profileMode;
            this.saveCurrentConfig();
        },
        onChangeOrientation(orientation) {
            this.isRTL = orientation;
            this.saveCurrentConfig();
        },
        onTopbarColorChange(topbarColor, logo) {
            this.topbarColor = topbarColor;
            const topbarLogoLink = document.getElementById('topbar-logo');
            topbarLogoLink.src = '/layout/images/' + logo + '.svg';
            this.saveCurrentConfig();
        },
        onThemeChange(themeName) {
            this.theme = themeName;
            this.changeStyleSheetUrl('layout-css', themeName, 'layout');
            this.changeStyleSheetUrl('theme-css', themeName, 'theme');
            this.saveCurrentConfig();
        },

        onTopBarConfigChange(config) {
            this.topbarConfig = config;
        },

        saveCurrentConfig() {
            templateConfig.layoutMode = this.layoutMode;
            templateConfig.staticMenuDesktopInactive = this.staticMenuDesktopInactive;
            templateConfig.overlayMenuActive = this.overlayMenuActive;
            templateConfig.inlineUser = this.inlineUser;
            templateConfig.inlineUserMenuActive = this.inlineUserMenuActive;
            templateConfig.lightMenu = this.lightMenu;
            templateConfig.isRTL = this.isRTL;
            templateConfig.inlineUser = this.inlineUser;
            templateConfig.topbarMenuActive = this.topbarMenuActive;
            templateConfig.activeTopbarItem = this.activeTopbarItem;
            templateConfig.rightPanelMenuActive = this.rightPanelMenuActive;
            templateConfig.inlineUserMenuActive = this.inlineUserMenuActive;
            templateConfig.menuActive = this.menuActive;
            templateConfig.topbarColor = this.topbarColor;
            templateConfig.theme = this.theme;
            templateConfig.topbarConfig = this.topbarConfig;
        },

        changeTopBarConfig() {
            console.debug('Deploy changeTopBarConfig',this.selectedCategories);
            //this.saveTopbarConfig();
        },
        async changeStyleSheetUrl(id, value, prefix) {
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
        isSlim() {
            return this.layoutMode === 'slim';
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
        reset(command) {
            //this.bufferErr = '';
            this.bufferOut = [ {text :command + ' start\n'} ];
            this.commandWorking = true;
        },
        publish() {
            this.reset('publish');
            this.$emit('call-action',{
                service : 'system',
                action : 'publish',
                params : []
            });
        },
        translate() {
            this.reset('translate');
            this.$emit('call-action',{
                service : 'system',
                action : 'translate',
                params : []
            });
        },
        templates() {
            this.reset('templates');
            this.$emit('call-action',{
                service : 'system',
                action : 'templates',
                params : []
            });
        },
        saveConfig() {
            this.saveCurrentConfig();
            this.reset('save-config');
            this.$emit('call-action',{
                service : 'system',
                action : 'save-config',
                params : {
                    config: templateConfig
                }
            });
        },
        response(data) {
            let that = this;
            let str = '';
            console.debug('ricevuto data',data);
            if (data.error) {
                //str += data.msg; //.split("\r\n").reverse().join("\r\n");
                //that.bufferErr= str + that.bufferErr;
                that.bufferOut.push( {text:data.msg,error:1});
                return ;
            }
            switch (data.type) {
                case 'end':
                    that.bufferOut.push({text:"Command " + data.command + ' Finish '});
                    that.commandWorking = false;
                    break;
                default:
                    if (data.msg instanceof String) {
                        str = data.msg; //.split("\r\n").reverse().join("\r\n");
                    } else if (Array.isArray(data.msg)) {
                        str = data.msg.map(a=> a.toString()).join("\r\n");
                    } else {
                        str = (""+data.msg); //.split("\r\n").reverse().join("\r\n");
                    }
                    that.bufferOut.push({text: str.trimStart()});
                    break;
            }
        },
    }
}
</script>

<template>
    <div class="flex flex-column">
        <div>
            <div class="flex gap-2">
                <Button label="Publish" @click="publish"></Button>
                <Button label="Aggiorna traduzioni" @click="translate"></Button>
                <Button label="Compilazione Templates" @click="templates"></Button>
                <Button label="Salva configurazione" @click="saveConfig"></Button>
            </div>
            <Accordion>
                <AccordionTab header="command output">
                    <ProgressSpinner v-if="commandWorking" style="width:40px;height:40px"></ProgressSpinner>
                    <div class="w-full overflow-auto h-30rem min-h-30rem">
                        <template  v-for="item in bufferOut">
                            <pre v-if="item.error" class="text-red-500">{{item.text}}</pre>
                            <pre v-else>{{item.text}}</pre>
                        </template>

                    </div>
                </AccordionTab>
            </Accordion>

        </div>
        <AppConfigFlat
            :layoutMode="layoutMode"
            @layout-change="onLayoutChange"
            :lightMenu="lightMenu"
            @menu-color-change="onMenuColorChange"
            :inlineUser="inlineUser"
            @profile-mode-change="onProfileModeChange"
            :isRTL="isRTL"
            @orientation-change="onChangeOrientation"
            :topbarColor="topbarColor"
            :topbarColors="topbarColors"
            @topbar-color-change="onTopbarColorChange"
            :theme="theme"
            :themes="themeColors"
            @theme-change="onThemeChange"
            :topbarConfig="topbarConfig"
        ></AppConfigFlat>
        <div>
            <h2>Esempi</h2>
            <Card>
                <template #title>Lista</template>
                <template #content>
                    <c-view :conf="listConf"></c-view>
                </template>
            </Card>
            <div class="grid mt-3">
                <div class="col-6">
                    <Card>
                        <template #title>Vista</template>
                        <template #content>
                            <c-view :conf="viewConf"></c-view>
                        </template>
                    </Card>
                </div>
                <div class="col-6">
                    <Card>
                        <template #title>Edit</template>
                        <template #content>
                            <c-view :conf="editConf"></c-view>
                        </template>
                    </Card>
                </div>
            </div>

        </div>
    </div>

</template>

<style scoped>

</style>
