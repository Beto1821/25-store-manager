const productsModel = require('../models/products.model');

const getProducts = async () => {
  const products = await productsModel.getProducts();
  return products;
};

const getProductId = async (id) => {
  const product = await productsModel.getProductId(id);

  return product;
};

const insertProduct = async (name) => {
  const newProduct = await productsModel.insertProduct(name);

  return { type: null, message: newProduct };
};

module.exports = {
  getProducts,
  getProductId,
  insertProduct,
};