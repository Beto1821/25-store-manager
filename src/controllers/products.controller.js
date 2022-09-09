const productsService = require('../services/products.service');

const getProducts = async (_req, res) => {
  const resp = await productsService.getProducts();
  res.status(200).json(resp);
};

const getProductId = async (req, res) => {
  const { id } = req.params;
  const resp = await productsService.getProductId(id);
  if (!resp[0]) {
    return res.status(404).json({ message: 'Product not found' });
  }
  res.status(200).json(resp[0]);
};

module.exports = {
  getProducts,
  getProductId,
};