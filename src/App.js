import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import TopBar from "./components/layout/TopBar";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";

import Home from "./pages/Home";
import Books from "./pages/Books";
import BookDetail from "./pages/BookDetail";

import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";

import Admin from "./pages/Admin";
import AdminRoute from "./routes/AdminRoute";

function App() {
  return (
    <Router>
      <TopBar />
      <div className="with-topbar">
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/books" element={<Books />} />
          <Route path="/books/:id" element={<BookDetail />} />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="/admin" element={
            <AdminRoute>
              <Admin />
            </AdminRoute>
          } />
        </Routes>

        <Footer />
      </div>
    </Router>
  );
}

export default App;