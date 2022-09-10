const express = require('express');
const productsController = require('../controllers/products.controller');
const productValidation = require('../middlewares/productValidation');

const router = express.Router();

router.get('/', productsController.getProducts);

router.get('/:id', productsController.getProductId);

router.post('/', productValidation, productsController.insertProduct);

module.exports = router;