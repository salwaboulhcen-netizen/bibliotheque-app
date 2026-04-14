import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

function Navbar() {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <nav style={styles.nav}>
        {/* LEFT */}
        <div style={styles.left}>
          <img src="/logo.png" alt="logo" style={styles.logo} />
        </div>

        {/* MOBILE BUTTON */}
        {isMobile && (
          <div
            style={styles.mobileToggle}
            onClick={() => setMobileMenu(!mobileMenu)}
          >
            ☰
          </div>
        )}

        {/* LINKS */}
        {(mobileMenu || !isMobile) && (
          <div
            style={{
              ...styles.right,
              flexDirection: isMobile ? "column" : "row",
              position: isMobile ? "absolute" : "static",
              top: isMobile ? "70px" : "auto",
              right: isMobile ? "20px" : "auto",
              backgroundColor: isMobile ? "#ffffff" : "transparent",
              padding: isMobile ? "15px" : "0",
              boxShadow: isMobile ? "0 5px 15px rgba(0,0,0,0.1)" : "none",
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

      {/* CSS */}
      <style>
        {`
          body {
            padding-top: 83px; 
          }

          /* LINKS */
          .nav-link {
            color: #5c3b0c;
            text-decoration: none;
            font-size: 18px;
            transition: 0.3s;
            margin-bottom: 10px;
          }

          .nav-link:hover {
            color: #a87009;
          }

          .active-link {
            color: #a87009;
            font-weight: bold;
          }

          /* BUTTON */
          .nav-button {
            background-color: #a87009;
            padding: 8px 15px;
            border-radius: 6px;
            color: white;
            text-decoration: none;
            font-size: 16px;
            margin-bottom: 10px;
            transition: 0.3s;
          }

          .nav-button:hover {
            background-color: #8a5a05;
          }

          .active-button {
            background-color: #5c3b0c;
            color: white;
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
    padding: "15px 50px",
    backgroundColor: "#ddcfb6",
    borderBottom: "1px solid #d8c7ab",

    position: "fixed",
    top: "39px", // 👈 قرب من TopBar (بدلها إذا بغيتي)
    left: 0,
    width: "100%",
    zIndex: 1000,

    boxSizing: "border-box",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
  },

  left: {
    display: "flex",
    alignItems: "center",
  },

  logo: {
    width: "80px",
  },

  right: {
    display: "flex",
    alignItems: "center",
    gap: "25px",
  },

  mobileToggle: {
    fontSize: "28px",
    color: "#5c3b0c",
    cursor: "pointer",
  },
};

export default Navbar;