'use strict';

const createAccountController = require('./create-account-controller');
const deleteAccountController = require('./delete-account-controller');
const editAccountController = require('./edit-account-controller');
const getAccountController = require('./get-account-controller');
const checkAccountSession = require('./check-account-sesion');
const accountController = {
  createAccountController,
  deleteAccountController,
  editAccountController,
  getAccountController,
  checkAccountSession,
};

module.exports = accountController;