const fs = require("fs");
const path = require("path");

const registerController = {
    vista: function(req, res){
        res.render("register")
    },

    register: (req, res) => {
        
    }
};

module.exports = registerController;
