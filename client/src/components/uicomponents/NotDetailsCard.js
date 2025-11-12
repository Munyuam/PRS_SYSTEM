import React from "react";

const NotificationDetailsCard = ({ notification, onClose }) => {
  if (!notification) return null;

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex justify-center items-start pt-20 z-50">
      <div className="bg-white shadow-xl rounded-2xl w-96 p-6 relative">

        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-semibold text-lg text-gray-800">Notification Details</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <i className="bx bx-x text-2xl"></i>
          </button>
        </div>

        {/* Notification Content */}
        <div className="space-y-4">
          <p className="text-sm text-gray-700">
            <span className="font-semibold">Title: </span>
            {notification.title}
          </p>

          <p className="text-sm text-gray-700">
            <span className="font-semibold">Message: </span>
            {notification.message}
          </p>

          {notification.time && (
            <p className="text-xs text-gray-400">
              <span className="font-semibold">Time: </span>
              {notification.time}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default NotificationDetailsCard;
