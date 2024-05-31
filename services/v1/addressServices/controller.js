const Address = require("../../../models/addressSchema")
const User = require("../../../models/userSchema")
const { successResponse } = require("../../../utils/response")
// Create Address
const createAddress = async (req, res, next) => {
    try {
        const userId = req.user._id; // Get the user ID from the authenticated user
        const newAddress = req.body; // New address data

        const updateAddress = await Address.create(newAddress)
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { $push: { addresses: updateAddress._id } },
            { new: true }
        );

        if (!updatedUser) {
            throw new Error('User not found');
        }

        return successResponse(res, 201, updatedUser, 'Address added successfully.');
    } catch (error) {
        next(error);
    }
};


// Update Address
const updateAddress = async (req, res, next) => {
    try {
        const userId = req.user._id;
        const { addressId, update } = req.body;

        // Find the user by ID
        const user = await User.findById(userId);

        if (!user) {
            throw new Error('User not found');
        }

        const addressIndex = user.addresses.findIndex(address => address._id.toString() === addressId);
        let updatedAddress = null;
        if (addressIndex === -1) {
            throw new Error('Address not found');
        } else {
            updatedAddress = await Address.findByIdAndUpdate(addressId, update, { new: true });
            if (!updatedAddress) {
                throw new Error("Address Update Failed ")
            }
        }


        return successResponse(res, 200, updatedAddress, 'Address updated successfully.');
    } catch (error) {
        next(error);
    }
};



// Delete Address
const deleteAddress = async (req, res, next) => {
    try {
        const userId = req.user._id; // Get the user ID from the authenticated user
        const {addressId} = req.body; // Get the ID of the address to be deleted


        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { $pull: { addresses: addressId } },
            { new: true }
        );

        const deleteAddressData = await Address.findByIdAndDelete(addressId)
        if (!updatedUser || !deleteAddressData) {
            throw new Error('Address or User Not Found');
        }

        return successResponse(res, 200, updatedUser, 'Address deleted successfully.');
    } catch (error) {
        next(error);
    }
};


const getAddress = async (req, res, next) => {
    try {
        const userId = req.user._id; // Get the user ID from the authenticated user

        // Find the user document and return the addresses array
        const user = await User.findById(userId).populate('addresses');

        if (!user) {
            throw new Error('User not found');
        }

        return successResponse(res, 200, user.addresses, 'Addresses retrieved successfully.');
    } catch (error) {
        next(error);
    }
};



module.exports = { createAddress, deleteAddress, updateAddress, getAddress }