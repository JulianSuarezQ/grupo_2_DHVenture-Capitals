const path = require("path");
const fs = require("fs");
const sequelize = require("sequelize")
const db = require("../../database/models");
const res = require("express/lib/response");

const productApiController = {

    count: function (req, res) { 
      db.Products.findAll()
        .then(function(products){
          res.status(200).json("products", {
              meta:{
                status: 200,
                cant: products.length,
                url: 'api/products'
              },
        });
      });
    },

    /* detail: (req, res) => {
        let idProducto = req.params.id;
        db.Products.findByPk(idProducto, {
          include:[{association:'category'}]
        })
          .then(function(producto){
            res.render('descripcionProducto' , {productos: producto});
        })
    } */
}

module.exports = productApiController;