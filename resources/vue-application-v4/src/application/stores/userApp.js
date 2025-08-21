import {defineStore} from "pinia";
import cs from "cupparis-primevue";

export const userApp = defineStore('userApp', {

    state: () => {
        return {
            userInfo : {},
            axiosControllers : {},
            keycloak : null,
            loaded : false,
        }
    },
    actions : {
        setUserInfo(payload) {
            for (let k in payload) {
                this.userInfo[k] = payload[k];
            }
        },
        async getUserInfo() {
            return new Promise((resolve,reject) => {
                if (!this.loaded) {
                    cs.Server.get('/api/me',{},(json) => {
                        this.setUserInfo(json);
                        this.loaded = true;
                        resolve()
                    })
                }
                resolve();
            })
            return this.userInfo;
        },

        isLogged() {
            let token = null;
            if (import.meta.env.VITE_MODE == 'dev') {
                token = window.localStorage.getItem('token');
            } else {
                let bearerTokenValue = document.querySelector('meta[name="bearer-token"]');
                token = bearerTokenValue ? bearerTokenValue.getAttribute('content') : null;
            }
            if (token) {
                return true;
            }
            return false;
        }
    },
    persist : true,
})
