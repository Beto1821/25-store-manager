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

const updateProduct = async (id, name) => {
  await connection.execute(
    `UPDATE products SET name = ? 
    WHERE id = ?`,
    [name, id],
  );
  return { id, name };
};

const deleteProduct = async (id) => {
  await connection.execute(
    'DELETE FROM StoreManager.products WHERE id  = ?',
    [id],
  );
  return { id };
};

module.exports = {
  getProducts,
  getProductId,
  insertProduct,
  updateProduct,
  deleteProduct,
};