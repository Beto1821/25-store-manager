const productsService = require('../services/products.service');
const salesSchema = require('./salesSchema');

const validateSale = (sale) => {
  const isValid = salesSchema.validate(sale);
  return isValid;
};

const salesMiddleware = (req, res, next) => {
  const product = [...req.body];
  const { error } = validateSale(product);
  if (error) {
    const [code, message] = error.message.split('|');
    return res.status(Number(code)).json({ message });
  }
  next();
};

const productId = async (req, res, next) => {
  const data = req.body;
  const result = await Promise.all(
    data.map((sale) => productsService.checkProduct(sale.productId)),
  );
  if (result.some((check) => check === false)) {
    return res.status(404).json({ message: 'Product not found' });
  }
  next();
};

module.exports = { salesMiddleware, productId };