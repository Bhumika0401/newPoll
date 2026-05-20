import axios from "axios";

export const API = axios.create({
  baseURL: "https://newpoll-8ju1.onrender.com",
  withCredentials: true,
});

// export const API = axios.create({
//   baseURL: "http://localhost:5001/api",

//   withCredentials: true,
// });

