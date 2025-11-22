import React, { useState, useEffect } from 'react';
import ProfileCard from './uicomponents/profileCard';
import NotificationCard from './uicomponents/NotificationsCard';
import SettingsCard from './uicomponents/settingsCard';
import { session } from "../utils/globalutils";

function Navbar({ hasSidebar = true }) {
  const [showProfile, setShowProfile] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchNotifications() {
      try {
        const sess = await session();
        if (!sess.departmentId) return;

        const response = await fetch("/getNotifications");
        const data = await response.json();

        if (data.success) {
          const formatted = data.notifications.map(n => ({
            notificationID: n.notificationID,
            title: n.notificationTitle,
            message: n.notificationMessage,
            read: n.read || false,
          }));
          setNotifications(formatted);
        } else {
          setNotifications([]);
        }
      } catch (err) {
        console.error("Failed to fetch notifications:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchNotifications();
  }, []);

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <>
      <div
        className={`bg-white sticky top-0 z-50 border-b shadow-sm px-4 sm:px-6 py-3 flex justify-between items-center
        ${hasSidebar ? "md:ml-64" : "ml-0 w-full"}`}
      >
        <div className="text-xl font-semibold text-gray-800"></div>

        <div className="flex items-center space-x-3">

          <div className="relative">
            <button
              className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 transition"
              onClick={() => {
                setShowNotifications(false);
                setShowSettings(false);
                setShowProfile(!showProfile);
              }}
            >
              <i className="bx bx-user text-gray-700"></i>
            </button>
          </div>

          <div className="relative">
            <button
              className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 transition relative"
              onClick={() => {
                setShowProfile(false);
                setShowSettings(false);
                setShowNotifications(!showNotifications);
              }}
            >
              <i className="bx bx-bell text-gray-700"></i>
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse"></span>
              )}
            </button>
          </div>

          <div className="relative">
            <button
              className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 transition"
              onClick={() => {
                setShowProfile(false);
                setShowNotifications(false);
                setShowSettings(!showSettings);
              }}
            >
              <i className="bx bx-cog text-gray-700"></i>
            </button>
          </div>
        </div>
      </div>

      {showProfile && <ProfileCard onClose={() => setShowProfile(false)} />}
      {showNotifications && <NotificationCard onClose={() => setShowNotifications(false)} />}
      {showSettings && <SettingsCard onClose={() => setShowSettings(false)} />}
    </>
  );
}

export default Navbar;
