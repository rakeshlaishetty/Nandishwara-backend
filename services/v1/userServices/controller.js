const Role = require('../../../models/roleSchema');
const User = require('../../../models/userSchema');
const { successResponse } = require('../../../utils/response');
const generateHashedPassword = require("../../../utils/generateHashedPassword")
const comparePasswords = require("../../../utils/comparePasswords")
const generateToken = require("../../../utils/generateToken")


// Middleware to validate user input
const validateUserInput = (req, res, next) => {
    try {
        const { firstName, lastName, email, password, role } = req.body;
        if (!firstName || !lastName || !email || !password || !role) {
            throw new Error('All fields are required.');
        }
        next()

    } catch (err) {
        next(err);

    }
};


const isValidEmail = (email) => {
    // Regular expression to validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};


// Function to check if role exists
const checkRoleExists = async (roleId) => {
    const role = await Role.findById(roleId);
    return role != null;
};

// Register a new user
const register = async (req, res, next) => {
    try {
        const { firstName, lastName, email, password, whatsappNumber, photoOfBusiness, role } = req.body;

        const roleExists = await checkRoleExists(role);
        if (!roleExists) {
            new Error('Invalid role ID.')
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            new Error('Email already in use.')
        }

        const hashedPassword = await generateHashedPassword(password);

        const newUser = new User({
            firstName,
            lastName,
            email,
            whatsappNumber,
            photoOfBusiness,
            role,
            password: hashedPassword
        });

        // Save user to database
        const savedUser = await newUser.save();
        return successResponse(res, 201, savedUser, 'User registered successfully.');
    } catch (err) {
        next(err)
    }
};

const login = async (req, res, next) => {
    try {
        const { username, password } = req.body;

        let user;
        if (isValidEmail(username)) {
            user = await User.findOne({ email: username }).populate(['role', 'orders', 'addresses', 'cart_items']);
        } else {
            user = await User.findOne({ whatsappNumber: username }).populate(['role', 'orders', 'addresses', 'cart_items']);
        }

        if (!user) {
            throw new Error("User not found");
        }


        const isPasswordValid = await comparePasswords(password, user.password);

        if (!isPasswordValid) {
            throw new Error("Invalid credentials");
        }

        const token = await generateToken(user._id);
        res.cookie('jwt', token, { httpOnly: false, maxAge: 30 * 24 * 60 * 60 * 1000 });
        req.session.userId = user._id;
        req.session.userdata = user;
        req.session.token = token;
        return successResponse(res, 200, { user, token }, 'Login successful.');
    } catch (error) {
        next(error);
    }
};

// Function to check if the provided input is a valid email

const logout = async (req, res) => {
    console.log( req.session," req.session")
    Object.keys(req.cookies).forEach(cookieName => {
        console.log(cookieName,"user") 
    })
    try {
        req.session.destroy((err) => {
            if (err) {
                console.error('Error destroying session:', err);
                return res.status(500).json({ message: 'Internal server error' });
            }

            Object.keys(req.cookies).forEach(cookieName => {
                res.clearCookie(cookieName);
            });
            return successResponse(res, 200, null, 'Logout successfully.');
        });
    }
    catch (err) {
        next(err)
    }

}

module.exports = { register, validateUserInput, login, logout };
