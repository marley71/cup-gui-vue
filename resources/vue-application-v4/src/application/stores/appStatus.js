import {defineStore} from "pinia";

export const appStatus = defineStore('appStatus', {

    state: () => {
        return {
            error : 0,
            errorMessage : '',
            errorIssue : '',
        }
    },
    actions : {
        setError(msg,issue) {
            this.errorMessage = msg;
            this.errorIssue = issue || 'motivo non definito'
            this.error = 1;
        },
    },
    persist : true,
})
