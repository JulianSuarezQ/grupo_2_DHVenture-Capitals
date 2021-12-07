const express = require('express');
const router = express.Router();
const productosController = require('../controllers/productosController');

router.get('/', productosController.list);
router.get('/create', productosController.create);
router.get('/search', productosController.search);
router.get('/description', productosController.descriptionProduct)

module.exports = router;
