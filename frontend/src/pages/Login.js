// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { API } from "../api/api";

// export default function Login() {

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const [loading, setLoading] = useState(false);

//   const nav = useNavigate();

//   // ================= LOGIN =================
//   const login = async () => {

//     if (!email || !password) {
//       alert("All fields are required");
//       return;
//     }

//     if (!email.includes("@")) {
//       alert("Invalid email");
//       return;
//     }

//     try {

//       setLoading(true);

//       const res = await API.post("/auth/login", {
//         email,
//         password,
//       });

//       console.log(res.data);

//       alert("Login Successful 🚀");

//       nav("/home");

//     } catch (err) {

//       console.log(err);

//       alert(
//         err.response?.data?.msg || "Login failed"
//       );

//     } finally {

//       setLoading(false);

//     }
//   };

//   // ================= GOOGLE LOGIN =================
//   const googleLogin = () => {
//     window.location.href =
//       "http://localhost:5001/api/auth/google";
//   };

//   return (
//     <>
//       <style>{`
//         *{
//           margin:0;
//           padding:0;
//           box-sizing:border-box;
//           font-family:Arial,sans-serif;
//         }

//         .login-page{
//           height:100vh;
//           display:flex;
//           justify-content:center;
//           align-items:center;

//           background:
//             linear-gradient(
//               -45deg,
//               #0f172a,
//               #1e293b,
//               #0b1220,
//               #1e3a8a
//             );

//           background-size:400% 400%;

//           animation:gradientMove 10s ease infinite;
//         }

//         @keyframes gradientMove{
//           0%{
//             background-position:0% 50%;
//           }

//           50%{
//             background-position:100% 50%;
//           }

//           100%{
//             background-position:0% 50%;
//           }
//         }

//         .login-card{
//           width:360px;

//           padding:32px;

//           border-radius:20px;

//           background:rgba(255,255,255,0.08);

//           border:1px solid rgba(255,255,255,0.15);

//           backdrop-filter:blur(12px);

//           box-shadow:
//             0 10px 30px rgba(0,0,0,0.4);

//           text-align:center;

//           color:white;
//         }

//         .login-card h2{
//           margin-bottom:25px;
//           font-size:28px;
//         }

//         .login-card input{
//           width:100%;

//           padding:13px;

//           margin:10px 0;

//           border-radius:12px;

//           border:none;

//           outline:none;

//           background:rgba(255,255,255,0.1);

//           color:white;

//           font-size:14px;
//         }

//         .login-card input::placeholder{
//           color:#cbd5e1;
//         }

//         .login-btn{
//           width:100%;

//           padding:13px;

//           margin-top:12px;

//           border:none;

//           border-radius:12px;

//           background:#3b82f6;

//           color:white;

//           font-size:15px;

//           cursor:pointer;

//           transition:0.3s;
//         }

//         .login-btn:hover{
//           background:#2563eb;
//           transform:scale(1.03);
//         }

//         .google-btn{
//           width:100%;

//           padding:13px;

//           margin-top:12px;

//           border:none;

//           border-radius:12px;

//           background:white;

//           color:black;

//           font-size:14px;

//           cursor:pointer;

//           transition:0.3s;
//         }

//         .google-btn:hover{
//           transform:scale(1.03);
//         }

//         .signup-btn{
//           margin-top:16px;

//           background:transparent;

//           color:#60a5fa;

//           border:none;

//           cursor:pointer;

//           font-size:13px;
//         }

//         .signup-btn:hover{
//           text-decoration:underline;
//         }

//         .divider{
//           margin-top:18px;
//           margin-bottom:5px;
//           color:#cbd5e1;
//           font-size:13px;
//         }
//       `}</style>

//       <div className="login-page">

//         <div className="login-card">

//           <h2>Poll System 🔐</h2>

//           <input
//             type="email"
//             placeholder="Enter email"
//             value={email}
//             onChange={(e) =>
//               setEmail(e.target.value)
//             }
//           />

//           <input
//             type="password"
//             placeholder="Enter password"
//             value={password}
//             onChange={(e) =>
//               setPassword(e.target.value)
//             }
//           />

//           <button
//             className="login-btn"
//             onClick={login}
//             disabled={loading}
//           >
//             {loading ? "Loading..." : "Login"}
//           </button>

//           <div className="divider">
//             OR
//           </div>

//           <button
//             className="google-btn"
//             onClick={googleLogin}
//           >
//             Continue with Google
//           </button>

//           <button
//             className="signup-btn"
//             onClick={() => nav("/signup")}
//           >
//             Don't have an account? Sign Up
//           </button>

//         </div>

//       </div>
//     </>
//   );
// }

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API } from "../api/api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user"); // 👈 NEW
  const [loading, setLoading] = useState(false);

  const nav = useNavigate();

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
        role, // 👈 send role
      });

      alert("Login Successful 🚀");

      nav(role === "admin" ? "/admin" : "/home");

    } catch (err) {
      alert(err.response?.data?.msg || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const googleLogin = () => {
    window.location.href = "http://localhost:5001/api/auth/google";
  };

  return (
    <>
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: 'Inter', sans-serif;
        }

        .login-page {
          height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;

          background: radial-gradient(circle at top, #0f172a, #020617);
        }

        /* Floating glow background */
        .blob {
          position: absolute;
          width: 300px;
          height: 300px;
          background: #3b82f6;
          opacity: 0.15;
          border-radius: 50%;
          filter: blur(80px);
          animation: float 10s infinite ease-in-out;
        }

        .blob:nth-child(1) {
          top: 10%;
          left: 20%;
        }

        .blob:nth-child(2) {
          bottom: 10%;
          right: 20%;
          animation-delay: 3s;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-30px); }
        }

        .login-card {
          width: 380px;
          padding: 35px;
          border-radius: 20px;

          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);

          backdrop-filter: blur(14px);

          box-shadow: 0 20px 40px rgba(0,0,0,0.6);

          text-align: center;
          color: white;
          z-index: 2;
        }

        .login-card h2 {
          margin-bottom: 20px;
          font-size: 26px;
        }

        /* Role toggle */
        .role-toggle {
          display: flex;
          margin-bottom: 15px;
          background: rgba(255,255,255,0.08);
          border-radius: 12px;
          overflow: hidden;
        }

        .role-btn {
          flex: 1;
          padding: 10px;
          cursor: pointer;
          border: none;
          background: transparent;
          color: #cbd5e1;
          transition: 0.3s;
        }

        .role-btn.active {
          background: #3b82f6;
          color: white;
        }

        .login-card input {
          width: 100%;
          padding: 13px;
          margin: 10px 0;
          border-radius: 12px;
          border: 1px solid transparent;
          outline: none;

          background: rgba(255,255,255,0.08);
          color: white;

          transition: 0.3s;
        }

        .login-card input:focus {
          border: 1px solid #3b82f6;
          box-shadow: 0 0 10px #3b82f6;
        }

        .login-btn {
          width: 100%;
          padding: 13px;
          margin-top: 12px;

          border: none;
          border-radius: 12px;

          background: linear-gradient(135deg, #3b82f6, #2563eb);

          color: white;
          font-size: 15px;

          cursor: pointer;
          transition: 0.3s;
        }

        .login-btn:hover {
          transform: scale(1.05);
          box-shadow: 0 0 15px #3b82f6;
        }

        .google-btn {
          width: 100%;
          padding: 13px;
          margin-top: 12px;

          border-radius: 12px;
          border: none;

          background: white;
          color: black;

          cursor: pointer;
          transition: 0.3s;
        }

        .google-btn:hover {
          transform: scale(1.05);
        }

        .divider {
          margin: 18px 0 5px;
          color: #94a3b8;
          font-size: 13px;
        }

        .signup-btn {
          margin-top: 14px;
          background: transparent;
          color: #60a5fa;
          border: none;
          cursor: pointer;
          font-size: 13px;
        }

        .signup-btn:hover {
          text-decoration: underline;
        }
      `}</style>

      <div className="login-page">

        {/* background blobs */}
        <div className="blob"></div>
        <div className="blob"></div>

        <div className="login-card">

          <h2>Welcome Back 🔐</h2>

          {/* 👇 Role Toggle */}
          <div className="role-toggle">
            <button
              className={`role-btn ${role === "user" ? "active" : ""}`}
              onClick={() => setRole("user")}
            >
              User
            </button>
            <button
              className={`role-btn ${role === "admin" ? "active" : ""}`}
              onClick={() => setRole("admin")}
            >
              Admin
            </button>
          </div>

          <input
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="login-btn" onClick={login} disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>

          <div className="divider">OR</div>

          <button className="google-btn" onClick={googleLogin}>
            Continue with Google
          </button>

          <button className="signup-btn" onClick={() => nav("/signup")}>
            Don't have an account? Sign Up
          </button>

        </div>
      </div>
    </>
  );
}