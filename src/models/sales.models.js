const connection = require('./connection');

const getSales = async () => {
  const [sales] = await connection.execute(
    `SELECT sale_id as saleId, date, product_id as productId, quantity 
      FROM sales_products as sp
      JOIN sales as s
      ON sp.sale_id = s.id
      ORDER BY sale_id, product_id`,
  );
  return sales;
};

const getSalesId = async (id) => {
  const [[salesId]] = await connection.execute(
    `SELECT date, product_id as productId, quantity 
      FROM sales_products as sp
      JOIN sales as s
      ON sp.sale_id = s.id
      WHERE sp.sale_id = ?
      ORDER BY sale_id, product_id`,
    [id],
  );
  if (salesId.length === 0) return null;
  return salesId;
};

const insertSales = async () => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO sales (date) VALUES (now())',
    );
  return { id: insertId };
};

const insertSalesProduct = async () => {
  const [sale] = await connection.execute(
    `INSERT INTO sales_products (sale_id,product_id,quantity)
    VALUES (?,?,?)`,
    );
  return sale;
};

module.exports = {
  getSales,
  getSalesId,
  insertSales,
  insertSalesProduct,
};