import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API } from "../api/api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [loading, setLoading] = useState(false);
  
  // Styling UI state variables
  const [focusedField, setFocusedField] = useState(null);
  const [hoveredBtn, setHoveredBtn] = useState(null);

  const nav = useNavigate();

  // ================= LOGIN HANDLER =================
  const login = async () => {
    if (!email || !password) {
      alert("All fields are required");
      return;
    }

    if (!email.includes("@")) {
      alert("Invalid email");
      return;
    }

    try {
      setLoading(true);

      const res = await API.post("/auth/login", {
        email,
        password,
        role, 
      });

      console.log(res.data);
      alert("Login Successful 🎉");
      nav("/home");
    } catch (err) {
      console.log(err);
      alert(err.response?.data?.msg || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  // ================= GOOGLE AUTHENTICATION (FIXED) =================
const googleLogin = () => {
  // 💡 Pulls your live backend URL from your API configuration
  const backendBase = API.defaults.baseURL || "https://your-backend-name.onrender.com/api";

  // Clean up any accidental double slashes
  const cleanBase = backendBase.endsWith("/") ? backendBase.slice(0, -1) : backendBase;

  // 🚀 Forces the browser to go directly to your live Render backend for Google Auth
  window.location.assign(`${cleanBase}/auth/google`);
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
      width: "400px",
      height: "400px",
      background: "radial-gradient(circle, rgba(59, 130, 246, 0.15), transparent 70%)",
      top: "10%",
      left: "15%",
      filter: "blur(80px)",
      zIndex: 0,
    },
    blob2: {
      position: "absolute",
      width: "450px",
      height: "450px",
      background: "radial-gradient(circle, rgba(16, 185, 129, 0.08), transparent 70%)",
      bottom: "10%",
      right: "10%",
      filter: "blur(100px)",
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
    roleToggleContainer: {
      display: "flex",
      gap: "8px",
      background: "rgba(255, 255, 255, 0.03)",
      padding: "4px",
      borderRadius: "12px",
      border: "1px solid rgba(255, 255, 255, 0.05)",
      marginBottom: "24px",
    },
    roleBtn: (isActive) => ({
      flex: 1,
      padding: "10px",
      border: "none",
      borderRadius: "8px",
      fontSize: "13px",
      fontWeight: "600",
      cursor: "pointer",
      background: isActive ? "rgba(255, 255, 255, 0.08)" : "transparent",
      color: isActive ? "#ffffff" : "#9ca3af",
      transition: "all 0.2s ease",
    }),
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
    primaryBtn: (isHovered, isDisabled) => ({
      width: "100%",
      padding: "14px",
      border: "none",
      borderRadius: "12px",
      background: "linear-gradient(to right, #3b82f6, #60a5fa)",
      color: "white",
      fontWeight: "700",
      fontSize: "15px",
      cursor: isDisabled ? "not-allowed" : "pointer",
      opacity: isDisabled ? 0.7 : 1,
      transform: isHovered && !isDisabled ? "translateY(-1px)" : "none",
      boxShadow: isHovered && !isDisabled ? "0 4px 15px rgba(59,130,246,0.3)" : "none",
      transition: "all 0.2s ease",
      marginTop: "16px",
    }),
    divider: {
      display: "flex",
      alignItems: "center",
      color: "#4b5563",
      fontSize: "11px",
      fontWeight: "700",
      letterSpacing: "0.05em",
      margin: "24px 0",
    },
    dividerLine: {
      flex: 1,
      height: "1px",
      background: "rgba(255,255,255,0.06)",
    },
    googleBtn: (isHovered) => ({
      width: "100%",
      padding: "12px",
      background: isHovered ? "rgba(255, 255, 255, 0.04)" : "rgba(255, 255, 255, 0.01)",
      border: "1px solid rgba(255, 255, 255, 0.1)",
      borderRadius: "12px",
      color: "#ffffff",
      fontWeight: "600",
      fontSize: "14px",
      cursor: "pointer",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      gap: "10px",
      transition: "all 0.2s ease",
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
        <h2 style={styles.title}>Welcome Back</h2>
        <p style={styles.subtitle}>Enter your details to access your dashboard stream.</p>

        <label style={styles.label}>Select Account Authority Role</label>
        <div style={styles.roleToggleContainer}>
          <button style={styles.roleBtn(role === "user")} onClick={() => setRole("user")}>
            User Account
          </button>
          <button style={styles.roleBtn(role === "admin")} onClick={() => setRole("admin")}>
            Administrator
          </button>
        </div>

        <div style={{ marginBottom: "16px" }}>
          <label style={styles.label}>Email Address</label>
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

        <div style={{ marginBottom: "8px" }}>
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
          style={styles.primaryBtn(hoveredBtn === "login", loading)}
          onMouseEnter={() => setHoveredBtn("login")}
          onMouseLeave={() => setHoveredBtn(null)}
          onClick={login}
          disabled={loading}
        >
          {loading ? "Authenticating Row..." : "Sign In to Account 🚀"}
        </button>

        <div style={styles.divider}>
          <div style={styles.dividerLine}></div>
          <span style={{ padding: "0 10px" }}>SECURE THIRD PARTY</span>
          <div style={styles.dividerLine}></div>
        </div>

        <button
          style={styles.googleBtn(hoveredBtn === "google")}
          onMouseEnter={() => setHoveredBtn("google")}
          onMouseLeave={() => setHoveredBtn(null)}
          onClick={googleLogin}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
          </svg>
          Continue with Google
        </button>

        <p style={styles.footerText}>
          Don't have an account?
          <span style={styles.link} onClick={() => nav("/signup")}>
            Sign Up
          </span>
        </p>
      </div>
    </div>
  );
}