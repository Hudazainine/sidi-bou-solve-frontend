import { useState, useEffect } from "react";
import { getBadges } from "../../services/profile";

const BADGE_ICONS = {
  "Quiz Master": "🏆",
  "Fast Thinker": "⚡",
  Explorer: "🌍",
  default: "🎖️",
};

export default function BadgesSection() {
  const [badges, setBadges] = useState([]);

  useEffect(() => {
    getBadges()
      .then((res) => setBadges(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="badges-section">
      <h3>Achievement🏆 </h3>
      <div className="badges-grid">
        {badges.length === 0 ? (
          <p className="loading-text">Aucun badge pour l'instant</p>
        ) : (
          badges.map((sb) => (
            <div key={sb.id} className="badge-card">
              {BADGE_ICONS[sb.badge.nom] || BADGE_ICONS["default"]}
              <span>{sb.badge.nom}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
