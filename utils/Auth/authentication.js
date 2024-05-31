const User = require("../../models/userSchema")
const { ROLES } = require("../roles")
const { errorResponse } = require("../response")
const jwt = require('jsonwebtoken')
async function authenticateToken(req, res, next) {
    console.log("Authentication Start")
    const token = req?.cookies?.jwt || req?.session?.token || req.header('Authorization')?.split(' ')[1];


    try {
        if (!token) throw new Error('Access denied. No token provided.')
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const user = await User.findById(decoded.userId).populate("role");
        if (!user) {
            throw new Error('User not found.');
        }
        req.user = user;
        console.log("reached")
        next();
    } catch (ex) {
        console.log("Authenticaton Failed", ex)
        next(ex)
    }
}


function isAdmin(req, res, next) {
    console.log("req.user.role.roleName")
    try {
        if (req.user?.role?.roleName === ROLES.ADMIN) {
            next();
        } else {
            throw new Error('Access denied. Admins only.');
        }

    } catch (err) {
        next(err)
    }
}
function isCustomer(req, res, next) {
    try {
        if (req.user?.role?.roleName === ROLES.CUSTOMER) {
            next();
        } else {
            throw new Error('Access denied. Customer only.');
        }

    } catch (err) {
        next(err)
    }
}
function isShopOwner(req, res, next) {
    try {
        if (req.user?.role?.roleName === ROLES.SHOP_OWNER) {
            next();
        } else {
            throw new Error('Access denied. Shop Owner only.');
        }

    } catch (err) {
        next(err)
    }
}
module.exports = { authenticateToken,isAdmin,isShopOwner,isCustomer }