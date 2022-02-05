const path = require("path");
const { body } = require("express-validator");

module.exports = [
  body("email")
    .notEmpty()
    .withMessage("Escribe una dirección de correo electrónico válida")
    .bail()
    .isEmail()
    .withMessage("Escribe una dirección de correo electrónico válida"),

  body("password")
    .notEmpty()
    .withMessage("El campo no puede estar vacio")
    .bail(),
];
