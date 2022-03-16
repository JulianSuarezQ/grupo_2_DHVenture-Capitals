const express = require("express");
const router = express.Router();

const usersApiController = require("../apis/userApiController");


//Users


router.get("/users/:id",usersApiController.users);

router.get("/users/",usersApiController.count);

router.get("/email/:email",usersApiController.userEmail);

module.exports = router;
