const express = require('express');

let router = express.Router();
const adminService = require("../../services/v1/admin");
const moduleService = require('../../services/v1/modules');
const isAdmin = require('../../middleware/isAdmin');


router.post('/sign-in', adminService.signIn);
router.post('/get-all-modules', isAdmin, moduleService.getAllModules);
router.post('/assign-module', isAdmin, adminService.assignModule);

module.exports = router;            