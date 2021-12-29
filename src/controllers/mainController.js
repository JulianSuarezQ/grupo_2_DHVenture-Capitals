const path = require('path')
const fs = require('fs')

const productsFilePath = path.join(__dirname, "../db/productos.json");

const todosLosProductos = JSON.parse(
  fs.readFileSync(productsFilePath, "utf-8")
);

const mainController = {
  index: function (req, res) {
    let productos = todosLosProductos;

    res.render("index",{
      productos: productos,
    });
  },
};

module.exports = mainController;
