import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useState, useEffect } from "react";
import { API } from "../api/api";
import "../styles/home.css"

export default function Home() {
  const nav = useNavigate();

  const [polls, setPolls] = useState([]);
  const [surveys, setSurveys] = useState([]);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("all");

  // ================= FETCH DATA =================
  useEffect(() => {
    fetchPolls();
    fetchSurveys();
    fetchCategories();
  }, []);

  const fetchPolls = async () => {
    try {
      const res = await API.get("/polls");
      setPolls(res.data || []);
    } catch (err) {
      console.log(err);
      setPolls([]);
    }
  };

  const fetchSurveys = async () => {
    try {
      const res = await API.get("/surveys");
      setSurveys(res.data || []);
    } catch (err) {
      console.log(err);
      setSurveys([]);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await API.get("/categories");
      setCategories(res.data || []);
    } catch (err) {
      console.log(err);
      setCategories([]);
    }
  };

  // ================= FILTERS =================

  // POLLS FILTER
  const filteredPolls = polls.filter((p) => {
    if (category === "all") return true;

    return (
      (p.category?.name || p.category || "")
        .toLowerCase()
        .trim() === category.toLowerCase().trim()
    );
  });

  // SURVEYS FILTER
  const filteredSurveys = surveys.filter((s) => {
    if (category === "all") return true;

    return (
      (s.category?.name || s.category || "")
        .toLowerCase()
        .trim() === category.toLowerCase().trim()
    );
  });

  return (
    <>
      <Navbar />

      <div className="home-container">

        {/* ================= HERO ================= */}
        <div className="hero">
          <div className="section-inner">

            <div className="hero-bg-glow"></div>
            <div className="hero-grid"></div>

            <div className="hero-inner">

              {/* LEFT */}
              <div className="hero-left">
                <h1>
                  Discover <span>what people think</span>
                  <br />
                  in a simple way
                </h1>

                <p className="hero-sub">
                  Answer quick polls, explore surveys, and see different perspectives.
                </p>

                <div className="hero-actions">

                  <button
                    className="hero-btn primary"
                    onClick={() => nav("/polls")}
                  >
                    Browse Polls
                  </button>

                  <button
                    className="hero-btn secondary"
                    onClick={() => nav("/surveys")}
                  >
                    Browse Surveys
                  </button>

                </div>
              </div>

              {/* RIGHT */}
              <div className="hero-right">

                <div className="hero-card floating">
                  📊 Quick polls you can answer in seconds
                </div>

                <div className="hero-card floating delay">
                  🧠 Thoughtful surveys worth your time
                </div>

                <div className="hero-card floating slow">
                  ⚡ Real opinions from real people
                </div>

              </div>

            </div>
          </div>
        </div>

        {/* ================= CONTENT ================= */}
        <div className="content-section">
          <div className="section-inner">

            <div className="content-bg-glow"></div>
            <div className="content-grid"></div>

            {/* CATEGORY */}
            <div className="category-bar">

              <button
                onClick={() => setCategory("all")}
                className={category === "all" ? "active-cat" : ""}
              >
                ALL
              </button>

              {categories.map((cat) => (
                <button
                  key={cat._id}
                  onClick={() => setCategory(cat.name)}
                  className={
                    category === cat.name ? "active-cat" : ""
                  }
                >
                  {cat.name.toUpperCase()}
                </button>
              ))}

            </div>

            {/* CARDS */}
            <div className="container">

              {/* POLLS */}
              <div className="card">

                <div className="title">📊 Polls</div>

                <button
                  className="btn poll-btn"
                  onClick={() => nav("/polls")}
                >
                  View All Polls
                </button>

                {filteredPolls.length === 0 ? (
                  <div className="empty">
                    No polls found
                  </div>
                ) : (
                  filteredPolls.slice(0, 5).map((p) => (
                    <div
                      key={p._id}
                      className="item"
                      onClick={() => nav(`/poll/${p._id}`)}
                    >
                      {p.question}
                    </div>
                  ))
                )}

              </div>

              {/* SURVEYS */}
              <div className="card">

                <div className="title">🧠 Surveys</div>

                <button
                  className="btn survey-btn"
                  onClick={() => nav("/surveys")}
                >
                  View All Surveys
                </button>

                {filteredSurveys.length === 0 ? (
                  <div className="empty">
                    No surveys found
                  </div>
                ) : (
                  filteredSurveys.slice(0, 5).map((s) => (
                    <div
                      key={s._id}
                      className="item"
                      onClick={() => nav(`/survey/${s._id}`)}
                    >
                      {s.title}
                    </div>
                  ))
                )}

              </div>

            </div>
          </div>
        </div>

        {/* ================= FOOTER ================= */}
        <div className="footer">

          <div className="footer-inner">

            <div className="footer-left">
              <h3>InsightHub</h3>
              <p>Simple tools to understand what people think.</p>
            </div>

            <div className="footer-links">

              <span onClick={() => nav("/polls")}>
                Polls
              </span>

              <span onClick={() => nav("/surveys")}>
                Surveys
              </span>

              <span>About</span>

            </div>

          </div>

          <div className="footer-bottom">
            © 2026 InsightHub
          </div>

        </div>

      </div>
    </>
  );
}