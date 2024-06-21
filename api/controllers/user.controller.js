import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";
import bcryptjs from 'bcryptjs';
import { verifyPassword } from "../utils/utility.js"; 

export const userTest = (req, res) => {
    res.json({ message: 'API is working' });
};

// req.user.id is the id received after the verifyToken was correct
// req.params.id is the one specified in the route router.post('/update/:id', verifyToken, updateUser);

export const updateUser = async (req, res, next) => {
    if (req.user.id !== req.params.id) {
        return next(errorHandler(406, 'You can only update your account!'));
    }

    const { username, email, password, avatar, bio } = req.body;

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
        res.status(200).json('Account deleted successfully!');
    } catch (error) {
        
    }
};
