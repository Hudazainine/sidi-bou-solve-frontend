import { useState } from "react";
import { useUser } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";

export default function Sidebar() {
  const { user } = useUser();
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    navigate("/login");
  };

  const photoSrc = user?.photo_profil
    ? `http://127.0.0.1:8000${user.photo_profil}`
    : "/user.webp";

  return (
    <div className={`sidebar ${collapsed ? "collapsed" : ""}`}>
      <div
        className="sidebar-header"
        onClick={() => setCollapsed(!collapsed)}
        style={{ cursor: "pointer" }}
      >
        {collapsed ? (
          <img src="/logo_2.png" alt="Logo" className="sidebar-logo-small" />
        ) : (
          <>
            <img
              src="/SIDI BOU SOLVE.png"
              alt="Logo"
              className="sidebar-logo-img"
            />
            <span
              style={{ color: "white", fontSize: "18px", marginLeft: "auto" }}
            >
              ☰
            </span>
          </>
        )}
      </div>

      <ul className="menu">
        <li title="Leaderboard">
          <img src="/Leaderboard.png" alt="Leaderboard" />
          {!collapsed && <span>Leaderboard</span>}
        </li>
        <li title="Notification">
          <img src="/Notification.png" alt="Notification" />
          {!collapsed && <span>Notification</span>}
        </li>
        <li title="About US">
          <img src="/About US.png" alt="About US" />
          {!collapsed && <span>About US</span>}
        </li>
        <li title="Support">
          <img src="/Support.png" alt="Support" />
          {!collapsed && <span>Support</span>}
        </li>
        <li title="Settings">
          <img src="/Settings.png" alt="Settings" />
          {!collapsed && <span>Settings</span>}
        </li>
      </ul>

      
      <div className="user-section">
        <img src={photoSrc} alt="User" className="user-avatar" />
        {!collapsed && (
          <span>
            {user?.nom ? `${user.nom} ${user.prenom ?? ""}` : "Chargement..."}
          </span>
        )}
        <button className="logout-btn" onClick={handleLogout} title="Logout">
          <img
            src="/log_out.png"
            alt="Logout"
            style={{ width: "18px", filter: "brightness(10)" }}
          />
        </button>
      </div>
    </div>
  );
}
