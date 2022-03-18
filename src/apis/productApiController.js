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
                    meta:{
                      status: 200,
                      cant: products.length, 
                      url: 'api/products'
                    },
              });
        });
      },
      
      productById: function (req, res) {
        db.Products.findByPk(req.params.id, {
          include: [
            {
              association: "category",
            },
          ],
        })
          .then((product) => {
            return res.status(200).json({
              id: product.id,
              name: product.name,
              discount: product.discount,
              detail: product.detail,
              stock: product.stock,
              category: product.category.name,
              color: product.color,
              price: product.price,
              size: product.size,
              img: product.img,
              status: 200,
            });
          })
          .catch((error) => {
            error =
              "El ID " + req.params.id + " no existe en nuestra base de datos";
            return res.status(404).json({
              error,
            });
          });
      },
};

module.exports = productApiController;