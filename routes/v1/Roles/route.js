const router = require('express').Router();
const {GetRoles} = require("../../../services/v1/roleServeices/controller")
const { successResponse } = require('../../../utils/response');


// Fetch all roles
router.get('/get', GetRoles);

module.exports = router;
