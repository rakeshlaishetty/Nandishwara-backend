const Role = require('../../../models/roleSchema')
const { successResponse } = require("../../../utils/response")
const GetRoles = async (req, res, next) => {
    try {
        const roles = await Role.find();
        return successResponse(res, 200, data = roles, 200, "Successfully Fetched Data")
    } catch (error) {
        next(error);
    }
}

module.exports = { GetRoles }