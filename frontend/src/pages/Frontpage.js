import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
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

  // 🔴 Live updating data (Kept exactly intact)
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
    <div className="min-h-screen bg-[#030712] text-[#f3f4f6] font-sans selection:bg-blue-500 selection:text-white overflow-x-hidden relative">
      
      {/* Background Decorative Mesh Glows */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[160px] pointer-events-none" />

      {/* Glassmorphic Top Navbar */}
      <nav className="sticky top-0 z-50 max-w-7xl mx-auto px-6 h-20 flex justify-between items-center backdrop-blur-md bg-[#030712]/70 border-b border-gray-800/60">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate("/")}>
          <span className="text-2xl font-black bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500 bg-clip-text text-transparent">
            PollHub 🚀
          </span>
        </div>
        <div className="flex items-center gap-8">
          <a href="#how" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">
            How it works
          </a>
          <button
            onClick={() => navigate("/login")}
            className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-xl group bg-gradient-to-br from-blue-600 to-indigo-500 group-hover:from-blue-600 group-hover:to-indigo-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-800 mt-2"
          >
            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-[#030712] rounded-xl group-hover:bg-opacity-0">
              Get Started
            </span>
          </button>
        </div>
      </nav>

      {/* Hero Layout */}
      <section className="max-w-7xl mx-auto px-6 pt-16 pb-24 grid lg:grid-cols-12 gap-12 items-center relative z-10">
        
        {/* Left Side Copy */}
        <div className="lg:col-span-6 space-y-8 text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20 mb-6">
              ✨ Real-time Data Capture Engine
            </span>
            <h1 className="text-5xl md:text-6xl font-black tracking-tight leading-[1.1]">
              Poll. Vote. <br />
              <span className="bg-gradient-to-r from-blue-400 via-sky-400 to-indigo-500 bg-clip-text text-transparent">
                Impact Instantly.
              </span>
            </h1>
          </motion.div>

          <p className="text-lg text-gray-400 max-w-xl mx-auto lg:mx-0 font-normal leading-relaxed">
            Create completely responsive polls, collect user insights contextually, and analyze live updating metrics through deep-dive graphic summaries.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-from-start gap-4">
            <button
              onClick={() => navigate("/login")}
              className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 font-semibold rounded-xl text-white shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              Launch Dashboard
            </button>
            <a
              href="#how"
              className="w-full sm:w-auto text-center px-8 py-4 bg-gray-900 hover:bg-gray-800 border border-gray-800 font-semibold rounded-xl text-gray-300 hover:text-white transition-all"
            >
              How it works
            </a>
          </div>
        </div>

        {/* Right Side Live Interactive Chart Mockups */}
        <div className="lg:col-span-6 grid grid-cols-2 gap-4 relative">
          
          {/* Card 1: Line Chart */}
          <div className="bg-gray-900/40 backdrop-blur-md p-5 rounded-2xl border border-gray-800/80 hover:border-blue-500/30 transition-all shadow-xl">
            <div className="flex justify-between items-center mb-4">
              <span className="text-xs font-semibold text-gray-400 tracking-wider uppercase">Live Activity</span>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            </div>
            <ResponsiveContainer width="100%" height={140}>
              <LineChart data={lineData}>
                <XAxis dataKey="name" hide />
                <YAxis hide />
                <Tooltip contentStyle={{ background: '#111827', borderColor: '#374151' }} />
                <Line type="monotone" dataKey="votes" stroke="#3b82f6" strokeWidth={3} dot={false} isAnimationActive={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Card 2: Bar Chart */}
          <div className="bg-gray-900/40 backdrop-blur-md p-5 rounded-2xl border border-gray-800/80 hover:border-indigo-500/30 transition-all shadow-xl">
            <div className="flex justify-between items-center mb-4">
              <span className="text-xs font-semibold text-gray-400 tracking-wider uppercase">User Opinions</span>
              <span className="text-xs text-blue-400 font-bold">Dynamic</span>
            </div>
            <ResponsiveContainer width="100%" height={140}>
              <BarChart data={barData}>
                <XAxis dataKey="name" hide />
                <YAxis hide />
                <Tooltip contentStyle={{ background: '#111827', borderColor: '#374151' }} />
                <Bar dataKey="value" fill="#6366f1" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Card 3: Combined Full Width Pie Breakdown */}
          <div className="col-span-2 bg-gray-900/30 backdrop-blur-md p-6 rounded-2xl border border-gray-800/80 flex items-center justify-between shadow-xl">
            <div className="space-y-2">
              <h4 className="text-sm font-bold text-gray-200">Segment Share</h4>
              <p className="text-xs text-gray-400 max-w-[180px]">Real-time evaluation across target demographics.</p>
            </div>
            <div className="w-[160px]">
              <ResponsiveContainer width="100%" height={130}>
                <PieChart>
                  <Pie data={pieData} dataKey="value" outerRadius={50} innerRadius={35} paddingAngle={4}>
                    {pieData.map((_, index) => (
                      <Cell key={index} fill={["#3b82f6", "#6366f1", "#a855f7"][index]} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </section>

      {/* "How it works" Grid Cards */}
      <section id="how" className="max-w-7xl mx-auto px-6 py-24 border-t border-gray-900">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold tracking-tight mb-4">Engineered Simplicity</h2>
          <p className="text-gray-400">Collect opinions, capture data inputs, and extract trends in seconds.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            { title: "Create Polls & Surveys", desc: "Craft targeted questions using dynamic multiple choice layouts or structural complex input metrics with clean components.", color: "from-blue-500/20 to-transparent", icon: "📊" },
            { title: "Vote Effortlessly", desc: "No complex login routines required for users. Zero frictional interfaces optimization means massive completion volumes.", color: "from-indigo-500/20 to-transparent", icon: "🧠" },
            { title: "Deep Analytics Views", desc: "Instantly display information summaries back visually using customizable charting matrices with clean state rendering engines.", color: "from-purple-500/20 to-transparent", icon: "⚡" }
          ].map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -5 }}
              className="p-8 rounded-2xl bg-gradient-to-b from-gray-900/60 to-gray-900/20 border border-gray-800/80 hover:border-gray-700/80 transition-all flex flex-col justify-between"
            >
              <div>
                <span className="text-3xl mb-4 block">{item.icon}</span>
                <h3 className="text-xl font-bold mb-3 text-white">{item.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Bottom Banner */}
      <section className="max-w-5xl mx-auto px-6 pb-24">
        <div className="bg-gradient-to-r from-blue-900/40 via-indigo-900/40 to-purple-900/40 rounded-3xl p-12 border border-blue-500/20 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[#030712]/40 backdrop-blur-sm -z-10" />
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to unlock collective insights?</h2>
          <p className="text-gray-300 max-w-xl mx-auto mb-8 text-sm md:text-base">Join thousands of users creating real-time telemetry pipelines through PollHub.</p>
          <button
            onClick={() => navigate("/login")}
            className="px-8 py-3.5 bg-white text-gray-900 font-bold rounded-xl hover:bg-gray-100 shadow-xl transition-all hover:scale-[1.02]"
          >
            Start Now Free
          </button>
        </div>
      </section>

      {/* Universal Footer */}
      <footer className="border-t border-gray-900 bg-[#01030a]/80 py-12 text-center text-sm text-gray-500">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p>© 2026 PollHub. All metrics recorded live.</p>
          <div className="flex gap-6 text-gray-400">
            <span className="hover:text-white cursor-pointer">Privacy Policy</span>
            <span className="hover:text-white cursor-pointer">Terms of Service</span>
            <a href="mailto:hello@pollify.app" className="hover:text-white">Contact Support</a>
          </div>
        </div>
      </footer>
    </div>
  );
}