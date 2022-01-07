const express = require("express");
const router = express.Router();
const upload = require("../middlewares/multer");
const productosController = require("../controllers/productosController");

router.get("/", productosController.list);

router.get("/create", productosController.create);
router.post("/create", upload.single("image"), productosController.store);

router.get("/search", productosController.search);

router.get("/description", productosController.descriptionProduct);

router.get("/:id", productosController.detail);

router.get("/edit/:id", productosController.edit);
router.put('/edit/:id' , upload.single('image') , productosController.update);

router.get("/delete/:id" , productosController.PagDelete);
router.delete("/delete/:id" , productosController.delete);

module.exports = router;
