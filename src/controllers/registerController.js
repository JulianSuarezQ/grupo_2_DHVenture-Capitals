const fs = require("fs");
const path = require("path");

const registerController = {
    register: function(req, res){
        res.render("register")
    },

    createUser: function(req, res){

    },
    
};

module.exports = registerController;
