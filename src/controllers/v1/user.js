const express = require('express');

const isAuth = require('../../middleware/isAuth');
const userService = require('../../services/v1/user');
let router = express.Router();

router.post('/get-modules',isAuth,userService.getUserModule);

module.exports = router;            