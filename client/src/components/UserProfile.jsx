import React from 'react'
import { useSelector } from 'react-redux'

export default function UserProfile() {
    const {currentUser} = useSelector((state) => state.user)
  return (
    <div className='p-3 max-w-lg mx-auto'>
        <h1 className='text-3xl font-bold text-center my-7'> User Profile</h1>

        <form className='flex flex-col gap-4'>
            <img 
                src={currentUser.avatar} 
                alt="profile picture" 
                className='rounded-full h-28 w-28 object-center cursor-pointer self-center mt-2s'/>

            <input 
                type="text" 
                placeholder='username'
                id='username'
                className='border p-3 rounded-lg'/>
            
            <input 
                type="text" 
                placeholder='email'
                id='email'
                className='border p-3 rounded-lg'/>
            
            <input 
                type="text" 
                placeholder='password'
                id='password'
                className='border p-3 rounded-lg'/>
                
            <button className='bg-slate-700 text-white rounded-lg p-3 hover:opacity-75 disabled:opacity-60'>
                Update
            </button>
        </form>

        <div className='flex justify-between mt-5'>
            <span className='text-red-600 cursor-pointer font-semibold'>Delete Account</span>
            <span className='text-blue-950 cursor-pointer font-semibold'>Sign Out</span>
        </div>
    </div>
  )
}
