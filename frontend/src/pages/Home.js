// import { useNavigate } from "react-router-dom";
// import Navbar from "../components/Navbar";
// import { useState, useEffect } from "react";
// import { API } from "../api/api";
// import "../styles/home.css"

// export default function Home() {
//   const nav = useNavigate();

//   const [polls, setPolls] = useState([]);
//   const [surveys, setSurveys] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [category, setCategory] = useState("all");

//   // ================= FETCH DATA =================
//   useEffect(() => {
//     fetchPolls();
//     fetchSurveys();
//     fetchCategories();
//   }, []);

//   const fetchPolls = async () => {
//     try {
//       const res = await API.get("/polls");
//       setPolls(res.data || []);
//     } catch (err) {
//       console.log(err);
//       setPolls([]);
//     }
//   };

//   const fetchSurveys = async () => {
//     try {
//       const res = await API.get("/surveys");
//       setSurveys(res.data || []);
//     } catch (err) {
//       console.log(err);
//       setSurveys([]);
//     }
//   };

//   const fetchCategories = async () => {
//     try {
//       const res = await API.get("/categories");
//       setCategories(res.data || []);
//     } catch (err) {
//       console.log(err);
//       setCategories([]);
//     }
//   };

//   // ================= FILTERS =================

//   // POLLS FILTER
//   const filteredPolls = polls.filter((p) => {
//     if (category === "all") return true;

//     return (
//       (p.category?.name || p.category || "")
//         .toLowerCase()
//         .trim() === category.toLowerCase().trim()
//     );
//   });

//   // SURVEYS FILTER
//   const filteredSurveys = surveys.filter((s) => {
//     if (category === "all") return true;

//     return (
//       (s.category?.name || s.category || "")
//         .toLowerCase()
//         .trim() === category.toLowerCase().trim()
//     );
//   });

//   return (
//     <>
//       <Navbar />

//       <div className="home-container">

//         {/* ================= HERO ================= */}
//         <div className="hero">
//           <div className="section-inner">

//             <div className="hero-bg-glow"></div>
//             <div className="hero-grid"></div>

//             <div className="hero-inner">

//               {/* LEFT */}
//               <div className="hero-left">
//                 <h1>
//                   Discover <span>what people think</span>
//                   <br />
//                   in a simple way
//                 </h1>

//                 <p className="hero-sub">
//                   Answer quick polls, explore surveys, and see different perspectives.
//                 </p>

//                 <div className="hero-actions">

//                   <button
//                     className="hero-btn primary"
//                     onClick={() => nav("/polls")}
//                   >
//                     Browse Polls
//                   </button>

//                   <button
//                     className="hero-btn secondary"
//                     onClick={() => nav("/surveys")}
//                   >
//                     Browse Surveys
//                   </button>

//                 </div>
//               </div>

//               {/* RIGHT */}
//               <div className="hero-right">

//                 <div className="hero-card floating">
//                   📊 Quick polls you can answer in seconds
//                 </div>

//                 <div className="hero-card floating delay">
//                   🧠 Thoughtful surveys worth your time
//                 </div>

//                 <div className="hero-card floating slow">
//                   ⚡ Real opinions from real people
//                 </div>

//               </div>

//             </div>
//           </div>
//         </div>

//         {/* ================= CONTENT ================= */}
//         <div className="content-section">
//           <div className="section-inner">

//             <div className="content-bg-glow"></div>
//             <div className="content-grid"></div>

//             {/* CATEGORY */}
//             <div className="category-bar">

//               <button
//                 onClick={() => setCategory("all")}
//                 className={category === "all" ? "active-cat" : ""}
//               >
//                 ALL
//               </button>

//               {categories.map((cat) => (
//                 <button
//                   key={cat._id}
//                   onClick={() => setCategory(cat.name)}
//                   className={
//                     category === cat.name ? "active-cat" : ""
//                   }
//                 >
//                   {cat.name.toUpperCase()}
//                 </button>
//               ))}

//             </div>

//             {/* CARDS */}
//             <div className="container">

//               {/* POLLS */}
//               <div className="card">

//                 <div className="title">📊 Polls</div>

//                 <button
//                   className="btn poll-btn"
//                   onClick={() => nav("/polls")}
//                 >
//                   View All Polls
//                 </button>

//                 {filteredPolls.length === 0 ? (
//                   <div className="empty">
//                     No polls found
//                   </div>
//                 ) : (
//                   filteredPolls.slice(0, 5).map((p) => (
//                     <div
//                       key={p._id}
//                       className="item"
//                       onClick={() => nav(`/poll/${p._id}`)}
//                     >
//                       {p.question}
//                     </div>
//                   ))
//                 )}

//               </div>

//               {/* SURVEYS */}
//               <div className="card">

//                 <div className="title">🧠 Surveys</div>

//                 <button
//                   className="btn survey-btn"
//                   onClick={() => nav("/surveys")}
//                 >
//                   View All Surveys
//                 </button>

//                 {filteredSurveys.length === 0 ? (
//                   <div className="empty">
//                     No surveys found
//                   </div>
//                 ) : (
//                   filteredSurveys.slice(0, 5).map((s) => (
//                     <div
//                       key={s._id}
//                       className="item"
//                       onClick={() => nav(`/survey/${s._id}`)}
//                     >
//                       {s.title}
//                     </div>
//                   ))
//                 )}

//               </div>

//             </div>
//           </div>
//         </div>

//         {/* ================= FOOTER ================= */}
//         <div className="footer">

//           <div className="footer-inner">

//             <div className="footer-left">
//               <h3>InsightHub</h3>
//               <p>Simple tools to understand what people think.</p>
//             </div>

//             <div className="footer-links">

//               <span onClick={() => nav("/polls")}>
//                 Polls
//               </span>

//               <span onClick={() => nav("/surveys")}>
//                 Surveys
//               </span>

//               <span>About</span>

//             </div>

//           </div>

//           <div className="footer-bottom">
//             © 2026 InsightHub
//           </div>

//         </div>

//       </div>
//     </>
//   );
// }

import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useState, useEffect } from "react";
import { API } from "../api/api";

export default function Home() {
  const nav = useNavigate();

  // State arrays (100% intact from your original design)
  const [polls, setPolls] = useState([]);
  const [surveys, setSurveys] = useState([]);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("all");

  // Hover states managed purely in React variables to eliminate CSS compilation bugs
  const [hoveredItem, setHoveredItem] = useState(null);
  const [hoveredButton, setHoveredButton] = useState(null);

  // ================= FETCH DATA (Kept perfectly functional) =================
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

  // ================= FILTERS (Logic completely unmodified) =================
  const filteredPolls = polls.filter((p) => {
    if (category === "all") return true;
    return (
      (p.category?.name || p.category || "")
        .toLowerCase()
        .trim() === category.toLowerCase().trim()
    );
  });

  const filteredSurveys = surveys.filter((s) => {
    if (category === "all") return true;
    return (
      (s.category?.name || s.category || "")
        .toLowerCase()
        .trim() === category.toLowerCase().trim()
    );
  });

  // ================= inline JAVASCRIPT OBJECT STYLES =================
  const styles = {
    wrapper: {
      backgroundColor: "#030712",
      color: "#f3f4f6",
      minHeight: "100vh",
      fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      display: "flex",
      flexDirection: "column",
    },
    main: {
      flex: 1,
      maxWidth: "1200px",
      width: "100%",
      margin: "0 auto",
      padding: "40px 20px",
      boxSizing: "border-box",
    },
    heroBanner: {
      position: "relative",
      background: "linear-gradient(135deg, rgba(30, 58, 138, 0.4) 0%, rgba(15, 23, 42, 0.9) 100%)",
      borderRadius: "24px",
      border: "1px solid rgba(255, 255, 255, 0.08)",
      padding: "50px",
      marginBottom: "40px",
      overflow: "hidden",
      boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3)",
    },
    glowOrb: {
      position: "absolute",
      top: "-100px",
      right: "-100px",
      width: "300px",
      height: "300px",
      background: "rgba(59, 130, 246, 0.15)",
      borderRadius: "50%",
      filter: "blur(80px)",
      pointerEvents: "none",
    },
    heroHeading: {
      fontSize: "42px",
      fontWeight: "900",
      letterSpacing: "-0.025em",
      margin: "0 0 16px 0",
      lineHeight: "1.2",
    },
    accentText: {
      background: "linear-gradient(to right, #60a5fa, #a5b4fc)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
    },
    heroSub: {
      color: "#9ca3af",
      fontSize: "16px",
      lineHeight: "1.6",
      maxWidth: "600px",
      margin: "0 0 24px 0",
    },
    heroBtnGroup: {
      display: "flex",
      gap: "16px",
    },
    primaryBtn: {
      background: "#2563eb",
      color: "#ffffff",
      border: "none",
      padding: "12px 24px",
      borderRadius: "12px",
      fontWeight: "600",
      fontSize: "14px",
      cursor: "pointer",
      transition: "all 0.2s ease",
      boxShadow: "0 4px 12px rgba(37, 99, 235, 0.3)",
    },
    secondaryBtn: {
      background: "rgba(255, 255, 255, 0.05)",
      color: "#d1d5db",
      border: "1px solid rgba(255, 255, 255, 0.1)",
      padding: "12px 24px",
      borderRadius: "12px",
      fontWeight: "600",
      fontSize: "14px",
      cursor: "pointer",
      transition: "all 0.2s ease",
    },
    filterLabel: {
      fontSize: "11px",
      fontWeight: "700",
      textTransform: "uppercase",
      letterSpacing: "0.15em",
      color: "#6b7280",
      display: "block",
      marginBottom: "12px",
    },
    filterBar: {
      display: "flex",
      flexWrap: "wrap",
      gap: "8px",
      paddingBottom: "16px",
      borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
      marginBottom: "40px",
    },
    catChip: (isActive) => ({
      padding: "8px 16px",
      borderRadius: "20px",
      fontSize: "12px",
      fontWeight: "700",
      letterSpacing: "0.05em",
      textTransform: "uppercase",
      cursor: "pointer",
      border: isActive ? "1px solid #3b82f6" : "1px solid rgba(255, 255, 255, 0.08)",
      background: isActive ? "#2563eb" : "rgba(255, 255, 255, 0.02)",
      color: isActive ? "#ffffff" : "#9ca3af",
      transition: "all 0.2s ease",
    }),
    gridContainer: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(450px, 1xl))",
      gap: "32px",
    },
    dashboardCard: {
      background: "rgba(17, 24, 39, 0.4)",
      backdropFilter: "blur(12px)",
      WebkitBackdropFilter: "blur(12px)",
      border: "1px solid rgba(255, 255, 255, 0.05)",
      borderRadius: "20px",
      padding: "28px",
      boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)",
    },
    cardHeader: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "24px",
    },
    cardTitle: {
      display: "flex",
      alignItems: "center",
      gap: "10px",
      fontSize: "20px",
      fontWeight: "700",
      margin: 0,
      color: "#ffffff",
    },
    viewAllLink: {
      background: "none",
      border: "none",
      color: "#60a5fa",
      fontSize: "13px",
      fontWeight: "600",
      cursor: "pointer",
      padding: 0,
    },
    feedList: {
      display: "flex",
      flexDirection: "column",
      gap: "12px",
    },
    feedItem: (isHovered) => ({
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "16px",
      background: isHovered ? "rgba(255, 255, 255, 0.04)" : "rgba(255, 255, 255, 0.01)",
      borderRadius: "12px",
      border: isHovered ? "1px solid rgba(59, 130, 246, 0.3)" : "1px solid rgba(255, 255, 255, 0.04)",
      cursor: "pointer",
      transform: isHovered ? "translateX(4px)" : "none",
      transition: "all 0.2s ease",
    }),
    itemText: {
      fontSize: "14px",
      color: "#e5e7eb",
      fontWeight: "500",
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
      maxWidth: "75%",
    },
    actionLabel: (isHovered, color) => ({
      fontSize: "12px",
      fontWeight: "700",
      color: isHovered ? color : "#4b5563",
      transition: "color 0.2s ease",
    }),
    emptyState: {
      fontSize: "14px",
      color: "#4b5563",
      padding: "40px",
      textAlign: "center",
      border: "1px dashed rgba(255, 255, 255, 0.08)",
      borderRadius: "12px",
      background: "rgba(255, 255, 255, 0.005)",
    },
    footer: {
      marginTop: "80px",
      borderTop: "1px solid rgba(255, 255, 255, 0.08)",
      background: "#020617",
      padding: "40px 20px",
    },
    footerInner: {
      maxWidth: "1200px",
      margin: "0 auto",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      flexWrap: "wrap",
      gap: "24px",
    },
    footerBrand: {
      fontSize: "16px",
      fontWeight: "700",
      color: "#f3f4f6",
      margin: "0 0 4px 0",
    },
    footerSubtext: {
      fontSize: "13px",
      color: "#6b7280",
      margin: 0,
    },
    footerLinks: {
      display: "flex",
      gap: "24px",
      fontSize: "13px",
      color: "#9ca3af",
    },
    footerLinkItem: {
      cursor: "pointer",
      transition: "color 0.2s ease",
    }
  };

  return (
    <div style={styles.wrapper}>
      <Navbar />

      <main style={styles.main}>
        {/* ================= HERO HERO BANNER ================= */}
        <div style={styles.heroBanner}>
          <div style={styles.glowOrb} />
          <h1 style={styles.heroHeading}>
            Discover <span style={styles.accentText}>what people think</span>
          </h1>
          <p style={styles.heroSub}>
            Answer quick community polls, explore deep custom surveys, or query distributed perspectives live across data categories.
          </p>
          <div style={styles.heroBtnGroup}>
            <button onClick={() => nav("/polls")} style={styles.primaryBtn}>
              Browse Polls
            </button>
            <button onClick={() => nav("/surveys")} style={styles.secondaryBtn}>
              Browse Surveys
            </button>
          </div>
        </div>

        {/* ================= CATEGORY FILTER LINE ================= */}
        <div>
          <span style={styles.filterLabel}>Filter Feed</span>
          <div style={styles.filterBar}>
            <button
              onClick={() => setCategory("all")}
              style={styles.catChip(category === "all")}
            >
              ALL FEEDS
            </button>
            {categories.map((cat) => (
              <button
                key={cat._id}
                onClick={() => setCategory(cat.name)}
                style={styles.catChip(category === cat.name)}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* ================= COLUMNS HOUSING FEEDS ================= */}
        <div style={styles.gridContainer}>
          
          {/* POLLS CARD CONTAINER */}
          <div style={styles.dashboardCard}>
            <div style={styles.cardHeader}>
              <h2 style={styles.cardTitle}>
                <span>📊</span> Active Polls
              </h2>
              <button onClick={() => nav("/polls")} style={styles.viewAllLink}>
                View All &rarr;
              </button>
            </div>

            <div style={styles.feedList}>
              {filteredPolls.length === 0 ? (
                <div style={styles.emptyState}>No active polls found matching criteria.</div>
              ) : (
                filteredPolls.slice(0, 5).map((p) => {
                  const itemId = `poll-${p._id}`;
                  const isHovered = hoveredItem === itemId;
                  return (
                    <div
                      key={p._id}
                      style={styles.feedItem(isHovered)}
                      onMouseEnter={() => setHoveredItem(itemId)}
                      onMouseLeave={() => setHoveredItem(null)}
                      onClick={() => nav(`/poll/${p._id}`)}
                    >
                      <span style={styles.itemText}>{p.question}</span>
                      <span style={styles.actionLabel(isHovered, "#60a5fa")}>Vote Now</span>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* SURVEYS CARD CONTAINER */}
          <div style={styles.dashboardCard}>
            <div style={styles.cardHeader}>
              <h2 style={styles.cardTitle}>
                <span>🧠</span> Deep Surveys
              </h2>
              <button onClick={() => nav("/surveys")} style={styles.viewAllLink}>
                View All &rarr;
              </button>
            </div>

            <div style={styles.feedList}>
              {filteredSurveys.length === 0 ? (
                <div style={styles.emptyState}>No open surveys found matching criteria.</div>
              ) : (
                filteredSurveys.slice(0, 5).map((s) => {
                  const itemId = `survey-${s._id}`;
                  const isHovered = hoveredItem === itemId;
                  return (
                    <div
                      key={s._id}
                      style={styles.feedItem(isHovered)}
                      onMouseEnter={() => setHoveredItem(itemId)}
                      onMouseLeave={() => setHoveredItem(null)}
                      onClick={() => nav(`/survey/${s._id}`)}
                    >
                      <span style={styles.itemText}>{s.title}</span>
                      <span style={styles.actionLabel(isHovered, "#a5b4fc")}>Analyze</span>
                    </div>
                  );
                })
              )}
            </div>
          </div>

        </div>
      </main>

      {/* ================= APP FOOTER ================= */}
      <footer style={styles.footer}>
        <div style={styles.footerInner}>
          <div>
            <h4 style={styles.footerBrand}>InsightHub Engine</h4>
            <p style={styles.footerSubtext}>Data pipeline visualization system active.</p>
          </div>
          <div style={styles.footerLinks}>
            <span onClick={() => nav("/polls")} style={styles.footerLinkItem}>Polls</span>
            <span onClick={() => nav("/surveys")} style={styles.footerLinkItem}>Surveys</span>
            <span style={styles.footerLinkItem}>System Status</span>
          </div>
          <p style={{ ...styles.footerSubtext, color: "#4b5563" }}>
            © 2026 PollHub App Pipeline
          </p>
        </div>
      </footer>
    </div>
  );
}