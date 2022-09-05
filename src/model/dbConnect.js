const mysql = require('mysql')
class DBConnect {

    constructor() {
        this.host = 'localhost';
        this.port = 3306;
        this.database = 'city';
        this.user = 'huydo';
        this.password = 'Huydothe1999@'
    }

    connect() {
        return mysql.createConnection({
            host: this.host,
            database: this.database,
            port: this.port,
            user: this.user,
            password: this.password
        })
    }
}

module.exports = DBConnect;