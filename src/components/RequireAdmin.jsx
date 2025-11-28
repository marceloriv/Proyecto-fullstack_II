import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../Contexts/AuthContext.jsx";

export default function RequireAdmin({ children }) {
  const { usuario } = useAuth();

  if (!usuario || !usuario.isAdmin) {
    // no admin lo saca de aquí
    return <Navigate to="/" replace />;
  }

  return children;
}
