'use strict';

const router = require('express').Router();
const checkAccountSession = require('../controllers/account/check-account-sesion');
const createPackageController = require('../controllers/packageP/create-package');

router.post('/', checkAccountSession, createPackageController);

module.exports = router;

