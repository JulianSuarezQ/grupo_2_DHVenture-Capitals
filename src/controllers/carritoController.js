const path = require("path");
const fs = require("fs");

const productsFilePath = path.join(__dirname, "../db/productos.json");

const todosLosProductos = JSON.parse(
  fs.readFileSync(productsFilePath, "utf-8")
);

const carritoController = {
    carrito: function (req, res) {
      res.render("carrito", {
        carro: undefined
      });
    },
 
    addProduct: function(req,res){
      console.log(req.session.isLogged);
      //req.session.isLogged = undefined -> me redirecciona a home 
      if(req.session.isLogged){
        console.log(carro);
        if(!carro){
          let carro = [];
        }
        console.log(carro);
        carro.push(todosLosProductos[req.params.id])
        console.log(carro);

        res.render('carrito', {
          carro: carro
        });
      
      }else{
        res.redirect('/users/login');
      }
    }
}

module.exports = carritoController;
  