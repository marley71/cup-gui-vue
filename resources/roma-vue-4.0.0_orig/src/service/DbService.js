export default class DbService {
    constructor(connection) {
        this.connection = connection;
    }
    getInfo() {
        let json = {
            service : 'db',
            action : 'info',
            params : []
        }
        this.connection.send(JSON.stringify(json));
    }
}
