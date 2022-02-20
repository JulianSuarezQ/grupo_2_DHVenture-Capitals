module.exports = (sequelize, dataTypes) => {
  const alias = "CartProducts";
  const cols = {
    id: {
      type: dataTypes.INTEGER,
      allowNull: false,
      primareyKey: true,
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

  return CartProduct;
};
