import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs';
import { errorHandler } from "../utils/error.js";
import { verifyPassword } from "../utils/utility.js";

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