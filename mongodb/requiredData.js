const { ROLES } = require('../utils/roles');
const Role = require('../models/roleSchema');
const User = require('../models/userSchema');
const generateHashedPassword = require("../utils/generateHashedPassword")

const ensureAdminUser = async () => {
    try {
        // Find or create admin role
        let adminRole = await Role.findOne({ roleName: ROLES.ADMIN });

        if (!adminRole) {
            adminRole = new Role({ roleName: ROLES.ADMIN });
            await adminRole.save();
        }

        // Find or create admin user
        let adminUser = await User.findOne({ email: process.env.ADMIN_EMAIL, role: adminRole._id });

        if (!adminUser) {
            const password = await generateHashedPassword("rakeshlaishetty123@gmail.com")
            adminUser = new User({
                firstName: 'Admin',
                lastName: 'Admin',
                email: process.env.ADMIN_EMAIL,
                whatsappNumber: '6352119731',
                role: adminRole._id,
                password: password
            });


            await adminUser.save();
            console.log('Admin user created.');
        }
    } catch (error) {
        console.error('Error ensuring admin user:', error);
    }
};



const requiredData = async () => {
    try {
        await ensureAdminUser();

        const rolesData = await Role.find({}, 'roleName');
        const existingRoles = rolesData.map(role => role.roleName);

        await Promise.all(Object.values(ROLES).map(async (role) => {
            if (!existingRoles.includes(role)) {
                const newRole = new Role({ roleName: role });
                await newRole.save();
                console.log(`Inserted missing role: ${role}`);
            }
        }));
    } catch (error) {
        console.error('Error ensuring required data:', error);
    }
};

module.exports = requiredData;
