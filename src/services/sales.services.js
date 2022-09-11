const salesModel = require('../models/sales.models');

const getSales = async () => {
  const sales = await salesModel.getSales();
  return sales;
};

const getSalesId = async (id) => {
  const sale = await salesModel.getSalesId(id);
  if (!sale) return null;
  return sale;
};

const insertSales = async (saleInfo) => {
  const { id } = await salesModel.insertSales();
    const sales = await Promise.all(
      saleInfo.map(({ productId, quantity }) =>
        salesModel.createSaleProduct({ saleId: id, productId, quantity })),
    );
    return { id, itemsSold: sales };
  };

module.exports = {
  getSales,
  getSalesId,
  insertSales,
};