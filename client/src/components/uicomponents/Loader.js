import React from 'react'
import spinner from '../../assets/spinner.gif'

function Loader() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen min-w-full bg-white/70">
      <img 
        src={spinner} 
        alt="Loading..." 
        className="w-16 h-16 mb-4"
      />
      <p className="text-gray-600 text-lg font-medium animate-pulse">
        Getting resources...
      </p>
    </div>
  )
}

export default Loader
