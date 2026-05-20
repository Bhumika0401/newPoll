import { useState, useEffect } from "react";
import { API } from "../api/api";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function CreatePoll() {
  const nav = useNavigate();

  const [question, setQuestion] = useState("");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [options, setOptions] = useState(["", ""]);

  // ================= FETCH CATEGORIES =================
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await API.get("/categories");

      setCategories(res.data || []);

      // auto select first category
      if (res.data.length > 0) {
        setCategory(res.data[0]._id);
      }

    } catch (err) {
      console.log(err);
    }
  };

  // ================= ADD OPTION =================
  const addOption = () => {
    setOptions([...options, ""]);
  };

  // ================= UPDATE OPTION =================
  const updateOption = (value, i) => {
    const updated = [...options];
    updated[i] = value;
    setOptions(updated);
  };

  // ================= CREATE POLL =================
  const createPoll = async () => {
    if (!question || !category) {
      return alert("Question and category required");
    }

    if (options.some((o) => !o.trim())) {
      return alert("Fill all options");
    }

    try {
      await API.post(
        "/polls",
        {
          question,
          category,
          options: options.map((o) => ({
            text: o,
          })),
        },
        {
          withCredentials: true,
        }
      );

      alert("Poll Created Successfully ✅");

      nav("/polls");

    } catch (err) {
      console.log(err);

      alert(
        err.response?.data?.msg ||
        "Error creating poll"
      );
    }
  };

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
          color: white;
          padding: 20px;
        }

        .card {
          width: 420px;
          background: #111827;
          padding: 25px;
          border-radius: 18px;
          box-shadow: 0 15px 40px rgba(0,0,0,0.6);
        }

        .title {
          font-size: 24px;
          font-weight: 700;
          text-align: center;
          margin-bottom: 20px;
        }

        .label {
          font-size: 13px;
          color: #9ca3af;
          margin: 10px 0 5px;
        }

        input, select {
          width: 100%;
          padding: 10px;
          border-radius: 8px;
          border: none;
          outline: none;
          background: #1f2937;
          color: white;
          margin-bottom: 10px;
        }

        input::placeholder {
          color: #6b7280;
        }

        .btn {
          width: 100%;
          padding: 10px;
          border: none;
          border-radius: 8px;
          margin-top: 10px;
          cursor: pointer;
          font-weight: 600;
        }

        .add {
          background: #22c55e;
        }

        .create {
          background: #3b82f6;
        }

        .back {
          background: #374151;
        }

        .btn:hover {
          opacity: 0.9;
        }

        .option-row {
          display: flex;
          gap: 8px;
        }

        .remove-btn {
          background: red;
          border: none;
          color: white;
          padding: 0 10px;
          border-radius: 6px;
          cursor: pointer;
        }
      `}</style>

      <div className="page">
        <div className="card">

          <div className="title">
            Create Poll 📊
          </div>

          {/* QUESTION */}
          <div className="label">
            Question
          </div>

          <input
            placeholder="Enter your question..."
            value={question}
            onChange={(e) =>
              setQuestion(e.target.value)
            }
          />

          {/* CATEGORY */}
          <div className="label">
            Category
          </div>

          <select
            value={category}
            onChange={(e) =>
              setCategory(e.target.value)
            }
          >
            {categories.map((cat) => (
              <option
                key={cat._id}
                value={cat._id}
              >
                {cat.name}
              </option>
            ))}
          </select>

          {/* OPTIONS */}
          <div className="label">
            Options
          </div>

          {options.map((o, i) => (
            <div
              key={i}
              className="option-row"
            >
              <input
                placeholder={`Option ${i + 1}`}
                value={o}
                onChange={(e) =>
                  updateOption(
                    e.target.value,
                    i
                  )
                }
              />

              {options.length > 2 && (
                <button
                  className="remove-btn"
                  onClick={() =>
                    setOptions(
                      options.filter(
                        (_, index) =>
                          index !== i
                      )
                    )
                  }
                >
                  ✕
                </button>
              )}
            </div>
          ))}

          {/* ADD OPTION */}
          <button
            className="btn add"
            onClick={addOption}
          >
            + Add Option
          </button>

          {/* CREATE */}
          <button
            className="btn create"
            onClick={createPoll}
          >
            Create Poll 🚀
          </button>

          {/* BACK */}
          <button
            className="btn back"
            onClick={() => nav("/home")}
          >
            ← Back to Home
          </button>

        </div>
      </div>
    </>
  );
}