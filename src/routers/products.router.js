const express = require('express');
const productsController = require('../c')


router.get('/', productsController.getProducts)

);