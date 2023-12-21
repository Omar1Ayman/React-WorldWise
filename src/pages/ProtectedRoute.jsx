import React, { useEffect } from "react";
import { useAuth } from "../context/FakeAuthContext";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const navigat = useNavigate();
  useEffect(() => {
    if (!isAuthenticated) navigat("/");
  }, [isAuthenticated, navigat]);
  return isAuthenticated ? children : null;
};

export default ProtectedRoute;
