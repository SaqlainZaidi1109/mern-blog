//Craeting a functoin to handle the errors

//when we dont have an error in a system but we want to dispaly an error for example "All fields are required", so in these kind of situation you can
//use these function

export const errorhandler = (statusCode, message)=>{
    const error = new Error();
    error.statusCode = statusCode;
    error.message = message;
    return error;
};
