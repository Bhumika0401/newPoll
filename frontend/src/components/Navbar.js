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

  const [user, setUser] =
    useState(null);

  const [open, setOpen] =
    useState(false);

  const fileRef = useRef();

  const dropdownRef = useRef();


  // =====================================
  // FETCH USER
  // =====================================

  useEffect(() => {

    const fetchUser = async () => {
      try {

        const res =
          await API.get(
            "/auth/verify"
          );

        setUser(res.data.user);

      } catch (err) {

        console.log(err);

        setUser(null);
      }
    };

    fetchUser();

  }, []);


  // =====================================
  // CLOSE DROPDOWN OUTSIDE CLICK
  // =====================================

  useEffect(() => {

    const handleClickOutside = (
      e
    ) => {

      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(
          e.target
        )
      ) {
        setOpen(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };

  }, []);


  // =====================================
  // UPLOAD AVATAR
  // =====================================

  const handleUpload = async (
    e
  ) => {

    const file =
      e.target.files[0];

    if (!file) return;

    // Preview
    const preview =
      URL.createObjectURL(file);

    setUser((prev) => ({
      ...prev,
      avatar: preview,
    }));

    const formData =
      new FormData();

    formData.append(
      "avatar",
      file
    );

    try {

      const res =
        await API.post(
          "/auth/upload-avatar",
          formData
        );

      setUser(res.data.user);

    } catch (err) {

      console.error(err);

      alert("Upload failed");
    }
  };


  // =====================================
  // REMOVE AVATAR
  // =====================================

  const removeAvatar =
    async () => {

      try {

        const res =
          await API.delete(
            "/auth/remove-avatar"
          );

        setUser(res.data.user);

      } catch (err) {

        console.error(err);

        alert(
          "Failed to remove photo"
        );
      }
    };


  // =====================================
  // LOGOUT
  // =====================================

  const logout = async () => {

    try {

      await API.post(
        "/auth/logout"
      );

      setUser(null);

      nav("/");

    } catch (err) {

      console.error(err);
    }
  };


  // =====================================
  // STYLES
  // =====================================

  const styles = {

    navbar: {
      display: "flex",

      justifyContent:
        "space-between",

      alignItems: "center",

      padding: "15px 20px",

      background: "#111827",

      color: "white",

      position: "relative",
    },

    logo: {
      fontSize: "20px",

      fontWeight: "bold",

      cursor: "pointer",
    },

    links: {
      display: "flex",

      gap: "20px",
    },

    link: {
      color: "#cbd5e1",

      textDecoration: "none",
    },

    active: {
      color: "#3b82f6",

      fontWeight: "bold",
    },

    avatar: {
      width: "40px",

      height: "40px",

      borderRadius: "50%",

      objectFit: "cover",

      cursor: "pointer",

      border:
        "2px solid #3b82f6",
    },

    dropdown: {
      position: "absolute",

      right: "20px",

      top: "65px",

      width: "220px",

      background: "#1f2937",

      borderRadius: "10px",

      padding: "15px",

      zIndex: 100,

      boxShadow:
        "0 5px 20px rgba(0,0,0,0.3)",
    },

    name: {
      fontWeight: "bold",

      marginBottom: "5px",
    },

    email: {
      fontSize: "13px",

      color: "#9ca3af",

      marginBottom: "15px",
    },

    btn: {
      width: "100%",

      padding: "8px",

      border: "none",

      borderRadius: "6px",

      cursor: "pointer",

      color: "white",

      marginBottom: "10px",
    },

    uploadBtn: {
      background: "#2563eb",
    },

    removeBtn: {
      background: "#6b7280",
    },

    logoutBtn: {
      background: "#ef4444",
    },
  };


  return (
    <nav style={styles.navbar}>

      {/* Logo */}
      <div
        style={styles.logo}
        onClick={() => nav("/home")}
      >
        PollHub 🚀
      </div>


      {/* Links */}
      <div style={styles.links}>

        <Link
          to="/home"
          style={styles.link}
        >
          <span
            style={
              location.pathname ===
              "/home"
                ? styles.active
                : null
            }
          >
            Home
          </span>
        </Link>

        <Link
          to="/polls"
          style={styles.link}
        >
          <span
            style={
              location.pathname ===
              "/polls"
                ? styles.active
                : null
            }
          >
            Polls
          </span>
        </Link>

        <Link
          to="/surveys"
          style={styles.link}
        >
          <span
            style={
              location.pathname ===
              "/surveys"
                ? styles.active
                : null
            }
          >
            Surveys
          </span>
        </Link>
      </div>


      {/* Profile */}
      <div ref={dropdownRef}>

        <img
          src={
            user?.avatar ||
            "https://i.imgur.com/HeIi0wU.png"
          }

          alt="avatar"

          style={styles.avatar}

          onClick={() =>
            setOpen(!open)
          }
        />

        {open && user && (

          <div style={styles.dropdown}>

            <div style={styles.name}>
              {user.name}
            </div>

            <div style={styles.email}>
              {user.email}
            </div>

            {/* Upload */}
            <button
              style={{
                ...styles.btn,
                ...styles.uploadBtn,
              }}

              onClick={() =>
                fileRef.current.click()
              }
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

            {/* Remove */}
            {user.avatar && (
              <button
                style={{
                  ...styles.btn,
                  ...styles.removeBtn,
                }}

                onClick={
                  removeAvatar
                }
              >
                Remove Photo
              </button>
            )}

            {/* Logout */}
            <button
              style={{
                ...styles.btn,
                ...styles.logoutBtn,
              }}

              onClick={logout}
            >
              Logout
            </button>

          </div>
        )}
      </div>
    </nav>
  );
}