const express = require('express');
const salesController = require('../controllers/sales.controller');
const { salesMiddleware, productId } = require('../middlewares/salesvalidation');

const router = express.Router();

router.get('/', salesController.getSales);

router.post('/', salesMiddleware, productId, salesController.insertSales);

router.get('/:id', salesController.getSalesId);

module.exports = router;