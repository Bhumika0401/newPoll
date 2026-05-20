import {
  Navigate,
} from "react-router-dom";

import {
  useEffect,
  useState,
} from "react";

import { API } from "../api/api";

export default function ProtectRoutes({
  children,
}) {

  const [loading, setLoading] =
    useState(true);

  const [auth, setAuth] =
    useState(false);


  // =====================================
  // VERIFY USER
  // =====================================

  useEffect(() => {

    const checkAuth = async () => {

      try {

        const res =
          await API.get(
            "/auth/verify"
          );

        setAuth(
          !!res.data.user
        );

      } catch (err) {

        console.error(err);

        setAuth(false);
      }

      setLoading(false);
    };

    checkAuth();

  }, []);


  // =====================================
  // LOADING
  // =====================================

  if (loading) {
    return (
      <div
        style={{
          height: "100vh",

          display: "flex",

          justifyContent:
            "center",

          alignItems: "center",

          fontSize: "20px",

          fontWeight: "bold",
        }}
      >
        Loading...
      </div>
    );
  }


  // =====================================
  // NOT AUTHORIZED
  // =====================================

  if (!auth) {
    return (
      <Navigate to="/login" />
    );
  }


  // =====================================
  // AUTHORIZED
  // =====================================

  return children;
}