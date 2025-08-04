import {defineStore} from "pinia";

export const userApp = defineStore('userApp', {

    state: () => {
        return {
            userInfo : {},
            axiosControllers : {},
            keycloak : null,
        }
    },
    actions : {
        setUserInfo(payload) {
            for (let k in payload) {
                this.userInfo[k] = payload[k];
            }
        },
        getUserInfo() {
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
