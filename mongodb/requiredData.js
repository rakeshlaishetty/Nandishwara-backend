const { ROLES } = require("../utils/roles")
const roles = require("../models/roleSchema")
const requiredData = async () => {
    const rolesData = await roles.find()
    console.log(rolesData)
    console.log(ROLES)

    Object.keys(ROLES).map(async (role) => {
        if (!rolesData.includes(role)) {
            const newRole = new roles({ roleName:role })
            await newRole.save()
        }
    })
}

module.exports = requiredData