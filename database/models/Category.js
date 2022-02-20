module.exports = (sequelize, dataTypes) => {
  const alias = "Category";
  const cols = {
    idCategory: {
      type: dataTypes.INTEGER,
      primareyKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: dataTypes.STRING,
      allowNull: false,
    },
    detail: {
      type: dataTypes.STRING,
      allowNull: false,
    },
  };
  const config = {
    tableName: "category",
    timestamps: false,
  };

  const Category = sequelize.define(alias, cols, config);

  Category.associate = function (models) {
    Category.hasMeny(models.Products, {
      as: "products",
      foreingKey: "id_rol",
    });
  };

  return Category;
};
