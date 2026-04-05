import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

function Navbar() {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  // Resize handler
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <nav style={styles.nav}>
        {/* Left */}
        <div style={styles.left}>
          <img src="/logo.png" alt="logo" style={styles.logo} />
          <h2 style={styles.title}>Bibliothèque</h2>
        </div>

        {/* Mobile Button */}
        {isMobile && (
          <div
            style={styles.mobileToggle}
            onClick={() => setMobileMenu(!mobileMenu)}
          >
            ☰
          </div>
        )}

        {/* Links */}
        {(mobileMenu || !isMobile) && (
          <div
            style={{
              ...styles.right,
              flexDirection: isMobile ? "column" : "row",
              position: isMobile ? "absolute" : "static",
              top: isMobile ? "70px" : "auto",
              right: isMobile ? "20px" : "auto",
              backgroundColor: isMobile ? "#a87009" : "transparent",
              padding: isMobile ? "15px" : "0",
              boxShadow: isMobile ? "0 5px 15px rgba(0,0,0,0.2)" : "none",
              borderRadius: "10px",
            }}
          >
            <NavLink
              to="/"
              onClick={() => setMobileMenu(false)}
              className={({ isActive }) =>
                isActive ? "active-link" : "nav-link"
              }
            >
              Accueil
            </NavLink>

            <NavLink
              to="/books"
              onClick={() => setMobileMenu(false)}
              className={({ isActive }) =>
                isActive ? "active-link" : "nav-link"
              }
            >
              Catalogue
            </NavLink>

            <NavLink
              to="/login"
              onClick={() => setMobileMenu(false)}
              className={({ isActive }) =>
                isActive ? "active-link" : "nav-link"
              }
            >
              Connexion
            </NavLink>

            <NavLink
              to="/register"
              onClick={() => setMobileMenu(false)}
              className={({ isActive }) =>
                isActive ? "active-button" : "nav-button"
              }
            >
              S'inscrire
            </NavLink>
          </div>
        )}
      </nav>

      {/* Inline CSS */}
      <style>
        {`
          body { padding-top: 80px; }

          .nav-link {
            color: white;
            text-decoration: none;
            font-size: 18px;
            transition: 0.3s;
            margin-bottom: 10px;
          }

          .nav-link:hover {
            color: #ffd27f;
          }

          .active-link {
            color: #ffd27f;
            font-weight: bold;
          }

          .nav-button {
            background-color: #70510f;
            padding: 8px 15px;
            border-radius: 6px;
            color: white;
            text-decoration: none;
            font-size: 16px;
            margin-bottom: 10px;
            transition: 0.3s;
          }

          .nav-button:hover {
            background-color: #8a6515;
          }

          .active-button {
            background-color: #ffd27f;
            color: #70510f;
            font-weight: bold;
          }
        `}
      </style>
    </>
  );
}

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "20px 50px",
    backgroundColor: "#a87009",
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    zIndex: 1000,
  },
  left: {
    display: "flex",
    alignItems: "center",
  },
  logo: {
    width: "50px",
    marginRight: "10px",
  },
  title: {
    color: "white",
    margin: 0,
  },
  right: {
    display: "flex",
    alignItems: "center",
    gap: "25px",
  },
  mobileToggle: {
    fontSize: "28px",
    color: "white",
    cursor: "pointer",
  },
};

export default Navbar;