import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";
import bcryptjs from 'bcryptjs';
import { verifyPassword } from "../utils/utility.js"; 
import Listing from "../models/listing.model.js";

export const userTest = (req, res) => {
    res.json({ message: 'API is working' });
};

// req.user.id is the id received after the verifyToken was correct
// req.params.id is the one specified in the route router.post('/update/:id', verifyToken, updateUser);

export const updateUser = async (req, res, next) => {
    if (req.user.id !== req.params.id) {
        return next(errorHandler(406, 'You can only update your account!'));
    }

    const {
        username, email, password, avatar, bio, age, city, state, country,
        postCode, phoneNumber, agency, agencyLicence, taxNumber, serviceArea,
        totalListing, propertiesSold, propertiesRent,
        emailNotifications, messageNotifications, publicProfile, dataSharing, language, currency
    } = req.body;

    // Input validation
    if (username === '') {
        return next(errorHandler(410, 'Username cannot be empty!'));
    }
    if (email === '') {
        return next(errorHandler(410, 'Email cannot be empty!'));
    }
    if (password && !verifyPassword(password)) {
        return next(errorHandler(410, 'Password does not meet the requirements!'));
    }

    try {
        const updateData = {};

        if (username) updateData.username = username;
        if (email) updateData.email = email;
        if (password) updateData.password = bcryptjs.hashSync(password, 10);
        if (avatar) updateData.avatar = avatar;
        if (bio) updateData.bio = bio;
        if (age) updateData.age = age;
        if (city) updateData.city = city;
        if (state) updateData.state = state;
        if (country) updateData.country = country;
        if (postCode) updateData.postCode = postCode;
        if (phoneNumber) updateData.phoneNumber = phoneNumber;
        if (agency) updateData.agency = agency;
        if (agencyLicence) updateData.agencyLicence = agencyLicence;
        if (taxNumber) updateData.taxNumber = taxNumber;
        if (serviceArea) updateData.serviceArea = serviceArea;
        if (totalListing) updateData.totalListing = totalListing;
        if (propertiesSold) updateData.propertiesSold = propertiesSold;
        if (propertiesRent) updateData.propertiesRent = propertiesRent;

        // Update settings if they are provided
        if (
            emailNotifications !== undefined ||
            messageNotifications !== undefined ||
            publicProfile !== undefined ||
            dataSharing !== undefined ||
            language !== undefined ||
            currency !== undefined
        ) {
            updateData.settings = {};
            if (emailNotifications !== undefined) updateData.settings.emailNotifications = emailNotifications;
            if (messageNotifications !== undefined) updateData.settings.messageNotifications = messageNotifications;
            if (publicProfile !== undefined) updateData.settings.publicProfile = publicProfile;
            if (dataSharing !== undefined) updateData.settings.dataSharing = dataSharing;
            if (language) updateData.settings.language = language;
            if (currency) updateData.settings.currency = currency;
        }

        const updatedUser = await User.findByIdAndUpdate(req.params.id, {
            $set: updateData
        }, { new: true });

        if (!updatedUser) {
            return next(errorHandler(404, 'User not found'));
        }

        const { password: pwd, ...rest } = updatedUser._doc;
        res.status(200).json(rest);

    } catch (error) {
        next(error);
    }
};

export const deleteUser = async (req, res, next) => {

    if (req.user.id !== req.params.id) {
        return next(errorHandler(406, 'You can only delete your account!'));
    }

    try {
        
        await User.findByIdAndDelete(req.params.id);
        res.clearCookie('access_token');
        res.status(200).json('Account deleted successfully!');
    } catch (error) {
        next(error);
    }
};

export const getUserListing = async (req, res, next) => {

    if (req.user.id !== req.params.id) {
        return next(errorHandler(406, 'Your session has expired, please re-signin!'));
    }

    try {
        
        const listings = await Listing.find({userRef: req.params.id});
        res.status(200).json(listings);
    } catch (error) {
        next(error);
    }
};
