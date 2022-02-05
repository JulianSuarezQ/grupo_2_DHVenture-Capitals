const express = require("express");
const router = express.Router();
const carritoController = require("../controllers/carritoController");
const userLogged = require("../middlewares/userLoggedMiddleware");

router.get("/", userLogged, carritoController.carrito);

module.exports = router;
