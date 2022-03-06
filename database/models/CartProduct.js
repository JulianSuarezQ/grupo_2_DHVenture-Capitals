const Cart = require("./Cart");

module.exports = (sequelize, dataTypes) => {
  const alias = "CartProducts";
  const cols = {
    id: {
      type: dataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    idCart: {
      //fg
      type: dataTypes.INTEGER,
      allowNull: false,
    },
    idProduct: {
      //fg
      type: dataTypes.INTEGER,
      allowNull: false,
    },
  };
  const config = {
    tableName: "cart_product",
    timestamps: false,
  };

  const CartProduct = sequelize.define(alias, cols, config);

  CartProduct.associate = function(modelos){
    CartProduct.hasMany(modelos.Carts, {
      as: "cartProducts",
      foreignKey: "id_cart"
    })
  }

  CartProduct.associate = function(modelos){
    CartProduct.hasMany(modelos.Products, {
      as: "cartProducts",
      foreignKey: "id_product"
    })
  }

  return CartProduct;
};
