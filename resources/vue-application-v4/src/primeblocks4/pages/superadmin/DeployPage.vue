<template>
    <div>
        <OverlayPanel ref="help">
            <pre v-if="info" class="h-20rem overflow-auto">{{info}}</pre>
            <ProgressSpinner v-else></ProgressSpinner>
        </OverlayPanel>
        <Card v-if="connected">
            <template #title>
                Servizi
            </template>
            <template #content>
                <div class="flex justify-content-end">

                </div>
                <TabView v-model:activeIndex="activeService">
                    <TabPanel v-for="(service,index) in services" :key="service">
                        <template #header>
                            <div class="text-xl">{{service }}</div>
                            <span>&nbsp;&nbsp;</span>
                            <i class="fa fa-question-circle cursor-pointer" @click="toggleHelp" v-if="index==activeService"></i>
                        </template>
                        <DbService ref="db" v-if="service==='db'"  :data="serviceResponse['db']"  @call-action="callService"></DbService>
                        <SystemService ref="ss" v-if="service==='system'"  :data="serviceResponse['system']"  @call-action="callService"></SystemService>
                        <RolesService ref="rs" v-if="service==='roles'"  :data="serviceResponse['roles']"  @call-action="callService"></RolesService>
                    </TabPanel>
                </TabView>
            </template>
        </Card>
        <div v-else>
            <ProgressSpinner></ProgressSpinner>
        </div>
    </div>
</template>

<script>
import cs from 'cupparis-primevue'
import Utility from "@/application/services/Utility.js";
import ProgressSpinner from 'primevue/progressspinner';
import DbService from "./components/DbService.vue";
import SystemService from "./components/SystemService.vue";
import RolesService from "./components/RolesService.vue";
var connection = null;
export default {
    name: "DeployPage",
    components: {ProgressSpinner,DbService,SystemService,RolesService},
    mounted() {
        let that = this;
        that.connect();
    },
    unmounted() {
        if (connection) {
            connection.close();
            connection = null;
        }
    },
    data() {
        let servicesString = import.meta.env.VITE_WEB_SOCKET_SERVICES; //? cs.CrudVars.env['VITE_WEB_SOCKET_SERVICES'];
        let services = servicesString.split(',');
        console.debug('services',services);
        return {
            services : services,
            connected : false,
            activeService : 0,
            serviceResponse : {
                'db' : null,
                'system' : null,
                'roles' : null,
            },
            info : '',
        }
    },
    methods : {
      toggleHelp(event) {
          if (!this.$refs.help.visible) {
              this.info = null;
              let json = {
                  service : this.services[this.activeService],
                  action : 'info',
              }
              connection.send(JSON.stringify(json));
          }
          this.$refs.help.toggle(event);
      },
        getServicesInfo() {
            let servicesString = import.meta.env.VITE_WEB_SOCKET_SERVICES; //? cs.CrudVars.env['VITE_WEB_SOCKET_SERVICES'];
            let services = servicesString.split(',');
            console.debug('services',services);
            this.items = [];
            for(var i in services) {
                let json = {
                    service : services[i],
                    action : 'info',
                }
                connection.send(JSON.stringify(json));
            }

        },
        callService(event) {
            let json = event;
            console.debug('callService',event);
            connection.send(JSON.stringify(json));
        },
        connect() {
            let that = this;
            cs.CrudCore.waitStart('connecting websocket...');
            Utility.connectToServer().then((ws) => {
                connection = ws;
                that.connected = true;
                connection.onopen = function (event) {
                    console.log('event on open', event)
                    console.log('Successfully');
                    that.serverStatus = 1;

                }
                connection.onmessage = function (event) {
                    let json = JSON.parse(event.data);
                    if (json.command == 'info') {
                        that.info = json.msg;
                    } else {
                        that.serviceResponse[json.service] = json;
                    }
                }
                connection.onclose = function(event) {
                    console.log('Connessione chiusa',event);
                    that.connect();
                };

                connection.onerror = function(error) {
                    console.error('Errore WebSocket: ', error);
                    throw error;
                };
                console.log('connection', connection);
                cs.CrudCore.waitEnd();
            }).catch((e) => {
                console.error(e);
                cs.CrudCore.waitEnd();
                cs.CrudCore.alertError(e);
            })
        }
    }
}




</script>

<style scoped>
.blob {
    background: black;
    border-radius: 50%;
    box-shadow: 0 0 0 0 rgba(0, 0, 0, 1);
    margin: 10px;
    height: 20px;
    width: 20px;
    transform: scale(1);
    animation: pulse-black 2s infinite;
}
.blob.green {
    background: rgba(51, 217, 178, 1);
    box-shadow: 0 0 0 0 rgba(51, 217, 178, 1);
    animation: pulse-green 2s infinite;
}

@keyframes pulse-green {
    0% {
        transform: scale(0.95);
        box-shadow: 0 0 0 0 rgba(51, 217, 178, 0.7);
    }

    70% {
        transform: scale(1);
        box-shadow: 0 0 0 10px rgba(51, 217, 178, 0);
    }

    100% {
        transform: scale(0.95);
        box-shadow: 0 0 0 0 rgba(51, 217, 178, 0);
    }
}

.my-mega .p-megamenu-panel {
    width : 400px !important;
}

</style>
