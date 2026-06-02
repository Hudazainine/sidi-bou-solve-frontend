import { useState } from "react";
import { changePassword } from "../api/profile";
import { useNotifications } from "../context/NotificationContext";

const PasswordInput = ({ value, setValue, show, setShow, placeholder }) => (
  <div className="pwd-input-wrapper">
    <input
      type={show ? "text" : "password"}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      placeholder={placeholder}
      className="form-input form-input--pwd"
    />
  </div>
);

export default function ChangePassword() {
  const { fetchNotifications } = useNotifications();
  const [current, setCurrent] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirm, setConfirm] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const getStrength = (pwd) => {
    if (!pwd) return 0;
    let score = 0;
    if (pwd.length >= 8) score++;
    if (/[A-Z]/.test(pwd)) score++;
    if (/[0-9]/.test(pwd)) score++;
    if (/[^A-Za-z0-9]/.test(pwd)) score++;
    return score;
  };

  const strength = getStrength(newPass);
  const strengthColors = ["#e74c3c", "#e67e22", "#f1c40f", "#27ae60"];
  const strengthLabels = ["Faible", "Moyen", "Bon", "Fort"];

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
      setCurrent("");
      setNewPass("");
      setConfirm("");
      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      setMessage("wrong");
    } finally {
      setLoading(false);
    }
  };

  const messages = {
    fill: { text: "Please fill in all fields", cls: "msg--error" },
    mismatch: {
      text: "The passwords do not match",
      cls: "msg--error",
    },
    short: { text: "Minimum 6 characters required", cls: "msg--warning" },
    wrong: { text: "Incorrect current password", cls: "msg--error" },
    success: {
      text: "✅ Password successfully updated!",
      cls: "msg--success",
    },
  };

  return (
    <div className="password-card">
      <div className="form-card-header">
        <div className="form-card-icon form-card-icon--red">🔐</div>
        <div>
          <h3>Change Password</h3>
          <p className="form-card-subtitle">Secure your account</p>
        </div>
      </div>

      <div className="form-fields">
        <div className="form-field">
          <label className="form-label">🔑 Current password</label>
          <PasswordInput
            value={current}
            setValue={setCurrent}
            show={showCurrent}
            setShow={setShowCurrent}
            placeholder="Enter your current password"
          />
        </div>

        <div className="form-field">
          <label className="form-label">🆕 New Password</label>
          <PasswordInput
            value={newPass}
            setValue={setNewPass}
            show={showNew}
            setShow={setShowNew}
            placeholder="Choose a new password"
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

        <div className="form-field">
          <label className="form-label">✅ Confirm password</label>
          <PasswordInput
            value={confirm}
            setValue={setConfirm}
            show={showConfirm}
            setShow={setShowConfirm}
            placeholder="Confirm the new password"
          />
          {confirm && newPass && (
            <span
              className={`pwd-match ${confirm === newPass ? "pwd-match--ok" : "pwd-match--err"}`}
            >
              {confirm === newPass ? "✓ The passwords match" : "✗ Do not match"}
            </span>
          )}
        </div>
      </div>

      <button
        onClick={handleUpdate}
        disabled={loading}
        className={`form-btn form-btn--red ${loading ? "form-btn--disabled" : ""}`}
      >
        {loading ? "Update..." : "Update"}
      </button>

      {message && messages[message] && (
        <div className={`msg ${messages[message].cls}`}>
          {messages[message].text}
        </div>
      )}
    </div>
  );
}
