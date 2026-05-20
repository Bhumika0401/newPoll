// import { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { API } from "../api/api";
// import Navbar from "../components/Navbar";

// export default function PollPage() {
//   const { id } = useParams();
//   const nav = useNavigate();

//   const [poll, setPoll] = useState(null);
//   const [voted, setVoted] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [selectedOption, setSelectedOption] = useState(null);

//   // ================= FETCH POLL =================
//   useEffect(() => {
//     if (id) {
//       fetchPoll();
//     }
//   }, [id]);

//   const fetchPoll = async () => {
//     try {
//       setLoading(true);

//       const res = await API.get(`/polls/${id}`, {
//         withCredentials: true,
//       });

//       const pollData = res.data;

//       setPoll(pollData);

//       // ================= CHECK USER VOTE =================
//       const userId = pollData.currentUserId;

//       if (userId && pollData.responses) {
//         const userVote = pollData.responses.find(
//           (r) =>
//             r.user?.toString() === userId.toString()
//         );

//         if (userVote) {
//           setVoted(true);
//           setSelectedOption(
//             userVote.selectedOption?.toString()
//           );
//         } else {
//           setVoted(false);
//           setSelectedOption(null);
//         }
//       }

//     } catch (err) {
//       console.log("Fetch poll error:", err);
//       setPoll(null);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ================= VOTE =================
//   const vote = async (optionId) => {
//     try {
//       const res = await API.post(
//         "/polls/vote",
//         {
//           pollId: id,
//           optionId,
//         },
//         {
//           withCredentials: true,
//         }
//       );

//       setVoted(true);
//       setSelectedOption(optionId);

//       // refresh latest poll data
//       setPoll(res.data.poll);

//     } catch (err) {
//       console.log(err);

//       alert(
//         err.response?.data?.msg ||
//           "Voting failed"
//       );
//     }
//   };

//   // ================= TOTAL VOTES =================
//   const getTotalVotes = () => {
//     return (
//       poll?.options?.reduce(
//         (sum, option) => sum + option.votes,
//         0
//       ) || 0
//     );
//   };

//   // ================= PERCENTAGE =================
//   const getPercent = (votes) => {
//     const total = getTotalVotes();

//     if (total === 0) return 0;

//     return Math.round((votes / total) * 100);
//   };

//   // ================= LOADING =================
//   if (loading) {
//     return (
//       <>
//         <Navbar />

//         <div
//           style={{
//             color: "white",
//             textAlign: "center",
//             marginTop: "100px",
//           }}
//         >
//           Loading...
//         </div>
//       </>
//     );
//   }

//   // ================= NOT FOUND =================
//   if (!poll) {
//     return (
//       <>
//         <Navbar />

//         <div
//           style={{
//             color: "white",
//             textAlign: "center",
//             marginTop: "100px",
//           }}
//         >
//           ❌ Poll not found
//         </div>
//       </>
//     );
//   }

//   return (
//     <>
//       <Navbar />

//       <style>{`
//         .page {
//           min-height: 100vh;
//           display: flex;
//           justify-content: center;
//           align-items: center;
//           background: radial-gradient(circle at top,#1e3a8a,#0b1220 60%);
//           padding: 20px;
//           color: white;
//         }

//         .card {
//           width: 100%;
//           max-width: 550px;
//           background: #111827;
//           padding: 30px;
//           border-radius: 20px;
//           box-shadow: 0 10px 40px rgba(0,0,0,0.5);
//         }

//         .question {
//           font-size: 28px;
//           font-weight: bold;
//           text-align: center;
//           margin-bottom: 25px;
//         }

//         .voted-box {
//           background: #14532d;
//           color: #22c55e;
//           padding: 12px;
//           border-radius: 10px;
//           text-align: center;
//           margin-bottom: 20px;
//           font-weight: bold;
//         }

//         .option-wrapper {
//           margin-bottom: 18px;
//         }

//         .option {
//           background: #1f2937;
//           padding: 14px;
//           border-radius: 12px;
//           cursor: pointer;
//           transition: 0.3s;
//           display: flex;
//           justify-content: space-between;
//           align-items: center;
//           border: 2px solid transparent;
//         }

//         .option:hover {
//           background: #374151;
//         }

//         .selected {
//           border: 2px solid #22c55e;
//           background: #14532d;
//         }

//         .disabled {
//           cursor: not-allowed;
//           opacity: 0.8;
//         }

//         .bar-bg {
//           width: 100%;
//           height: 8px;
//           background: #0f172a;
//           border-radius: 20px;
//           margin-top: 8px;
//           overflow: hidden;
//         }

//         .bar-fill {
//           height: 100%;
//           background: linear-gradient(
//             90deg,
//             #22c55e,
//             #3b82f6
//           );
//           transition: width 0.4s ease;
//         }

//         .total {
//           text-align: center;
//           margin-top: 20px;
//           color: #9ca3af;
//         }

//         .back-btn {
//           width: 100%;
//           margin-top: 20px;
//           padding: 14px;
//           border: none;
//           border-radius: 12px;
//           background: #2563eb;
//           color: white;
//           font-size: 16px;
//           cursor: pointer;
//         }

//         .back-btn:hover {
//           background: #1d4ed8;
//         }
//       `}</style>

//       <div className="page">
//         <div className="card">

//           <div className="question">
//             {poll.question}
//           </div>

//           {voted && (
//             <div className="voted-box">
//               ✔ You already voted
//             </div>
//           )}

//           {poll.options.map((opt) => {
//             const percent = getPercent(opt.votes);

//             return (
//               <div
//                 key={opt._id}
//                 className="option-wrapper"
//               >
//                 <div
//                   className={`option
//                     ${voted ? "disabled" : ""}
//                     ${
//                       selectedOption ===
//                       opt._id.toString()
//                         ? "selected"
//                         : ""
//                     }
//                   `}
//                   onClick={() => {
//                     if (!voted) {
//                       vote(opt._id);
//                     }
//                   }}
//                 >
//                   <span>{opt.text}</span>

//                   <span>
//                     {opt.votes} votes ({percent}%)
//                   </span>
//                 </div>

//                 <div className="bar-bg">
//                   <div
//                     className="bar-fill"
//                     style={{
//                       width: `${percent}%`,
//                     }}
//                   />
//                 </div>
//               </div>
//             );
//           })}

//           <div className="total">
//             Total Votes: {getTotalVotes()}
//           </div>

//           <button
//             className="back-btn"
//             onClick={() => nav("/polls")}
//           >
//             ← Back to Polls
//           </button>

//         </div>
//       </div>
//     </>
//   );
// }

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { API } from "../api/api";
import Navbar from "../components/Navbar";

export default function PollPage() {
  const { id } = useParams();
  const nav = useNavigate();

  const [poll, setPoll] = useState(null);
  const [voted, setVoted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedOption, setSelectedOption] = useState(null);

  // Hover states for interactions
  const [hoveredOpt, setHoveredOpt] = useState(null);
  const [hoveredBtn, setHoveredBtn] = useState(false);

  useEffect(() => {
    if (id) {
      fetchPoll();
    }
  }, [id]);

  const fetchPoll = async () => {
    try {
      setLoading(true);
      const res = await API.get(`/polls/${id}`, { withCredentials: true });
      const pollData = res.data;
      setPoll(pollData);

      const userId = pollData.currentUserId;
      if (userId && pollData.responses) {
        const userVote = pollData.responses.find(
          (r) => r.user?.toString() === userId.toString()
        );
        if (userVote) {
          setVoted(true);
          setSelectedOption(userVote.selectedOption?.toString());
        }
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const vote = async (optionId) => {
    try {
      setSelectedOption(optionId.toString());
      setVoted(true);
      const res = await API.post(`/polls/${id}/vote`, { optionId }, { withCredentials: true });
      setPoll(res.data.poll);
    } catch (err) {
      console.log(err);
      alert("Error casting your vote.");
    }
  };

  const getTotalVotes = () => {
    if (!poll || !poll.options) return 0;
    return poll.options.reduce((sum, opt) => sum + (opt.votes || 0), 0);
  };

  const getPercent = (votes) => {
    const total = getTotalVotes();
    if (total === 0) return 0;
    return Math.round((votes / total) * 100);
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
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "40px 20px",
    },
    card: {
      background: "rgba(17, 24, 39, 0.5)",
      backdropFilter: "blur(20px)",
      WebkitBackdropFilter: "blur(20px)",
      border: "1px solid rgba(255, 255, 255, 0.08)",
      borderRadius: "24px",
      width: "100%",
      maxWidth: "550px",
      padding: "40px",
      boxShadow: "0 20px 50px rgba(0, 0, 0, 0.4)",
    },
    categoryTag: {
      display: "inline-block",
      background: "rgba(59, 130, 246, 0.12)",
      color: "#60a5fa",
      padding: "6px 12px",
      borderRadius: "20px",
      fontSize: "11px",
      fontWeight: "700",
      textTransform: "uppercase",
      letterSpacing: "0.05em",
      marginBottom: "20px",
    },
    question: {
      fontSize: "24px",
      fontWeight: "800",
      lineHeight: "1.4",
      margin: "0 0 28px 0",
      color: "#ffffff",
    },
    optionsContainer: {
      display: "flex",
      flexDirection: "column",
      gap: "16px",
      marginBottom: "28px",
    },
    optionWrapper: {
      position: "relative",
      borderRadius: "14px",
      overflow: "hidden",
      border: "1px solid rgba(255, 255, 255, 0.05)",
      background: "rgba(255, 255, 255, 0.01)",
    },
    optionInteractive: (isHovered, isSelected, isDisabled) => ({
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "16px 20px",
      cursor: isDisabled ? "default" : "pointer",
      position: "relative",
      zIndex: 2,
      background: isSelected 
        ? "rgba(59, 130, 246, 0.15)" 
        : isHovered && !isDisabled 
        ? "rgba(255, 255, 255, 0.04)" 
        : "transparent",
      border: isSelected ? "1px solid #3b82f6" : "1px solid transparent",
      borderRadius: "14px",
      transition: "all 0.2s ease",
    }),
    optionText: (isSelected) => ({
      fontSize: "15px",
      fontWeight: isSelected ? "700" : "500",
      color: isSelected ? "#60a5fa" : "#e5e7eb",
    }),
    votesCount: {
      fontSize: "13px",
      fontWeight: "600",
      color: "#9ca3af",
    },
    barBackground: {
      position: "absolute",
      bottom: 0,
      left: 0,
      width: "100%",
      height: "100%",
      background: "transparent",
      zIndex: 1,
    },
    barFill: (isSelected) => ({
      height: "100%",
      background: isSelected 
        ? "linear-gradient(to right, rgba(59, 130, 246, 0.2), rgba(59, 130, 246, 0.3))" 
        : "rgba(255, 255, 255, 0.03)",
      transition: "width 0.8s cubic-bezier(0.4, 0, 0.2, 1)",
    }),
    totalVotes: {
      fontSize: "14px",
      color: "#6b7280",
      fontWeight: "600",
      textAlign: "right",
      marginBottom: "24px",
    },
    backBtn: (isHovered) => ({
      background: isHovered ? "rgba(255, 255, 255, 0.06)" : "rgba(255, 255, 255, 0.02)",
      color: "#9ca3af",
      border: "1px solid rgba(255, 255, 255, 0.08)",
      width: "100%",
      padding: "14px",
      borderRadius: "12px",
      fontSize: "14px",
      fontWeight: "600",
      cursor: "pointer",
      transition: "all 0.2s ease",
    }),
    loadingState: {
      fontSize: "18px",
      color: "#9ca3af",
      fontWeight: "600",
    }
  };

  if (loading) {
    return (
      <div style={styles.page}>
        <Navbar />
        <div style={styles.container}>
          <div style={styles.loadingState}>Loading poll calculations...</div>
        </div>
      </div>
    );
  }

  if (!poll) {
    return (
      <div style={styles.page}>
        <Navbar />
        <div style={styles.container}>
          <div style={styles.loadingState}>Poll records not found.</div>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <Navbar />
      <div style={styles.container}>
        <div style={styles.card}>
          <span style={styles.categoryTag}>{poll.category?.name || "General Metrics"}</span>
          <h2 style={styles.question}>{poll.question}</h2>

          <div style={styles.optionsContainer}>
            {poll.options.map((opt) => {
              const percent = getPercent(opt.votes);
              const isSelected = selectedOption === opt._id.toString();
              const isOptHovered = hoveredOpt === opt._id;

              return (
                <div key={opt._id} style={styles.optionWrapper}>
                  <div
                    style={styles.optionInteractive(isOptHovered, isSelected, voted)}
                    onMouseEnter={() => setHoveredOpt(opt._id)}
                    onMouseLeave={() => setHoveredOpt(null)}
                    onClick={() => {
                      if (!voted) vote(opt._id);
                    }}
                  >
                    <span style={styles.optionText(isSelected)}>
                      {isSelected ? "✓ " : ""}{opt.text}
                    </span>
                    {voted && (
                      <span style={styles.votesCount}>
                        {opt.votes} {opt.votes === 1 ? "vote" : "votes"} ({percent}%)
                      </span>
                    )}
                  </div>

                  {voted && (
                    <div style={styles.barBackground}>
                      <div
                        style={{
                          ...styles.barFill(isSelected),
                          width: `${percent}%`,
                        }}
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div style={styles.totalVotes}>
            Total metrics recorded: {getTotalVotes()}
          </div>

          <button
            style={styles.backBtn(hoveredBtn)}
            onMouseEnter={() => setHoveredBtn(true)}
            onMouseLeave={() => setHoveredBtn(false)}
            onClick={() => nav("/polls")}
          >
            ← Back to Poll Feed
          </button>
        </div>
      </div>
    </div>
  );
}