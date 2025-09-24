import React from "react";

function Home() {
  const year = new Date().getFullYear();

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <div className="relative flex flex-col items-center justify-center h-[83vh] 
        bg-[url('https://images.unsplash.com/photo-1653669485217-74da3d8e71c6?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] 
        bg-[94%] bg-center bg-no-repeat">

        <div className="absolute inset-0 bg-gradient-to-r from-green-600/20 to-blue-600/30"></div>

        <div className="relative z-10 text-center text-white px-6">
          <h2 className="text-4xl font-bold mb-4 drop-shadow-sm">
            Welcome to Project Reporting System (PRS)
          </h2>
          <p className="text-gray-100 mb-6 text-lg">
            Clarity and Control for Every Project
          </p>
          <a
            href="/login"
            className="flex items-center gap-2 bg-white text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-100 transition duration-300 font-medium shadow-sm"
          >
            <i className="bx bx-log-in text-xl text-gray-600"></i>
            Go to Login
          </a>
        </div>
      </div>

      <footer className="bg-white text-center py-4 text-sm text-gray-500 mt-auto shadow-inner">
        <p>
          © {year} Project Reporting System. Developed by{" "}
          <span className="font-medium text-gray-700">Phoenix System</span>. All
          rights reserved.
        </p>
      </footer>
    </div>
  );
}

export default Home;
