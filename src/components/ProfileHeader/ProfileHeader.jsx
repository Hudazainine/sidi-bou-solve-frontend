import { useRef, useState, useEffect } from "react";
import { useUser } from "../../context/UserContext";
import { useNotifications } from "../../context/NotificationContext";
import {
  uploadPhoto,
  getProfile,
  updateProfile,
  changePassword,
} from "../../services/profile";

// ─── MODAL ───────────────────────────────────────────────────────────────────
function Modal({ title, onClose, children }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>{title}</h3>
          <button className="modal-close" onClick={onClose}>
            ✕
          </button>
        </div>
        <div className="modal-body">{children}</div>
      </div>
    </div>
  );
}

// ─── EDIT PROFILE FORM ───────────────────────────────────────────────────────
function EditProfileForm({ onClose }) {
  const { user, setUser } = useUser();
  const { fetchNotifications } = useNotifications();
  const [form, setForm] = useState({
    nom: "",
    prenom: "",
    email: "",
    phone: "",
    facebook: "",
    instagram: "",
  });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setForm({
        nom: user.nom || "",
        prenom: user.prenom || "",
        email: user.email || "",
        phone: user.phone || "",
        facebook: user.facebook || "",
        instagram: user.instagram || "",
      });
    }
  }, [user]);

  const fields = [
    {
      name: "nom",
      label: "Name",
      icon: "👤",
      type: "text",
      placeholder: "Your name",
    },
    {
      name: "prenom",
      label: "First Name",
      icon: "👤",
      type: "text",
      placeholder: "Your first name",
    },
    {
      name: "email",
      label: "Email",
      icon: "📧",
      type: "email",
      placeholder: "your@email.com",
    },
    {
      name: "phone",
      label: "Phone",
      icon: "📱",
      type: "text",
      placeholder: "0612345678",
    },
    {
      name: "facebook",
      label: "Facebook",
      icon: "📘",
      type: "text",
      placeholder: "username or URL",
    },
    {
      name: "instagram",
      label: "Instagram",
      icon: "📷",
      type: "text",
      placeholder: "@username",
    },
  ];

  const handleSave = async () => {
    setLoading(true);
    try {
      const dataToUpdate = {};
      Object.keys(form).forEach((key) => {
        const original = user[key] || "";
        if (form[key] !== original && form[key] !== "")
          dataToUpdate[key] = form[key];
      });
      if (Object.keys(dataToUpdate).length > 0) {
        const res = await updateProfile(dataToUpdate);
        setUser(res.data);
        await fetchNotifications();
        setMessage("success");
        setTimeout(() => {
          setMessage("");
          onClose();
        }, 1500);
      } else {
        setMessage("nochange");
        setTimeout(() => setMessage(""), 2000);
      }
    } catch {
      setMessage("error");
      setTimeout(() => setMessage(""), 2000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="modal-form-grid">
        {fields.map((f) => (
          <div key={f.name} className="modal-field">
            <label className="modal-label">
              {f.icon} {f.label}
            </label>
            <input
              type={f.type}
              name={f.name}
              value={form[f.name]}
              onChange={(e) =>
                setForm({ ...form, [e.target.name]: e.target.value })
              }
              placeholder={f.placeholder}
              className="modal-input"
            />
          </div>
        ))}
      </div>
      <div className="modal-actions">
        <button className="modal-btn modal-btn--cancel" onClick={onClose}>
          Cancel
        </button>
        <button
          className="modal-btn modal-btn--save"
          onClick={handleSave}
          disabled={loading}
        >
          {loading ? "Saving..." : "Save Changes"}
        </button>
      </div>
      {message === "success" && (
        <div className="msg msg--success">✅ Profile updated!</div>
      )}
      {message === "nochange" && (
        <div className="msg msg--warning">ℹ️ No changes detected</div>
      )}
      {message === "error" && (
        <div className="msg msg--error">❌ Error during update</div>
      )}
    </>
  );
}


function ChangePasswordForm({ onClose }) {
  const { fetchNotifications } = useNotifications();
  const [current, setCurrent] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirm, setConfirm] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const getStrength = (pwd) => {
    if (!pwd) return 0;
    let s = 0;
    if (pwd.length >= 8) s++;
    if (/[A-Z]/.test(pwd)) s++;
    if (/[0-9]/.test(pwd)) s++;
    if (/[^A-Za-z0-9]/.test(pwd)) s++;
    return s;
  };
  const strength = getStrength(newPass);
  const strengthColors = ["#e74c3c", "#e67e22", "#f1c40f", "#27ae60"];
  const strengthLabels = ["Weak", "Fair", "Good", "Strong"];

  const handleUpdate = async () => {
    if (!current || !newPass || !confirm) {
      setMessage("fill");
      return;
    }
    if (newPass !== confirm) {
      setMessage("mismatch");
      return;
    }
    if (newPass.length < 6) {
      setMessage("short");
      return;
    }
    setLoading(true);
    try {
      await changePassword({
        current_password: current,
        new_password: newPass,
      });
      await fetchNotifications();
      setMessage("success");
      setTimeout(() => {
        setMessage("");
        onClose();
      }, 1500);
    } catch {
      setMessage("wrong");
    } finally {
      setLoading(false);
    }
  };

  const msgs = {
    fill: { text: "Please fill in all fields", cls: "msg--error" },
    mismatch: { text: "Passwords do not match", cls: "msg--error" },
    short: { text: "Minimum 6 characters required", cls: "msg--warning" },
    wrong: { text: "Incorrect current password", cls: "msg--error" },
    success: { text: "✅ Password updated!", cls: "msg--success" },
  };

  return (
    <>
      <div className="modal-form-grid modal-form-grid--single">
        <div className="modal-field">
          <label className="modal-label">🔑 Current Password</label>
          <input
            type="password"
            value={current}
            onChange={(e) => setCurrent(e.target.value)}
            placeholder="Current password"
            className="modal-input"
          />
        </div>
        <div className="modal-field">
          <label className="modal-label">🆕 New Password</label>
          <input
            type="password"
            value={newPass}
            onChange={(e) => setNewPass(e.target.value)}
            placeholder="New password"
            className="modal-input"
          />
          {newPass && (
            <div className="pwd-strength">
              <div className="pwd-strength-bars">
                {[0, 1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="pwd-strength-bar"
                    style={{
                      background:
                        i < strength ? strengthColors[strength - 1] : "#e0e0e0",
                    }}
                  />
                ))}
              </div>
              {strength > 0 && (
                <span
                  className="pwd-strength-label"
                  style={{ color: strengthColors[strength - 1] }}
                >
                  {strengthLabels[strength - 1]}
                </span>
              )}
            </div>
          )}
        </div>
        <div className="modal-field">
          <label className="modal-label">✅ Confirm Password</label>
          <input
            type="password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            placeholder="Confirm new password"
            className="modal-input"
          />
          {confirm && newPass && (
            <span
              className={`pwd-match ${confirm === newPass ? "pwd-match--ok" : "pwd-match--err"}`}
            >
              {confirm === newPass ? "✓ Passwords match" : "✗ Do not match"}
            </span>
          )}
        </div>
      </div>
      <div className="modal-actions">
        <button className="modal-btn modal-btn--cancel" onClick={onClose}>
          Cancel
        </button>
        <button
          className="modal-btn modal-btn--red"
          onClick={handleUpdate}
          disabled={loading}
        >
          {loading ? "Updating..." : "Update Password"}
        </button>
      </div>
      {message && msgs[message] && (
        <div className={`msg ${msgs[message].cls}`}>{msgs[message].text}</div>
      )}
    </>
  );
}

// ─── PROFILE HEADER ──────────────────────────────────────────────────────────
export default function ProfileHeader() {
  const { user, setUser } = useUser();
  const { fetchNotifications } = useNotifications();
  const fileInputRef = useRef(null);
  const [modal, setModal] = useState(null); // 'edit' | 'password' | null

  if (!user)
    return <div className="profile-header loading-text">Loading...</div>;

  const xpPercent = Math.min(
    ((user.student?.pointsTotal || 0) / 5000) * 100,
    100,
  );

  const handlePhotoClick = () => fileInputRef.current.click();
  const handlePhotoChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    try {
      await uploadPhoto(file);
      const res = await getProfile();
      setUser(res.data);
      await fetchNotifications();
    } catch (err) {
      console.error("Photo upload error", err);
    }
  };

  const getFacebookUrl = () => {
    if (!user.facebook) return null;
    return user.facebook.startsWith("http")
      ? user.facebook
      : `https://facebook.com/${user.facebook}`;
  };
  const getInstagramUrl = () => {
    if (!user.instagram) return null;
    return user.instagram.startsWith("http")
      ? user.instagram
      : `https://instagram.com/${user.instagram}`;
  };

  return (
    <>
      <div className="profile-header">
        {/* LEFT — photo + info */}
        <div className="profile-left">
          <div className="photo-wrapper" onClick={handlePhotoClick}>
            <img
              src={
                user.photo_profil
                  ? `http://127.0.0.1:8000${user.photo_profil}`
                  : "/user.webp"
              }
              alt="User"
              className="profile-avatar"
            />
            <div className="photo-overlay">
              <span style={{ fontSize: "22px" }}>🖋️</span>
            </div>
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handlePhotoChange}
              style={{ display: "none" }}
            />
          </div>

          <div className="profile-info">
            <h2>
              {user.nom} {user.prenom}
            </h2>
            <p className="username">
              @{user.nom}.{user.prenom}
            </p>
            <div className="level-badge">
              ⭐ Level {user.student?.niveau || 1}
            </div>

            <div className="socials" style={{ marginTop: "12px" }}>
              {user.facebook && (
                <a
                  href={getFacebookUrl()}
                  target="_blank"
                  rel="noreferrer"
                  className="social-link"
                >
                  <img
                    src="https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/facebook.svg"
                    alt="Facebook"
                    style={{
                      width: "15px",
                      height: "15px",
                      filter:
                        "invert(30%) sepia(80%) saturate(600%) hue-rotate(200deg)",
                    }}
                  />
                  Facebook
                </a>
              )}
              {user.instagram && (
                <a
                  href={getInstagramUrl()}
                  target="_blank"
                  rel="noreferrer"
                  className="social-link"
                >
                  <img
                    src="https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/instagram.svg"
                    alt="Instagram"
                    style={{
                      width: "15px",
                      height: "15px",
                      filter:
                        "invert(20%) sepia(80%) saturate(800%) hue-rotate(280deg)",
                    }}
                  />
                  Instagram
                </a>
              )}
            </div>

            {/* BOUTONS */}
            <div className="profile-action-btns">
              <button
                className="profile-action-btn profile-action-btn--blue"
                onClick={() => setModal("edit")}
              >
                ✏️ Edit Profile
              </button>
              <button
                className="profile-action-btn profile-action-btn--red"
                onClick={() => setModal("password")}
              >
                🔐 Change Password
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT — XP */}
        <div className="xp-section">
          <p>XP Progress</p>
          <div className="xp-bar">
            <div className="xp-fill" style={{ width: `${xpPercent}%` }} />
          </div>
          <span>{user.student?.pointsTotal || 0} / 5000 XP</span>
          <div className="profile-mini-stats">
            <div className="mini-stat">
              <span className="mini-stat-val">{user.student?.niveau || 1}</span>
              <span className="mini-stat-label">Level</span>
            </div>
            <div className="mini-stat-divider" />
            <div className="mini-stat">
              <span className="mini-stat-val">
                {user.student?.pointsTotal || 0}
              </span>
              <span className="mini-stat-label">Points</span>
            </div>
            <div className="mini-stat-divider" />
            <div className="mini-stat">
              <span className="mini-stat-val">{user.role || "STUDENT"}</span>
              <span className="mini-stat-label">Role</span>
            </div>
          </div>
        </div>
      </div>

      {/* MODALS */}
      {modal === "edit" && (
        <Modal title="✏️ Edit Profile" onClose={() => setModal(null)}>
          <EditProfileForm onClose={() => setModal(null)} />
        </Modal>
      )}
      {modal === "password" && (
        <Modal title="🔐 Change Password" onClose={() => setModal(null)}>
          <ChangePasswordForm onClose={() => setModal(null)} />
        </Modal>
      )}
    </>
  );
}
