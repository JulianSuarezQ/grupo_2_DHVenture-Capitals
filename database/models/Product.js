module.exports = (sequelize, dataTypes) => {
  const alias = "Products";
  const cols = {
    idProduct: {
      type: dataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: dataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    discount: {
      type: dataTypes.INTEGER,
      allowNull: false,
    },
    detail: {
      type: dataTypes.STRING,
      allowNull: false,
    },
    stock: {
      type: dataTypes.INTEGER,
      allowNull: false,
    },
    idCategory: {
      type: dataTypes.INTEGER,
      allowNull: false,
    },
    color: {
      type: dataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: dataTypes.INTEGER,
      allowNull: false,
    },
    size: {
      type: dataTypes.STRING,
      allowNull: false,
    },
    img: {
      type: dataTypes.STRING,
      allowNull: false,
    },
  };
  const config = {
    tableName: "products",
    timestamps: false,
  };

  const Product = sequelize.define(alias, cols, config);

  //asociacion de tabla con su FK
  Product.associate = function (models) {
    Product.belongsTo(models.Category, {
      as: "category",
      foreingKey: "id_category",
      otherKey: "id_cart",
      timestamps: false,
    });
  };

  Product.associate = function (models) {
    Product.belongsTo(models.Carts, {
      as: "Product",
      foreingKey: "id_product",
    });
  };

  return Product;
};
