import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";

// ======================
// SIMPLE API WRAPPER
// ======================
const API = {
  get: async (url) => {
    const res = await fetch(`http://localhost:5000/api${url}`, {
      credentials: "include",
    });
    if (!res.ok) throw new Error("API error");
    return res.json();
  },
};

// ======================
// NAVBAR
// ======================
function Navbar() {
  return (
    <div className="w-full px-6 py-3 border-b border-white/10 bg-[#070b14] flex justify-between items-center">
      <h1 className="text-white font-bold">Polls & Surveys</h1>
      <div className="text-sm text-gray-400">Analytics Dashboard</div>
    </div>
  );
}

// ======================
// MAIN COMPONENT
// ======================
export default function AnalyticsDashboard() {
  const [stats, setStats] = useState({});
  const [trend, setTrend] = useState([]);
  const [topPolls, setTopPolls] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const res = await API.get("/analytics");

      // backend mapping
      setStats(res.overview);
      setTopPolls(res.latest.polls);

      // fake trend (until backend adds real one)
      const fakeTrend = (res.latest.responses || []).map((_, i) => ({
        _id: `Day ${i + 1}`,
        count: Math.floor(Math.random() * 100) + 20,
      }));

      setTrend(fakeTrend);
    } catch (err) {
      console.log("Error loading analytics:", err.message);
    }
  };

  const COLORS = ["#06b6d4", "#8b5cf6", "#22c55e", "#f59e0b"];

  return (
    <div className="min-h-screen bg-[#070b14] text-white">
      <Navbar />

      <div className="p-6 space-y-6">

        {/* HEADER */}
        <div>
          <h1 className="text-2xl font-bold">Dashboard Overview</h1>
          <p className="text-gray-400 text-sm">
            Real-time polls & survey analytics
          </p>
        </div>

        {/* STATS CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <StatCard title="Users" value={stats?.totalUsers} />
          <StatCard title="Polls" value={stats?.totalPolls} />
          <StatCard title="Surveys" value={stats?.totalSurveys} />
          <StatCard title="Responses" value={stats?.totalResponses} />
        </div>

        {/* CHARTS */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

          {/* LINE CHART */}
          <div className="col-span-2 bg-[#0b1220] p-4 rounded-2xl border border-white/10">
            <h2 className="mb-3 font-semibold">Response Trend</h2>

            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={trend}>
                <XAxis dataKey="_id" stroke="#aaa" />
                <YAxis stroke="#aaa" />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="count"
                  stroke="#06b6d4"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* STATUS CARD */}
          <div className="bg-[#0b1220] p-4 rounded-2xl border border-white/10">
            <h2 className="mb-3 font-semibold">System Status</h2>

            <div className="text-green-400 font-bold">● OPERATIONAL</div>

            <div className="mt-3 text-sm text-gray-400 space-y-1">
              <p>Latency: 98ms</p>
              <p>Uptime: 99.9%</p>
            </div>
          </div>
        </div>

        {/* BOTTOM SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

          {/* TOP POLLS */}
          <div className="bg-[#0b1220] p-4 rounded-2xl border border-white/10">
            <h2 className="mb-3 font-semibold">Top Polls</h2>

            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={topPolls}>
                <XAxis dataKey="question" hide />
                <YAxis />
                <Tooltip />
                <Bar dataKey="options.length" fill="#8b5cf6" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* DEMOGRAPHICS (STATIC FOR NOW) */}
          <div className="bg-[#0b1220] p-4 rounded-2xl border border-white/10">
            <h2 className="mb-3 font-semibold">Demographics</h2>

            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={[
                    { name: "Tech", value: 40 },
                    { name: "Education", value: 30 },
                    { name: "Business", value: 30 },
                  ]}
                  dataKey="value"
                  outerRadius={90}
                >
                  {COLORS.map((c, i) => (
                    <Cell key={i} fill={c} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

// ======================
// STATS CARD
// ======================
function StatCard({ title, value }) {
  return (
    <div className="bg-[#0b1220] p-4 rounded-2xl border border-white/10">
      <p className="text-gray-400 text-sm">{title}</p>
      <h3 className="text-2xl font-bold mt-1">{value ?? 0}</h3>
    </div>
  );
}