import React from 'react';
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center p-4">
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full text-center">
        <div className="text-red-500 mb-4">
          <i className='bx bx-error-circle text-8xl'></i>
        </div>
        
        <h1 className="text-3xl font-bold text-gray-800 mb-2">ERROR: <span className='text-red-500'>404</span></h1>
        <p className="text-gray-600 mb-6">Page Not Found</p>
        
        <p className="text-gray-700 mb-8">
           The page you're looking for was not found.
        </p>

       <Link 
          to="/" 
          className="inline-flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-6 rounded-lg transition-colors"
        >
          <i className='bx bx-arrow-back'></i>
          Return to Home
        </Link>
      </div>
    </div>
  );
}

export default NotFound