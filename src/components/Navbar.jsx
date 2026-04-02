import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm py-2">
      <div className="container">

        {/* Logo + Nom Bibliothèque */}
        <Link className="navbar-brand d-flex align-items-center gap-2" to="/">
          <img src="/logo.png" alt="Logo" width="40" />
          <span style={{ fontWeight: "bold", fontSize: "20px" }}>
            Bibliothèque
          </span>
        </Link>

        {/* Toggle Mobile */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Links */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mx-auto gap-3">

            <li className="nav-item">
              <Link className="nav-link fw-semibold" to="/">
                Accueil
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link fw-semibold" to="/books">
                Livres
              </Link>
            </li>

          </ul>

          {/* Login Button on the right */}
          <div className="d-flex">
            <Link className="btn btn-dark px-4 rounded-pill" to="/login">
              Login
            </Link>
          </div>
        </div>

      </div>
    </nav>
  );
}

export default Navbar;