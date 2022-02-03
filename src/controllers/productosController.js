const path = require("path");
const fs = require("fs");

const productsFilePath = path.join(__dirname, "../db/productos.json");

const todosLosProductos = JSON.parse(
  fs.readFileSync(productsFilePath, "utf-8")
);

const productosController = {

  list: function (req, res) {
    
    const productosDB = todosLosProductos;

    res.render("products", {
      productos: productosDB,
      list: true,
      resultado: true,
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
    res.render("products", { list: false });
  },

  descriptionProduct: function (req, res) {
    res.render("descripcionProducto");
  },

  store: (req, res) => {
    // Inicio la variable que almacena el formulario completo
    console.log(req.body)
    if (todosLosProductos.length == 0) {
      var newID = 1;
    } else {
      var newID = todosLosProductos[todosLosProductos.length - 1].id + 1;
    }

    let newProduct = {
      id: newID,
      ...req.body,
      precio: parseInt(req.body.price, 10),
      descount: parseInt(req.body.descount, 10),
      image: req.file == undefined ? "default-image.png" : req.file.filename,
    };

    // Agrego el producto al array en formato Js
    todosLosProductos.push(newProduct);
    let productosJSON = JSON.stringify(todosLosProductos, null, 2);
    fs.writeFileSync(productsFilePath, productosJSON);

    return res.redirect("/products");
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
    // no funciona
    const id = req.params.id;
    let finalProducts = todosLosProductos.filter(oneProduct => oneProduct.id !== id);
    fs.writeFileSync(productsFilePath, JSON.stringify(finalProducts, null, ' '));
    res.redirect('/products');
  }
};

module.exports = productosController;
