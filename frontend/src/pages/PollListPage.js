// import { useEffect, useState } from "react";
// import { API } from "../api/api";
// import { useNavigate } from "react-router-dom";
// import Navbar from "../components/Navbar";

// export default function PollListPage() {
//   const [polls, setPolls] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [category, setCategory] = useState("all");
//   const [visible, setVisible] = useState(5);

//   const nav = useNavigate();

//   // ================= LOAD POLLS =================
//   useEffect(() => {
//     API.get("/polls").then(res => setPolls(res.data));
//   }, []);

//   // ================= LOAD CATEGORIES =================
//   useEffect(() => {
//     API.get("/categories").then(res => setCategories(res.data));
//   }, []);

//   // ================= FILTER =================
//   const filtered = polls.filter(p =>
//     category === "all"
//       ? true
//       : p.category?._id === category
//   );

//   return (
//     <>
//       <Navbar />

//       <style>{`
//         .page {
//           min-height: 100vh;
//           padding: 30px;
//           background: radial-gradient(circle at top,#1e3a8a,#0b1220 60%);
//           color: white;
//         }

//         .header {
//           display: flex;
//           justify-content: space-between;
//           align-items: center;
//           margin-bottom: 20px;
//         }

//         .title {
//           font-size: 26px;
//           font-weight: 700;
//         }

//         .create-btn {
//           background: #22c55e;
//           border: none;
//           padding: 10px 15px;
//           border-radius: 10px;
//           color: white;
//           cursor: pointer;
//         }

//         .chips {
//           display: flex;
//           gap: 10px;
//           margin-bottom: 25px;
//           flex-wrap: wrap;
//         }

//         .chip {
//           padding: 8px 14px;
//           border-radius: 20px;
//           background: #1f2937;
//           cursor: pointer;
//           font-size: 14px;
//         }

//         .chip.active {
//           background: #3b82f6;
//         }

//         .poll-card {
//           background: #111827;
//           padding: 18px;
//           border-radius: 14px;
//           margin-bottom: 15px;
//           cursor: pointer;
//           transition: 0.25s ease;
//           border: 1px solid rgba(255,255,255,0.05);
//         }

//         .poll-card:hover {
//           transform: translateY(-4px);
//           background: #1f2937;
//           box-shadow: 0 10px 30px rgba(0,0,0,0.4);
//         }

//         .question {
//           font-size: 17px;
//           font-weight: 600;
//           margin-bottom: 6px;
//         }

//         .meta {
//           font-size: 12px;
//           color: #9ca3af;
//         }

//         .footer {
//           margin-top: 20px;
//           display: flex;
//           justify-content: space-between;
//         }

//         .load {
//           background: #22c55e;
//           border: none;
//           padding: 10px 15px;
//           border-radius: 10px;
//           color: white;
//           cursor: pointer;
//         }

//         .back {
//           background: #3b82f6;
//           border: none;
//           padding: 10px 15px;
//           border-radius: 10px;
//           color: white;
//           cursor: pointer;
//         }
//       `}</style>

//       <div className="page">

//         {/* HEADER */}
//         <div className="header">
//           <div className="title">📊 Polls Dashboard</div>

//           <button
//             className="create-btn"
//             onClick={() => nav("/create-poll")}
//           >
//             + Create Poll
//           </button>
//         </div>

//         {/* CATEGORY FILTER (FROM BACKEND) */}
//         <div className="chips">
//           <div
//             className={`chip ${category === "all" ? "active" : ""}`}
//             onClick={() => setCategory("all")}
//           >
//             ALL
//           </div>

//           {categories.map(cat => (
//             <div
//               key={cat._id}
//               className={`chip ${category === cat._id ? "active" : ""}`}
//               onClick={() => setCategory(cat._id)}
//             >
//               {cat.name}
//             </div>
//           ))}
//         </div>

//         {/* POLLS */}
//         {filtered.length === 0 ? (
//           <div style={{ color: "#9ca3af" }}>
//             No polls found
//           </div>
//         ) : (
//           filtered.slice(0, visible).map(p => (
//             <div
//               key={p._id}
//               className="poll-card"
//               onClick={() => nav(`/poll/${p._id}`)}
//             >
//               <div className="question">❓ {p.question}</div>

//               <div className="meta">
//                 {p.category?.name || "General"} • Tap to vote
//               </div>
//             </div>
//           ))
//         )}

//         {/* FOOTER */}
//         <div className="footer">

//           {visible < filtered.length && (
//             <button
//               className="load"
//               onClick={() => setVisible(v => v + 5)}
//             >
//               Load More
//             </button>
//           )}

//           <button className="back" onClick={() => nav("/home")}>
//             ← Home
//           </button>

//         </div>

//       </div>
//     </>
//   );
// }

import { useEffect, useState } from "react";
import { API } from "../api/api";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function PollListPage() {
  const [polls, setPolls] = useState([]);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("all");
  const [visible, setVisible] = useState(5);

  // Mouse hover tracking states for buttons and list rows
  const [hoveredCard, setHoveredCard] = useState(null);
  const [hoveredChip, setHoveredChip] = useState(null);
  const [hoveredBtn, setHoveredBtn] = useState(null);

  const nav = useNavigate();

  // ================= LOAD POLLS (Unchanged Logic) =================
  useEffect(() => {
    API.get("/polls").then(res => setPolls(res.data || []));
  }, []);

  // ================= LOAD CATEGORIES (Unchanged Logic) =================
  useEffect(() => {
    API.get("/categories").then(res => setCategories(res.data || []));
  }, []);

  // ================= FILTER (Unchanged Logic) =================
  const filtered = polls.filter(p =>
    category === "all"
      ? true
      : p.category?._id === category
  );

  // ================= PREMIUM JAVASCRIPT OBJECT STYLES =================
  const styles = {
    page: {
      minHeight: "100vh",
      background: "radial-gradient(circle at top, #0f172a 0%, #030712 70%)",
      color: "#f3f4f6",
      fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      display: "flex",
      flexDirection: "column",
    },
    container: {
      flex: 1,
      maxWidth: "900px",
      width: "100%",
      margin: "0 auto",
      padding: "40px 20px",
      boxSizing: "border-box",
    },
    topBar: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "32px",
      flexWrap: "wrap",
      gap: "16px",
    },
    titleSection: {
      display: "flex",
      flexDirection: "column",
      gap: "4px",
    },
    title: {
      fontSize: "32px",
      fontWeight: "900",
      letterSpacing: "-0.025em",
      margin: 0,
      background: "linear-gradient(to right, #60a5fa, #3b82f6)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
    },
    subTitle: {
      fontSize: "14px",
      color: "#9ca3af",
      margin: 0,
    },
    createBtn: (isHovered) => ({
      background: "linear-gradient(to right, #2563eb, #1d4ed8)",
      color: "#ffffff",
      border: "none",
      padding: "12px 24px",
      borderRadius: "12px",
      fontWeight: "700",
      fontSize: "14px",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      gap: "8px",
      boxShadow: isHovered ? "0 4px 20px rgba(37, 99, 235, 0.4)" : "0 4px 12px rgba(37, 99, 235, 0.15)",
      transform: isHovered ? "translateY(-1px)" : "translateY(0)",
      transition: "all 0.2s ease",
    }),
    chipContainer: {
      display: "flex",
      flexWrap: "wrap",
      gap: "10px",
      marginBottom: "36px",
      paddingBottom: "16px",
      borderBottom: "1px solid rgba(255, 255, 255, 0.06)",
    },
    chip: (isActive, isHovered) => ({
      padding: "10px 20px",
      borderRadius: "24px",
      fontSize: "12px",
      fontWeight: "700",
      letterSpacing: "0.05em",
      textTransform: "uppercase",
      cursor: "pointer",
      background: isActive ? "#2563eb" : isHovered ? "rgba(255, 255, 255, 0.06)" : "rgba(255, 255, 255, 0.02)",
      color: isActive ? "#ffffff" : isHovered ? "#ffffff" : "#9ca3af",
      border: isActive ? "1px solid #3b82f6" : "1px solid rgba(255, 255, 255, 0.06)",
      boxShadow: isActive ? "0 4px 12px rgba(37, 99, 235, 0.3)" : "none",
      transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
    }),
    list: {
      display: "flex",
      flexDirection: "column",
      gap: "16px",
    },
    pollCard: (isHovered) => ({
      background: "rgba(17, 24, 39, 0.4)",
      backdropFilter: "blur(16px)",
      WebkitBackdropFilter: "blur(16px)",
      borderRadius: "16px",
      border: isHovered ? "1px solid rgba(59, 130, 246, 0.35)" : "1px solid rgba(255, 255, 255, 0.05)",
      padding: "24px",
      cursor: "pointer",
      boxShadow: isHovered ? "0 12px 24px rgba(0, 0, 0, 0.3)" : "0 4px 12px rgba(0, 0, 0, 0.15)",
      transform: isHovered ? "translateY(-2px)" : "translateY(0)",
      transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
    }),
    cardHeader: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-start",
      gap: "12px",
      marginBottom: "12px",
    },
    question: {
      fontSize: "16px",
      fontWeight: "600",
      color: "#ffffff",
      lineHeight: "1.5",
      margin: 0,
    },
    metaRow: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      fontSize: "13px",
    },
    categoryBadge: {
      background: "rgba(59, 130, 246, 0.1)",
      color: "#60a5fa",
      padding: "4px 10px",
      borderRadius: "6px",
      fontWeight: "600",
      fontSize: "11px",
      textTransform: "uppercase",
      letterSpacing: "0.02em",
    },
    actionText: (isHovered) => ({
      fontWeight: "700",
      color: isHovered ? "#60a5fa" : "#4b5563",
      transition: "color 0.2s ease",
    }),
    emptyState: {
      textAlign: "center",
      padding: "60px 20px",
      background: "rgba(255, 255, 255, 0.01)",
      border: "1px dashed rgba(255, 255, 255, 0.08)",
      borderRadius: "16px",
      color: "#9ca3af",
      fontSize: "15px",
    },
    footerActions: {
      display: "flex",
      justifyContent: "center",
      gap: "16px",
      marginTop: "40px",
    },
    loadMoreBtn: (isHovered) => ({
      background: "rgba(255, 255, 255, 0.03)",
      color: "#e5e7eb",
      border: "1px solid rgba(255, 255, 255, 0.08)",
      padding: "12px 32px",
      borderRadius: "12px",
      fontWeight: "600",
      fontSize: "14px",
      cursor: "pointer",
      boxShadow: isHovered ? "0 4px 12px rgba(0, 0, 0, 0.2)" : "none",
      background: isHovered ? "rgba(255, 255, 255, 0.06)" : "rgba(255, 255, 255, 0.03)",
      transition: "all 0.2s ease",
    })
  };

  return (
    <div style={styles.page}>
      <Navbar />

      <div style={styles.container}>
        
        {/* ================= HEADER ACTION BAR ================= */}
        <div style={styles.topBar}>
          <div style={styles.titleSection}>
            <h1 style={styles.title}>Public Polls</h1>
            <p style={styles.subTitle}>Cast your vote on ongoing community metrics and queries.</p>
          </div>
          <button
            style={styles.createBtn(hoveredBtn === "create")}
            onMouseEnter={() => setHoveredBtn("create")}
            onMouseLeave={() => setHoveredBtn(null)}
            onClick={() => nav("/create-poll")}
          >
            <span>+</span> Create New Poll
          </button>
        </div>

        {/* ================= CATEGORY FILTER TABS ================= */}
        <div style={styles.chipContainer}>
          <button
            style={styles.chip(category === "all", hoveredChip === "all")}
            onMouseEnter={() => setHoveredChip("all")}
            onMouseLeave={() => setHoveredChip(null)}
            onClick={() => { setCategory("all"); setVisible(5); }}
          >
            All Feeds
          </button>

          {categories.map((cat) => (
            <button
              key={cat._id}
              style={styles.chip(category === cat._id, hoveredChip === cat._id)}
              onMouseEnter={() => setHoveredChip(cat._id)}
              onMouseLeave={() => setHoveredChip(null)}
              onClick={() => { setCategory(cat._id); setVisible(5); }}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* ================= POLLS DATAFEED CONTAINER ================= */}
        <div style={styles.list}>
          {filtered.length === 0 ? (
            <div style={styles.emptyState}>
              <div style={{ fontSize: "24px", marginBottom: "8px" }}>🔍</div>
              No active discussion polls found in this category.
            </div>
          ) : (
            filtered.slice(0, visible).map((p) => {
              const isCardHovered = hoveredCard === p._id;
              return (
                <div
                  key={p._id}
                  style={styles.pollCard(isCardHovered)}
                  onMouseEnter={() => setHoveredCard(p._id)}
                  onMouseLeave={() => setHoveredCard(null)}
                  onClick={() => nav(`/poll/${p._id}`)}
                >
                  <div style={styles.cardHeader}>
                    <h3 style={styles.question}>❓ {p.question}</h3>
                  </div>
                  
                  <div style={styles.metaRow}>
                    <span style={styles.categoryBadge}>
                      {p.category?.name || "General"}
                    </span>
                    <span style={styles.actionText(isCardHovered)}>
                      Cast Vote &rarr;
                    </span>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* ================= PAGINATION CONTROLS ================= */}
        <div style={styles.footerActions}>
          {visible < filtered.length && (
            <button
              style={styles.loadMoreBtn(hoveredBtn === "load")}
              onMouseEnter={() => setHoveredBtn("load")}
              onMouseLeave={() => setHoveredBtn(null)}
              onClick={() => setVisible((v) => v + 5)}
            >
              Load More Polls
            </button>
          )}
        </div>

      </div>
    </div>
  );
}