const path = require("path");
const fs = require("fs");
const sequelize = require("sequelize")
const db = require("../../database/models");
const res = require("express/lib/response");

const productApiController = {

    count: function (req, res) { 
      db.Products.findAll()
        .then(function(products){
          res.status(200).json({
              meta:{
                status: 200,
                cant: products.length, 
                url: 'api/products'
              },
        });
      });
    },

/*     countByCategory: (req, res) => {
        db.Products.findAll({
          include:[{association:'category'}]
        })
          .then(function(producto){
            res.status(200).json({
                data:{
                    producto.id_category:{

                    }
                }

            },
                'descripcionProducto' , {productos: producto}
                );
        })
    }, */

    products: function (req, res) { 
    let todosProductos =  db.Products.findAll()
    let todasCategorias = db.Category.findAll();
             Promise.all([todosProductos, todasCategorias])
            .then(function([products , categoriaMostrar]){
            res.status(200).json({
                data:products, categoriaMostrar
          });
        });
      },
}

module.exports = productApiController;