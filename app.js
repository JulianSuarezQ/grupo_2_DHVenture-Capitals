const port = 3000;
const express = require('express');
const path = require('path');
const app = express();
const publicPath = path.resolve(__dirname, './public');
const viewsPath = path.resolve(__dirname, './src/views');
const mainRouter = require('./src/routes/main');
const productosRouter = require('./src/routes/productos');


app.use(express.static(publicPath));
app.set('view engine','ejs');
app.set('views', (viewsPath));

app.listen(port, () =>  console.log('Servidor corriendo en el puerto' + " " + port));

app.use('/', mainRouter);

app.use('/productos', productosRouter)

app.post('/login', (req, res) => {
  res.redirect('/');
});
