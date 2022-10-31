const express = require('express');
const routeProducts = require('./routes/productRoutes');
const app = express();
const PORT = 8000;


//** Middlewares */
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname + '/public'));



app.use('/api/products', routeProducts);



try {
    app.listen(PORT);
    console.log(`Server on port ${PORT}...`)
} catch (error) {
    console.log('Error de conexión con el servidor...', error)
}

