import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";

export default function HomePage() {
  const navigate = useNavigate();

  // 🔴 Live updating data
  const [lineData, setLineData] = useState([
    { name: "Mon", votes: 120 },
    { name: "Tue", votes: 210 },
    { name: "Wed", votes: 180 },
    { name: "Thu", votes: 260 },
    { name: "Fri", votes: 300 },
  ]);

  const [barData, setBarData] = useState([
    { name: "A", value: 40 },
    { name: "B", value: 25 },
    { name: "C", value: 35 },
  ]);

  const [pieData, setPieData] = useState([
    { name: "Option A", value: 45 },
    { name: "Option B", value: 30 },
    { name: "Option C", value: 25 },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      // prevent infinite growth
      setLineData((prev) =>
        prev.map((d) => ({
          ...d,
          votes: Math.min(d.votes + Math.floor(Math.random() * 20), 500),
        }))
      );

      setBarData((prev) =>
        prev.map((d) => ({
          ...d,
          value: Math.max(10, Math.min(100, d.value + Math.floor(Math.random() * 10 - 5))),
        }))
      );

      setPieData((prev) => {
        const updated = prev.map((d) => ({
          ...d,
          value: Math.max(10, d.value + Math.floor(Math.random() * 10 - 5)),
        }));
        const total = updated.reduce((sum, d) => sum + d.value, 0);
        return updated.map((d) => ({
          ...d,
          value: Math.round((d.value / total) * 100),
        }));
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen font-sans bg-gradient-to-br from-[#020617] via-[#020b1a] to-[#000814] text-white scroll-smooth">

      {/* Hero Section */}
      <section className="relative overflow-hidden">

        {/* 🫧 Animated blobs */}
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            drag
            dragConstraints={{ left: -120, right: 120, top: -100, bottom: 100 }}
            dragElastic={0.5}
            whileDrag={{ scale: 1.1 }}
            whileHover={{ scale: 1.05 }}
            animate={{ y: [0, -25, 0], x: [0, 20, 0] }}
            transition={{ duration: 6 + i * 2, repeat: Infinity }}
            className="absolute w-72 h-72 bg-blue-500 opacity-20 rounded-full blur-3xl"
            style={{ top: `${20 + i * 20}%`, left: `${10 + i * 25}%` }}
          />
        ))}

        {/* Navbar */}
        <nav className="flex justify-between items-center p-6 relative z-10">
          <h1 className="text-2xl font-bold">Poll App</h1>
          <div className="space-x-6">
            <a href="#how" className="hover:text-blue-300">
              How it works
            </a>
            <button
              onClick={() => navigate("/login")}
              className="bg-blue-500 px-4 py-2 rounded-xl hover:shadow-[0_0_15px_#3b82f6] transition"
            >
              Get Started
            </button>
          </div>
        </nav>

        {/* Hero Content */}
        <div className="grid md:grid-cols-2 gap-10 px-10 py-16 items-center relative z-10">
          <div>
            <h2 className="text-5xl font-bold mb-4">Poll. Vote. Impact 🚀</h2>
            <p className="text-blue-200 mb-6">
              Create fun polls, collect opinions and see results instantly.
            </p>

            <div className="space-x-4">
              <button
                onClick={() => navigate("/login")}
                className="bg-blue-500 px-6 py-3 rounded-2xl hover:shadow-[0_0_20px_#3b82f6] transition"
              >
                Start
              </button>
              <a
                href="#how"
                className="border px-6 py-3 rounded-2xl hover:bg-blue-500 transition"
              >
                How it works
              </a>
            </div>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-blue-900/10 backdrop-blur-md p-4 rounded-xl border border-blue-500/30">
              <ResponsiveContainer width="100%" height={150}>
                <LineChart data={lineData}>
                  <XAxis dataKey="name" hide />
                  <YAxis hide />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="votes"
                    stroke="#60a5fa"
                    strokeWidth={2}
                    isAnimationActive
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-blue-900/10 backdrop-blur-md p-4 rounded-xl border border-blue-500/30">
              <ResponsiveContainer width="100%" height={150}>
                <BarChart data={barData}>
                  <XAxis dataKey="name" hide />
                  <YAxis hide />
                  <Tooltip />
                  <Bar dataKey="value" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="col-span-2 bg-blue-900/10 backdrop-blur-md p-4 rounded-xl border border-blue-500/30 flex justify-center">
              <ResponsiveContainer width="100%" height={180}>
                <PieChart>
                  <Pie data={pieData} dataKey="value" outerRadius={70}>
                    {pieData.map((_, index) => (
                      <Cell
                        key={index}
                        fill={["#60a5fa", "#3b82f6", "#1d4ed8"][index]}
                      />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="px-10 py-20">
        <h2 className="text-3xl mb-10 text-center">How it works</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {["Create Poll", "Vote Easily", "Analyze Results"].map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              className="p-6 bg-blue-900/20 rounded-xl border border-blue-500/30"
            >
              {item}
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="px-10 py-20 text-center">
        <h2 className="text-3xl mb-4">Are you ready?</h2>
        <button
          onClick={() => navigate("/login")}
          className="bg-blue-500 px-6 py-3 rounded-xl"
        >
          Start Now
        </button>
      </section>

      {/* Footer */}
      <footer className="px-10 py-10 text-center bg-[#01030a]">
        Contact Us: hello@pollify.app
      </footer>
    </div>
  );
}