import React from 'react'
import { Link } from 'react-router-dom';

{/*
*my- is to add space on the top and bottom
*p- is the padding
*max-w-lg ensure that in bigger screen it is not bigger than large (the widgth of the division)
*mx-auto to put all in the center
mt- margin at the top
*
*/}
export default function SignUp() {
  return (
    <div className='p-3 max-w-lg mx-auto '>

        {/** Title of the Form */}

      <div className='flex flex-col my-8'>
        <h1 className='text-4xl text-center font-bold my-3'>
          Sign Up
        </h1>

        <h1 className='text-sm text-center'>
          Please enter your details to create an account!
        </h1>
      </div>
      
          {/** Inputs of the Form */}

      <form className='flex flex-col gap-6'>
        <input 
          type="text" 
          placeholder='Username*'
          className='border p-3 rounded-lg' id='username'/>

          <input 
          type="text" 
          placeholder='Email*'
          className='border p-3 rounded-lg' id='username'/>

          <input 
          type="text" 
          placeholder='Passeword*'
          className='border p-3 rounded-lg' id='username'/>

          <button className='bg-slate-800 text-white p-3 rounded-lg uppercase hover:opacity-90 disabled:opacity-65'>
              Sign Up
          </button>
      </form>


          {/** Link  */}
      <div className='flex gap-2 mt-3 font-bold'>
        <p> Have an account ?</p>

        <Link to = {"/sign-in"}>
          <span className='text-blue-700'> Sign in here.</span>
        </Link>
      </div>

    </div>
  )
}
