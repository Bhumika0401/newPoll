import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API } from "../api/api";
import Navbar from "../components/Navbar";

export default function CreateSurvey() {
  const [questions, setQuestions] = useState([]);
  const [selected, setSelected] = useState([]);
  const [visibleCount, setVisibleCount] = useState(4);

  const [title, setTitle] = useState("");

  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [newQuestion, setNewQuestion] = useState("");
  const [newOptions, setNewOptions] = useState(["", ""]);

  const [questionCategory, setQuestionCategory] = useState("");

  const nav = useNavigate();

  // ---------------- FETCH CATEGORIES ----------------
  const fetchCategories = async () => {
    try {
      const res = await API.get("/categories");
      setCategories(res.data);

      if (res.data.length > 0) {
        setCategory(res.data[0]._id);
        setQuestionCategory(res.data[0]._id);
      }
    } catch (err) {
      console.log(err);
    }
  };

  // ---------------- FETCH QUESTIONS ----------------
  const fetchQuestions = async () => {
    try {
      if (!category) return;

      const res = await API.get(`/questions/category/${category}`);
      setQuestions(res.data);
    } catch (err) {
      console.log(err);
      setQuestions([]);
    }
  };

  // load categories once
  useEffect(() => {
    fetchCategories();
  }, []);

  // load questions when category changes
  useEffect(() => {
    fetchQuestions();
    setSelected([]);
    setVisibleCount(4);
  }, [category]);

  // sync modal category with survey category
  useEffect(() => {
    setQuestionCategory(category);
  }, [category]);

  // ---------------- SELECT QUESTION ----------------
  const toggleSelect = (id) => {
    setSelected((prev) =>
      prev.includes(id)
        ? prev.filter((q) => q !== id)
        : [...prev, id]
    );
  };

  // ---------------- CREATE SURVEY ----------------
  const createSurvey = async () => {
    try {
      if (!title.trim()) return alert("Enter survey title");
      if (selected.length === 0)
        return alert("Select at least one question");

      const selectedQuestions = questions
        .filter((q) => selected.includes(q._id))
        .map((q) => ({
          questionText: q.questionText,
          options: q.options.map((opt) => ({
            text: opt.text,
          })),
        }));

      await API.post("/surveys", {
        title,
        category,
        questions: selectedQuestions,
      });

      alert("Survey Created 🚀");
      nav("/surveys");
    } catch (err) {
      console.log(err);
      alert(err.response?.data?.msg || "Error creating survey");
    }
  };

  // ---------------- LOAD MORE ----------------
  const loadMore = () => setVisibleCount((p) => p + 4);

  // ---------------- OPTIONS ----------------
  const handleOptionChange = (i, value) => {
    const updated = [...newOptions];
    updated[i] = value;
    setNewOptions(updated);
  };

  const addOption = () => {
    setNewOptions([...newOptions, ""]);
  };

  // ---------------- CREATE QUESTION ----------------
  const createQuestion = async () => {
    try {
      if (!newQuestion.trim())
        return alert("Enter question");

      const formattedOptions = newOptions
        .filter((o) => o.trim() !== "")
        .map((o) => ({ text: o }));

      if (formattedOptions.length < 2)
        return alert("Add at least 2 options");

      await API.post("/questions", {
        questionText: newQuestion,
        type: "mcq",
        category: questionCategory,
        options: formattedOptions,
      });

      const res = await API.get(`/questions/category/${category}`);
      setQuestions(res.data);

      setNewQuestion("");
      setNewOptions(["", ""]);
      setShowModal(false);

      alert("Question Added ✅");
    } catch (err) {
      console.log(err);
      alert(err.response?.data?.msg || "Failed");
    }
  };

  return (
    <>
      <Navbar />

      <div className="page">
        <div className="card">

          <h2>Create Survey 🧠</h2>

          {/* SURVEY TITLE */}
          <input
            placeholder="Survey title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          {/* SURVEY CATEGORY */}
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {categories?.length > 0 &&
              categories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
          </select>

          <h3>Select Questions</h3>

          {questions.length === 0 ? (
            <div className="empty">No questions found</div>
          ) : (
            questions.slice(0, visibleCount).map((q) => (
              <div
                key={q._id}
                className={`question ${
                  selected.includes(q._id) ? "selected" : ""
                }`}
                onClick={() => toggleSelect(q._id)}
              >
                {q.questionText}
              </div>
            ))
          )}

          {visibleCount < questions.length && (
            <button className="btn load" onClick={loadMore}>
              Load More
            </button>
          )}

          <button
            className="btn create"
            onClick={() => setShowModal(true)}
          >
            + Create Question
          </button>

          <button className="btn create" onClick={createSurvey}>
            Create Survey 🚀
          </button>

          <button className="btn back" onClick={() => nav("/home")}>
            Back
          </button>

          {/* MODAL */}
          {showModal && (
            <div className="modal">
              <div className="modalBox">

                <h3>Create Question</h3>

                <input
                  placeholder="Question"
                  value={newQuestion}
                  onChange={(e) => setNewQuestion(e.target.value)}
                />

                {/* QUESTION CATEGORY */}
                <select
                  value={questionCategory}
                  onChange={(e) => setQuestionCategory(e.target.value)}
                >
                  {categories?.length > 0 &&
                    categories.map((cat) => (
                      <option key={cat._id} value={cat._id}>
                        {cat.name}
                      </option>
                    ))}
                </select>

                {newOptions.map((opt, i) => (
                  <input
                    key={i}
                    placeholder={`Option ${i + 1}`}
                    value={opt}
                    onChange={(e) =>
                      handleOptionChange(i, e.target.value)
                    }
                  />
                ))}

                <button className="btn load" onClick={addOption}>
                  Add Option
                </button>

                <button className="btn create" onClick={createQuestion}>
                  Save Question
                </button>

                <button
                  className="btn back"
                  onClick={() => setShowModal(false)}
                >
                  Close
                </button>

              </div>
            </div>
          )}

        </div>
      </div>

      <style>{`
        .page {
          min-height: 100vh;
          display: flex;
          justify-content: center;
          padding: 30px;
          background: #0b1220;
          color: white;
        }

        .card {
          width: 520px;
          background: #111827;
          padding: 20px;
          border-radius: 12px;
        }

        input, select {
          width: 100%;
          margin: 8px 0;
          padding: 10px;
          background: #1f2937;
          border: none;
          color: white;
        }

        .question {
          padding: 10px;
          margin-top: 8px;
          background: #1f2937;
          cursor: pointer;
        }

        .selected {
          background: #22c55e;
          color: black;
        }

        .btn {
          width: 100%;
          margin-top: 10px;
          padding: 10px;
          border: none;
          cursor: pointer;
        }

        .load { background: #374151; color: white; }
        .create { background: #3b82f6; color: white; }
        .back { background: #6b7280; color: white; }

        .modal {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0,0,0,0.7);
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .modalBox {
          width: 400px;
          background: #111827;
          padding: 20px;
        }

        .empty {
          color: #9ca3af;
        }
      `}</style>
    </>
  );
}