const mainController = {
  index: function (req, res) {
    res.render("index");
  },
  carrito: function (req, res) {
    res.render("carrito");
  },
  login: function (req, res) {
    res.render("login");
  }
};

module.exports = mainController;
