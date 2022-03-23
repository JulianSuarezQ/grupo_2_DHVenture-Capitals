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

  body("stock").notEmpty().withMessage("El campo no puede estar vacio"),

  body("price")
    .notEmpty()
    .withMessage("El campo no puede estar vacio")
    .isLength({ min: 1 })
    .withMessage("Debe completar el precio con al menos 1 caracter"),

  body("img").custom((value, { req }) => {
    let file = req.file;
    let acceptedExtensions = [".jpg", ".png", ".gif", ".jpeg"];

    if (!file) {
      throw new Error("Tienes que subir una imagen");
    } else {
      let fileExtension = path.extname(file.originalname);
      if (!acceptedExtensions.includes(fileExtension)) {
        throw new Error(
          `Las extensiones de archivo permitidas son ${acceptedExtensions.join(
            ", "
          )}`
        );
      }
    }

    return true;
  }),
];
