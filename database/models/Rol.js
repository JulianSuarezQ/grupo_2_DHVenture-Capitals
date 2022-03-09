module.exports = (sequelize, dataTypes) => {
  const alias = "Rols";
  const cols = {
    id_rol: {
      type: dataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    description: {
      type: dataTypes.STRING,
      allowNull: false,
    },
  };
  const config = {
    tableName: "rols",
    timestamps: false,
  };

  const Rol = sequelize.define(alias, cols, config);

  //asociacion de tabla con su FK
  Rol.associate = function (models) {
    Rol.hasMany(models.Users, {
      as: "users",
      foreignKey: "id_rol",
    });
  };

  return Rol;
};
