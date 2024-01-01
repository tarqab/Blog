import React, { useContext } from "react";
import { authContext } from "../context/authContext";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const { token } = useContext(authContext);
  console.log(token);
  if (token === null) {
    console.log("blaba");
    return <Navigate to="/login" />;
  }
  
  return <>{children}</>;
}
