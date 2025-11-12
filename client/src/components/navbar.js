import React, { useState } from 'react';
import ProfileCard from './uicomponents/profileCard';
import NotificationCard from './uicomponents/NotificationsCard';
import SettingsCard from './uicomponents/settingsCard';

function Navbar({ hasSidebar = true }) {
  const [showProfile, setShowProfile] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  const notifications = [
    { title: "New Project Assigned", message: "A new job card has been added", time: "1h ago", icon: "bx-briefcase" },
    { title: "Update Required", message: "Please update task status", time: "3h ago", icon: "bx-task" }
  ];

  return (
    <>
      <div 
        className={`bg-white sticky top-0 z-50 border-b px-4 sm:px-8 py-4 transition-all
        ${hasSidebar ? "ml-64" : "ml-0 w-full"}`}
      >
        <div className="flex justify-end items-center space-x-2 sm:space-x-4">
          <button
            className="text-gray-600 hover:text-gray-900 hover:bg-gray-100 p-2 rounded-lg transition-colors"
            onClick={() => {
              setShowNotifications(false);
              setShowSettings(false);
              setShowProfile(!showProfile);
            }}
          >
            <i className="bx bx-user bx-sm"></i>
          </button>

          <button
            className="text-gray-600 hover:text-gray-900 hover:bg-gray-100 p-2 rounded-lg transition-colors relative"
            onClick={() => {
              setShowProfile(false);
              setShowSettings(false);
              setShowNotifications(!showNotifications);
            }}
          >
            <i className="bx bx-bell bx-sm"></i>
            <span className="absolute top-1 right-1 bg-red-500 w-2 h-2 rounded-full"></span>
          </button>

          <button
            className="text-gray-600 hover:text-gray-900 hover:bg-gray-100 p-2 rounded-lg transition-colors"
            onClick={() => {
              setShowProfile(false);
              setShowNotifications(false);
              setShowSettings(!showSettings);
            }}
          >
            <i className="bx bx-cog bx-sm"></i>
          </button>
        </div>
      </div>

      {showProfile && <ProfileCard onClose={() => setShowProfile(false)} />}
      {showNotifications && <NotificationCard notifications={notifications} onClose={() => setShowNotifications(false)} />}
      {showSettings && <SettingsCard onClose={() => setShowSettings(false)} />}
    </>
  );
}

export default Navbar;
