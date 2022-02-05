const port = 3000;
const express = require("express");
const path = require("path");
const app = express();
const session = require("express-session");
const publicPath = path.resolve(__dirname, '../public');
const viewsPath = path.resolve(__dirname, './views/pages');
const mainRouter = require('./routes/main');
const productosRouter = require('./routes/productos');
const usersRouter = require('./routes/users');
const carritoRouter = require('./routes/carrito');
const methodOVerride = require('method-override');

app.use(session({
  secret: "shh",
  resave: true,
  saveUninitialized: true
}));
app.use(methodOVerride('_method'));
app.use(express.static(publicPath));
app.set("view engine", "ejs");
app.set("views", viewsPath);
app.use(express.urlencoded({ extended: false }));

app.listen(port, () =>
  console.log("Servidor corriendo en el puerto" + " " + port)
);

app.use("/", mainRouter);

app.use("/products", productosRouter);

app.use("/carrito", carritoRouter);

app.use("/register", usersRouter);

app.use("/users", usersRouter);

app.post("/login", (req, res) => {
  res.redirect("/");
});

app.use(function(req, res, next){
  res.status(404);

  if (req.accepts('html')) {
    res.render('not-found', { url: req.url });
    return;
  }

  next();

});