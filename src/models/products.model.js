const connection = require('./connection');

const getProducts = async () => {
  const [product] = await connection.execute(
    'SELECT * FROM products ORDER BY id',
    );
    return product;
};

const getProductId = async (id) => {
  const [[productId]] = await connection.execute(
    'SELECT * FROM products WHERE id = ?',
    [id],
  );
  return productId;
};

const insertProduct = async (name) => {
  const [product] = await connection.execute(
    'INSERT INTO products (name) VALUE (?)',
    [name],
    );
  return product;
};

module.exports = {
  getProducts,
  getProductId,
  insertProduct,
};