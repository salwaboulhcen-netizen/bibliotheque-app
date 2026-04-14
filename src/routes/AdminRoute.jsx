import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AdminRoute = ({ children }) => {
  const navigate = useNavigate();
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || user.role !== "admin") {
      navigate("/login");
    }
  }, [navigate]);
  return children;
};

export default AdminRoute;
