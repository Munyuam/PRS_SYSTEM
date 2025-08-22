import React, { useState } from 'react';
import axios from 'axios'

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  function formHandler(event){
    event.preventDefault()

    axios.post('localhost:',{email,password})
         .then((result) => {setError(false); console.log("login success")})
         .catch((error) => {setError(true);  console.log("login success")})
  }

  return (
    <div className='flex justify-center items-center bg-[#edf0f5] min-h-screen p-4'>
      <div className='flex flex-col md:flex-row gap-6 bg-white w-full max-w-4xl rounded-3xl shadow-lg shadow-gray-400 md:w-[57%] md:p-12 p-6]'>
        
        <div className='md:w-1/2 flex flex-col items-center md:items-start md:justify-center md:mt-0 mt-4 md:p-12 p-4'>
          <div className='w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-green-500 to-blue-600 rounded-2xl flex items-center justify-center mb-4'>
            <span className='text-white font-bold text-xl md:text-2xl'>R</span>
          </div>
          <h2 className='text-xl md:text-2xl font-bold text-gray-800 mb-2 text-center md:text-left'>PROJECT REPORT</h2>
          <p className='text-gray-600 text-center md:text-left'>Management System</p>
        </div>

        <div className='md:w-1/2 flex flex-col justify-center md:p-12 p-4  md:-m-9'>
          <h2 className="text-2xl md:text-3xl mb-6 font-bold text-left">Login</h2>
          <form className="flex flex-col gap-5" onSubmit={formHandler}>
            <div className="relative">
              <i className="bx bxs-user absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg"></i>
              <input 
                type="text" 
                name='username'
                placeholder="Username" 
                className="w-full pl-12 pr-4 py-4 bg-gray-50 border-0 rounded-2xl text-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg  md:text-base" 
                onChange={e => setEmail(e.target.value)}
              />
            </div>
            
            <div className="relative">
          
              <i className="bx bxs-lock absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg"></i>
              <input 
                type="password" 
                name='password'
                placeholder="Password ***" 
                className="w-full pl-12 pr-12 py-4 bg-gray-50 border-0 rounded-2xl text-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg  md:text-base" 

                onChange={e => setPassword(e.target.value)}
              />
              <button 
                type="submit" 
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white rounded-full w-10 h-10 flex items-center justify-center transition-all duration-200"
              >
                <i class="bxr bx-arrow-right-stroke text-white text-xl" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;