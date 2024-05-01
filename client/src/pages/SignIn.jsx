import React, { useState } from 'react'
import { Navbar, TextInput, Button, Label, Alert, Spinner } from "flowbite-react";
import { Link, useNavigate } from 'react-router-dom'
import { signInSuccess, signInStart, signInFailure } from '../redux/user/userSlice';
import {useDispatch, useSelector} from 'react-redux'

export default function SignIn() {
  const [formData, setFormData] = useState({})

  const {loading, error: erroMessage}= useSelector(state=>state.user)
  //we are using useSelector to get our error message from our global state, user, the name 'user' is in userSlice.js.
  const dispatch = useDispatch();
  const navigate=useNavigate()

  const handleChange =(event)=>{
    // console.log(event.target.value)  //to check whether its working
    setFormData({...formData, [event.target.id] : event.target.value.trim()})
    //.trim() to remove the whitespaces
  //Imagine you have a form with fields for username, email, and password.
  //Each time someone types something into one of these fields, you want to update the form state to remember what they've typed.
  //So, whenever someone types in any field, like username or email, handleInputChange is called. It updates the form state using setFormData. 
  //The ...formData part ensures that whatever was previously typed remains there, while [event.target.id]: event.target.value updates only the
  //field that was changed. This way, you're always keeping the old data and adding the new data.
  //[event.target.id] this is to track the changes.
  //event.target.value is for the value itself.
  //check the notes folder for visual info, Note1
};  
//console.log(formData) //to check whether handleChange is working

//as we are going to submit it to database and it takes time so we need to use await
const handleSubmit = async (e)=>{
  //when form is submit it refreshes the page, to prevent that we use:
  e.preventDefault();
  if(!formData.password || !formData.email){
    return dispatch(signInFailure('Please fill all the fields.'))
  }
  //now we need to submit form, so use try and catch statement to deal with possible error
  try {
   dispatch(signInStart());
    //we are gonna use fetch method to fetch data since we have already craeted an url
    const res = await fetch('api/auth/signin',{ 
      method:"POST", //like we created post method for the url localhost/api/auth/signup in insomnia
      headers:{'Content-type':'application/json'}, //We write this to specify that the content being sent or received is in JSON format.  
      body:JSON.stringify(formData) //we cannot send JSON completely, we need to convert it into string & then send it.
      
      //we have backend at localhost:3000 and frontend in localhost:5173, so we need to create proxy in config
    });
    //when we get this response we have to convert it into data and then json:
    const data=await res.json();
    if(data.success ===false){
      dispatch(signInFailure(data.message))
    } 
    
    if(res.ok){
      dispatch(signInSuccess(data)) //payload = data
      navigate('/')
    }
  } catch (error) {
    dispatch(signInFailure(error.message))
  }
}

  return (
    <div className='min-h-screen mt-20'>
      <div className='flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5'>
      {/* left side */}
      <div className="flex-1"> {/* /flex-1 for equally distributing both sides */}
         <Link className='font-bold dark:text-white text-4xl'>
         {/* <img src="https://static.vecteezy.com/system/resources/previews/013/643/516/large_2x/colorfull-letter-z-in-3d-style-text-effect-free-png.png" class="h-8" alt="Flowbite Logo" /> */}
            <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white' >Zendrix</span>Blogs
        </Link>
        <p className='text-sm mt-5'>This is a portfolio project. You can sign in with your email and password.</p>
      </div>
      {/* right side */}
      <div className="flex-1">
        <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
         
          <div>
            <Label value='Your email'/>
            <TextInput placeholder='name@company.com' type='email' id='email' onChange={handleChange}/>
          </div>
          <div>
            <Label value='Your password'/>
            <TextInput placeholder='********' type='password' id='password' onChange={handleChange}/>
          </div>
           <Button gradientDuoTone='purpleToPink' type='submit' disabled={loading}>
            {
              loading ? (
                <>
                <Spinner className='sm'/>
                <span className='pl-3'>Loading</span>
                </>
              ) : 'Sign In'
            }
            </Button>
        </form>
        <div className='flex gap-2 text-sm mt-5'><span>Don't have an account?</span>
        <Link to='/sign-up' className='text-blue-500'>Sign Up</Link>
        </div>
        {
          erroMessage && (
            <Alert className='mt-5' color='failure'>
                {erroMessage}
            </Alert>
          )
        }
      </div>
      </div>
    </div>
  )
}


//Before redux tk
// import React, { useState } from 'react'
// import { Navbar, TextInput, Button, Label, Alert, Spinner } from "flowbite-react";
// import { Link, useNavigate } from 'react-router-dom'

// export default function SignIn() {
//   const [formData, setFormData] = useState({})

//   //we need to add another piece of state for loading effect and error
//   const [erroMessage, setErrorMessage]=useState(null)
//   const [loading, setLoading]=useState(false)
//   const navigate=useNavigate()

//   const handleChange =(event)=>{
//     // console.log(event.target.value)  //to check whether its working
//     setFormData({...formData, [event.target.id] : event.target.value.trim()})
//     //.trim() to remove the whitespaces
//   //Imagine you have a form with fields for username, email, and password.
//   //Each time someone types something into one of these fields, you want to update the form state to remember what they've typed.
//   //So, whenever someone types in any field, like username or email, handleInputChange is called. It updates the form state using setFormData. 
//   //The ...formData part ensures that whatever was previously typed remains there, while [event.target.id]: event.target.value updates only the
//   //field that was changed. This way, you're always keeping the old data and adding the new data.
//   //[event.target.id] this is to track the changes.
//   //event.target.value is for the value itself.
//   //check the notes folder for visual info, Note1
// };  
// //console.log(formData) //to check whether handleChange is working

// //as we are going to submit it to database and it takes time so we need to use await
// const handleSubmit = async (e)=>{
//   //when form is submit it refreshes the page, to prevent that we use:
//   e.preventDefault();
//   if(!formData.password || !formData.email){
//     return setErrorMessage('Please fill out all the fields.')
//   }
//   //now we need to submit form, so use try and catch statement to deal with possible error
//   try {
//     setLoading(true)
//     setErrorMessage(null) //if there are any previous error
//     //we are gonna use fetch method to fetch data since we have already craeted an url
//     const res = await fetch('api/auth/signin',{ 
//       method:"POST", //like we created post method for the url localhost/api/auth/signup in insomnia
//       headers:{'Content-type':'application/json'}, //We write this to specify that the content being sent or received is in JSON format.  
//       body:JSON.stringify(formData) //we cannot send JSON completely, we need to convert it into string & then send it.
      
//       //we have backend at localhost:3000 and frontend in localhost:5173, so we need to create proxy in config
//     });
//     //when we get this response we have to convert it into data and then json:
//     const data=await res.json();
//     if(data.success ===false){
//       return setErrorMessage(data.message)
//     }
//     setLoading(false)
//     if(res.ok){
//       navigate('/')
//     }
//   } catch (error) {
//     setErrorMessage(error.message) //this is for the client side for e.g theres no internet
//     setLoading(false)
//   }
// }

//   return (
//     <div className='min-h-screen mt-20'>
//       <div className='flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5'>
//       {/* left side */}
//       <div className="flex-1"> {/* /flex-1 for equally distributing both sides */}
//          <Link className='font-bold dark:text-white text-4xl'>
//          {/* <img src="https://static.vecteezy.com/system/resources/previews/013/643/516/large_2x/colorfull-letter-z-in-3d-style-text-effect-free-png.png" class="h-8" alt="Flowbite Logo" /> */}
//             <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white' >Zendrix</span>Blogs
//         </Link>
//         <p className='text-sm mt-5'>This is a portfolio project. You can sign in with your email and password.</p>
//       </div>
//       {/* right side */}
//       <div className="flex-1">
//         <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
         
//           <div>
//             <Label value='Your email'/>
//             <TextInput placeholder='name@company.com' type='email' id='email' onChange={handleChange}/>
//           </div>
//           <div>
//             <Label value='Your password'/>
//             <TextInput placeholder='********' type='password' id='password' onChange={handleChange}/>
//           </div>
//            <Button gradientDuoTone='purpleToPink' type='submit' disabled={loading}>
//             {
//               loading ? (
//                 <>
//                 <Spinner className='sm'/>
//                 <span className='pl-3'>Loading</span>
//                 </>
//               ) : 'Sign In'
//             }
//             </Button>
//         </form>
//         <div className='flex gap-2 text-sm mt-5'><span>Don't have an account?</span>
//         <Link to='/sign-up' className='text-blue-500'>Sign Up</Link>
//         </div>
//         {
//           erroMessage && (
//             <Alert className='mt-5' color='failure'>
//                 {erroMessage}
//             </Alert>
//           )
//         }
//       </div>
//       </div>
//     </div>
//   )
// }
