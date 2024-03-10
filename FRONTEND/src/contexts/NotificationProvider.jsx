import React, { createContext, useState } from "react";

export const NotificationContext = createContext();

export default function NotificationProvider({ children }) {
  const [notification, setNotification] = useState("");
  const [notificationClass, setNotificationClass] = useState("");

  const updateNotification = (type, value) => {
    switch (type) {
      case "error":
        setNotificationClass("bg-red-500");
        break;
      case "success":
        setNotificationClass("bg-green");
        break;
      case "warning":
        setNotificationClass("bg-orange-400");
        break;
      default:
        setNotificationClass("bg-red-500");
    }
    setNotification(value);
    setTimeout(() => {
      setNotificationClass("hidden");
    }, 3000);
  };

  //IMP: value = {should be an object}, even passing a single function or state, pass them as an object
  return (
    <NotificationContext.Provider value={{ updateNotification }}>
      {children}
      <div className="absolute top-5 w-full flex justify-center z-[-3]">
        <div className={`p-4 ${notificationClass} rounded-xl popup z-50`}>
          <p>{notification}</p>
        </div>
      </div>
    </NotificationContext.Provider>
  );
}
