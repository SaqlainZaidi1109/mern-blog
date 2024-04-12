import mongoose from "mongoose";

//schema is like rules and condition
const userSchema = new mongoose.Schema({
        username:{
            type: String,
            required: true,
            unique: true
        },
        email:{
            type: String,
            required: true,
            unique: true
        },
        password:{
            type: String,
            required: true,
        }

},{timestamps: true}
)

//creating a model down below 
// ('User') U should be capital and there should be no s like Users, because mongodb will add s for us
const User = mongoose.model('User', userSchema)

export default User;