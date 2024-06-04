import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs';

export const signup = async (req, res) => {
    console.log(req.body);

    const {username, email, password} = req.body;

    if(!username || !email || !password || username ==='' || email === '' || password === ''){
        return res.status(400).json({ message: 'All fields are required'});
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
        res.json('SignUp succesful');
    }catch(err){
        res.status(500).json({ message: err.message} );
    }
    
}