const express = require('express');
const router = express.Router();
const productosController = require('../controllers/productosController');

router.get('/', productosController.productos);
router.get('/edit', productosController.edit);
router.get('/search', productosController.search);
router.get('/description', productosController.descriptionProduct)

module.exports = router;
