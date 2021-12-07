const path = require('path');
const fs = require ('fs');

const productosController = {

    list: function(req, res){
        const productosDB = TodosLosProductos();

        res.render('products', {
            productos: productosDB,
            list: true,
            resultado:true
        });
    },

    search: function (req, res){
        
        const productosDB = TodosLosProductos();
        let busca = req.query.name;
        let productosResultantes = [];

        for(let i = 0; i< productosDB.length; i++){
            if (productosDB[i].name.includes(busca)){
                productosResultantes.push(productosDB[i]);
            }
        }
        
        let result = (productosResultantes != []);

        res.render('products',{
            list: true,
            resultado: true,
            productos: productosResultantes,
        })
    },
        
    create: function(req,res){
        res.render('products', {list: false});
    },
    
    descriptionProduct: function (req, res) {
        res.render("descripcionProducto");
    },
}

const TodosLosProductos = function(){
    let archivoJSON = fs.readFileSync(path.resolve(__dirname,'../db/productos.json'),'utf-8');
    return JSON.parse(archivoJSON);
}

module.exports = productosController;