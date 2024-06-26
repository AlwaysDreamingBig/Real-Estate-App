import React from 'react'
import UserProfile from '../components/UserProfile'
import { Link } from 'react-router-dom'

export default function Profile() {
  return (
    <main className='flex flex-row'>
      <section className='flex-1'>
        <UserProfile />
      </section>

      <section className='flex-1 mt-4'>
        <Link 
          to={'/create-listing'}
            className='bg-blue-300 text-white px-6 py-3 rounded-lg uppercase text-center hover:opacity-60'>
              Create Listing
        </Link>
      </section>
    </main>
  )
}
