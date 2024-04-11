import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config(); //to connect .env file to database, learn more in .env file

mongoose.connect(process.env.MONGOCSTRING) //since we dont have connection string here, people dont get to see it on github and anywhere else etc. COnnection string is in env
.then(()=>{
    console.log("MongoDB is connected")
})
.catch((err)=>{console.log(err)})

const app = express();

app.listen(3000, ()=>{
    console.log("Server is running on port 3000!")
})