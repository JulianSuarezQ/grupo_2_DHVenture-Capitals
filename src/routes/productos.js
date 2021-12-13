const express = require('express');
const router = express.Router();
const upload = require ('../middlewares/multer')
const productosController = require('../controllers/productosController');

router.get('/', productosController.list);
router.get('/create', productosController.create);
router.post('/', upload.single('image'), productosController.store);
router.get('/search', productosController.search);
router.get('/description', productosController.descriptionProduct)
router.get('/:id', productosController.detail); 

module.exports = router;
