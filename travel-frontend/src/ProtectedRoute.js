import React from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const user = localStorage.getItem("loggedUser");

  if (!user) {
    alert("Please login first 🔒");
    return <Navigate to="/" />;
  }

  return children;
}

export default ProtectedRoute;