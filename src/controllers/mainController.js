const db = require("../../database/models");


const mainController = {
  index: function (req , res) {
    db.Products.findAll({
      include: [
        {association: "category"},
        {association: "cart"}
      ]
    })
      .then(function(products){
        res.render("index", {
        productos: products,
      });
    });
  },
  mantenimiento: function (req , res){
    res.render('en-mantenimiento')
  }
};

module.exports = mainController;
