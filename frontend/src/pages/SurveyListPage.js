// import { useEffect, useState } from "react";
// import { API } from "../api/api";
// import { useNavigate } from "react-router-dom";
// import Navbar from "../components/Navbar";

// export default function SurveyListPage() {

//   const [surveys, setSurveys] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const nav = useNavigate();

//   useEffect(() => {
//     loadSurveys();
//   }, []);

//   const loadSurveys = async () => {
//     try {

//       setLoading(true);

//       const res = await API.get("/surveys");

//       setSurveys(res.data || []);

//     } catch (err) {

//       console.log(err);

//       setSurveys([]);

//     } finally {

//       setLoading(false);

//     }
//   };

//   return (
//     <>
//       <Navbar />

//       <div className="page">

//         <div className="container">

//           {/* HEADER */}
//           <div className="header">

//             <div className="title">
//               🧠 Surveys Dashboard
//             </div>

//             <button
//               className="create-btn"
//               onClick={() => nav("/create-survey")}
//             >
//               + Create Survey
//             </button>

//           </div>

//           {/* CONTENT */}

//           {loading ? (

//             <p>Loading surveys...</p>

//           ) : surveys.length === 0 ? (

//             <p>No surveys found</p>

//           ) : (

//             surveys.map((s) => (

//               <div
//                 key={s._id}
//                 className="card"
//                 onClick={() => nav(`/survey/${s._id}`)}
//               >

//                 <h3>{s.title}</h3>

//                 <p className="category">
//                   Category: {s.category?.name || "No Category"}
//                 </p>

//               </div>

//             ))

//           )}

//           {/* BACK BUTTON */}

//           <button
//             className="back-btn"
//             onClick={() => nav("/home")}
//           >
//             ← Back Home
//           </button>

//         </div>

//       </div>

//       <style>{`
//         .page{
//           min-height:100vh;
//           background:radial-gradient(circle at top,#1e3a8a,#0b1220 60%);
//           color:white;
//           padding:30px;
//         }

//         .container{
//           max-width:750px;
//           margin:auto;
//         }

//         .header{
//           display:flex;
//           justify-content:space-between;
//           align-items:center;
//           margin-bottom:20px;
//         }

//         .title{
//           font-size:28px;
//           font-weight:bold;
//         }

//         .create-btn{
//           background:#22c55e;
//           border:none;
//           padding:10px 15px;
//           border-radius:10px;
//           color:white;
//           cursor:pointer;
//           font-weight:bold;
//           transition:0.2s;
//         }

//         .create-btn:hover{
//           background:#16a34a;
//           transform:scale(1.05);
//         }

//         .card{
//           background:#111827;
//           padding:18px;
//           margin:12px 0;
//           border-radius:12px;
//           cursor:pointer;
//           transition:0.2s;
//           border:1px solid transparent;
//         }

//         .card:hover{
//           background:#1f2937;
//           transform:scale(1.02);
//           border-color:#3b82f6;
//         }

//         .category{
//           opacity:0.7;
//           margin-top:5px;
//         }

//         .back-btn{
//           margin-top:20px;
//           padding:10px 15px;
//           border:none;
//           background:#3b82f6;
//           color:white;
//           border-radius:8px;
//           cursor:pointer;
//         }

//         .back-btn:hover{
//           background:#2563eb;
//         }
//       `}</style>
//     </>
//   );
// }


import { useEffect, useState } from "react";
import { API } from "../api/api";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function SurveyListPage() {
  const [surveys, setSurveys] = useState([]);
  const [loading, setLoading] = useState(true);

  // Interaction tracking state pointers
  const [hoveredCard, setHoveredCard] = useState(null);
  const [hoveredBtn, setHoveredBtn] = useState(false);

  const nav = useNavigate();

  useEffect(() => {
    loadSurveys();
  }, []);

  const loadSurveys = async () => {
    try {
      setLoading(true);
      const res = await API.get("/surveys");
      setSurveys(res.data || []);
    } catch (err) {
      console.log(err);
      setSurveys([]);
    } finally {
      setLoading(false);
    }
  };

  const styles = {
    page: {
      minHeight: "100vh",
      background: "radial-gradient(circle at top, #0f172a 0%, #030712 80%)",
      color: "#f3f4f6",
      fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      display: "flex",
      flexDirection: "column",
    },
    container: {
      flex: 1,
      maxWidth: "800px",
      width: "100%",
      margin: "0 auto",
      padding: "40px 20px",
      boxSizing: "border-box",
    },
    header: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "36px",
      gap: "16px",
      flexWrap: "wrap",
    },
    title: {
      fontSize: "30px",
      fontWeight: "900",
      letterSpacing: "-0.025em",
      margin: 0,
      background: "linear-gradient(to right, #60a5fa, #c084fc)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
    },
    createBtn: (isHovered) => ({
      background: "linear-gradient(to right, #3b82f6, #8b5cf6)",
      color: "#ffffff",
      border: "none",
      padding: "12px 24px",
      borderRadius: "12px",
      fontWeight: "700",
      fontSize: "14px",
      cursor: "pointer",
      boxShadow: isHovered ? "0 4px 20px rgba(139, 92, 246, 0.4)" : "0 4px 12px rgba(139, 92, 246, 0.15)",
      transform: isHovered ? "translateY(-1px)" : "translateY(0)",
      transition: "all 0.2s ease",
    }),
    card: (isHovered) => ({
      background: "rgba(17, 24, 39, 0.45)",
      backdropFilter: "blur(16px)",
      WebkitBackdropFilter: "blur(16px)",
      padding: "24px",
      margin: "0 0 16px 0",
      borderRadius: "16px",
      border: isHovered ? "1px solid rgba(139, 92, 246, 0.35)" : "1px solid rgba(255, 255, 255, 0.05)",
      cursor: "pointer",
      boxShadow: isHovered ? "0 12px 24px rgba(0, 0, 0, 0.3)" : "0 4px 12px rgba(0, 0, 0, 0.15)",
      transform: isHovered ? "translateY(-2px)" : "translateY(0)",
      transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
    }),
    cardTitle: {
      fontSize: "18px",
      fontWeight: "700",
      color: "#ffffff",
      margin: "0 0 8px 0",
    },
    metaRow: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      fontSize: "13px",
    },
    badge: {
      background: "rgba(139, 92, 246, 0.12)",
      color: "#a78bfa",
      padding: "4px 10px",
      borderRadius: "6px",
      fontWeight: "600",
      textTransform: "uppercase",
      fontSize: "11px",
      letterSpacing: "0.02em",
    },
    actionText: (isHovered) => ({
      fontWeight: "700",
      color: isHovered ? "#a78bfa" : "#4b5563",
      transition: "color 0.2s ease",
    }),
    loading: {
      textAlign: "center",
      fontSize: "16px",
      color: "#9ca3af",
      padding: "60px 0",
    }
  };

  return (
    <div style={styles.page}>
      <Navbar />
      <div style={styles.container}>
        
        <div style={styles.header}>
          <h1 style={styles.title}>Surveys Dashboard</h1>
          <button
            style={styles.createBtn(hoveredBtn)}
            onMouseEnter={() => setHoveredBtn(true)}
            onMouseLeave={() => setHoveredBtn(false)}
            onClick={() => nav("/create-survey")}
          >
            + Create Survey
          </button>
        </div>

        {loading ? (
          <div style={styles.loading}>Loading public surveys dataset...</div>
        ) : surveys.length === 0 ? (
          <div style={{ ...styles.loading, border: "1px dashed rgba(255,255,255,0.08)", borderRadius: "16px" }}>
            No active surveys published yet.
          </div>
        ) : (
          surveys.map((s) => {
            const isHovered = hoveredCard === s._id;
            return (
              <div
                key={s._id}
                style={styles.card(isHovered)}
                onMouseEnter={() => setHoveredCard(s._id)}
                onMouseLeave={() => setHoveredCard(null)}
                onClick={() => nav(`/survey/${s._id}`)}
              >
                <h3 style={styles.cardTitle}>📋 {s.title}</h3>
                <div style={styles.metaRow}>
                  <span style={styles.badge}>
                    {s.category?.name || "General Research"}
                  </span>
                  <span style={styles.actionText(isHovered)}>
                    Begin Survey &rarr;
                  </span>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}