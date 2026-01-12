import {defineStore} from "pinia";

export const appStatus = defineStore('appStatus', {

    state: () => {
        return {
            error : 0,
            errorMessage : '',
            errorIssue : '',
            advancedSearchActive : {
                //'cup_anag_anagrafica' : false,
            }
        }
    },
    actions : {
        setError(msg,issue) {
            this.errorMessage = msg;
            this.errorIssue = issue || 'motivo non definito'
            this.error = 1;
        },
        clear() {
            this.errorMessage = '';
            this.errorIssue = ''
            this.error = 0;
            this.advancedSearchActive = {}
        }
    },
    persist : true,
})
