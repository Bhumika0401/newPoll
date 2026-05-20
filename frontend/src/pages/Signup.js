import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API } from "../api/api";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Styling UI state variables
  const [focusedField, setFocusedField] = useState(null);
  const [hoveredBtn, setHoveredBtn] = useState(null);

  const nav = useNavigate();

  // ================= REGISTER HANDLER =================
  const register = async () => {
    if (!name || !email || !password) {
      alert("All fields are required");
      return;
    }

    if (!email.includes("@")) {
      alert("Invalid email");
      return;
    }

    if (password.length < 4) {
      alert("Password must be at least 4 characters");
      return;
    }

    try {
      const res = await API.post("/auth/register", {
        name,
        email,
        password,
      });

      alert(res.data.msg || "Signup successful 🚀");
      nav("/");
    } catch (err) {
      alert(err.response?.data?.msg || "Signup failed");
    }
  };

  const styles = {
    page: {
      minHeight: "100vh",
      background: "radial-gradient(circle at top, #0f172a 0%, #030712 80%)",
      color: "#f3f4f6",
      fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "20px",
      position: "relative",
      overflow: "hidden",
    },
    blob: {
      position: "absolute",
      width: "500px",
      height: "500px",
      background: "radial-gradient(circle, rgba(99, 102, 241, 0.12), transparent 70%)",
      bottom: "-10%",
      left: "-5%",
      filter: "blur(90px)",
      zIndex: 0,
    },
    blob2: {
      position: "absolute",
      width: "400px",
      height: "400px",
      background: "radial-gradient(circle, rgba(59, 130, 246, 0.15), transparent 70%)",
      top: "-5%",
      right: "5%",
      filter: "blur(90px)",
      zIndex: 0,
    },
    card: {
      background: "rgba(17, 24, 39, 0.5)",
      backdropFilter: "blur(20px)",
      WebkitBackdropFilter: "blur(20px)",
      border: "1px solid rgba(255, 255, 255, 0.08)",
      borderRadius: "24px",
      width: "100%",
      maxWidth: "420px",
      padding: "40px",
      boxShadow: "0 20px 50px rgba(0, 0, 0, 0.4)",
      zIndex: 1,
    },
    title: {
      fontSize: "28px",
      fontWeight: "900",
      letterSpacing: "-0.02em",
      margin: "0 0 8px 0",
      color: "#ffffff",
      textAlign: "center",
    },
    subtitle: {
      fontSize: "14px",
      color: "#9ca3af",
      margin: "0 0 28px 0",
      textAlign: "center",
    },
    label: {
      fontSize: "11px",
      fontWeight: "700",
      textTransform: "uppercase",
      letterSpacing: "0.05em",
      color: "#9ca3af",
      display: "block",
      marginBottom: "6px",
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
    primaryBtn: (isHovered) => ({
      width: "100%",
      padding: "14px",
      border: "none",
      borderRadius: "12px",
      background: "linear-gradient(to right, #3b82f6, #60a5fa)",
      color: "white",
      fontWeight: "700",
      fontSize: "15px",
      cursor: "pointer",
      transform: isHovered ? "translateY(-1px)" : "none",
      boxShadow: isHovered ? "0 4px 15px rgba(59,130,246,0.3)" : "none",
      transition: "all 0.2s ease",
      marginTop: "16px",
    }),
    footerText: {
      textAlign: "center",
      marginTop: "24px",
      fontSize: "13px",
      color: "#9ca3af",
    },
    link: {
      color: "#60a5fa",
      cursor: "pointer",
      fontWeight: "600",
      textDecoration: "none",
      marginLeft: "5px",
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.blob}></div>
      <div style={styles.blob2}></div>

      <div style={styles.card}>
        <h2 style={styles.title}>Create Account ✨</h2>
        <p style={styles.subtitle}>Register your identity to deploy live ecosystem feeds.</p>

        <div style={{ marginBottom: "16px" }}>
          <label style={styles.label}>Full Structural Name</label>
          <input
            type="text"
            style={styles.input(focusedField === "name")}
            onFocus={() => setFocusedField("name")}
            onBlur={() => setFocusedField(null)}
            placeholder="John Doe"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div style={{ marginBottom: "16px" }}>
          <label style={styles.label}>Email address</label>
          <input
            type="email"
            style={styles.input(focusedField === "email")}
            onFocus={() => setFocusedField("email")}
            onBlur={() => setFocusedField(null)}
            placeholder="name@company.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label style={styles.label}>Security Password</label>
          <input
            type="password"
            style={styles.input(focusedField === "password")}
            onFocus={() => setFocusedField("password")}
            onBlur={() => setFocusedField(null)}
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          style={styles.primaryBtn(hoveredBtn === "register")}
          onMouseEnter={() => setHoveredBtn("register")}
          onMouseLeave={() => setHoveredBtn(null)}
          onClick={register}
        >
          Initialize Account 🚀
        </button>

        <p style={styles.footerText}>
          Already have an account?
          <span style={styles.link} onClick={() => nav("/")}>
            Log In
          </span>
        </p>
      </div>
    </div>
  );
}