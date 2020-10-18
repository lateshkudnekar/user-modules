const express = require('express');
const authenticateJWT = require('../../../services/v1/middleware/authenticate');
const injectTokenPayload = require('../../../services/v1/middleware/injectTokenPayload');
const userService = require('../../../services/v1/users/user');
let router = express.Router();

router.post('/sign-in', userService.login);
router.post('/sign-up', userService.verifyAccount);

//require.post()
module.exports = router;            