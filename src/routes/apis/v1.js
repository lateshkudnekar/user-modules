const userController = require('../../controllers/v1/user');
const authController = require('../../controllers/v1/auth');
const adminController = require('../../controllers/v1/admin');

const express = require('express');

let router = express.Router();

router.use('/users', userController);
router.use('/auth', authController)
router.use('/admin', adminController)
module.exports = router;