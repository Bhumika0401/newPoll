// import {
//   Link,
//   useLocation,
//   useNavigate,
// } from "react-router-dom";

// import {
//   useState,
//   useEffect,
//   useRef,
// } from "react";

// import { API } from "../api/api";

// export default function Navbar() {

//   const location = useLocation();

//   const nav = useNavigate();

//   const [user, setUser] =
//     useState(null);

//   const [open, setOpen] =
//     useState(false);

//   const fileRef = useRef();

//   const dropdownRef = useRef();


//   // =====================================
//   // FETCH USER
//   // =====================================

//   useEffect(() => {

//     const fetchUser = async () => {
//       try {

//         const res =
//           await API.get(
//             "/auth/verify"
//           );

//         setUser(res.data.user);

//       } catch (err) {

//         console.log(err);

//         setUser(null);
//       }
//     };

//     fetchUser();

//   }, []);


//   // =====================================
//   // CLOSE DROPDOWN OUTSIDE CLICK
//   // =====================================

//   useEffect(() => {

//     const handleClickOutside = (
//       e
//     ) => {

//       if (
//         dropdownRef.current &&
//         !dropdownRef.current.contains(
//           e.target
//         )
//       ) {
//         setOpen(false);
//       }
//     };

//     document.addEventListener(
//       "mousedown",
//       handleClickOutside
//     );

//     return () => {
//       document.removeEventListener(
//         "mousedown",
//         handleClickOutside
//       );
//     };

//   }, []);


//   // =====================================
//   // UPLOAD AVATAR
//   // =====================================

//   const handleUpload = async (
//     e
//   ) => {

//     const file =
//       e.target.files[0];

//     if (!file) return;

//     // Preview
//     const preview =
//       URL.createObjectURL(file);

//     setUser((prev) => ({
//       ...prev,
//       avatar: preview,
//     }));

//     const formData =
//       new FormData();

//     formData.append(
//       "avatar",
//       file
//     );

//     try {

//       const res =
//         await API.post(
//           "/auth/upload-avatar",
//           formData
//         );

//       setUser(res.data.user);

//     } catch (err) {

//       console.error(err);

//       alert("Upload failed");
//     }
//   };


//   // =====================================
//   // REMOVE AVATAR
//   // =====================================

//   const removeAvatar =
//     async () => {

//       try {

//         const res =
//           await API.delete(
//             "/auth/remove-avatar"
//           );

//         setUser(res.data.user);

//       } catch (err) {

//         console.error(err);

//         alert(
//           "Failed to remove photo"
//         );
//       }
//     };


//   // =====================================
//   // LOGOUT
//   // =====================================

//   const logout = async () => {

//     try {

//       await API.post(
//         "/auth/logout"
//       );

//       setUser(null);

//       nav("/");

//     } catch (err) {

//       console.error(err);
//     }
//   };


//   // =====================================
//   // STYLES
//   // =====================================

//   const styles = {

//     navbar: {
//       display: "flex",

//       justifyContent:
//         "space-between",

//       alignItems: "center",

//       padding: "15px 20px",

//       background: "#111827",

//       color: "white",

//       position: "relative",
//     },

//     logo: {
//       fontSize: "20px",

//       fontWeight: "bold",

//       cursor: "pointer",
//     },

//     links: {
//       display: "flex",

//       gap: "20px",
//     },

//     link: {
//       color: "#cbd5e1",

//       textDecoration: "none",
//     },

//     active: {
//       color: "#3b82f6",

//       fontWeight: "bold",
//     },

//     avatar: {
//       width: "40px",

//       height: "40px",

//       borderRadius: "50%",

//       objectFit: "cover",

//       cursor: "pointer",

//       border:
//         "2px solid #3b82f6",
//     },

//     dropdown: {
//       position: "absolute",

//       right: "20px",

//       top: "65px",

//       width: "220px",

//       background: "#1f2937",

//       borderRadius: "10px",

//       padding: "15px",

//       zIndex: 100,

//       boxShadow:
//         "0 5px 20px rgba(0,0,0,0.3)",
//     },

//     name: {
//       fontWeight: "bold",

//       marginBottom: "5px",
//     },

//     email: {
//       fontSize: "13px",

//       color: "#9ca3af",

//       marginBottom: "15px",
//     },

//     btn: {
//       width: "100%",

//       padding: "8px",

//       border: "none",

//       borderRadius: "6px",

//       cursor: "pointer",

//       color: "white",

//       marginBottom: "10px",
//     },

//     uploadBtn: {
//       background: "#2563eb",
//     },

//     removeBtn: {
//       background: "#6b7280",
//     },

//     logoutBtn: {
//       background: "#ef4444",
//     },
//   };


//   return (
//     <nav style={styles.navbar}>

//       {/* Logo */}
//       <div
//         style={styles.logo}
//         onClick={() => nav("/home")}
//       >
//         PollHub 🚀
//       </div>


//       {/* Links */}
//       <div style={styles.links}>

//         <Link
//           to="/home"
//           style={styles.link}
//         >
//           <span
//             style={
//               location.pathname ===
//               "/home"
//                 ? styles.active
//                 : null
//             }
//           >
//             Home
//           </span>
//         </Link>

//         <Link
//           to="/polls"
//           style={styles.link}
//         >
//           <span
//             style={
//               location.pathname ===
//               "/polls"
//                 ? styles.active
//                 : null
//             }
//           >
//             Polls
//           </span>
//         </Link>

//         <Link
//           to="/surveys"
//           style={styles.link}
//         >
//           <span
//             style={
//               location.pathname ===
//               "/surveys"
//                 ? styles.active
//                 : null
//             }
//           >
//             Surveys
//           </span>
//         </Link>
//       </div>


//       {/* Profile */}
//       <div ref={dropdownRef}>

//         <img
//           src={
//             user?.avatar ||
//             "https://i.imgur.com/HeIi0wU.png"
//           }

//           alt="avatar"

//           style={styles.avatar}

//           onClick={() =>
//             setOpen(!open)
//           }
//         />

//         {open && user && (

//           <div style={styles.dropdown}>

//             <div style={styles.name}>
//               {user.name}
//             </div>

//             <div style={styles.email}>
//               {user.email}
//             </div>

//             {/* Upload */}
//             <button
//               style={{
//                 ...styles.btn,
//                 ...styles.uploadBtn,
//               }}

//               onClick={() =>
//                 fileRef.current.click()
//               }
//             >
//               Upload Photo
//             </button>

//             <input
//               type="file"

//               hidden

//               accept="image/*"

//               ref={fileRef}

//               onChange={handleUpload}
//             />

//             {/* Remove */}
//             {user.avatar && (
//               <button
//                 style={{
//                   ...styles.btn,
//                   ...styles.removeBtn,
//                 }}

//                 onClick={
//                   removeAvatar
//                 }
//               >
//                 Remove Photo
//               </button>
//             )}

//             {/* Logout */}
//             <button
//               style={{
//                 ...styles.btn,
//                 ...styles.logoutBtn,
//               }}

//               onClick={logout}
//             >
//               Logout
//             </button>

//           </div>
//         )}
//       </div>
//     </nav>
//   );
// }

import {
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";

import {
  useState,
  useEffect,
  useRef,
} from "react";

import { API } from "../api/api";

export default function Navbar() {
  const location = useLocation();
  const nav = useNavigate();

  const [user, setUser] = useState(null);
  const [open, setOpen] = useState(false);
  
  // Interactive element pseudo-hover tracking states
  const [hoveredLink, setHoveredLink] = useState(null);
  const [hoveredBtn, setHoveredBtn] = useState(null);

  const fileRef = useRef();
  const sidebarRef = useRef();

  // =====================================
  // FETCH USER (Kept 100% Unchanged)
  // =====================================
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await API.get("/auth/verify");
        setUser(res.data.user);
      } catch (err) {
        console.log(err);
        setUser(null);
      }
    };
    fetchUser();
  }, []);

  // =====================================
  // CLOSE PANEL ON OUTSIDE CLICK
  // =====================================
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(e.target) &&
        !e.target.closest(".profile-avatar-trigger")
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // =====================================
  // UPLOAD AVATAR (Kept 100% Unchanged)
  // =====================================
  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const preview = URL.createObjectURL(file);
    setUser((prev) => ({
      ...prev,
      avatar: preview,
    }));

    const formData = new FormData();
    formData.append("avatar", file);

    try {
      const res = await API.post("/auth/upload-avatar", formData);
      setUser(res.data.user);
    } catch (err) {
      console.error(err);
      alert("Upload failed");
    }
  };

  // =====================================
  // REMOVE AVATAR (Kept 100% Unchanged)
  // =====================================
  const removeAvatar = async () => {
    try {
      const res = await API.delete("/auth/remove-avatar");
      setUser(res.data.user);
    } catch (err) {
      console.error(err);
      alert("Failed to remove photo");
    }
  };

  // =====================================
  // LOGOUT (Kept 100% Unchanged)
  // =====================================
  const logout = async () => {
    try {
      await API.post("/auth/logout");
      setUser(null);
      setOpen(false);
      nav("/");
    } catch (err) {
      console.error(err);
    }
  };

  // =====================================
  // NATIVE VISUAL JAVASCRIPT OBJECT STYLES
  // =====================================
  const styles = {
    navbar: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "16px 40px",
      background: "rgba(11, 15, 25, 0.8)",
      backdropFilter: "blur(12px)",
      WebkitBackdropFilter: "blur(12px)",
      borderBottom: "1px solid rgba(255, 255, 255, 0.06)",
      color: "white",
      position: "sticky",
      top: 0,
      zIndex: 999,
      fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    },
    logo: {
      fontSize: "22px",
      fontWeight: "900",
      cursor: "pointer",
      letterSpacing: "-0.02em",
      background: "linear-gradient(to right, #60a5fa, #a5b4fc, #c084fc)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
    },
    links: {
      display: "flex",
      gap: "28px",
      alignItems: "center",
    },
    link: {
      textDecoration: "none",
      fontSize: "14px",
      fontWeight: "600",
      position: "relative",
      padding: "6px 0",
      transition: "color 0.2s ease",
    },
    avatar: {
      width: "42px",
      height: "42px",
      borderRadius: "50%",
      objectFit: "cover",
      cursor: "pointer",
      border: "2px solid rgba(59, 130, 246, 0.6)",
      boxShadow: "0 0 15px rgba(59, 130, 246, 0.2)",
      transition: "all 0.2s ease",
    },
    // Blurred Overlay Mask beneath sliding side panel
    backdropOverlay: {
      position: "fixed",
      top: 0,
      left: 0,
      width: "100vw",
      height: "100vh",
      background: "rgba(3, 7, 18, 0.4)",
      backdropFilter: "blur(4px)",
      WebkitBackdropFilter: "blur(4px)",
      zIndex: 1000,
      opacity: open ? 1 : 0,
      pointerEvents: open ? "auto" : "none",
      transition: "opacity 0.3s ease",
    },
    // Modern Sliding Side Panel Configuration
    sidebarPanel: {
      position: "fixed",
      top: 0,
      right: 0,
      width: "320px",
      height: "100vh",
      background: "linear-gradient(180deg, #111827 0%, #070a12 100%)",
      borderLeft: "1px solid rgba(255, 255, 255, 0.08)",
      boxShadow: "-10px 0 30px rgba(0, 0, 0, 0.5)",
      padding: "40px 24px",
      boxSizing: "border-box",
      zIndex: 1001,
      display: "flex",
      flexDirection: "column",
      transform: open ? "translateX(0)" : "translateX(100%)",
      transition: "transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
    },
    closeBtn: {
      position: "absolute",
      top: "24px",
      left: "24px",
      background: "none",
      border: "none",
      color: "#9ca3af",
      fontSize: "20px",
      cursor: "pointer",
    },
    profileSection: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      textAlign: "center",
      marginTop: "20px",
      marginBottom: "32px",
      paddingBottom: "24px",
      borderBottom: "1px solid rgba(255, 255, 255, 0.06)",
    },
    largeAvatar: {
      width: "80px",
      height: "80px",
      borderRadius: "50%",
      objectFit: "cover",
      border: "3px solid #2563eb",
      marginBottom: "16px",
      boxShadow: "0 8px 24px rgba(37, 99, 235, 0.2)",
    },
    name: {
      fontSize: "18px",
      fontWeight: "700",
      color: "#ffffff",
      margin: "0 0 4px 0",
    },
    email: {
      fontSize: "13px",
      color: "#6b7280",
      margin: 0,
    },
    btnGroup: {
      display: "flex",
      flexDirection: "column",
      gap: "12px",
      marginTop: "10px",
    },
    btn: (isHovered, activeColor) => ({
      width: "100%",
      padding: "12px",
      border: "none",
      borderRadius: "12px",
      fontWeight: "600",
      fontSize: "14px",
      cursor: "pointer",
      color: "white",
      background: isHovered ? activeColor : "rgba(255, 255, 255, 0.03)",
      border: isHovered ? `1px solid ${activeColor}` : "1px solid rgba(255, 255, 255, 0.05)",
      transform: isHovered ? "translateY(-1px)" : "none",
      boxShadow: isHovered ? `0 4px 12px ${activeColor}33` : "none",
      transition: "all 0.2s ease",
    })
  };

  return (
    <>
      <nav style={styles.navbar}>
        {/* Logo */}
        <div style={styles.logo} onClick={() => nav("/home")}>
          PollHub 🚀
        </div>

        {/* Links Navigation Bar */}
        <div style={styles.links}>
          {["/home", "/polls", "/surveys"].map((path, idx) => {
            const labels = ["Home", "Polls", "Surveys"];
            const isActive = location.pathname === path;
            const isHovered = hoveredLink === path;

            return (
              <Link
                key={path}
                to={path}
                style={{
                  ...styles.link,
                  color: isActive ? "#60a5fa" : isHovered ? "#ffffff" : "#9ca3af"
                }}
                onMouseEnter={() => setHoveredLink(path)}
                onMouseLeave={() => setHoveredLink(null)}
              >
                {labels[idx]}
                {isActive && (
                  <span style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    width: "100%",
                    height: "2px",
                    background: "#3b82f6",
                    borderRadius: "2px"
                  }} />
                )}
              </Link>
            );
          })}

          {/* Profile Interactive Trigger Item */}
          <img
            className="profile-avatar-trigger"
            src={user?.avatar || "https://i.imgur.com/HeIi0wU.png"}
            alt="avatar"
            style={styles.avatar}
            onClick={() => setOpen(!open)}
          />
        </div>
      </nav>

      {/* Dimmed Overlay Frame */}
      <div style={styles.backdropOverlay} onClick={() => setOpen(false)} />

      {/* ================= MODERN SIDEBAR SLIDER PANEL ================= */}
      <div ref={sidebarRef} style={styles.sidebarPanel}>
        {/* Close Interaction button */}
        <button style={styles.closeBtn} onClick={() => setOpen(false)}>×</button>

        {user && (
          <>
            <div style={styles.profileSection}>
              <img
                src={user?.avatar || "https://i.imgur.com/HeIi0wU.png"}
                alt="avatar-large"
                style={styles.largeAvatar}
              />
              <h3 style={styles.name}>{user.name}</h3>
              <p style={styles.email}>{user.email}</p>
            </div>

            <div style={styles.btnGroup}>
              {/* Upload Utility Action Trigger */}
              <button
                style={styles.btn(hoveredBtn === "upload", "#2563eb")}
                onMouseEnter={() => setHoveredBtn("upload")}
                onMouseLeave={() => setHoveredBtn(null)}
                onClick={() => fileRef.current.click()}
              >
                Upload Photo
              </button>

              <input
                type="file"
                hidden
                accept="image/*"
                ref={fileRef}
                onChange={handleUpload}
              />

              {/* Remove Avatar Utility Button */}
              {user.avatar && (
                <button
                  style={styles.btn(hoveredBtn === "remove", "#4b5563")}
                  onMouseEnter={() => setHoveredBtn("remove")}
                  onMouseLeave={() => setHoveredBtn(null)}
                  onClick={removeAvatar}
                >
                  Remove Photo
                </button>
              )}

              {/* App Logout Core Trigger Action */}
              <button
                style={{
                  ...styles.btn(hoveredBtn === "logout", "#dc2626"),
                  marginTop: "auto"
                }}
                onMouseEnter={() => setHoveredBtn("logout")}
                onMouseLeave={() => setHoveredBtn(null)}
                onClick={logout}
              >
                Logout Account
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}