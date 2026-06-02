import { useState, useEffect } from "react";
import { getFavoriteCategories } from "../../services/profile";

const medals = ["🥇", "🥈", "🥉"];
const colors = [
  {
    bg: "rgba(255,107,107,0.08)",
    border: "rgba(255,107,107,0.25)",
    accent: "#ff6b6b",
    bar: "#ff6b6b",
  },
  {
    bg: "rgba(25,83,131,0.08)",
    border: "rgba(25,83,131,0.25)",
    accent: "#195383",
    bar: "#195383",
  },
  {
    bg: "rgba(78,205,196,0.08)",
    border: "rgba(78,205,196,0.25)",
    accent: "#4ecdc4",
    bar: "#4ecdc4",
  },
];

export default function FavoriteCategories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getFavoriteCategories()
      .then((res) => setCategories(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const maxCount = categories.length > 0 ? categories[0].count : 1;

  return (
    <div className="chart-card">
      <h3>Top Catégories</h3>

      {loading ? (
        <div className="loading-text">Chargement...</div>
      ) : categories.length === 0 ? (
        <div className="loading-text">
          Joue des quiz pour voir tes catégories favorites !
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          {categories.map((cat, i) => (
            <div
              key={cat.category}
              style={{
                background: colors[i].bg,
                border: `1px solid ${colors[i].border}`,
                borderRadius: "14px",
                padding: "16px 20px",
              }}
            >
              {/* Header */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: "10px",
                }}
              >
                <div
                  style={{ display: "flex", alignItems: "center", gap: "10px" }}
                >
                  <span style={{ fontSize: "22px" }}>{medals[i]}</span>
                  <div>
                    <div
                      style={{
                        fontFamily: "'Fredoka One', cursive",
                        fontSize: "16px",
                        color: "#1a1a2e",
                      }}
                    >
                      {cat.category}
                    </div>
                    <div
                      style={{
                        fontSize: "11px",
                        color: "#7a7a9a",
                        fontWeight: 700,
                      }}
                    >
                      {cat.count} {cat.count > 1 ? "parties" : "partie"} jouée
                      {cat.count > 1 ? "s" : ""}
                    </div>
                  </div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div
                    style={{
                      fontFamily: "'Fredoka One', cursive",
                      fontSize: "20px",
                      color: colors[i].accent,
                    }}
                  >
                    {cat.avg}
                  </div>
                  <div
                    style={{
                      fontSize: "10px",
                      color: "#7a7a9a",
                      fontWeight: 700,
                    }}
                  >
                    pts moy.
                  </div>
                </div>
              </div>

              {/* Barre de progression */}
              <div
                style={{
                  background: "rgba(0,0,0,0.06)",
                  borderRadius: "10px",
                  height: "6px",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    height: "100%",
                    width: `${(cat.count / maxCount) * 100}%`,
                    background: colors[i].bar,
                    borderRadius: "10px",
                    transition: "width 1s ease",
                  }}
                />
              </div>

              {/* Footer stats */}
              <div style={{ display: "flex", gap: "16px", marginTop: "10px" }}>
                <div
                  style={{
                    fontSize: "11px",
                    color: "#7a7a9a",
                    fontWeight: 700,
                  }}
                >
                  Meilleur score :{" "}
                  <span style={{ color: colors[i].accent, fontWeight: 800 }}>
                    {cat.best} pts
                  </span>
                </div>
                <div
                  style={{
                    fontSize: "11px",
                    color: "#7a7a9a",
                    fontWeight: 700,
                  }}
                >
                  Moyenne :{" "}
                  <span style={{ color: colors[i].accent, fontWeight: 800 }}>
                    {cat.avg} pts
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
