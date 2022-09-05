const fs = require('fs');
const qs = require('qs');
const url = require('url')

const CityModel = require('../model/city.model')

class CityController {

    constructor() {
        this.cityModel = new CityModel();
    }


    async index(req, res) {
        let customers = await this.cityModel.getCustomers();

        fs.readFile('./views/index.html', 'utf8', ((err, data) => {
            if (err) {
                throw new Error(err.message)
            }

            let html = '';
            customers.forEach((item, index) => {
                html += "<tr>";
                html += `<td>${item.cityID}</td>`;
                html += `<td>${item.cityName}</td>`;
                html += `<td>${item.country}</td>`;
                html += `<td><a href="/show?id=${item.cityID}" class="btn btn-success">Xem thông tin</a></td>`;
                html += `<td><a href="/update?id=${item.cityID}" class="btn btn-primary">Update</a></td>`;
                html += `<td><a href="/delete?id=${item.cityID}" class="btn btn-danger">Delete</a></td>`;
                html += "</tr>";
            })
            data = data.replace('{list-customers}', html)
            res.writeHead(200, {'Content-Type': 'text/html'})
            res.write(data)
            res.end();
        }))
    }

    async showListOrder(req, res) {
        let cityID = qs.parse(url.parse(req.url).query).id;
        let result = await this.cityModel.getListInformation(cityID)
        let nameCity = result[0].cityName;
        let Country = result[0].country;
        let areas = result[0].areas;
        let GDP = result[0].GDP;
        let description = result[0].description;

        fs.readFile('./views/listCity.html', 'utf8', (err, data) => {
            data = data.replace('{cityName}', nameCity);
            data = data.replace('{country}', Country);
            data = data.replace('{areas}', areas);
            data = data.replace('{GDP}', GDP);
            data = data.replace('{description}', description);
            res.end(data)
        })
    }

    async deleteACity(req,res){
        let cityID = qs.parse(url.parse(req.url).query).id;
        await this.cityModel.deleteACity(cityID)
        res.writeHead(301,{'Location':'/'})
        res.end();
    }

    async searchCity(req, res) {
        let keyword = qs.parse(url.parse(req.url).query).keyword;

        let customers = await this.cityModel.findByName(keyword);

        let html = '';
        if (customers.length > 0) {
            customers.forEach((item, index) => {
                html += "<tr>";
                html += `<td>${item.cityID}</td>`;
                html += `<td>${item.cityName}</td>`;
                html += `<td>${item.country}</td>`;
                html += `<td><a href="/show?id=${item.cityID}" class="btn btn-success">Xem thông tin</a></td>`;
                html += `<td><a href="/update?id=${item.cityID}" class="btn btn-primary">Update</a></td>`;
                html += `<td><a href="/delete?id=${item.cityID}" class="btn btn-danger">Delete</a></td>`;

                html += "</tr>";
            })
        } else {
            html += "<tr>";
            html += `<td colspan="4" class="text-center">Không có dữ liệu</td>`;
            html += "</tr>";
        }
        fs.readFile('./views/index.html', 'utf8', ((err, data) =>  {
            if (err) {
                throw new Error(err.message)
            }

            data = data.replace('{list-customers}', html)
            data = data.replace(' <input type="text" name="keyword" placeholder="Enter your name" class="form-control">', `<input type="text" name="keyword" value="${keyword}" placeholder="Enter your name" class="form-control">`)
            res.writeHead(200, {'Content-Type': 'text/html'})
            res.write(data)
            res.end();
        }))
    }

    formUpdateCity(req, res) {
        fs.readFile('./views/formUpdate.html', 'utf8',(err, data) => {
            if(err) {
                throw new Error(err.message)
            }
            res.writeHead(200,{'Content-Type':'text/html'})
            res.write(data);
            res.end();
        })
    }

    async updateCity(req,res){
        let index = qs.parse(url.parse(req.url).query).id;
        let data = '';
        req.on('data',chunk=>{
            data += chunk;
        });
        req.on('end',async ()=> {
            let dataForm = qs.parse(data);
            console.log(dataForm)
            await this.cityModel.updateUser(dataForm,index)
            res.writeHead(301, {location: '/'});
            res.end();
        })
    }

    formAdd(req,res){
        fs.readFile('./views/add.html','utf8',(err,data)=>{
            if(err){
                throw new Error(err.message);
            }
            res.writeHead(200,{'Content-Type':'text/html'});
            res.write(data);
            res.end();
        })
    }

    async AddCity(req,res){
        let data = '';
        req.on('data',chunk=>{
            data += chunk;
        });
        req.on('end',async ()=> {
            let dataForm = qs.parse(data);
            await this.cityModel.AddCity(dataForm)
            res.writeHead(301, {location: '/'});
            res.end();
        })
    }

}

module.exports = CityController;