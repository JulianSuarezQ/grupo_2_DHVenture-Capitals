module.exports = (sequelize, dataTypes) => {
  const alias = "Rols";
  const cols = {
    idRol: {
      type: dataTypes.INTEGER,
      primareyKey: true,
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
    Rol.hasMeny(models.Users, {
      as: "users",
      foreingKey: "id_rol",
    });
  };

  return Rol;
};
