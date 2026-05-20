import { useEffect, useState } from "react";
import { API } from "../api/api";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function SurveyListPage() {

  const [surveys, setSurveys] = useState([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <>
      <Navbar />

      <div className="page">

        <div className="container">

          {/* HEADER */}
          <div className="header">

            <div className="title">
              🧠 Surveys Dashboard
            </div>

            <button
              className="create-btn"
              onClick={() => nav("/create-survey")}
            >
              + Create Survey
            </button>

          </div>

          {/* CONTENT */}

          {loading ? (

            <p>Loading surveys...</p>

          ) : surveys.length === 0 ? (

            <p>No surveys found</p>

          ) : (

            surveys.map((s) => (

              <div
                key={s._id}
                className="card"
                onClick={() => nav(`/survey/${s._id}`)}
              >

                <h3>{s.title}</h3>

                <p className="category">
                  Category: {s.category?.name || "No Category"}
                </p>

              </div>

            ))

          )}

          {/* BACK BUTTON */}

          <button
            className="back-btn"
            onClick={() => nav("/home")}
          >
            ← Back Home
          </button>

        </div>

      </div>

      <style>{`
        .page{
          min-height:100vh;
          background:radial-gradient(circle at top,#1e3a8a,#0b1220 60%);
          color:white;
          padding:30px;
        }

        .container{
          max-width:750px;
          margin:auto;
        }

        .header{
          display:flex;
          justify-content:space-between;
          align-items:center;
          margin-bottom:20px;
        }

        .title{
          font-size:28px;
          font-weight:bold;
        }

        .create-btn{
          background:#22c55e;
          border:none;
          padding:10px 15px;
          border-radius:10px;
          color:white;
          cursor:pointer;
          font-weight:bold;
          transition:0.2s;
        }

        .create-btn:hover{
          background:#16a34a;
          transform:scale(1.05);
        }

        .card{
          background:#111827;
          padding:18px;
          margin:12px 0;
          border-radius:12px;
          cursor:pointer;
          transition:0.2s;
          border:1px solid transparent;
        }

        .card:hover{
          background:#1f2937;
          transform:scale(1.02);
          border-color:#3b82f6;
        }

        .category{
          opacity:0.7;
          margin-top:5px;
        }

        .back-btn{
          margin-top:20px;
          padding:10px 15px;
          border:none;
          background:#3b82f6;
          color:white;
          border-radius:8px;
          cursor:pointer;
        }

        .back-btn:hover{
          background:#2563eb;
        }
      `}</style>
    </>
  );
}