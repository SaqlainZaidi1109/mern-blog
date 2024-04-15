import React from 'react'
import { Navbar, TextInput, Button, Label } from "flowbite-react";
import { Link } from 'react-router-dom'

export default function SignUp() {
  return (
    <div className='min-h-screen mt-20'>
      <div className='flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5'>
      {/* left side */}
      <div className="flex-1"> {/* /flex-1 for equally distributing both sides */}
         <Link className='font-bold dark:text-white text-4xl'>
         {/* <img src="https://static.vecteezy.com/system/resources/previews/013/643/516/large_2x/colorfull-letter-z-in-3d-style-text-effect-free-png.png" class="h-8" alt="Flowbite Logo" /> */}
            <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white' >Zendrix</span>Blogs
        </Link>
        <p className='text-sm mt-5'>This is a demo project. You can sign up with your email and password or with Google</p>
      </div>
      {/* right side */}
      <div className="flex-1">
        <form className='flex flex-col gap-4'>
          <div>
            <Label value='Your username'/>
            <TextInput placeholder='Username' type='text' id='username'/>
          </div>
          <div>
            <Label value='Your email'/>
            <TextInput placeholder='name@cmompany.com' type='text' id='email'/>
          </div>
          <div>
            <Label value='Your password'/>
            <TextInput placeholder='Password' type='text' id='password'/>
          </div>
           <Button gradientDuoTone='purpleToPink' type='submit'>Sign Up</Button>
        </form>
        <div className='flex gap-2 text-sm mt-5'><span>Have an account?</span>
        <Link to='/sign-in' className='text-blue-500'>Sign In</Link>
        </div>
      </div>
      </div>
    </div>
  )
}
