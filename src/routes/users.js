const express = require("express");
const router = express.Router();
const upload = require("../middlewares/multer");
const usersController = require("../controllers/usersController");


router.get('/register', usersController.register);
//router.post('/', registerController.createUser);

router.get('/login', usersController.login);


module.exports = router;