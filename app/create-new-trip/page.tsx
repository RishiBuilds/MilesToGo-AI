'use client'
import React from 'react'
import ChatBox from './_components/ChatBox'

function CreateNewTrip() {
  return (
    <div className='px-4 py-6 sm:px-6 md:px-10 lg:px-20 xl:px-32 2xl:px-48'>
      <h2 className='font-bold text-2xl sm:text-3xl lg:text-4xl mb-6'>Create New Trip</h2>
      <div className='w-full'>
        <ChatBox />
      </div>
    </div>
  )
}

export default CreateNewTrip