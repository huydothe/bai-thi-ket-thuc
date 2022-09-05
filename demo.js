const http = require('http');
const url = require('url')
const CityController = require('./src/controller/city.controller')
const port = 8000;
const cityController = new CityController()

const server = http.createServer((req, res) => {
    let urlPath = url.parse(req.url).pathname;

    switch (urlPath) {
        case '/':
            cityController.index(req, res).catch(err => {
                console.log(err.message);
            });
            break;
        case '/show':
            cityController.showListOrder(req,res).catch(err => console.log(err.message));
            break;
        case '/delete':
            cityController.deleteACity(req,res).catch(err => console.log(err.message));
            break;
        case '/search':
            cityController.searchCity(req,res).catch(err=>console.log(err.message));
            break;
        case '/update':
            if(req.method === 'GET'){
                cityController.formUpdateCity(req,res);
            }else {
                cityController.updateCity(req,res).catch(err => console.log(err.message));
            }
            break;
        case '/add':
            if(req.method === 'GET'){
                cityController.formAdd(req,res);
            }else {
                cityController.AddCity(req,res).catch(err => console.log(err.message));
            }
            break;
    }
});

server.listen(port,()=>{
    console.log(`Server is running at http://localhost:${port}`);
})