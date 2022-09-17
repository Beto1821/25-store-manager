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
  const product = await productsService.insertProduct(name);
  return res.status(201).json(product);
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const resp = await productsService.updateProduct(id, name);
  if (!resp) return res.status(404).json({ message: 'Product not found' });
  return res.status(200).json(resp);
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  const idDelete = await productsService.deleteProduct(id);
  if (!idDelete) return res.status(404).json({ message: 'Product not found' });
  return res.status(204).json();
};

module.exports = {
  getProducts,
  getProductId,
  insertProduct,
  updateProduct,
  deleteProduct,
};