import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API } from "../api/api";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const nav = useNavigate();

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

  return (
    <>
      <style>{`
        * {
          margin:0;
          padding:0;
          box-sizing:border-box;
          font-family: 'Inter', sans-serif;
        }

        .signup-page {
          height:100vh;
          display:flex;
          justify-content:center;
          align-items:center;
          background: radial-gradient(circle at top, #0f172a, #020617);
        }

        /* subtle blobs */
        .blob {
          position:absolute;
          width:250px;
          height:250px;
          background:#3b82f6;
          opacity:0.12;
          border-radius:50%;
          filter:blur(80px);
          animation: float 10s infinite ease-in-out;
        }

        .blob:nth-child(1){ top:10%; left:15%; }
        .blob:nth-child(2){ bottom:10%; right:15%; }

        @keyframes float {
          0%,100% { transform: translateY(0); }
          50% { transform: translateY(-25px); }
        }

        .signup-card {
          width:360px;
          padding:32px;
          border-radius:18px;

          background: rgba(255,255,255,0.04); /* more transparent */
          border:1px solid rgba(255,255,255,0.1);

          backdrop-filter: blur(16px);
          box-shadow:0 20px 40px rgba(0,0,0,0.5);

          text-align:center;
          color:white;
          z-index:2;
        }

        .signup-card h2 {
          margin-bottom:20px;
          font-size:24px;
        }

        .signup-card input {
          width:100%;
          padding:12px;
          margin:8px 0;

          border-radius:10px;
          border:1px solid transparent;

          background:rgba(255,255,255,0.08);
          color:white;

          transition:0.25s;
        }

        .signup-card input:focus {
          border:1px solid #3b82f6;
          box-shadow:0 0 8px #3b82f6;
        }

        /* smaller cleaner button */
        .signup-btn {
          width:100%;
          padding:11px;
          margin-top:12px;

          border:none;
          border-radius:10px;

          background: linear-gradient(135deg,#3b82f6,#2563eb);
          color:white;

          cursor:pointer;
          transition:0.25s;
        }

        .signup-btn:hover {
          transform: scale(1.03);
          box-shadow:0 0 10px #3b82f6;
        }

        /* link style (natural feel) */
        .bottom-text {
          margin-top:14px;
          font-size:13px;
          color:#94a3b8;
        }

        .bottom-text span {
          color:#60a5fa;
          cursor:pointer;
        }

        .bottom-text span:hover {
          text-decoration:underline;
        }

      `}</style>

      <div className="signup-page">

        <div className="blob"></div>
        <div className="blob"></div>

        <div className="signup-card">

          <h2>Create Account ✨</h2>

          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e)=>setName(e.target.value)}
          />

          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
          />

          <button className="signup-btn" onClick={register}>
            Create Account
          </button>

          <div className="bottom-text">
            Already have an account?{" "}
            <span onClick={()=>nav("/")}>Login</span>
          </div>

        </div>

      </div>
    </>
  );
}