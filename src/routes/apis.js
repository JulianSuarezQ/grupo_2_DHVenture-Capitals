const express = require("express");
const router = express.Router();

const usersApiController = require("../apis/userApiController");
const productApiController = require("../apis/productApiController");

//Users

router.get("/users/:id", usersApiController.users);

router.get("/users/", usersApiController.count);

router.get("/email/:email", usersApiController.userEmail);

//Products

router.get('/count', productApiController.count);

router.get('/productos' , productApiController.products)

router.get("/products/:id", productApiController.productById);

module.exports = router;
