import { LineChart, Line, XAxis, Tooltip, ResponsiveContainer } from "recharts";
import { useEffect, useState } from "react";
import { getRecentActivity } from "../../services/profile";

export default function ProgressChart() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getRecentActivity()
      .then((res) => {
        if (Array.isArray(res.data)) {
          const formatted = res.data.map((item) => ({
            date: item.time ? item.time : "",
            xp: item.valeur ?? 0,
          }));
          setData(formatted);
        } else {
          setData([]);
        }
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="chart-card">
      <h3>Progress Chart 📈</h3>
      {loading ? (
        <div>Chargement...</div>
      ) : data.length === 0 ? (
        <div>Aucune donnée disponible</div>
      ) : (
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={data}>
            <XAxis dataKey="date" />
            <Tooltip />
            <Line dataKey="xp" stroke="#4aa5c4" strokeWidth={4} />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
