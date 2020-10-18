const express = require('express');

const isAuth = require('../../middleware/isAuth');
const moduleService = require('../../services/v1/modules');
let router = express.Router();

router.post('/get-modules',isAuth,moduleService.getUserModule);

module.exports = router;            