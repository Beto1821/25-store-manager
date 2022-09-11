const productsModel = require('../models/products.model');

const getProducts = async () => {
  const products = await productsModel.getProducts();
  return products;
};

const getProductId = async (id) => {
  const product = await productsModel.getProductId(id);
  if (!product) return null;
  return product;
};

const insertProduct = async (name) => {
  const newProduct = await productsModel.insertProduct(name);
  const product = { id: newProduct.insertId, name };
  return product;
};

const checkProduct = async (prodId) => {
  const product = await productsModel.getProductId(prodId);
  if (!product) return false;
};

module.exports = {
  getProducts,
  getProductId,
  insertProduct,
  checkProduct,
};