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
      
      // ✅ FIXED: Read data structure directly matching your fetch API mapping pattern
      const updatedPoll = res.data.poll ? res.data.poll : res.data;
      setPoll(updatedPoll);
    } catch (err) {
      console.log(err);
      setVoted(false);
      setSelectedOption(null);
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
            {poll.options && poll.options.map((opt) => {
              const percent = getPercent(opt.votes);
              const isSelected = selectedOption === opt._id?.toString();
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
                    
                    {/* ✅ Always render percentage values nicely to avoid empty space layout errors */}
                    <span style={styles.votesCount}>
                      {opt.votes || 0} {(opt.votes === 1) ? "vote" : "votes"} ({percent}%)
                    </span>
                  </div>

                  {/* ✅ Keeps dynamic progress background active */}
                  <div style={styles.barBackground}>
                    <div
                      style={{
                        ...styles.barFill(isSelected),
                        width: `${percent}%`,
                      }}
                    />
                  </div>
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