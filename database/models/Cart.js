module.exports = (sequelize, dataTypes) => {
  const alias = "Carts";
  const cols = {
    idCart: {
      type: dataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primareyKey: true,
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
    Cart.belongsTo(models.Products, {
      as: "cart",
      foreingKey: "id_cart",
    });
  };

  User.associate = function (models) {
    User.belongsTo(models.Carts, {
      as: "userCarts",
      foreingKey: "id_cart",
    });
  };

  return Cart;
};
