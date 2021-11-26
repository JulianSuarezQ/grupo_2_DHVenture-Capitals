const express = require('express');
const router = express.Router();
const mainController = require('../controllers/mainController');


router.get('/', mainController.index);
router.get('/carrito', mainController.carrito);
router.get('/login', mainController.login);
router.get('/register', mainController.register);
router.get('/producto-1', mainController.producto1);


module.exports = router