const express = require('express');

// const userService = require('../../../services/v1/users/user');
let router = express.Router();
const { signIn } = require("../../services/v1/admin")

router.post('/sign-in', signIn);

module.exports = router;            