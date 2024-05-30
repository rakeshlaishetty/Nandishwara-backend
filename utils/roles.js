const ROLES = {
    ADMIN: 'admin',
    SHOP_OWNER: 'shop_owner',
    CUSTOMER: 'customer',
};

const roleMandatoryFields = {
    [ROLES.SHOP_OWNER]: ['firstName', 'lastName', 'email', 'whatsappNumber', 'photoOfBusiness'],
    // Other roles can be defined here
};

module.exports = { ROLES, roleMandatoryFields };
