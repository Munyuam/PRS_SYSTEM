import React, { useState } from "react";
import NotificationDetailsCard from "./NotDetailsCard";

const NotificationCard = ({ notifications = [], onClose }) => {
  const [selectedNotification, setSelectedNotification] = useState(null);

  return (
    <>
      <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex justify-end z-50">
        <div className="bg-white w-80 sm:w-96 h-auto my-6 mr-6 rounded-2xl shadow-xl overflow-hidden">

          <div className="flex justify-between items-center px-5 py-4 border-b">
            <h2 className="font-semibold text-lg">Notifications</h2>
            <button onClick={onClose}>
              <i className="bx bx-x text-2xl text-gray-600 hover:text-gray-900"></i>
            </button>
          </div>

          <div className="max-h-96 overflow-y-auto">
            {notifications.length === 0 && (
              <p className="p-5 text-sm text-gray-500 text-center">
                No new notifications
              </p>
            )}

            {notifications.map((note, i) => (
              <div
                key={i}
                className="px-5 py-4 border-b hover:bg-gray-50 transition cursor-pointer"
                onClick={() => setSelectedNotification(note)}
              >
                <div className="flex items-start gap-3">
                  <i className={`bx ${note.icon || "bx-bell"} text-xl text-blue-600`}></i>

                  <div className="flex-1">
                    <p className="text-sm font-medium">{note.title}</p>
                    <p className="text-xs text-gray-500 mt-1">{note.message}</p>
                    <p className="text-[10px] text-gray-400 mt-1">{note.time}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {selectedNotification && (
        <NotificationDetailsCard
          notification={selectedNotification}
          onClose={() => setSelectedNotification(null)}
        />
      )}
    </>
  );
};

export default NotificationCard;
