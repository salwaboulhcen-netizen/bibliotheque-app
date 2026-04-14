import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const UserRoute = ({ children }) => {
  const navigate = useNavigate();
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      navigate("/login");
    }
  }, [navigate]);
  return children;
};

export default UserRoute;
