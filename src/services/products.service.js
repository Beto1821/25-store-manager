const productsModel = require('../models/products.model');

const getProducts = async () => {
  const products = await productsModel.getProducts();
  return products;
};

const getProductsId = async (id) => {
  const product = await productsModel.getProductsId(id);

  return product;
};

module.exports = {
  getProducts,
  getProductsId,
};