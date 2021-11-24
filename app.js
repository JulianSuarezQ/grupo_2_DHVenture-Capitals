const port = 3000;

const express = require("express");
const path = require("path");

const app = express();

const publicPath = path.resolve(__dirname, "./public");
app.use(express.static(publicPath));

app.listen(port, () => {
  console.log("Servidor corriendo en el puerto" + " " + port);
});

app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./src/views/index.html"));
});

app.get("/login", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./src/views/login.html"));
});

app.get("/register", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./src/views/register.html"));
});

app.get("/carrito", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./src/views/carrito.html"));
});

app.get("/producto", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./src/views/producto-1.html"));
});

app.post("/login", (req, res) => {
  res.redirect("/");
});
