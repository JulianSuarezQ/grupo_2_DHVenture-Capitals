const path = require("path");
const fs = require("fs");
const sequelize = require("sequelize");
const db = require("../../database/models");
const res = require("express/lib/response");

/**
 *
 * @swagger
 * components:
 *    schemas:
 *      product:
 *        type: object
 *        properties:
 *          name:
 *            type: string
 *            description: Product Name
 *          discount:
 *            type: integer
 *            description: Discount product
 *          detail:
 *            type: string
 *            description: Detail product
 *          stock:
 *            type: string
 *            description: stock product
 *          category:
 *            type: string
 *            description: category product
 *          color:
 *            type: string
 *            description: color product
 *          price:
 *            type: string
 *            description: price product
 *          size:
 *            type: string
 *            description: size product
 *          status:
 *            type: string
 *            description: status product
 *      error:
 *        type: object
 *        properties:
 *          error:
 *             type: string
 *             description: El ID no existe en nuestra base de datos
 */

const productApiController = {
  products: function (req, res) {
    db.Products.findAll({
      include: [
        {
          association: "category",
        },
      ],
    })
      .then(function (products) {
        res.status(200).json({
          meta: {
            status: 200,
            cant: products.length,
            url: "api/products",
          },
          products: products.map((produ) => {
            return {
              id: produ.id_product,
              name: produ.name,
              discount: produ.discount,
              detail: produ.detail,
              stock: produ.stock,
              id_category: produ.category.name,
              price: produ.price,
              size: produ.size,
              img: produ.img,
            };
          }),
        });
      })
      .catch((error) => {
        error = "No existe ningun producto cargado";
        return res.status(400).json({
          error,
        });
      });
  },

  /**
   *
   * @swagger
   * /api/products/id:
   *  get:
   *      summary: get product by id
   *      parameters:
   *      - in: path
   *        name: id
   *        schema:
   *          type: string
   *          required: true
   *      responses:
   *        200:
   *          description: Get product by id
   *          content:
   *            application/json:
   *               schema:
   *                type: object
   *                $ref: '#/components/schemas/product'
   *        404:
   *          description: Not found in db
   *          content:
   *            application/json:
   *               schema:
   *                type: object
   *                $ref: '#/components/schemas/error'
   *
   */
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
