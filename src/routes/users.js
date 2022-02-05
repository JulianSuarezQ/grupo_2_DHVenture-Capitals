const express = require("express");
const { body , check } = require("express-validator");
const router = express.Router();
const usersController = require("../controllers/usersController");
const upload = require("../middlewares/multer");
const validateRegister = require("../middlewares/validateRegisterMiddelware")

//REGISTER

router.get('/register', usersController.register);

router.post('/createUser', upload.single("img"), validateRegister ,usersController.createUser);

//LOGIN

router.get('/login', usersController.login);
//falta poner un validateLogin
router.post('/login', validateRegister , usersController.processLogin);



module.exports = router;