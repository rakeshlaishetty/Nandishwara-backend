const { roleMandatoryFields } = require('../utils/roles');

function validateRoleFields(role) {
    return (req, res, next) => {
        const requiredFields = roleMandatoryFields[role];
        const missingFields = requiredFields.filter(field => !req.body[field]);

        if (missingFields.length) {
            return res.status(400).json({ message: `Missing mandatory fields: ${missingFields.join(', ')}` });
        }

        next();
    };
}

module.exports = { validateRoleFields };
