import {defineStore} from "pinia";

export const TopbarStatus = defineStore('TopbarStatus', {

    state: () => {
        return {
            menuPath : [],
        }
    },
    actions : {
        setMenuPath(path) {
            this.menuPath = path
        },
    },
    persist : true,
})
