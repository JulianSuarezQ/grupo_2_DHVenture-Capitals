const express = require("express");
const router = express.Router();
const mainController = require("../controllers/mainController");
const userLogged = require("../middlewares/userLoggedMiddleware");

router.get("/", userLogged, mainController.index);

module.exports = router;
