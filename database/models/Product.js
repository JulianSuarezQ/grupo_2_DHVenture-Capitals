module.exports = (sequelize, dataTypes) => {
  const alias = "Products";
  const cols = {
    id_product: {
      type: dataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: dataTypes.STRING(45),
      allowNull: false,
      unique: true,
    },
    discount: {
      type: dataTypes.INTEGER,
      allowNull: false,
    },
    detail: {
      type: dataTypes.STRING(200),
      allowNull: false,
    },
    stock: {
      type: dataTypes.INTEGER,
      allowNull: false,
    },
    id_category: {
      type: dataTypes.INTEGER,
      allowNull: false,
    },
    color: {
      type: dataTypes.STRING(150),
      allowNull: false,
    },
    price: {
      type: dataTypes.INTEGER,
      allowNull: false,
    },
    size: {
      type: dataTypes.STRING(3),
      allowNull: false,
    },
    img: {
      type: dataTypes.STRING(45),
      allowNull: false,
    },
  };
  const config = {
    tableName: "products",
    timestamps: false,
  };

  const Product = sequelize.define(alias, cols, config);

  //asociacion 
  Product.associate = function (models) {
    Product.belongsTo(models.Category, {
      as: "category",
      foreingKey: "id_category",
    });
  };

  Product.associate = function (models) {
    Product.hasMany(models.CartProducts, {
      as: "product",
      foreingKey: "id_product",
    });
  }

  return Product;
};
