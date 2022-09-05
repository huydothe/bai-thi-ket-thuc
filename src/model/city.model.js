const DBConnect = require("./dbConnect");

class CustomerModel {

    constructor() {
        let db = new DBConnect();
        this.conn = db.connect();
    }

    querySQL(sql) {
        return new Promise(((resolve, reject) => {
            this.conn.query(sql, (err, result) => {
                if (err) {
                    reject(err);
                }
                resolve(result)
            })
        }))
    }

    async getCustomers() {
        const sql = `SELECT cityID, cityName, country 
                 FROM cities`;
        return await this.querySQL(sql)
    }

    async getListInformation(ID) {
        const sql = `select * from cities where cityID = ${ID}`;
        return await this.querySQL(sql);
    }

    async deleteACity(ID) {
        const sql = `delete from cities where cityID = ${ID}`;
        return await this.querySQL(sql);
    }

    async findByName(name) {
        const sql = `SELECT *
                 FROM cities WHERE cityName LIKE '%${name}%'`;
        return await this.querySQL(sql)
    }

    async AddCity(dataForm) {
        const sql = `insert into cities (cityName, country, areas, GDP, description) value("${dataForm.cityName}","${dataForm.country}","${dataForm.areas}","${dataForm.GDP}","${dataForm.description}")`
        return await this.querySQL(sql)
    }

    async updateUser(dataForm,index){
        const sql = `update cities set cityName = "${dataForm.cityName}",country = "${dataForm.country}",areas = "${dataForm.areas}",GDP = "${dataForm.GDP}", description ="${dataForm.description}"
            where cityID =${index}`;
        return await this.querySQL(sql);
    }
}

module.exports = CustomerModel;