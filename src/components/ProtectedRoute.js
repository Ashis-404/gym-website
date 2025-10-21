import React from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ isLoggedIn, children }) {
  // If user not logged in redirect to signin
  if (!isLoggedIn) {
    return <Navigate to="/signin" replace />;
  }
  return children;
}