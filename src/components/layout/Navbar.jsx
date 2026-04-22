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
        {/* Left */}
        <div style={styles.left}>
          <img src="/logo.png" alt="logo" style={styles.logo} />
          
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

      <style>
        {`
          body { padding-top: 80px; }

          /* Links */
          .nav-link {
            color: #4b2e05;
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

          /* Button */
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
    backgroundColor: "#f5efe6",
    borderBottom: "1px solid #eee",
    position: "fixed",
    top: 25,
    left: 0,
    width: "100%",
    zIndex: 20,
  },

  left: {
    display: "flex",
    alignItems: "center",
  },

  logo: {
    width: "90px",
    marginRight: "100px",
  },

  title: {
    color: "#5c3b0c",
    margin: 0,
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