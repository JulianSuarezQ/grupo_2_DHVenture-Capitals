const express = require('express');
const router = express.Router();
const upload = require ('../middlewares/multer');
const productosController = require('../controllers/productosController');



router.get('/', productosController.list);

router.get('/create', productosController.create);
router.post('/create', upload.single('img'), productosController.store);

router.get('/search', productosController.search);

router.get('/description', productosController.descriptionProduct);

router.get('/:id', productosController.detail);

router.get('/edit/:id', productosController.edit);

module.exports = router;
