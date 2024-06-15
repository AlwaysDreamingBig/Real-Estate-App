import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs';
import { errorHandler } from "../utils/error.js";
import { verifyPassword } from "../utils/utility.js";
import jwt from 'jsonwebtoken';

export const signup = async (req, res, next) => {
    //console.log(req.body);

    const {username, email, password} = req.body;

    if(!username || !email || !password || username ==='' || email === '' || password === ''){
        next(errorHandler(400, 'All fields are required'));
    }

    if(!verifyPassword(password)){
        next(errorHandler(402, 'Wrong password: pleas follow the instructions for a correct password.'));
    }

    const hashedPassword = bcryptjs.hashSync(password, 10);

    const newUser = new User({
        username : username,
        email : email,
        password : hashedPassword,
    });

        {/** Saving the new User into the dataBase */}

    try{
        await newUser.save();
        res.status(201).json('User created successfully!');
    }catch(error){
        //res.status(500).json({ message: error.message} );
        next(error);
    }
    
};


export const signin = async (req, res, next) => {
    const {email, password} = req.body;

    if(!email || !password || email === '' || password === ''){
        next(errorHandler(400, 'All fields are required'));
    }

    try {
    
        const validUser = await User.findOne({email: email});

        if(!validUser){
            return next(errorHandler(404, 'User not found.'));
        }else{
            const validPassword = bcryptjs.compareSync(password, validUser.password);

            if(!validPassword){
                return next(errorHandler(405, 'Wrong Credentials'))
            }
        }

        {/** Creating the jwt token for auth,
            _id is the id set by MongoDB automatically
            process.env.JWT_SECRET is our secret key
            */}

        const token = jwt.sign({ id:validUser._id }, process.env.JWT_SECRET);
            //To prevent leak of the password when the function returns the user info: separate the password from the rest of the user info
        const { password:pass, ...rest } = validUser._doc;

        //res.cookie('access_token', token, {httpOnly:true, expires: new Date(Date.now() + 24 * 60 * 60)});
        res.cookie('access_token', token, { httpOnly:true })
            .status(200).json(rest);
        
        
    } catch (error) {
        next(error);
    }
}