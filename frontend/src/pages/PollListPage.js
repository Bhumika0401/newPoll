import { useEffect, useState } from "react";
import { API } from "../api/api";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function PollListPage() {
  const [polls, setPolls] = useState([]);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("all");
  const [visible, setVisible] = useState(5);

  const nav = useNavigate();

  // ================= LOAD POLLS =================
  useEffect(() => {
    API.get("/polls").then(res => setPolls(res.data));
  }, []);

  // ================= LOAD CATEGORIES =================
  useEffect(() => {
    API.get("/categories").then(res => setCategories(res.data));
  }, []);

  // ================= FILTER =================
  const filtered = polls.filter(p =>
    category === "all"
      ? true
      : p.category?._id === category
  );

  return (
    <>
      <Navbar />

      <style>{`
        .page {
          min-height: 100vh;
          padding: 30px;
          background: radial-gradient(circle at top,#1e3a8a,#0b1220 60%);
          color: white;
        }

        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }

        .title {
          font-size: 26px;
          font-weight: 700;
        }

        .create-btn {
          background: #22c55e;
          border: none;
          padding: 10px 15px;
          border-radius: 10px;
          color: white;
          cursor: pointer;
        }

        .chips {
          display: flex;
          gap: 10px;
          margin-bottom: 25px;
          flex-wrap: wrap;
        }

        .chip {
          padding: 8px 14px;
          border-radius: 20px;
          background: #1f2937;
          cursor: pointer;
          font-size: 14px;
        }

        .chip.active {
          background: #3b82f6;
        }

        .poll-card {
          background: #111827;
          padding: 18px;
          border-radius: 14px;
          margin-bottom: 15px;
          cursor: pointer;
          transition: 0.25s ease;
          border: 1px solid rgba(255,255,255,0.05);
        }

        .poll-card:hover {
          transform: translateY(-4px);
          background: #1f2937;
          box-shadow: 0 10px 30px rgba(0,0,0,0.4);
        }

        .question {
          font-size: 17px;
          font-weight: 600;
          margin-bottom: 6px;
        }

        .meta {
          font-size: 12px;
          color: #9ca3af;
        }

        .footer {
          margin-top: 20px;
          display: flex;
          justify-content: space-between;
        }

        .load {
          background: #22c55e;
          border: none;
          padding: 10px 15px;
          border-radius: 10px;
          color: white;
          cursor: pointer;
        }

        .back {
          background: #3b82f6;
          border: none;
          padding: 10px 15px;
          border-radius: 10px;
          color: white;
          cursor: pointer;
        }
      `}</style>

      <div className="page">

        {/* HEADER */}
        <div className="header">
          <div className="title">📊 Polls Dashboard</div>

          <button
            className="create-btn"
            onClick={() => nav("/create-poll")}
          >
            + Create Poll
          </button>
        </div>

        {/* CATEGORY FILTER (FROM BACKEND) */}
        <div className="chips">
          <div
            className={`chip ${category === "all" ? "active" : ""}`}
            onClick={() => setCategory("all")}
          >
            ALL
          </div>

          {categories.map(cat => (
            <div
              key={cat._id}
              className={`chip ${category === cat._id ? "active" : ""}`}
              onClick={() => setCategory(cat._id)}
            >
              {cat.name}
            </div>
          ))}
        </div>

        {/* POLLS */}
        {filtered.length === 0 ? (
          <div style={{ color: "#9ca3af" }}>
            No polls found
          </div>
        ) : (
          filtered.slice(0, visible).map(p => (
            <div
              key={p._id}
              className="poll-card"
              onClick={() => nav(`/poll/${p._id}`)}
            >
              <div className="question">❓ {p.question}</div>

              <div className="meta">
                {p.category?.name || "General"} • Tap to vote
              </div>
            </div>
          ))
        )}

        {/* FOOTER */}
        <div className="footer">

          {visible < filtered.length && (
            <button
              className="load"
              onClick={() => setVisible(v => v + 5)}
            >
              Load More
            </button>
          )}

          <button className="back" onClick={() => nav("/home")}>
            ← Home
          </button>

        </div>

      </div>
    </>
  );
}