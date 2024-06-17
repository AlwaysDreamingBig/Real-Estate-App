import React from 'react'
import UserProfile from '../components/UserProfile'

export default function Profile() {
  return (
    <main className='flex'>
      <section className='flex-1'>
        <UserProfile />
      </section>
    </main>
  )
}
