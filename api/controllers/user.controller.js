import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";
import bcryptjs from 'bcryptjs'

export const userTest = (req, res) => {
    res.json({ message: 'API is working'});
};

// req.user.id is the id received after the verifyToken was correct
// req.params.id is the one specified in the route router.post('/update/:id', verifyToken,updateUser);

export const updateUser = async (req, res, next) => {
    if (req.user.id !== req.params.id) return next(errorHandler(406, 'You can only update your account!'))
    
        try {
            if(req.body.password){
                req.body.password = bcryptjs.hashSync(req.body.password, 10);
            }

            const updatedUser = await User.findByIdAndUpdate(req.params.id, {
                $set:{
                    username: req.body.username,
                    email: req.body.email,
                    password: req.body.password,
                    avatar: req.body.avatar,
                    bio: req.body.bio,
                }
            }, {new: true});

            const {password, ...rest} = updatedUser._doc;

            res.status(200).json(rest);

        } catch (error) {
           next(error); 
        }
};