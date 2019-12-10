'use strict';

const router = require('express').Router();
const getProfileData = require('../controllers/editProfile/get-profile-data');
const updateProfile = require('../controllers/editProfile/update-profile');

router.get('/', getProfileData);
router.put('/', updateProfile);

module.exports = router;