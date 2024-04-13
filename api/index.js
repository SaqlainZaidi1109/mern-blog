import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from "./routes/user.routes.js"
import authRoutes from "./routes/auth.route.js  "

dotenv.config(); //to connect .env file to database, learn more in .env file

mongoose.connect(process.env.MONGOCSTRING) //since we dont have connection string here, people dont get to see it on github and anywhere else etc. COnnection string is in env
.then(()=>{
    console.log("MongoDB is connected")
})
.catch((err)=>{console.log(err)})

const app = express();
app.use(express.json()); //this will allow json to input in backend

app.listen(3000, ()=>{
    console.log("Server is running on port 3000!")
})

//creating a test API route
// app.get('/test',(req,res)=>{
//     res.json({message:'API is working'})
// })

//OR
app.use('/api/user', userRoutes ) //here you will use app.use because you are using get request in user.routes.js, http://localhost:3000/api/user/test
app.use('/api/auth', authRoutes)

//adding a middleware function for handling errors // error, request, response, and next
//when you gonna go to next middleware then we will use next
app.use((err, req, res, next)=>{
    const statusCode = err.statusCode || 500
    const message = err.message || "Internal server error"
    res.status(statusCode).json({
        success: false,
        statusCode,
        message
    })
})