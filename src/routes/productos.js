const express = require("express");
const router = express.Router();
const upload = require("../middlewares/multer");
const productosController = require("../controllers/productosController");
const userLogged = require("../middlewares/userLoggedMiddleware");
const validateCreateProduct = require("../middlewares/createProductMiddleware");

// '/products/....'

router.get("/", userLogged, productosController.list);

router.get("/create", userLogged, productosController.create);
router.post(
  "/create",
  userLogged,
  upload.single("img"),
  validateCreateProduct,
  productosController.store
);

router.get("/search", userLogged, productosController.search);

router.get("/description", userLogged, productosController.descriptionProduct);

router.get("/:id", userLogged, productosController.detail);

router.get("/edit/:id", userLogged, productosController.edit);
router.put(
  "/edit/:id",
  userLogged,
  upload.single("img"),
  productosController.update
);

router.get("/delete/:id", userLogged, productosController.PagDelete);
router.post("/delete/:id", userLogged, productosController.delete);

module.exports = router;
