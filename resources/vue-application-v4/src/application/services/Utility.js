import cs from "cupparis-primevue"
export default {

    publicPath(filepath) {
        console.debug('Utility path ',filepath)
        if (filepath.indexOf('@external') == 0) {
            let s = filepath.substring('@external'.length);
            return import.meta.env.VITE_RESOURCES_PATH + s;
        }
        let p = import.meta.env.VUE_APP_PUBLIC_PATH?import.meta.env.VUE_APP_PUBLIC_PATH:'';
        return p+filepath;
    },

    async resolve(path) {
        // const image = await new URL(path, import.meta.url);
        // //const image = await import(path);
        // if (!image) {
        //     console.debug('no image');
        //     return null;
        // }
        // console.debug('image c22',image);
        // return image;

        //return image.default;
        if (path.indexOf('@external') == 0) {
            return '@fs/' + import.meta.env.VITE_RESOURCES_PATH + path.substring('@external'.length);
        }
        return path;
        // import(path)
        //     .then((appModule) => {
        //         // Usa il modulo qui
        //         console.log(appModule);
        //         return appModule;
        //     })
        //     .catch((error) => {
        //         console.warn('Il modulo app non esiste, verrà usato il comportamento predefinito.', error);
        //        return null;
        //     });
        // console.debug('resolve ',path)
        // let module = await import(path);
        // if (module) {
        //     return module.default
        // }
        // return null;



        // return 'noimage';
        // import(path).then((module) => {
        //     return module.default;
        // }).catch((error) => {
        //     console.error(error);
        //     cs.CrudCore.alertError(error);
        // });
    },

    async connectToServer() {
        console.debug('connect to websocket ',import.meta.env.VITE_WEBSOCKET_SERVER)
        const ws = new WebSocket(import.meta.env.VITE_WEBSOCKET_SERVER);

        return new Promise((resolve, reject) => {
            const timer = setInterval(() => {
                if(ws.readyState === 1) {
                    clearInterval(timer);
                    resolve(ws);
                }
            }, 10);
        });
    },

    formatDate(date,format,isTs) {
        //console.log('moment',moment);
        let m = null;
        if (isTs) {
            m = new moment.unix(date);
        } else {
            m = new moment(date);
        }
        if (m.isValid())
            return format?m.format(format):m.format('DD/MM/YYYY');
        return ' '
    },

    formatDateTime(date,isTs) {
        return this.formatDate(date,'DD/MM/YYYY HH:mm:ss',isTs)
    },

    toLocalTime(date) {
        return moment.utc(date).local();
    },

    getProductsSmall() {
        return fetch('demo/data/products-small.json')
            .then((res) => res.json())
            .then((d) => d.data);
    },

    getProducts() {
        return fetch('demo/data/products.json')
            .then((res) => res.json())
            .then((d) => d.data);
    },

    getProductsWithOrdersSmall() {
        return fetch('demo/data/products-orders-small.json')
            .then((res) => res.json())
            .then((d) => d.data);
    },

    env(varname) {
        return import.meta.env[varname];
    },

    showReqError(req) {

        if (req.code == 'ECONNABORTED') {
            return ;
        }
        console.error('req error', req, typeof req);

        if (!req.response) {
            this.globalProperties.$toast.add({severity: 'error', detail: req, content: 'Error Message', group:'tr'});
            return
        }

        let message = req.message;
        try {
            message = req.response?req.response.data.response.reason:'no-msg';
        } catch (e) {
            console.error('errore nel leggere la ragione dell\'errore',e,req);
            message = req.message;
        }
        console.error('toast message','error',message);
        this.globalProperties.$toast.add({severity: 'error', detail: message, content: 'Error Message', group:'tr'});
    },

    getReqError(req) {
        let message = req.message;
        try {
            message = req.response.data.response.reason;
        } catch (e) {
            console.error('errore nel leggere la ragione dell\'errore',e,req);
            message = req.message;
        }
        return message;
    },

    showSuccess(message,time) {
        //this.$toast.add({severity:'success', summary: 'Success Message', detail:'Message Detail', life: 3000});
        this._showMessage(message,'success',time);
    },

    showInfo(message,time) {
        //this.$toast.add({severity:'info', summary: 'Info Message', detail:'Message Detail', life: 3000});
        this._showMessage(message,'info',time);
    },

    showWarn(message,time) {
        //this.$toast.add({severity:'warn', summary: 'Warn Message', detail:'Message Detail', life: 3000});
        this._showMessage(message,'warn',time);
    },

    showError(message,time) {
        //this.$toast.add({severity:'error', summary: 'Error Message', detail:'Message Detail', life: 3000});
        this._showMessage(message,'error',time);
    },

    _showMessage(message,severity,time) {
        let msg = {
            severity: severity,
            detail: message,
            content: severity + ' Message',
            group:'tr'
        }
        if (time) {
            msg.life = time;
        }

        //console.debug('toast message',severity,message,time);
        this.globalProperties.$toast.add(msg);
    },

    _showSuccess(response,msg) {
        let that = this;
        let m = msg?msg:response.data.response.reason;
        if (m) {
            that.showSuccess(m, 3000);
        }
    },

    getCache(key) {
        return window.localStorage.getItem(key);
    },

    setCache(key,value) {
        ///let val = typeof (value) === "object"?JSON.stringify(value)
        window.localStorage.setItem(key,value);
    },
    errorImage() {
        return '/images/default_target.png'
    },

    jsonToProperties(json) {
        let props = [];
        for (let k in json) {
            props.push({
                label : k,
                value :json[k]
            })
        }
        console.log('props',props,json);
        return props
    }
}
