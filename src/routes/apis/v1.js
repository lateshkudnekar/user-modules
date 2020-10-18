const userController = require('../../controllers/v1/user');
const express = require('express');
let router = express.Router();
router.use('/users', userController);

module.exports = router;