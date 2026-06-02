import { useState, useEffect } from "react";
import { useUser } from "../context/UserContext";
import { useNotifications } from "../context/NotificationContext";
import { updateProfile } from "../api/profile";

export default function EditProfile() {
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

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const dataToUpdate = {};
      Object.keys(form).forEach((key) => {
        const originalValue = user[key] || "";
        if (form[key] !== originalValue && form[key] !== "") {
          dataToUpdate[key] = form[key];
        }
      });

      if (Object.keys(dataToUpdate).length > 0) {
        const res = await updateProfile(dataToUpdate);
        setUser(res.data);
        await fetchNotifications();
        setMessage("success");
      } else {
        setMessage("nochange");
      }
      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      setMessage("error");
      setTimeout(() => setMessage(""), 3000);
    } finally {
      setLoading(false);
    }
  };

  const fields = [
    {
      name: "nom",
      label: "Name",
      placeholder: "Votre nom",
      icon: "👤",
      type: "text",
    },
    {
      name: "prenom",
      label: "First Name",
      placeholder: "Votre prénom",
      icon: "👤",
      type: "text",
    },
    {
      name: "email",
      label: "Mail",
      placeholder: "votre@email.com",
      icon: "📧",
      type: "email",
    },
    {
      name: "phone",
      label: "Phone",
      placeholder: "0612345678",
      icon: "📱",
      type: "text",
    },
    {
      name: "facebook",
      label: "Facebook",
      placeholder: "username ou URL",
      icon: "📘",
      type: "text",
    },
    {
      name: "instagram",
      label: "Instagram",
      placeholder: "@username",
      icon: "📷",
      type: "text",
    },
  ];

  return (
    <div className="edit-profile">
      <div className="form-card-header">
        <div className="form-card-icon form-card-icon--blue">✏️</div>
        <div>
          <h3>Edit Profile</h3>
          <p className="form-card-subtitle">Edit your personal information</p>
        </div>
      </div>

      <div className="form-grid-2">
        {fields.map((f) => (
          <div key={f.name} className="form-field">
            <label className="form-label">
              {f.icon} {f.label}
            </label>
            <input
              type={f.type}
              name={f.name}
              value={form[f.name]}
              onChange={handleChange}
              placeholder={f.placeholder}
              className="form-input"
            />
          </div>
        ))}
      </div>

      <button
        onClick={handleSave}
        disabled={loading}
        className={`form-btn form-btn--blue ${loading ? "form-btn--disabled" : ""}`}
      >
        {loading ? "Save..." : "Save"}
      </button>

      {message === "success" && (
        <div className="msg msg--success">✅ Profile successfully updated!</div>
      )}
      {message === "nochange" && (
        <div className="msg msg--warning">ℹ️ No changes detected</div>
      )}
      {message === "error" && (
        <div className="msg msg--error">❌ Error during update</div>
      )}
    </div>
  );
}
