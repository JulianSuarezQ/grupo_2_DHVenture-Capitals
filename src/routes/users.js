const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersController");
const upload = require("../middlewares/multer");
const validate = require("../middlewares/validateRegisterMiddelware")

router.get('/register', usersController.register);
router.post('/createUser', upload.single("img"), validate ,usersController.createUser);

router.get('/login', usersController.login);


module.exports = router;