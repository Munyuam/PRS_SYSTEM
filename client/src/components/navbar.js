import React from 'react'

function Navbar() {
  return (
    <div className='bg-white shadow-sm border-b px-8 py-4'>
      <div className='flex justify-end items-center space-x-4'>
        <button className='text-gray-600 hover:text-gray-900 hover:bg-gray-100 p-2 rounded-lg transition-colors'
            title='profile'>
            <i class='bxr  bx-user bx-sm'></i> 
        </button>
        <button className='text-gray-600 hover:text-gray-900 hover:bg-gray-100 p-2 rounded-lg transition-colors'
          title='Notification'  >
            <i class='bxr  bx-bell bx-sm'></i> 
        </button>
        <button className='text-gray-600 hover:text-gray-900 hover:bg-gray-100 p-2 rounded-lg transition-colors'
          title='Settings'>
            <i class='bxr  bx-cog bx-sm'  ></i> 
        </button>
      </div>
    </div>
  )
}

export default Navbar
