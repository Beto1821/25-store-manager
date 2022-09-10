const productsService = require('../services/products.service');

const getProducts = async (_req, res) => {
  const resp = await productsService.getProducts();
  res.status(200).json(resp);
};

const getProductId = async (req, res) => {
  const { id } = req.params;
  const resp = await productsService.getProductId(id);
  if (!resp) {
    return res.status(404).json({ message: 'Product not found' });
  }
  res.status(200).json(resp);
};

const insertProduct = async (req, res) => {
  const { name } = req.body;
  const { type, message } = await productsService.insertProduct(name);

  if (type) return res.status(type).json(message);

  res.status(201).json(message);
};

module.exports = {
  getProducts,
  getProductId,
  insertProduct,
};