'use strict';

const account = require('./account-router');
const auth = require('./auth-router');

const ordersHistory = require('./ordersHistory-router');
const packageSam = require('./package-router');
const product = require('./product-router');

module.exports = {
  account,
  auth,
  ordersHistory,
  packageSam,
  product,
};
