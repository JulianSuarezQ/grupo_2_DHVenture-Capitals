const path = require('path');
const fs = require ('fs');

const productosController = {
    productos: function(req,res){
        //const bandera = edit();
        res.render('productos', {edit: false});
    }
}


module.exports = productosController;