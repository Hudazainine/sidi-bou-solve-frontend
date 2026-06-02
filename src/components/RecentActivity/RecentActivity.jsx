import { useState, useEffect } from "react";
import { getRecentActivity } from "../../services/profile";

export default function RecentActivity() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getRecentActivity()
      .then((res) => {
        if (Array.isArray(res.data)) {
          setActivities(res.data);
        } else {
          setActivities([]);
        }
      })
      .catch((err) => {
        console.error(err);
        setActivities([]);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="recent-activity">
      <h3>Recent Activity 🔄️</h3>
      {loading ? (
        <div className="activity-item">Chargement...</div>
      ) : activities.length === 0 ? (
        <div className="activity-item">Aucune activité récente</div>
      ) : (
        activities.map((score) => (
          <div key={score.id || Math.random()} className="activity-item">
            🎯 <strong>{score.quiz?.titre || "Quiz inconnu"}</strong> — Score:{" "}
            <strong>{score.valeur ?? 0} pts</strong> —{" "}
            <span style={{ color: "var(--text-muted)" }}>
              {score.time || "Date inconnue"}
            </span>
          </div>
        ))
      )}
    </div>
  );
}
