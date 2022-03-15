const path = require("path");
const fs = require("fs");
const sequelize = require("sequelize")
const db = require("../../database/models");
const res = require("express/lib/response");

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
      db.Category.findAll({
        includes: [
          {association: "products"}
        ]
      })
        .then(function(categorias){
          res.render("products", { 
            categorias: categorias,
            list: false 
        }); 
    })
  },

  store: (req, res) => {
      db.Products.create({
        name: req.body.name,
        discount: parseInt(req.body.discount, 10),
        detail: req.body.detail,
        stock: req.body.stock, 
        id_category: parseInt(req.body.id_category, 10),
        color: req.body.color,
        price: parseInt(req.body.price, 10),
        size: req.body.size,
        img:"default-image.png" 
    })
    res.redirect('/products'); 
  },

  descriptionProduct: function (req, res) {
    res.render("descripcionProducto");
  },

  detail: (req, res) => {
    let idProducto = req.params.id;
    db.Products.findByPk(idProducto, {
      include:[{association:'category'}]
    })
      .then(function(producto){
        res.render('descripcionProducto' , {productos: producto});
    })
},

  edit: (req, res) => {
    let idProducto = req.params.id;
   let todosProductos = db.Products.findByPk(idProducto, {
      include:[{association:'category'}]
    })
    let todasCategorias = db.Category.findAll()
    Promise.all([todosProductos , todasCategorias])
      .then(function([productoMostrar , categoriaMostrar]){
        res.render("product-edit-form", { productToEdit: productoMostrar , categoriaToEdit: categoriaMostrar}); //ver CATEGORIA
    })
  },

  

  update: (req , res) => {
    db.Products.update({
      name: req.body.name,
      discount: parseInt(req.body.discount, 10),
      detail: req.body.detail,
      stock: req.body.stock, 
      id_category: parseInt(req.body.id_category , 10),
      color: req.body.color,
      price: parseInt(req.body.price, 10),
      size: req.body.size,
      img:"default-image.png" 
  },{
    where: { id_product : req.params.id}
  })
    res.redirect('/products');
  },
 
  PagDelete : (req , res) => {
    let idProducto = req.params.id;
    db.Products.findByPk(idProducto,{
      includes: [
        {association: "category"}
      ]
    })
      .then(function(productoMostrar){
        res.render("delete", { productos: productoMostrar });
  })
  },

  delete: (req , res) =>{
    const id = req.params.id;
    db.Products.destroy({
      where:{
        id_product: id
      }
    })
    res.redirect('/products'); 

 /*    let finalProducts = todosLosProductos.filter(oneProduct => oneProduct.id != id);
    fs.writeFileSync(productsFilePath, JSON.stringify(finalProducts, null, ' '));
    return res.redirect('/products'); */

  }

};

module.exports = productosController;
