const path = require("path");
const fs = require("fs");
const sequelize = require("sequelize")
const productsFilePath = path.join(__dirname, "../db/productos.json");
const db = require("../../database/models")

const productosController = {

  list: function (req, res) { 
    db.Products.findAll({
      include: [
        {association: "category"},
        {association: "cart"}
      ]
    })
      .then(function(products){
        res.render("products", {
        productos: products,
        list: true,
        resultado: true,
      });
    });
  }, 

  search: function (req, res) {
    const productosDB = todosLosProductos;
    let busca = req.query.name;
    let productosResultantes = [];

    for (let i = 0; i < productosDB.length; i++) {
      if (productosDB[i].name.includes(busca)) {
        productosResultantes.push(productosDB[i]);
      }
    }

    let result = productosResultantes != [];

    res.render("products", {
      list: true,
      resultado: true,
      productos: productosResultantes,
    });
  },

  create: function (req, res) {
      db.Category.findAll()
        .then(function(categorias){
       res.render("products", { categorias: categorias , list: false }); 
    })
  },

  descriptionProduct: function (req, res) {
    res.render("descripcionProducto");
  },

  store: (req, res) => {
      db.Product.create({
        name: req.body.name,
        discount: parseInt(req.body.descount, 10),
        detail: req.body.desc,
        stock: req.body.stock, //hacer
        idCategory: req.body.category,
        color: req.body.color,
        price: parseInt(req.body.price, 10),
        size: req.body.size,
        img: req.body.img,
        image: req.file == undefined ? "default-image.png" : req.file.filename,
    })
    res.redirect('/products'); 
  },

  detail: (req, res) => {
    let idProducto = req.params.id;
    let productoMostrar = todosLosProductos.find(
      (element) => element.id == idProducto
    );
    // Paso el producto que encontré al ejs.
    res.render("descripcionProducto", { productos: productoMostrar });
  },

  edit: (req, res) => {
    let idProducto = req.params.id;
    let productoMostrar = todosLosProductos.find(
      (element) => element.id == idProducto
    );
    res.render("product-edit-form", { productToEdit: productoMostrar});
  },

  update: (req , res) => {
    const id = req.params.id;

    let modificado = todosLosProductos.map(element => {
        if (element.id == id){
            return element = {
              id: element.id,
              ...req.body,
              precio: parseInt(req.body.price, 10),
              descount: parseInt(req.body.descount, 10),
              image: req.file == undefined ? element.image : req.file.filename
            }
        }
        return element;
    })

    let productosJSON = JSON.stringify(modificado, null, 2);
    fs.writeFileSync(productsFilePath, productosJSON);
    res.redirect('/products');
  },
  
  PagDelete : (req , res) => {
    let idProducto = req.params.id;
    let productoMostrar = todosLosProductos.find(
      (element) => element.id == idProducto
    );
    res.render("delete", { productos: productoMostrar });
  },

  delete: (req , res) =>{

    const id = req.params.id;
    let finalProducts = todosLosProductos.filter(oneProduct => oneProduct.id != id);
    fs.writeFileSync(productsFilePath, JSON.stringify(finalProducts, null, ' '));
    return res.redirect('/products');

  }

};

module.exports = productosController;
