import React, { useState, useEffect } from "react";
import { session, locator } from "../../utils/globalutils";
import { BiLogOut } from 'react-icons/bi';
import UserDetailsCard from "./userDetailsCard";
import ChangePasswordCard from "./ChangePasswordCard";

const ProfileCard = ({ onClose}) => {
  const [user, setUser] = useState(null);
  const [showUserDetails, setShowUserDetails] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);
  
  useEffect(() => {
    async function fetchUser() {
      const sess = await session();
      console.log("Session came with", sess);
      setUser(sess);
    }
    fetchUser();
  }, []);

  if (!user) {
    return (
      <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex justify-end z-50">
        <div className="bg-white shadow-xl rounded-2xl w-96 p-6 m-4 flex items-center justify-center">
          <div className="loader border-4 border-gray-300 border-t-blue-600 rounded-full w-8 h-8 animate-spin"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex justify-end z-50">
      <div className="bg-white shadow-xl rounded-2xl w-96 p-6 m-4 relative">

        <div className="flex justify-between items-center mb-4">
          <h2 className="font-semibold text-lg text-gray-800">Profile</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <i className="bx bx-x text-2xl"></i>
          </button>
        </div>

        <div className="flex items-center gap-4 pb-6 border-b">
          <div className="bg-green-100 text-green-600 rounded-full p-3">
            <i className="bx bx-user text-3xl"></i>
          </div>
          <div>
            <h3 className="font-medium text-gray-900 capitalize">{user.username}</h3>
            <p className="text-sm text-gray-500">{user.email}</p>
            <span className="text-xs bg-green-500 text-white px-3 py-1 rounded-full mt-1 inline-block">
              {user.departmentName}
            </span>
          </div>
        </div>

        <div className="mt-4 space-y-4">
          <button className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition"
            onClick={()=> setShowUserDetails(true)}
          >
            <i className="bx bx-user"></i> View Profile
          </button>

          {showUserDetails && (
                  <UserDetailsCard onClose={() => setShowUserDetails(false)} />
          )}

           <button
              className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition"
              onClick={() => setShowChangePassword(true)}
            >
              <i class='bxr  bx-lock-keyhole-open text-2xl' ></i>  Change Password
            </button>

             {showChangePassword && (
              <ChangePasswordCard
                onClose={() => setShowChangePassword(false)}
              />
      )}
        </div>

        <button
          className="mt-6 flex items-center gap-2 text-red-500 hover:text-red-600 font-medium transition"
          onClick={locator.logout}
        >
          <i class="bx bx-log-out"></i>
          <BiLogOut size={30}/>Logout
        </button>
      </div>
    </div>
  );
};

export default ProfileCard;
