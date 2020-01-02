'use strict';

const router = require('express').Router();
const checkAccountSession = require('../controllers/account/check-account-sesion');
const createPackage = require('../controllers/package/create-package')
const deletePackage = require('../controllers/package/delete-package')
const getPackage = require('../controllers/package/get-package');

router.post('/', checkAccountSession, createPackage);
router.delete('/:packageId', checkAccountSession, deletePackage);
router.get('/', getPackage);

module.exports = router;