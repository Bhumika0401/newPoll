// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { API } from "../api/api";
// import Navbar from "../components/Navbar";

// export default function CreateSurvey() {
//   const [questions, setQuestions] = useState([]);
//   const [selected, setSelected] = useState([]);
//   const [visibleCount, setVisibleCount] = useState(4);

//   const [title, setTitle] = useState("");

//   const [category, setCategory] = useState("");
//   const [categories, setCategories] = useState([]);

//   const [showModal, setShowModal] = useState(false);
//   const [newQuestion, setNewQuestion] = useState("");
//   const [newOptions, setNewOptions] = useState(["", ""]);

//   const [questionCategory, setQuestionCategory] = useState("");

//   const nav = useNavigate();

//   // ---------------- FETCH CATEGORIES ----------------
//   const fetchCategories = async () => {
//     try {
//       const res = await API.get("/categories");
//       setCategories(res.data);

//       if (res.data.length > 0) {
//         setCategory(res.data[0]._id);
//         setQuestionCategory(res.data[0]._id);
//       }
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   // ---------------- FETCH QUESTIONS ----------------
//   const fetchQuestions = async () => {
//     try {
//       if (!category) return;

//       const res = await API.get(`/questions/category/${category}`);
//       setQuestions(res.data);
//     } catch (err) {
//       console.log(err);
//       setQuestions([]);
//     }
//   };

//   // load categories once
//   useEffect(() => {
//     fetchCategories();
//   }, []);

//   // load questions when category changes
//   useEffect(() => {
//     fetchQuestions();
//     setSelected([]);
//     setVisibleCount(4);
//   }, [category]);

//   // sync modal category with survey category
//   useEffect(() => {
//     setQuestionCategory(category);
//   }, [category]);

//   // ---------------- SELECT QUESTION ----------------
//   const toggleSelect = (id) => {
//     setSelected((prev) =>
//       prev.includes(id)
//         ? prev.filter((q) => q !== id)
//         : [...prev, id]
//     );
//   };

//   // ---------------- CREATE SURVEY ----------------
//   const createSurvey = async () => {
//     try {
//       if (!title.trim()) return alert("Enter survey title");
//       if (selected.length === 0)
//         return alert("Select at least one question");

//       const selectedQuestions = questions
//         .filter((q) => selected.includes(q._id))
//         .map((q) => ({
//           questionText: q.questionText,
//           options: q.options.map((opt) => ({
//             text: opt.text,
//           })),
//         }));

//       await API.post("/surveys", {
//         title,
//         category,
//         questions: selectedQuestions,
//       });

//       alert("Survey Created 🚀");
//       nav("/surveys");
//     } catch (err) {
//       console.log(err);
//       alert(err.response?.data?.msg || "Error creating survey");
//     }
//   };

//   // ---------------- LOAD MORE ----------------
//   const loadMore = () => setVisibleCount((p) => p + 4);

//   // ---------------- OPTIONS ----------------
//   const handleOptionChange = (i, value) => {
//     const updated = [...newOptions];
//     updated[i] = value;
//     setNewOptions(updated);
//   };

//   const addOption = () => {
//     setNewOptions([...newOptions, ""]);
//   };

//   // ---------------- CREATE QUESTION ----------------
//   const createQuestion = async () => {
//     try {
//       if (!newQuestion.trim())
//         return alert("Enter question");

//       const formattedOptions = newOptions
//         .filter((o) => o.trim() !== "")
//         .map((o) => ({ text: o }));

//       if (formattedOptions.length < 2)
//         return alert("Add at least 2 options");

//       await API.post("/questions", {
//         questionText: newQuestion,
//         type: "mcq",
//         category: questionCategory,
//         options: formattedOptions,
//       });

//       const res = await API.get(`/questions/category/${category}`);
//       setQuestions(res.data);

//       setNewQuestion("");
//       setNewOptions(["", ""]);
//       setShowModal(false);

//       alert("Question Added ✅");
//     } catch (err) {
//       console.log(err);
//       alert(err.response?.data?.msg || "Failed");
//     }
//   };

//   return (
//     <>
//       <Navbar />

//       <div className="page">
//         <div className="card">

//           <h2>Create Survey 🧠</h2>

//           {/* SURVEY TITLE */}
//           <input
//             placeholder="Survey title"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//           />

//           {/* SURVEY CATEGORY */}
//           <select
//             value={category}
//             onChange={(e) => setCategory(e.target.value)}
//           >
//             {categories?.length > 0 &&
//               categories.map((cat) => (
//                 <option key={cat._id} value={cat._id}>
//                   {cat.name}
//                 </option>
//               ))}
//           </select>

//           <h3>Select Questions</h3>

//           {questions.length === 0 ? (
//             <div className="empty">No questions found</div>
//           ) : (
//             questions.slice(0, visibleCount).map((q) => (
//               <div
//                 key={q._id}
//                 className={`question ${
//                   selected.includes(q._id) ? "selected" : ""
//                 }`}
//                 onClick={() => toggleSelect(q._id)}
//               >
//                 {q.questionText}
//               </div>
//             ))
//           )}

//           {visibleCount < questions.length && (
//             <button className="btn load" onClick={loadMore}>
//               Load More
//             </button>
//           )}

//           <button
//             className="btn create"
//             onClick={() => setShowModal(true)}
//           >
//             + Create Question
//           </button>

//           <button className="btn create" onClick={createSurvey}>
//             Create Survey 🚀
//           </button>

//           <button className="btn back" onClick={() => nav("/home")}>
//             Back
//           </button>

//           {/* MODAL */}
//           {showModal && (
//             <div className="modal">
//               <div className="modalBox">

//                 <h3>Create Question</h3>

//                 <input
//                   placeholder="Question"
//                   value={newQuestion}
//                   onChange={(e) => setNewQuestion(e.target.value)}
//                 />

//                 {/* QUESTION CATEGORY */}
//                 <select
//                   value={questionCategory}
//                   onChange={(e) => setQuestionCategory(e.target.value)}
//                 >
//                   {categories?.length > 0 &&
//                     categories.map((cat) => (
//                       <option key={cat._id} value={cat._id}>
//                         {cat.name}
//                       </option>
//                     ))}
//                 </select>

//                 {newOptions.map((opt, i) => (
//                   <input
//                     key={i}
//                     placeholder={`Option ${i + 1}`}
//                     value={opt}
//                     onChange={(e) =>
//                       handleOptionChange(i, e.target.value)
//                     }
//                   />
//                 ))}

//                 <button className="btn load" onClick={addOption}>
//                   Add Option
//                 </button>

//                 <button className="btn create" onClick={createQuestion}>
//                   Save Question
//                 </button>

//                 <button
//                   className="btn back"
//                   onClick={() => setShowModal(false)}
//                 >
//                   Close
//                 </button>

//               </div>
//             </div>
//           )}

//         </div>
//       </div>

//       <style>{`
//         .page {
//           min-height: 100vh;
//           display: flex;
//           justify-content: center;
//           padding: 30px;
//           background: #0b1220;
//           color: white;
//         }

//         .card {
//           width: 520px;
//           background: #111827;
//           padding: 20px;
//           border-radius: 12px;
//         }

//         input, select {
//           width: 100%;
//           margin: 8px 0;
//           padding: 10px;
//           background: #1f2937;
//           border: none;
//           color: white;
//         }

//         .question {
//           padding: 10px;
//           margin-top: 8px;
//           background: #1f2937;
//           cursor: pointer;
//         }

//         .selected {
//           background: #22c55e;
//           color: black;
//         }

//         .btn {
//           width: 100%;
//           margin-top: 10px;
//           padding: 10px;
//           border: none;
//           cursor: pointer;
//         }

//         .load { background: #374151; color: white; }
//         .create { background: #3b82f6; color: white; }
//         .back { background: #6b7280; color: white; }

//         .modal {
//           position: fixed;
//           top: 0;
//           left: 0;
//           width: 100%;
//           height: 100%;
//           background: rgba(0,0,0,0.7);
//           display: flex;
//           justify-content: center;
//           align-items: center;
//         }

//         .modalBox {
//           width: 400px;
//           background: #111827;
//           padding: 20px;
//         }

//         .empty {
//           color: #9ca3af;
//         }
//       `}</style>
//     </>
//   );
// }


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

  // Styling layout state triggers
  const [focusedField, setFocusedField] = useState(null);
  const [hoveredBtn, setHoveredBtn] = useState(null);
  const [hoveredQ, setHoveredQ] = useState(null);

  const nav = useNavigate();

  // 1. Load categories once on mount
  useEffect(() => {
    fetchCategories();
  }, []);

  // 2. Load questions when category selection state updates
  useEffect(() => {
    fetchQuestions();
    setSelected([]);
    setVisibleCount(4);
  }, [category]);

  // Sync modal option category selector drops with active category
  useEffect(() => {
    setQuestionCategory(category);
  }, [category]);

  // YOUR EXACT ORIGINAL CATEGORIES FETCH LOGIC
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

  // YOUR EXACT ORIGINAL ENDPOINT ROUTE PATCH MATCHING (`/questions/category/${category}`)
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

  const toggleSelect = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((q) => q !== id) : [...prev, id]
    );
  };

  const handleOptionChange = (i, value) => {
    const updated = [...newOptions];
    updated[i] = value;
    setNewOptions(updated);
  };

  const addOption = () => {
    setNewOptions([...newOptions, ""]);
  };

  // YOUR EXACT ORIGINAL QUESTION CREATION ARTIFACTS
  const createQuestion = async () => {
    try {
      if (!newQuestion.trim()) return alert("Enter question");

      const formattedOptions = newOptions
        .filter((o) => o.trim() !== "")
        .map((o) => ({ text: o }));

      if (formattedOptions.length < 2) return alert("Add at least 2 options");

      await API.post("/questions", {
        questionText: newQuestion,
        type: "mcq",
        category: questionCategory,
        options: formattedOptions,
      });

      // Pull down updated database rows from your specific query endpoint
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

  // YOUR EXACT ORIGINAL SURVEY SUBMIT HANDLER MAP DATA STRUCTURES
  const createSurvey = async () => {
    try {
      if (!title.trim()) return alert("Enter survey title");
      if (selected.length === 0) return alert("Select at least one question");

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

  const loadMore = () => setVisibleCount((p) => p + 4);

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
      maxWidth: "540px",
      padding: "40px",
      boxShadow: "0 20px 50px rgba(0, 0, 0, 0.4)",
    },
    title: {
      fontSize: "26px",
      fontWeight: "900",
      letterSpacing: "-0.02em",
      margin: "0 0 4px 0",
      color: "#ffffff",
    },
    subtitle: {
      fontSize: "14px",
      color: "#9ca3af",
      margin: "0 0 28px 0",
    },
    label: {
      fontSize: "12px",
      fontWeight: "700",
      textTransform: "uppercase",
      letterSpacing: "0.05em",
      color: "#9ca3af",
      display: "block",
      marginBottom: "8px",
    },
    input: (isFocused) => ({
      width: "100%",
      padding: "14px 16px",
      background: "rgba(255, 255, 255, 0.02)",
      border: isFocused ? "1px solid #3b82f6" : "1px solid rgba(255, 255, 255, 0.08)",
      borderRadius: "12px",
      color: "#ffffff",
      fontSize: "14px",
      outline: "none",
      boxSizing: "border-box",
      transition: "all 0.2s ease",
    }),
    select: (isFocused) => ({
      width: "100%",
      padding: "14px 16px",
      background: "#111827",
      border: isFocused ? "1px solid #3b82f6" : "1px solid rgba(255, 255, 255, 0.08)",
      borderRadius: "12px",
      color: "#ffffff",
      fontSize: "14px",
      outline: "none",
      boxSizing: "border-box",
      cursor: "pointer",
    }),
    qRow: (isSelected, isHovered) => ({
      padding: "14px 16px",
      background: isSelected ? "rgba(16, 185, 129, 0.12)" : isHovered ? "rgba(255,255,255,0.03)" : "rgba(255,255,255,0.01)",
      border: isSelected ? "1px solid #10b981" : "1px solid rgba(255,255,255,0.05)",
      borderRadius: "10px",
      marginBottom: "8px",
      cursor: "pointer",
      fontSize: "14px",
      color: isSelected ? "#34d399" : "#d1d5db",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      transition: "all 0.2s ease",
    }),
    primaryBtn: (isHovered) => ({
      width: "100%",
      padding: "14px",
      border: "none",
      borderRadius: "12px",
      background: "linear-gradient(to right, #3b82f6, #60a5fa)",
      color: "white",
      fontWeight: "700",
      cursor: "pointer",
      transform: isHovered ? "translateY(-1px)" : "none",
      boxShadow: isHovered ? "0 4px 15px rgba(59,130,246,0.3)" : "none",
      transition: "all 0.2s ease",
    }),
    secBtn: (isHovered) => ({
      width: "100%",
      padding: "12px",
      border: "1px dashed rgba(255,255,255,0.15)",
      borderRadius: "12px",
      background: isHovered ? "rgba(255,255,255,0.04)" : "transparent",
      color: "#e5e7eb",
      fontWeight: "600",
      cursor: "pointer",
      fontSize: "13px",
      transition: "all 0.2s ease",
    }),
    modalOverlay: {
      position: "fixed",
      top: 0,
      left: 0,
      width: "100vw",
      height: "100vh",
      background: "rgba(3,7,18,0.6)",
      backdropFilter: "blur(8px)",
      WebkitBackdropFilter: "blur(8px)",
      zIndex: 1000,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }
  };

  return (
    <div style={styles.page}>
      <Navbar />
      <div style={styles.container}>
        <div style={styles.card}>
          <h2 style={styles.title}>Create Survey Feed</h2>
          <p style={styles.subtitle}>Define research headings and link explicit inquiry cards.</p>

          <div style={{ marginBottom: "20px" }}>
            <label style={styles.label}>Survey Title Heading</label>
            <input
              style={styles.input(focusedField === "title")}
              onFocus={() => setFocusedField("title")}
              onBlur={() => setFocusedField(null)}
              placeholder="e.g., Annual Dev Stack Feedback"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div style={{ marginBottom: "24px" }}>
            <label style={styles.label}>Dashboard Stream Category</label>
            <select
              style={styles.select(focusedField === "cat")}
              onFocus={() => setFocusedField("cat")}
              onBlur={() => setFocusedField(null)}
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {categories?.length > 0 &&
                categories.map((cat) => (
                  <option key={cat._id} value={cat._id}>{cat.name}</option>
                ))}
            </select>
          </div>

          <div style={{ marginBottom: "20px" }}>
            <label style={styles.label}>Select Questions ({selected.length} attached)</label>
            
            {questions.length === 0 ? (
              <div style={{ color: "#6b7280", fontSize: "13px", padding: "12px 4px", fontStyle: "italic" }}>
                No questions found in this category. Create one below!
              </div>
            ) : (
              questions.slice(0, visibleCount).map((q) => {
                const isSelected = selected.includes(q._id);
                const isHovered = hoveredQ === q._id;
                return (
                  <div
                    key={q._id}
                    style={styles.qRow(isSelected, isHovered)}
                    onMouseEnter={() => setHoveredQ(q._id)}
                    onMouseLeave={() => setHoveredQ(null)}
                    onClick={() => toggleSelect(q._id)}
                  >
                    <span>{q.questionText}</span>
                    <span style={{ fontWeight: "bold" }}>{isSelected ? "✓" : "+"}</span>
                  </div>
                );
              })
            )}

            {visibleCount < questions.length && (
              <button
                style={{ ...styles.secBtn(hoveredBtn === "more"), border: "none", color: "#3b82f6", textAlign: "left", padding: "6px 0" }}
                onMouseEnter={() => setHoveredBtn("more")}
                onMouseLeave={() => setHoveredBtn(null)}
                onClick={loadMore}
              >
                Show more questions...
              </button>
            )}
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginTop: "24px" }}>
            <button
              style={styles.secBtn(hoveredBtn === "newQ")}
              onMouseEnter={() => setHoveredBtn("newQ")}
              onMouseLeave={() => setHoveredBtn(null)}
              onClick={() => setShowModal(true)}
            >
              + Draft Brand New Question Row
            </button>

            <button
              style={styles.primaryBtn(hoveredBtn === "submit")}
              onMouseEnter={() => setHoveredBtn("submit")}
              onMouseLeave={() => setHoveredBtn(null)}
              onClick={createSurvey}
            >
              Publish Research Survey 🚀
            </button>

            <button
              style={{ ...styles.secBtn(false), border: "none", color: "#6b7280" }}
              onClick={() => nav("/home")}
            >
              Cancel and Return
            </button>
          </div>
        </div>
      </div>

      {/* ================= MODAL ================= */}
      {showModal && (
        <div style={styles.modalOverlay}>
          <div style={{ ...styles.card, maxWidth: "460px", background: "#0f172a", border: "1px solid rgba(255,255,255,0.12)" }}>
            <h3 style={{ ...styles.title, fontSize: "20px", marginBottom: "16px" }}>Draft New Question</h3>
            
            <div style={{ marginBottom: "16px" }}>
              <label style={styles.label}>Question Text</label>
              <input
                style={styles.input(focusedField === "newQText")}
                onFocus={() => setFocusedField("newQText")}
                onBlur={() => setFocusedField(null)}
                placeholder="Question label text"
                value={newQuestion}
                onChange={(e) => setNewQuestion(e.target.value)}
              />
            </div>

            <div style={{ marginBottom: "16px" }}>
              <label style={styles.label}>Question Category</label>
              <select
                style={styles.select(focusedField === "modalCat")}
                onFocus={() => setFocusedField("modalCat")}
                onBlur={() => setFocusedField(null)}
                value={questionCategory}
                onChange={(e) => setQuestionCategory(e.target.value)}
              >
                {categories?.length > 0 &&
                  categories.map((cat) => (
                    <option key={cat._id} value={cat._id}>{cat.name}</option>
                  ))}
              </select>
            </div>

            <label style={styles.label}>Options</label>
            {newOptions.map((opt, i) => (
              <div key={i} style={{ marginBottom: "10px" }}>
                <input
                  style={styles.input(focusedField === `m-opt-${i}`)}
                  onFocus={() => setFocusedField(`m-opt-${i}`)}
                  onBlur={() => setFocusedField(null)}
                  placeholder={`Option Target ${i + 1}`}
                  value={opt}
                  onChange={(e) => handleOptionChange(i, e.target.value)}
                />
              </div>
            ))}

            <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
              <button style={styles.secBtn(hoveredBtn === "m-add")} onMouseEnter={() => setHoveredBtn("m-add")} onMouseLeave={() => setHoveredBtn(null)} onClick={addOption}>
                + Add Option
              </button>
              <button style={styles.primaryBtn(hoveredBtn === "m-save")} onMouseEnter={() => setHoveredBtn("m-save")} onMouseLeave={() => setHoveredBtn(null)} onClick={createQuestion}>
                Save Matrix
              </button>
            </div>
            
            <button style={{ ...styles.secBtn(false), border: "none", color: "#ef4444", marginTop: "12px" }} onClick={() => setShowModal(false)}>
              Discard
            </button>
          </div>
        </div>
      )}
    </div>
  );
}