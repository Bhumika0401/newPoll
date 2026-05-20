// import { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { API } from "../api/api";
// import Navbar from "../components/Navbar";

// export default function SurveyPage() {
//   const { id } = useParams();
//   const nav = useNavigate();

//   const [survey, setSurvey] = useState(null);
//   const [loading, setLoading] = useState(true);

//   const [answers, setAnswers] = useState({});
//   const [submitted, setSubmitted] = useState(false);
//   const [autosaveMsg, setAutosaveMsg] = useState("");

//   const answeredCount = Object.keys(answers).length;
//   const totalQuestions = survey?.questions?.length || 0;

//   // ================= LOAD SURVEY =================
//   useEffect(() => {
//     if (id) fetchSurvey();
//   }, [id]);

//   const fetchSurvey = async () => {
//     try {
//       setLoading(true);

//       const res = await API.get(`/surveys/${id}`);

//       setSurvey(res.data);

//       // restore saved answers
//       const saved = localStorage.getItem(`survey_${id}`);
//       if (saved) {
//         setAnswers(JSON.parse(saved));
//       } else {
//         setAnswers({});
//       }

//       setSubmitted(false);
//     } catch (err) {
//       console.log(err);
//       alert("Failed to load survey");
//       setSurvey(null);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ================= SELECT OPTION =================
//   const selectOption = (questionId, optionIndex) => {
//     setAnswers((prev) => {
//       const updated = {
//         ...prev,
//         [questionId]: optionIndex,
//       };

//       setAutosaveMsg("Saving...");

//       return updated;
//     });
//   };

//   // ================= AUTOSAVE =================
//   useEffect(() => {
//     if (!id) return;

//     const timer = setTimeout(() => {
//       if (Object.keys(answers).length > 0) {
//         localStorage.setItem(
//           `survey_${id}`,
//           JSON.stringify(answers)
//         );
//         setAutosaveMsg("Saved ✔");
//       }
//     }, 800);

//     return () => clearTimeout(timer);
//   }, [answers, id]);

//   // ================= SUBMIT SURVEY =================
//   const submitSurvey = async () => {
//     try {
//       if (!survey || submitted) return;

//       if (answeredCount !== totalQuestions) {
//         return alert("Answer all questions");
//       }

//       await API.post("/responses/survey", {
//         surveyId: survey._id,
//         answers,
//       });

//       setSubmitted(true);
//       localStorage.removeItem(`survey_${id}`);

//       alert("Survey submitted successfully 🚀");
//     } catch (err) {
//       console.log(err);
//       alert(err.response?.data?.msg || "Submission failed");
//     }
//   };

//   // ================= LOADING =================
//   if (loading) {
//     return (
//       <>
//         <Navbar />
//         <div className="page">Loading survey...</div>
//       </>
//     );
//   }

//   // ================= NOT FOUND =================
//   if (!survey) {
//     return (
//       <>
//         <Navbar />
//         <div className="page">Survey not found</div>
//       </>
//     );
//   }

//   return (
//     <>
//       <Navbar />

//       <div className="page">
//         <div className="container">

//           {/* HEADER */}
//           <div className="header">
//             <h1>{survey.title}</h1>
//             <p>
//               Category: {survey.category?.name || "General"}
//             </p>

//             {/* PROGRESS */}
//             <div className="meta">
//               <div className="progress">
//                 Answered: {answeredCount} / {totalQuestions}
//               </div>

//               <div className="autosave">
//                 {autosaveMsg}
//               </div>
//             </div>
//           </div>

//           {/* QUESTIONS */}
//           {survey.questions.map((q, qIndex) => (
//             <div key={q._id} className="question-card">
//               <h3>
//                 {qIndex + 1}. {q.questionText}
//               </h3>

//               <div className="options">
//                 {q.options.map((opt, optIndex) => {
//                   const selected =
//                     answers[q._id] === optIndex;

//                   return (
//                     <button
//                       key={optIndex}
//                       className={
//                         selected
//                           ? "option selected"
//                           : "option"
//                       }
//                       onClick={() =>
//                         selectOption(q._id, optIndex)
//                       }
//                     >
//                       {opt.text}
//                     </button>
//                   );
//                 })}
//               </div>
//             </div>
//           ))}

//           {/* SUBMIT */}
//           {!submitted ? (
//             <button
//               className="submit-btn"
//               onClick={submitSurvey}
//             >
//               Submit Survey 🚀
//             </button>
//           ) : (
//             <div className="success">
//               ✅ Survey Submitted Successfully
//             </div>
//           )}

//           {/* BACK */}
//           <button
//             className="back-btn"
//             onClick={() => nav("/surveys")}
//           >
//             ← Back
//           </button>
//         </div>
//       </div>

//       {/* STYLE */}
//       <style>{`
//         .page{
//           min-height:100vh;
//           background:radial-gradient(circle at top,#1e3a8a,#0b1220 60%);
//           color:white;
//           padding:30px;
//         }

//         .container{
//           max-width:800px;
//           margin:auto;
//         }

//         .header{
//           margin-bottom:25px;
//         }

//         .header h1{
//           margin-bottom:8px;
//         }

//         .meta{
//           margin-top:10px;
//           padding:10px;
//           background:#1f2937;
//           border-radius:10px;
//           display:flex;
//           justify-content:space-between;
//         }

//         .progress{
//           font-weight:bold;
//         }

//         .autosave{
//           font-size:13px;
//           color:#9ca3af;
//         }

//         .question-card{
//           background:#111827;
//           padding:20px;
//           border-radius:14px;
//           margin-bottom:18px;
//           box-shadow:0 5px 20px rgba(0,0,0,0.3);
//         }

//         .options{
//           display:flex;
//           flex-direction:column;
//           gap:10px;
//           margin-top:15px;
//         }

//         .option{
//           padding:12px;
//           border:none;
//           border-radius:10px;
//           background:#1f2937;
//           color:white;
//           cursor:pointer;
//           text-align:left;
//           transition:0.2s;
//         }

//         .option:hover{
//           background:#374151;
//         }

//         .selected{
//           background:#22c55e !important;
//           color:black;
//           font-weight:bold;
//         }

//         .submit-btn{
//           width:100%;
//           padding:14px;
//           border:none;
//           border-radius:10px;
//           background:#3b82f6;
//           color:white;
//           font-size:16px;
//           cursor:pointer;
//           margin-top:10px;
//         }

//         .submit-btn:hover{
//           background:#2563eb;
//         }

//         .success{
//           background:#16a34a;
//           padding:14px;
//           border-radius:10px;
//           margin-top:15px;
//           text-align:center;
//           font-weight:bold;
//         }

//         .back-btn{
//           margin-top:20px;
//           padding:10px 15px;
//           border:none;
//           border-radius:8px;
//           background:#6b7280;
//           color:white;
//           cursor:pointer;
//         }

//         .back-btn:hover{
//           background:#4b5563;
//         }
//       `}</style>
//     </>
//   );
// }

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { API } from "../api/api";
import Navbar from "../components/Navbar";

export default function SurveyPage() {
  const { id } = useParams();
  const nav = useNavigate();

  const [survey, setSurvey] = useState(null);
  const [loading, setLoading] = useState(true);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [autosaveMsg, setAutosaveMsg] = useState("");

  const [hoveredOpt, setHoveredOpt] = useState(null);
  const [hoveredSubmit, setHoveredSubmit] = useState(false);

  const answeredCount = Object.keys(answers).length;
  const totalQuestions = survey?.questions?.length || 0;

  useEffect(() => {
    if (id) fetchSurvey();
  }, [id]);

  const fetchSurvey = async () => {
    try {
      setLoading(true);
      const res = await API.get(`/surveys/${id}`);
      setSurvey(res.data);

      const saved = localStorage.getItem(`survey_${id}`);
      if (saved) {
        setAnswers(JSON.parse(saved));
      } else {
        setAnswers({});
      }
      setSubmitted(false);
    } catch (err) {
      console.log(err);
      alert("Failed to load survey");
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = (questionId, optionIndex) => {
    if (submitted) return;
    const updated = { ...answers, [questionId]: optionIndex };
    setAnswers(updated);

    localStorage.setItem(`survey_${id}`, JSON.stringify(updated));
    setAutosaveMsg("Progress autosaved locally");
    setTimeout(() => setAutosaveMsg(""), 2000);
  };

  const handleSubmit = async () => {
    if (answeredCount < totalQuestions) {
      return alert("Please answer all questions before submitting.");
    }
    try {
      const formattedAnswers = Object.keys(answers).map((qId) => ({
        question: qId,
        selectedOptionIndex: answers[qId],
      }));

      await API.post(`/surveys/${id}/submit`, { answers: formattedAnswers });
      setSubmitted(true);
      localStorage.removeItem(`survey_${id}`);
    } catch (err) {
      console.log(err);
      alert("Error submitting survey responses.");
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
      maxWidth: "680px",
      width: "100%",
      margin: "0 auto",
      padding: "40px 20px",
      boxSizing: "border-box",
    },
    headerCard: {
      background: "rgba(17, 24, 39, 0.4)",
      backdropFilter: "blur(20px)",
      WebkitBackdropFilter: "blur(20px)",
      border: "1px solid rgba(255, 255, 255, 0.06)",
      borderRadius: "20px",
      padding: "32px",
      marginBottom: "28px",
      position: "relative",
    },
    title: {
      fontSize: "26px",
      fontWeight: "800",
      color: "#ffffff",
      margin: "0 0 16px 0",
    },
    progressTrack: {
      height: "6px",
      background: "rgba(255, 255, 255, 0.05)",
      borderRadius: "4px",
      overflow: "hidden",
      marginBottom: "8px",
    },
    progressBar: {
      height: "100%",
      background: "linear-gradient(to right, #3b82f6, #60a5fa)",
      width: `${totalQuestions ? (answeredCount / totalQuestions) * 100 : 0}%`,
      transition: "width 0.3s ease",
    },
    progressText: {
      fontSize: "13px",
      color: "#9ca3af",
      display: "flex",
      justifyContent: "space-between",
    },
    questionCard: {
      background: "rgba(17, 24, 39, 0.3)",
      border: "1px solid rgba(255, 255, 255, 0.04)",
      borderRadius: "16px",
      padding: "28px",
      marginBottom: "20px",
    },
    questionText: {
      fontSize: "16px",
      fontWeight: "600",
      color: "#ffffff",
      margin: "0 0 16px 0",
    },
    optionsList: {
      display: "flex",
      flexDirection: "column",
      gap: "10px",
    },
    optionBtn: (isSelected, isHovered) => ({
      padding: "14px 18px",
      border: isSelected ? "1px solid #3b82f6" : "1px solid rgba(255, 255, 255, 0.05)",
      borderRadius: "10px",
      background: isSelected ? "rgba(59, 130, 246, 0.15)" : isHovered ? "rgba(255, 255, 255, 0.03)" : "rgba(255, 255, 255, 0.01)",
      color: isSelected ? "#60a5fa" : "#d1d5db",
      textAlign: "left",
      fontSize: "14px",
      cursor: submitted ? "default" : "pointer",
      fontWeight: isSelected ? "700" : "500",
      transition: "all 0.2s ease",
    }),
    submitBtn: (isHovered) => ({
      width: "100%",
      padding: "16px",
      border: "none",
      borderRadius: "12px",
      background: "linear-gradient(to right, #2563eb, #3b82f6)",
      color: "#ffffff",
      fontSize: "15px",
      fontWeight: "700",
      cursor: "pointer",
      boxShadow: isHovered ? "0 4px 20px rgba(37, 99, 235, 0.3)" : "none",
      transform: isHovered ? "translateY(-1px)" : "none",
      transition: "all 0.2s ease",
    }),
    successCard: {
      background: "rgba(16, 185, 129, 0.1)",
      border: "1px solid rgba(16, 185, 129, 0.2)",
      borderRadius: "16px",
      padding: "32px",
      textAlign: "center",
    },
    successTitle: {
      fontSize: "22px",
      fontWeight: "700",
      color: "#34d399",
      margin: "0 0 8px 0",
    }
  };

  if (loading) return <div style={styles.page}><Navbar /><div style={styles.container}>Loading survey module...</div></div>;
  if (!survey) return <div style={styles.page}><Navbar /><div style={styles.container}>Survey not found.</div></div>;

  return (
    <div style={styles.page}>
      <Navbar />
      <div style={styles.container}>
        
        {submitted ? (
          <div style={styles.successCard}>
            <div style={{ fontSize: "40px", marginBottom: "12px" }}>🎉</div>
            <h2 style={styles.successTitle}>Response Saved Successfully</h2>
            <p style={{ color: "#9ca3af", marginBottom: "24px", fontSize: "14px" }}>Thank you for contribution metrics to this research target.</p>
            <button style={{ ...styles.submitBtn(false), width: "auto", padding: "10px 24px" }} onClick={() => nav("/surveys")}>
              Return to Dashboard
            </button>
          </div>
        ) : (
          <>
            <div style={styles.headerCard}>
              <h2 style={styles.title}>{survey.title}</h2>
              <div style={styles.progressTrack}>
                <div style={styles.progressBar} />
              </div>
              <div style={styles.progressText}>
                <span>Completed: {answeredCount} of {totalQuestions} matrix rows</span>
                <span style={{ color: "#3b82f6", fontWeight: "600" }}>{autosaveMsg}</span>
              </div>
            </div>

            {survey.questions?.map((q) => (
              <div key={q._id} style={styles.questionCard}>
                <h3 style={styles.questionText}>{q.text}</h3>
                <div style={styles.optionsList}>
                  {q.options?.map((opt, idx) => {
                    const isSelected = answers[q._id] === idx;
                    const isHovered = hoveredOpt === `${q._id}-${idx}`;

                    return (
                      <button
                        key={idx}
                        style={styles.optionBtn(isSelected, isHovered)}
                        onMouseEnter={() => setHoveredOpt(`${q._id}-${idx}`)}
                        onMouseLeave={() => setHoveredOpt(null)}
                        onClick={() => handleSelect(q._id, idx)}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}

            <button
              style={styles.submitBtn(hoveredSubmit)}
              onMouseEnter={() => setHoveredSubmit(true)}
              onMouseLeave={() => setHoveredSubmit(false)}
              onClick={handleSubmit}
            >
              Finalize and Submit Survey
            </button>
          </>
        )}
      </div>
    </div>
  );
}