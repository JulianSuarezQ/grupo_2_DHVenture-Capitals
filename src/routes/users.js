const express = require("express");
const { body , check } = require("express-validator");
const router = express.Router();
const usersController = require("../controllers/usersController");
const upload = require("../middlewares/multer");
const validateRegister = require("../middlewares/validateRegisterMiddelware")

router.get('/register', usersController.register);
router.post('/createUser', upload.single("img"), validateRegister ,usersController.createUser);

router.get('/login', usersController.login);
router.post('/login' ,usersController.processLogin)


module.exports = router;