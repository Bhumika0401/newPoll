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

  const answeredCount = Object.keys(answers).length;
  const totalQuestions = survey?.questions?.length || 0;

  // ================= LOAD SURVEY =================
  useEffect(() => {
    if (id) fetchSurvey();
  }, [id]);

  const fetchSurvey = async () => {
    try {
      setLoading(true);

      const res = await API.get(`/surveys/${id}`);

      setSurvey(res.data);

      // restore saved answers
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
      setSurvey(null);
    } finally {
      setLoading(false);
    }
  };

  // ================= SELECT OPTION =================
  const selectOption = (questionId, optionIndex) => {
    setAnswers((prev) => {
      const updated = {
        ...prev,
        [questionId]: optionIndex,
      };

      setAutosaveMsg("Saving...");

      return updated;
    });
  };

  // ================= AUTOSAVE =================
  useEffect(() => {
    if (!id) return;

    const timer = setTimeout(() => {
      if (Object.keys(answers).length > 0) {
        localStorage.setItem(
          `survey_${id}`,
          JSON.stringify(answers)
        );
        setAutosaveMsg("Saved ✔");
      }
    }, 800);

    return () => clearTimeout(timer);
  }, [answers, id]);

  // ================= SUBMIT SURVEY =================
  const submitSurvey = async () => {
    try {
      if (!survey || submitted) return;

      if (answeredCount !== totalQuestions) {
        return alert("Answer all questions");
      }

      await API.post("/responses/survey", {
        surveyId: survey._id,
        answers,
      });

      setSubmitted(true);
      localStorage.removeItem(`survey_${id}`);

      alert("Survey submitted successfully 🚀");
    } catch (err) {
      console.log(err);
      alert(err.response?.data?.msg || "Submission failed");
    }
  };

  // ================= LOADING =================
  if (loading) {
    return (
      <>
        <Navbar />
        <div className="page">Loading survey...</div>
      </>
    );
  }

  // ================= NOT FOUND =================
  if (!survey) {
    return (
      <>
        <Navbar />
        <div className="page">Survey not found</div>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className="page">
        <div className="container">

          {/* HEADER */}
          <div className="header">
            <h1>{survey.title}</h1>
            <p>
              Category: {survey.category?.name || "General"}
            </p>

            {/* PROGRESS */}
            <div className="meta">
              <div className="progress">
                Answered: {answeredCount} / {totalQuestions}
              </div>

              <div className="autosave">
                {autosaveMsg}
              </div>
            </div>
          </div>

          {/* QUESTIONS */}
          {survey.questions.map((q, qIndex) => (
            <div key={q._id} className="question-card">
              <h3>
                {qIndex + 1}. {q.questionText}
              </h3>

              <div className="options">
                {q.options.map((opt, optIndex) => {
                  const selected =
                    answers[q._id] === optIndex;

                  return (
                    <button
                      key={optIndex}
                      className={
                        selected
                          ? "option selected"
                          : "option"
                      }
                      onClick={() =>
                        selectOption(q._id, optIndex)
                      }
                    >
                      {opt.text}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}

          {/* SUBMIT */}
          {!submitted ? (
            <button
              className="submit-btn"
              onClick={submitSurvey}
            >
              Submit Survey 🚀
            </button>
          ) : (
            <div className="success">
              ✅ Survey Submitted Successfully
            </div>
          )}

          {/* BACK */}
          <button
            className="back-btn"
            onClick={() => nav("/surveys")}
          >
            ← Back
          </button>
        </div>
      </div>

      {/* STYLE */}
      <style>{`
        .page{
          min-height:100vh;
          background:radial-gradient(circle at top,#1e3a8a,#0b1220 60%);
          color:white;
          padding:30px;
        }

        .container{
          max-width:800px;
          margin:auto;
        }

        .header{
          margin-bottom:25px;
        }

        .header h1{
          margin-bottom:8px;
        }

        .meta{
          margin-top:10px;
          padding:10px;
          background:#1f2937;
          border-radius:10px;
          display:flex;
          justify-content:space-between;
        }

        .progress{
          font-weight:bold;
        }

        .autosave{
          font-size:13px;
          color:#9ca3af;
        }

        .question-card{
          background:#111827;
          padding:20px;
          border-radius:14px;
          margin-bottom:18px;
          box-shadow:0 5px 20px rgba(0,0,0,0.3);
        }

        .options{
          display:flex;
          flex-direction:column;
          gap:10px;
          margin-top:15px;
        }

        .option{
          padding:12px;
          border:none;
          border-radius:10px;
          background:#1f2937;
          color:white;
          cursor:pointer;
          text-align:left;
          transition:0.2s;
        }

        .option:hover{
          background:#374151;
        }

        .selected{
          background:#22c55e !important;
          color:black;
          font-weight:bold;
        }

        .submit-btn{
          width:100%;
          padding:14px;
          border:none;
          border-radius:10px;
          background:#3b82f6;
          color:white;
          font-size:16px;
          cursor:pointer;
          margin-top:10px;
        }

        .submit-btn:hover{
          background:#2563eb;
        }

        .success{
          background:#16a34a;
          padding:14px;
          border-radius:10px;
          margin-top:15px;
          text-align:center;
          font-weight:bold;
        }

        .back-btn{
          margin-top:20px;
          padding:10px 15px;
          border:none;
          border-radius:8px;
          background:#6b7280;
          color:white;
          cursor:pointer;
        }

        .back-btn:hover{
          background:#4b5563;
        }
      `}</style>
    </>
  );
}