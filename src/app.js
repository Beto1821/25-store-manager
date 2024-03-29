const express = require('express');
const productsRoutes = require('./routers/products.router');
const salesRoutes = require('./routers/sales.router');
const errorMiddleware = require('./middlewares/errorMiddleware');

const app = express();

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use(express.json());
app.use('/products', productsRoutes);
app.use('/sales', salesRoutes);
app.use(errorMiddleware);
// não remova essa exportação, é para o avaliador funcionar
// você pode registrar suas rotas normalmente, como o exemplo acima
// você deve usar o arquivo index.js para executar sua aplicação 
module.exports = app;