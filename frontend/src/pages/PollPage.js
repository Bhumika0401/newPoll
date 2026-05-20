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

  // ================= FETCH POLL =================
  useEffect(() => {
    if (id) {
      fetchPoll();
    }
  }, [id]);

  const fetchPoll = async () => {
    try {
      setLoading(true);

      const res = await API.get(`/polls/${id}`, {
        withCredentials: true,
      });

      const pollData = res.data;

      setPoll(pollData);

      // ================= CHECK USER VOTE =================
      const userId = pollData.currentUserId;

      if (userId && pollData.responses) {
        const userVote = pollData.responses.find(
          (r) =>
            r.user?.toString() === userId.toString()
        );

        if (userVote) {
          setVoted(true);
          setSelectedOption(
            userVote.selectedOption?.toString()
          );
        } else {
          setVoted(false);
          setSelectedOption(null);
        }
      }

    } catch (err) {
      console.log("Fetch poll error:", err);
      setPoll(null);
    } finally {
      setLoading(false);
    }
  };

  // ================= VOTE =================
  const vote = async (optionId) => {
    try {
      const res = await API.post(
        "/polls/vote",
        {
          pollId: id,
          optionId,
        },
        {
          withCredentials: true,
        }
      );

      setVoted(true);
      setSelectedOption(optionId);

      // refresh latest poll data
      setPoll(res.data.poll);

    } catch (err) {
      console.log(err);

      alert(
        err.response?.data?.msg ||
          "Voting failed"
      );
    }
  };

  // ================= TOTAL VOTES =================
  const getTotalVotes = () => {
    return (
      poll?.options?.reduce(
        (sum, option) => sum + option.votes,
        0
      ) || 0
    );
  };

  // ================= PERCENTAGE =================
  const getPercent = (votes) => {
    const total = getTotalVotes();

    if (total === 0) return 0;

    return Math.round((votes / total) * 100);
  };

  // ================= LOADING =================
  if (loading) {
    return (
      <>
        <Navbar />

        <div
          style={{
            color: "white",
            textAlign: "center",
            marginTop: "100px",
          }}
        >
          Loading...
        </div>
      </>
    );
  }

  // ================= NOT FOUND =================
  if (!poll) {
    return (
      <>
        <Navbar />

        <div
          style={{
            color: "white",
            textAlign: "center",
            marginTop: "100px",
          }}
        >
          ❌ Poll not found
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <style>{`
        .page {
          min-height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          background: radial-gradient(circle at top,#1e3a8a,#0b1220 60%);
          padding: 20px;
          color: white;
        }

        .card {
          width: 100%;
          max-width: 550px;
          background: #111827;
          padding: 30px;
          border-radius: 20px;
          box-shadow: 0 10px 40px rgba(0,0,0,0.5);
        }

        .question {
          font-size: 28px;
          font-weight: bold;
          text-align: center;
          margin-bottom: 25px;
        }

        .voted-box {
          background: #14532d;
          color: #22c55e;
          padding: 12px;
          border-radius: 10px;
          text-align: center;
          margin-bottom: 20px;
          font-weight: bold;
        }

        .option-wrapper {
          margin-bottom: 18px;
        }

        .option {
          background: #1f2937;
          padding: 14px;
          border-radius: 12px;
          cursor: pointer;
          transition: 0.3s;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border: 2px solid transparent;
        }

        .option:hover {
          background: #374151;
        }

        .selected {
          border: 2px solid #22c55e;
          background: #14532d;
        }

        .disabled {
          cursor: not-allowed;
          opacity: 0.8;
        }

        .bar-bg {
          width: 100%;
          height: 8px;
          background: #0f172a;
          border-radius: 20px;
          margin-top: 8px;
          overflow: hidden;
        }

        .bar-fill {
          height: 100%;
          background: linear-gradient(
            90deg,
            #22c55e,
            #3b82f6
          );
          transition: width 0.4s ease;
        }

        .total {
          text-align: center;
          margin-top: 20px;
          color: #9ca3af;
        }

        .back-btn {
          width: 100%;
          margin-top: 20px;
          padding: 14px;
          border: none;
          border-radius: 12px;
          background: #2563eb;
          color: white;
          font-size: 16px;
          cursor: pointer;
        }

        .back-btn:hover {
          background: #1d4ed8;
        }
      `}</style>

      <div className="page">
        <div className="card">

          <div className="question">
            {poll.question}
          </div>

          {voted && (
            <div className="voted-box">
              ✔ You already voted
            </div>
          )}

          {poll.options.map((opt) => {
            const percent = getPercent(opt.votes);

            return (
              <div
                key={opt._id}
                className="option-wrapper"
              >
                <div
                  className={`option
                    ${voted ? "disabled" : ""}
                    ${
                      selectedOption ===
                      opt._id.toString()
                        ? "selected"
                        : ""
                    }
                  `}
                  onClick={() => {
                    if (!voted) {
                      vote(opt._id);
                    }
                  }}
                >
                  <span>{opt.text}</span>

                  <span>
                    {opt.votes} votes ({percent}%)
                  </span>
                </div>

                <div className="bar-bg">
                  <div
                    className="bar-fill"
                    style={{
                      width: `${percent}%`,
                    }}
                  />
                </div>
              </div>
            );
          })}

          <div className="total">
            Total Votes: {getTotalVotes()}
          </div>

          <button
            className="back-btn"
            onClick={() => nav("/polls")}
          >
            ← Back to Polls
          </button>

        </div>
      </div>
    </>
  );
}