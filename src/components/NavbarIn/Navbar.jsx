import { useState } from "react";
import { useNotifications } from "../../context/NotificationContext";
import { markNotificationsRead } from "../../services/profile";

export default function Navbar() {
  const [showNotifications, setShowNotifications] = useState(false);
  const { notifications, unreadCount, setUnreadCount, fetchNotifications } =
    useNotifications();

  const handleOpen = async () => {
    setShowNotifications(!showNotifications);
    if (!showNotifications && unreadCount > 0) {
      await markNotificationsRead();
      setUnreadCount(0);
    }
  };

  return (
    <div className="navbar">
      <h3>Sidi Bou Solve</h3>
      <div className="nav-buttons">
        <div className="notifications-container">
          <button className="notification-btn" onClick={handleOpen}>
            <span style={{ fontSize: "20px", color: "#195383" }}>🔔</span>
            {unreadCount > 0 && (
              <span className="notification-badge">{unreadCount}</span>
            )}
          </button>
          {showNotifications && (
            <div className="notifications-dropdown">
              <div className="notifications-header">
                <h4>Notifications</h4>
              </div>
              <ul className="notifications-list">
                {notifications.length === 0 ? (
                  <li
                    style={{
                      padding: "16px 20px",
                      color: "#7a7a9a",
                      fontSize: "13px",
                    }}
                  >
                    Aucune notification
                  </li>
                ) : (
                  notifications.map((notif) => (
                    <li
                      key={notif.id}
                      className="notification-item"
                      style={{
                        background: notif.lu
                          ? "transparent"
                          : "rgba(25,83,131,0.05)",
                      }}
                    >
                      <p className="notification-message">{notif.message}</p>
                      <span className="notification-time">{notif.time}</span>
                    </li>
                  ))
                )}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
