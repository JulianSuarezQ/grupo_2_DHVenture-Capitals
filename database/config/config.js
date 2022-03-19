module.exports = {
  development: {
    username: "root",
    password: "facu2323",
    database: "DB_Scaloneta",
    host: "127.0.0.1",
    dialect: "mysql",
  },
  test: {
    username: "admina",
    password: "root",
    database: "database_test",
    host: "127.0.0.1",
    dialect: "mysql",
  },
  production: {
    username: "root",
    password: null,
    database: "database_production",
    host: "127.0.0.1",
    dialect: "mysql",
  },
};
