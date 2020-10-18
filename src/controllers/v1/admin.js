const express = require('express');

let router = express.Router();
const adminService = require("../../services/v1/admin");
const isAdmin = require('../../middleware/isAdmin');


router.post('/sign-in', adminService.signIn);
router.post('/get-all-modules', isAdmin, adminService.getAllModules);
router.post('/assign-module', isAdmin, adminService.assignModule);
router.post('/list-users', isAdmin, adminService.listAllUsers);
router.post('/unassign-module', isAdmin, adminService.unAssignModule);

module.exports = router;            