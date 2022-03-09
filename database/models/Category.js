module.exports = (sequelize, dataTypes) => {
  const alias = "Category";
  const cols = {
    id_category: {
      type: dataTypes.INTEGER,
      primaryKey: true,
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
    Category.hasMany(models.Products, {
      as: "category",
      foreingKey: "id_category",
    });
  };

  return Category;
};
