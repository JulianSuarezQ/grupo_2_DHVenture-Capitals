module.exports = (sequelize, dataTypes) => {
  const alias = "Carts";
  const cols = {
    id_cart: {
      type: dataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    id_user: {
      //fk
      type: dataTypes.INTEGER,
      allowNull: false,
    },
    cant_product: {
      type: dataTypes.INTEGER,
      allowNull: false,
    },
    total_price: {
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
    Cart.hasMany(models.CartProducts, {
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
