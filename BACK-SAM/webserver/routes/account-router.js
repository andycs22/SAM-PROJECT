'use strict';

const express = require('express');
const router = express.Router();
const {
  createAccountController,
  deleteAccountController,
  editAccountController,
  getAccountController,
  checkAccountSession,
} = require('../controllers/account/index');

router.post('/', createAccountController);
router.delete('/', checkAccountSession, deleteAccountController);
router.put('/:idUser', checkAccountSession, editAccountController);
// router.get('/:idUser', getAccountController);

module.exports = router;
