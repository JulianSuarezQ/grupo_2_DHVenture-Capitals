module.exports = (sequelize, dataTypes) => {
  const alias = "Carts";
  const cols = {
    idCart: {
      type: dataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    idUser: {
      //fk
      type: dataTypes.INTEGER,
      allowNull: false,
    },
    cantProduct: {
      type: dataTypes.INTEGER,
      allowNull: false,
    },
    totalPrice: {
      type: dataTypes.INTEGER,
      allowNull: false,
    },
    discount: {
      type: dataTypes.STRING,
      allowNull: false,
    },
    detail: {
      type: dataTypes.STRING,
      allowNull: false,
    },
  };
  const config = {
    tableName: "cart",
    timestamps: false,
  };

  const Cart = sequelize.define(alias, cols, config);

  Cart.associate = function (models) {
    Cart.belongsTo(models.CartProducts, {
      as: "cart",
      foreingKey: "id_cart",
    });
  };

  Cart.associate = function (models) {
    Cart.belongsTo(models.Users, {
      as: "userCarts",
      foreingKey: "id_user",
    });
  };

  return Cart;
};
