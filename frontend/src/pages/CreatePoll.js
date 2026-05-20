// import { useState, useEffect } from "react";
// import { API } from "../api/api";
// import { useNavigate } from "react-router-dom";
// import Navbar from "../components/Navbar";

// export default function CreatePoll() {
//   const nav = useNavigate();

//   const [question, setQuestion] = useState("");
//   const [category, setCategory] = useState("");
//   const [categories, setCategories] = useState([]);
//   const [options, setOptions] = useState(["", ""]);

//   // ================= FETCH CATEGORIES =================
//   useEffect(() => {
//     fetchCategories();
//   }, []);

//   const fetchCategories = async () => {
//     try {
//       const res = await API.get("/categories");

//       setCategories(res.data || []);

//       // auto select first category
//       if (res.data.length > 0) {
//         setCategory(res.data[0]._id);
//       }

//     } catch (err) {
//       console.log(err);
//     }
//   };

//   // ================= ADD OPTION =================
//   const addOption = () => {
//     setOptions([...options, ""]);
//   };

//   // ================= UPDATE OPTION =================
//   const updateOption = (value, i) => {
//     const updated = [...options];
//     updated[i] = value;
//     setOptions(updated);
//   };

//   // ================= CREATE POLL =================
//   const createPoll = async () => {
//     if (!question || !category) {
//       return alert("Question and category required");
//     }

//     if (options.some((o) => !o.trim())) {
//       return alert("Fill all options");
//     }

//     try {
//       await API.post(
//         "/polls",
//         {
//           question,
//           category,
//           options: options.map((o) => ({
//             text: o,
//           })),
//         },
//         {
//           withCredentials: true,
//         }
//       );

//       alert("Poll Created Successfully ✅");

//       nav("/polls");

//     } catch (err) {
//       console.log(err);

//       alert(
//         err.response?.data?.msg ||
//         "Error creating poll"
//       );
//     }
//   };

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
//           color: white;
//           padding: 20px;
//         }

//         .card {
//           width: 420px;
//           background: #111827;
//           padding: 25px;
//           border-radius: 18px;
//           box-shadow: 0 15px 40px rgba(0,0,0,0.6);
//         }

//         .title {
//           font-size: 24px;
//           font-weight: 700;
//           text-align: center;
//           margin-bottom: 20px;
//         }

//         .label {
//           font-size: 13px;
//           color: #9ca3af;
//           margin: 10px 0 5px;
//         }

//         input, select {
//           width: 100%;
//           padding: 10px;
//           border-radius: 8px;
//           border: none;
//           outline: none;
//           background: #1f2937;
//           color: white;
//           margin-bottom: 10px;
//         }

//         input::placeholder {
//           color: #6b7280;
//         }

//         .btn {
//           width: 100%;
//           padding: 10px;
//           border: none;
//           border-radius: 8px;
//           margin-top: 10px;
//           cursor: pointer;
//           font-weight: 600;
//         }

//         .add {
//           background: #22c55e;
//         }

//         .create {
//           background: #3b82f6;
//         }

//         .back {
//           background: #374151;
//         }

//         .btn:hover {
//           opacity: 0.9;
//         }

//         .option-row {
//           display: flex;
//           gap: 8px;
//         }

//         .remove-btn {
//           background: red;
//           border: none;
//           color: white;
//           padding: 0 10px;
//           border-radius: 6px;
//           cursor: pointer;
//         }
//       `}</style>

//       <div className="page">
//         <div className="card">

//           <div className="title">
//             Create Poll 📊
//           </div>

//           {/* QUESTION */}
//           <div className="label">
//             Question
//           </div>

//           <input
//             placeholder="Enter your question..."
//             value={question}
//             onChange={(e) =>
//               setQuestion(e.target.value)
//             }
//           />

//           {/* CATEGORY */}
//           <div className="label">
//             Category
//           </div>

//           <select
//             value={category}
//             onChange={(e) =>
//               setCategory(e.target.value)
//             }
//           >
//             {categories.map((cat) => (
//               <option
//                 key={cat._id}
//                 value={cat._id}
//               >
//                 {cat.name}
//               </option>
//             ))}
//           </select>

//           {/* OPTIONS */}
//           <div className="label">
//             Options
//           </div>

//           {options.map((o, i) => (
//             <div
//               key={i}
//               className="option-row"
//             >
//               <input
//                 placeholder={`Option ${i + 1}`}
//                 value={o}
//                 onChange={(e) =>
//                   updateOption(
//                     e.target.value,
//                     i
//                   )
//                 }
//               />

//               {options.length > 2 && (
//                 <button
//                   className="remove-btn"
//                   onClick={() =>
//                     setOptions(
//                       options.filter(
//                         (_, index) =>
//                           index !== i
//                       )
//                     )
//                   }
//                 >
//                   ✕
//                 </button>
//               )}
//             </div>
//           ))}

//           {/* ADD OPTION */}
//           <button
//             className="btn add"
//             onClick={addOption}
//           >
//             + Add Option
//           </button>

//           {/* CREATE */}
//           <button
//             className="btn create"
//             onClick={createPoll}
//           >
//             Create Poll 🚀
//           </button>

//           {/* BACK */}
//           <button
//             className="btn back"
//             onClick={() => nav("/home")}
//           >
//             ← Back to Home
//           </button>

//         </div>
//       </div>
//     </>
//   );
// }


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

  // Track hover state arrays
  const [hoveredBtn, setHoveredBtn] = useState(null);
  const [focusedInput, setFocusedInput] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await API.get("/categories");
      setCategories(res.data || []);
      if (res.data.length > 0) {
        setCategory(res.data[0]._id);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const addOption = () => {
    setOptions([...options, ""]);
  };

  const updateOption = (value, i) => {
    const updated = [...options];
    updated[i] = value;
    setOptions(updated);
  };

  const createPoll = async () => {
    // Basic verification filter
    if (!question.trim()) return alert("Please enter a poll question");
    const filteredOptions = options.filter((o) => o.trim() !== "");
    if (filteredOptions.length < 2) return alert("Please provide at least 2 options");

    try {
      await API.post("/polls", {
        question,
        category,
        options: filteredOptions,
      });
      nav("/polls");
    } catch (err) {
      console.log(err);
      alert("Failed to build poll item.");
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
      maxWidth: "520px",
      padding: "40px",
      boxShadow: "0 20px 50px rgba(0, 0, 0, 0.4)",
    },
    title: {
      fontSize: "26px",
      fontWeight: "900",
      letterSpacing: "-0.02em",
      margin: "0 0 8px 0",
      color: "#ffffff",
    },
    subtitle: {
      fontSize: "14px",
      color: "#9ca3af",
      margin: "0 0 32px 0",
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
    fieldGroup: {
      marginBottom: "24px",
    },
    input: (isFocused) => ({
      width: "100%",
      padding: "14px 16px",
      background: "rgba(255, 255, 255, 0.02)",
      border: isFocused ? "1px solid #2563eb" : "1px solid rgba(255, 255, 255, 0.08)",
      borderRadius: "12px",
      color: "#ffffff",
      fontSize: "14px",
      outline: "none",
      boxSizing: "border-box",
      boxShadow: isFocused ? "0 0 15px rgba(37, 99, 235, 0.15)" : "none",
      transition: "all 0.2s ease",
    }),
    select: (isFocused) => ({
      width: "100%",
      padding: "14px 16px",
      background: "#111827",
      border: isFocused ? "1px solid #2563eb" : "1px solid rgba(255, 255, 255, 0.08)",
      borderRadius: "12px",
      color: "#ffffff",
      fontSize: "14px",
      outline: "none",
      boxSizing: "border-box",
      cursor: "pointer",
      transition: "all 0.2s ease",
    }),
    optionRow: {
      display: "flex",
      gap: "10px",
      alignItems: "center",
      marginBottom: "12px",
    },
    removeBtn: {
      background: "rgba(239, 68, 68, 0.1)",
      border: "1px solid rgba(239, 68, 68, 0.2)",
      color: "#f87171",
      borderRadius: "10px",
      width: "44px",
      height: "46px",
      fontSize: "14px",
      cursor: "pointer",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      transition: "all 0.2s ease",
    },
    addBtn: (isHovered) => ({
      background: "transparent",
      color: "#60a5fa",
      border: "1px dashed rgba(96, 165, 250, 0.4)",
      width: "100%",
      padding: "12px",
      borderRadius: "12px",
      fontWeight: "600",
      fontSize: "13px",
      cursor: "pointer",
      background: isHovered ? "rgba(96, 165, 250, 0.04)" : "transparent",
      marginBottom: "32px",
      transition: "all 0.2s ease",
    }),
    createBtn: (isHovered) => ({
      background: "linear-gradient(to right, #2563eb, #1d4ed8)",
      color: "#ffffff",
      border: "none",
      width: "100%",
      padding: "14px",
      borderRadius: "12px",
      fontWeight: "700",
      fontSize: "14px",
      cursor: "pointer",
      boxShadow: isHovered ? "0 4px 20px rgba(37, 99, 235, 0.3)" : "none",
      transform: isHovered ? "translateY(-1px)" : "none",
      marginBottom: "12px",
      transition: "all 0.2s ease",
    }),
    backBtn: (isHovered) => ({
      background: "transparent",
      color: "#6b7280",
      border: "none",
      width: "100%",
      padding: "10px",
      fontSize: "13px",
      fontWeight: "600",
      cursor: "pointer",
      color: isHovered ? "#9ca3af" : "#6b7280",
      transition: "all 0.2s ease",
    })
  };

  return (
    <div style={styles.page}>
      <Navbar />
      <div style={styles.container}>
        <div style={styles.card}>
          <h2 style={styles.title}>Create a New Poll</h2>
          <p style={styles.subtitle}>Formulate a question and supply optional routes for responses.</p>

          {/* QUESTION BOX */}
          <div style={styles.fieldGroup}>
            <label style={styles.label}>Poll Question</label>
            <input
              style={styles.input(focusedInput === "question")}
              onFocus={() => setFocusedInput("question")}
              onBlur={() => setFocusedInput(null)}
              placeholder="e.g., What is your favorite programming language?"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
            />
          </div>

          {/* CATEGORY SELECTOR */}
          <div style={styles.fieldGroup}>
            <label style={styles.label}>Stream Category</label>
            <select
              style={styles.select(focusedInput === "category")}
              onFocus={() => setFocusedInput("category")}
              onBlur={() => setFocusedInput(null)}
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {categories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          {/* DYNAMIC ANSWER OPTIONS FEED */}
          <div style={{ marginBottom: "12px" }}>
            <label style={styles.label}>Response Targets</label>
            {options.map((o, i) => (
              <div key={i} style={styles.optionRow}>
                <input
                  style={styles.input(focusedInput === `opt-${i}`)}
                  onFocus={() => setFocusedInput(`opt-${i}`)}
                  onBlur={() => setFocusedInput(null)}
                  placeholder={`Option ${i + 1}`}
                  value={o}
                  onChange={(e) => updateOption(e.target.value, i)}
                />

                {options.length > 2 && (
                  <button
                    style={styles.removeBtn}
                    onClick={() => setOptions(options.filter((_, idx) => idx !== i))}
                  >
                    ✕
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* INTERACTIVE CONTROLS */}
          <button
            style={styles.addBtn(hoveredBtn === "add")}
            onMouseEnter={() => setHoveredBtn("add")}
            onMouseLeave={() => setHoveredBtn(null)}
            onClick={addOption}
          >
            + Add Response Target
          </button>

          <button
            style={styles.createBtn(hoveredBtn === "create")}
            onMouseEnter={() => setHoveredBtn("create")}
            onMouseLeave={() => setHoveredBtn(null)}
            onClick={createPoll}
          >
            Deploy Poll Live 🚀
          </button>

          <button
            style={styles.backBtn(hoveredBtn === "back")}
            onMouseEnter={() => setHoveredBtn("back")}
            onMouseLeave={() => setHoveredBtn(null)}
            onClick={() => nav("/polls")}
          >
            ← Cancel and Return
          </button>
        </div>
      </div>
    </div>
  );
}