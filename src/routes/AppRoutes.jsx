import { Routes, Route, Navigate } from "react-router-dom";

import Admin from "../pages/Admin";
import Books from "../pages/Books";
import Login from "../pages/Auth/Login";
import User from "../pages/User"; // 👈 مهم

import AdminRoute from "../routes/AdminRoute";
import UserRoute from "../routes/UserRoute";

export default function AppRoutes() {
  return (
    <Routes>

      {/* 🌐 Public */}
      <Route path="/login" element={<Login />} />

      {/* 🏠 Default */}
      <Route path="/" element={<Navigate to="/books" />} />

      {/* 📚 Books (accessible for users) */}
      <Route
        path="/books"
        element={
          <UserRoute>
            <Books />
          </UserRoute>
        }
      />

      {/* 👤 USER DASHBOARD (NEW) */}
      <Route
        path="/user"
        element={
          <UserRoute>
            <User />
          </UserRoute>
        }
      />

      {/* 🔐 ADMIN */}
      <Route
        path="/admin"
        element={
          <AdminRoute>
            <Admin />
          </AdminRoute>
        }
      />

      {/* ❌ fallback */}
      <Route path="*" element={<Navigate to="/books" />} />

    </Routes>
  );
}