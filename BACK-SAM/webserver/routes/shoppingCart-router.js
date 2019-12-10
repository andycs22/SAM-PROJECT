'use strict';

const router = require('express').Router();
const createShoppingCart = require('../controllers/shoppingCart/createShoppingCart');
const deleteProduct = require('../controllers/shoppingCart/deleteProduct');
const getAvailableProduct = require('../controllers/shoppingCart/getAvailableProduct');
const getShoppingCart = require('../controllers/shoppingCart/getShoppingCart');
const insertProduct = require('../controllers/shoppingCart/insertProduct');
const updateShoppingCart = require('../controllers/shoppingCart/updateShoppingCart');

router.post('/', createShoppingCart);
router.delete('/', deleteProduct);
router.get('/', getAvailableProduct);
router.get('/', getShoppingCart);
router.put('/', insertProduct);
router.put('/', updateShoppingCart);

module.exports = router;