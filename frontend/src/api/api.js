// import axios from "axios";

// export const API = axios.create({
//   baseURL: "http://localhost:5001/api",

//   withCredentials: true,
// });

import axios from "axios";

export const API = axios.create({
  // 💡 Checks if a production variable exists on Vercel; otherwise uses localhost
  baseURL: import.meta.env?.VITE_API_URL || process.env?.REACT_APP_API_URL || "http://localhost:5001/api",
  withCredentials: true,
});