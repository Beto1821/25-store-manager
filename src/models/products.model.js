const connection = require('./connection');

const getProducts = async () => {
  const [product] = await connection.execute(
    'SELECT * FROM products',
  );
  return product;
};

const getProductsId = async (id) => {
  const [productId] = await connection.execute(
    'SELECT * FROM products WHERE id = ?',
    [id],
  );
  return productId;
};

module.exports = {
  getProducts,
  getProductsId,
};