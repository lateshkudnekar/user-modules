const express = require('express');
let router = express.Router();
const { signUp, signIn } = require("../../services/v1/auth/index")
router.post('/sign-in', signIn);
router.post('/sign-up', signUp);

//require.post()
module.exports = router;            