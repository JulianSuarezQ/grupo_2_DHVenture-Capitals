const path = require('path');
const fs = require ('fs');

const productosController = {
    productos: function(req,res){
        res.render('productos', {edit: false});
    },

    edit: function (req, res){
        res.render('productos',{
            edit: true,
            resultado: false,
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

        //res.send(productosResultantes)

        res.render('productos',{
            edit: true,
            resultado: true,
            productos: productosResultantes,
        })
    }
}

const TodosLosProductos = function(){
    let archivoJSON = fs.readFileSync(path.resolve(__dirname,'../db/productos.json'),'utf-8');
    return JSON.parse(archivoJSON);
}

module.exports = productosController;