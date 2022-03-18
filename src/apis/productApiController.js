const path = require("path");
const fs = require("fs");
const sequelize = require("sequelize");
const db = require("../../database/models");
const res = require("express/lib/response");

const productApiController = {
  count: function (req, res) {
    db.Products.findAll().then(function (products) {
      res.status(200).json("products", {
        meta: {
          status: 200,
          cant: products.length,
          url: "api/products",
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
  allProducts: function (req, res) {
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
