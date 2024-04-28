import User from '../models/user.model.js'
import bcryptjs from 'bcryptjs'
import { errorhandler } from '../utils/error.js';
import jwt from 'jsonwebtoken';

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

   s
    try {
        await newUser.save();
        res.json("Signup successful")
         
    } catch (error) {
            next(error)        
    }
}

// Sign in
export const signin = async(req, res, next)=>{
    const {email,password} = req.body;

    if(!email || !email || !password || email =='' || email=='' || password==''){
        // return res.status(400).json({message:"All fields are required"})
        next(errorhandler(400, 'All fields are required!'))
    }

    try {
        //checking the email of the user
        //findOne method is gonna search for us
        //The findOne() function is used to find one document according to the condition. Its a mongoose function
        const validUser=await User.findOne({email})
        if(!validUser){
           return next(errorhandler(404,'User not found'))
           //we need to add return here so it doesnt go to the next line
        }

        //for comparing password
        const validPassword = bcryptjs.compareSync(password, validUser.password)
        if(!validPassword){
           return next(errorhandler(400,'Invalid Password'))
           //we need to add return here so it doesnt go to the next line
        }

        //if everything is correct both emails and password, then we need to authenticate the users
        //we are gonna do that by using a package called 'npm i jsonwebtoken'
        //create a token and use a mthod from jwt called sign
        const token = jwt.sign(
             //whatever we add this is going to be encrypted and will create a token for us, its like hashing a password, so this encrypted value
             //cannot be read normally and we are gonna save this encrypted values to the cookie browser, and we can use it later to authenticate the user later on
            {id:validUser._id}, process.env.JWT_SECRET
            //we need to add a secret key, it is a unique key that is only for you, so this token will be created and encrypted based on that secret key
            //and that is unique for yourselve, so you shouldnt share it with others, otherwise they can hijack your users cookies
            //so the user of this website will going to haev a cookie encrypted uniquely by this secert key and secret key can be any letters or numbers,
            //so have to remember it & save it in the server of your website.
            //so we are going to add it in environmental variable, env, because we have to keep it a secret.

            //this seesion is going to be expired whtn the user closes browser, you can add session expiration timer aswell but we are not adding right now
        );
        //to hide the hash password aswell in insomnia :
        const {password: pass, ...rest}=validUser._doc;
        //now we have created a token, but we have to add it in the cookie by adding a response
        // res.status(200).cookie('access_token', token, {httpOnly: true}).json(validUser); //this will show hashed password
        res.status(200).cookie('access_token', token, {httpOnly: true}).json(rest); // this will hide hashed password
        //status code of 200 is an OK response.
        //we need to send the cookie and token which can be named, like access_token
        //for cookie we need to add httpOnly: true, which will make our cookie secure
        //we are gonna add .json(), b/c we are gonna send back the user, b/c we need this information later to add it to our redux toolkit rtk, and make it a global state


    } catch (error) {
        next(error)
    }
}