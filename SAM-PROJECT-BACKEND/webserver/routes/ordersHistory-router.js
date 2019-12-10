'use strict';

const router = require('express').Router();
const getOrders = require('../controllers/ordersHistory/get-orders');
const updateProfile = require('../controllers/ordersHistory/update-orders');

router.get('/', getOrders);
router.post('/', updateProfile);

module.exports = router;