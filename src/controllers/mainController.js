const mainController = {
  index: function (req, res) {
    res.render("index");
  },
  carrito: function (req, res) {
    res.render("carrito");
  },
  login: function (req, res) {
    res.render("login");
  },
  register: function (req, res) {
    res.render("register");
  },
  producto: function (req, res) {
    res.render("producto-1");
  },
};

/*
const fs = require ('fs');
const path = require ('path');


const listadoProductos = function (){
    let archivoJSON = fs.readFileSync(path.resolve (__dirname, ''), 'utf-8');
    return json.parse(archivoJSON)
};
*/

module.exports = mainController;
