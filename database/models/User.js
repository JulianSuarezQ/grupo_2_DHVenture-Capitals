module.exports = (sequelize, dataTypes) => {
  const alias = "Users";
  const cols = {
    id_user: {
      type: dataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    id_rol: {
      type: dataTypes.INTEGER,
      allowNull: false,
    },
    name: {
      type: dataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: dataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: dataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: dataTypes.STRING,
      allowNull: false,
    },
    birth_day: {
      type: dataTypes.DATE,
      allowNull: false,
    },
    dni: {
      type: dataTypes.INTEGER,
      allowNull: false,
    },
    gender: {
      type: dataTypes.STRING,
      allowNull: false,
    },
    tel: {
      type: dataTypes.INTEGER,
      allowNull: false,
    },
    polices: {
      type: dataTypes.BOOLEAN,
      allowNull: false,
    },
    img: {
      type: dataTypes.STRING,
      allowNull: false,
    },
  };

  const config = {
    tableName: "user",
    timestamps: false,
  };

  const User = sequelize.define(alias, cols, config);

  //asociacion de tabla con su FK
  User.associate = function (models) {
    User.belongsTo(models.Rols, {
      as: "rols",
      foreignKey: "id_rol",
    });
    User.belongsTo(models.Carts, {
      as: "user_carts",
      foreignKey: "id_user",
    });
  };

  return User;
};
