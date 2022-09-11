const salesService = require('../services/sales.services');

const getSales = async (_req, res) => {
  const resp = await salesService.getSales();
  res.status(200).json(resp);
};

const getSalesId = async (req, res) => {
  const { id } = req.params;
  const resp = await salesService.getSalesId(id);
  if (!resp) {
    return res.status(404).json({ message: 'Sale not found' });
  }
  res.status(200).json(resp);
};

const insertSales = async (req, res) => {
  const name = req.body;
  const product = await salesService.insertSales(name);
  return res.status(201).json(product);
};

module.exports = {
  getSales,
  getSalesId,
  insertSales,
};