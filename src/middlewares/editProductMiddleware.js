const path = require("path");
const { body } = require("express-validator");

module.exports = [
  body("name")
    .notEmpty()
    .withMessage("El campo no puede estar vacio")
    .isLength({ min: 2 })
    .withMessage("Debe completar el nombre con al menos 5 caracteres"),

  body("detail")
    .notEmpty()
    .withMessage("El campo no puede estar vacio")
    .isLength({ min: 20 })
    .withMessage("Debe completar la descripción con al menos 20 caracteres"),

  body("color")
    .notEmpty()
    .withMessage("El campo no puede estar vacio")
    .isLength({ min: 4 })
    .withMessage("Debe completar el color con al menos 4 caracteres"),

  body("price")
    .notEmpty()
    .withMessage("El campo no puede estar vacio")
    .isLength({ min: 1 })
    .withMessage("Debe completar el precio con al menos 1 caracter"),
];
