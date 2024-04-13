import User from '../models/user.model.js'
import bcryptjs from 'bcryptjs'
import { errorhandler } from '../utils/error.js';

//next for using middleware
export const signup = async (req, res, next) =>{
    // console.log(req.body)
    const {username, email, password} = req.body;

    if(!username || !email || !password || username =='' || email=='' || password==''){
        // return res.status(400).json({message:"All fields are required"})
        next(errorhandler(400, 'All fields are required!'))
    }

    const hashedPassword = bcryptjs.hashSync(password,10)

    const newUser = new User({
        username,
        email,
        password: hashedPassword
    })

   
    try {
        await newUser.save();
        res.json("Signup successful")
         
    } catch (error) {
            next(error)        
    }
}