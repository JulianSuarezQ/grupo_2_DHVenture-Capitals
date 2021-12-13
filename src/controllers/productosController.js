const path = require('path');
const fs = require ('fs');

const productsFilePath = path.join(__dirname, '../db/productos.json');
const todosLosProductos = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));


const productosController = {

    list: function(req, res){
        const productosDB = todosLosProductos;

        res.render('products', {
            productos: productosDB,
            list: true,
            resultado:true
        });
    },

    search: function (req, res){
        
        const productosDB = todosLosProductos;
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

    store: (req, res) => {
		// Inicio la variable que almacena el formulario completo
		let newID = todosLosProductos[products.length-1].id + 1;
		let newProduct = {
			id: newID,
			...req.body,
			image: req.file == undefined ? "default-image.png": req.file.filename,
            ...req.body
		};

		// Agregamos el producto al array en formato Js
		todosLosProductos.push(newProduct);
		let productosJSON = JSON.stringify(todosLosProductos, null, 2);
		fs.writeFileSync(productsFilePath, productosJSON);
		res.redirect('products');
	},
    
    detail: (req, res) => {
		let idProducto = req.params.id;
		let productoMostrar = todosLosProductos.find( element => element.id == idProducto);
		// Paso el producto que encontré al ejs.
		res.render('descripcionProducto', {productos: productoMostrar})
	}
}


module.exports = productosController;