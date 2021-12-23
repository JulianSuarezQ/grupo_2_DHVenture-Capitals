const port = 3000;
const express = require("express");
const path = require("path");
const app = express();
const publicPath = path.resolve(__dirname, "../public");
const viewsPath = path.resolve(__dirname, "./views/pages");
const mainRouter = require("./routes/main");
const productosRouter = require("./routes/productos");
const loginRouter = require("./routes/login");
const registerRouter = require("./routes/register");
const carritoRouter = require("./routes/carrito");
const methodOverride = require("method-override");

app.use(express.static(publicPath));
app.set("view engine", "ejs");
app.set("views", viewsPath);
app.use(methodOverride("_method"));

app.listen(port, () =>
  console.log("Servidor corriendo en el puerto" + " " + port)
);

app.use("/", mainRouter);

app.use("/products", productosRouter);

app.use("/register", registerRouter);

app.use("/login", loginRouter);

app.use("/carrito", carritoRouter);

app.post("/login", (req, res) => {
  res.redirect("/");
});
