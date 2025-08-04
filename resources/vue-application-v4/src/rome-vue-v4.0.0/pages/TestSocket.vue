<script>
export default {
    name: "TestSocket",
    data() {
      return {
          ws : null
      }
    },
    methods: {
        connect() {
            let that = this;
            that.ws = new WebSocket('ws://192.168.56.56:7071/ws');

            // let ws = new WebSocket('ws://cupparis10.dev.it:7071/ws');
            // return new Promise((resolve, reject) => {
            //     const timer = setInterval(() => {
            //         console.debug('test readyState',ws.readyState)
            //         if(ws.readyState === 1) {
            //             clearInterval(timer);
            //             that.ws = ws;
            //         }
            //     }, 10);
            // });



            that.ws.onopen = function() {
                console.log('Connessione aperta al server WebSocket');
                that.ws.send('Saluti dal client!');
            };

            that.ws.onmessage = function(event) {
                console.log('Messaggio dal server: ', event.data);
            };

            that.ws.onclose = function(event) {
                console.log('Connessione chiusa',event);
                // if (event.code === 1006) {
                //     console.log('Tentativo di riconnessione tra 5 secondi...');
                //     setTimeout(that.connect, 5000);
                // }
                //setTimeout(that.connect, 1000);
            };

            that.ws.onerror = function(error) {
                console.error('Errore WebSocket: ', error);
            };
        },
        send() {
            let that = this;
            that.ws.send('Saluti dal client!')
        }
    }
}
</script>

<template>
    <Button @click="connect">Connect</Button>
    <Button @click="send">Send</Button>
</template>

<style scoped>

</style>
