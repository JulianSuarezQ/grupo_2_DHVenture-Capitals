const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersController");
const upload = require("../middlewares/multer");

router.get('/register', usersController.register);
router.post('/createUser', upload.single("img"), usersController.createUser);

router.get('/login', usersController.login);


module.exports = router;