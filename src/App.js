import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Router, Routes, Route
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Books from "./pages/Books"; // respect case
import Login from "./pages/Login";
import Register from "./pages/Register";
import BookDetail from "./pages/BookDetail"; // ila bghiti
function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/books" element={<Books />} />
        <Route path="/books/:id" element={<BookDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;