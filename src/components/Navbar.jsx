import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  // Update isMobile on window resize
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <nav style={styles.nav}>
      {/* Left: Logo + Name */}
      <div style={styles.left}>
        <img src="/logo.png" alt="logo" style={styles.logo} />
        <h2 style={styles.title}>Bibliothèque</h2>
      </div>

      {/* Mobile toggle button */}
      {isMobile && (
        <div style={styles.mobileToggle} onClick={() => setMobileMenu(!mobileMenu)}>
          ☰
        </div>
      )}

      {/* Right: Links */}
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
          }}
        >
          <Link to="/" style={styles.link}>Accueil</Link>
          <Link to="/books" style={styles.link}>Livres</Link>
          <Link to="/login" style={styles.link}>Connexion</Link>
          <Link to="/register" style={styles.link}>S'inscrire</Link>
        </div>
      )}
    </nav>
  );
}

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "20px 50px",
    backgroundColor: "#a87009",
    position: "relative",
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
  link: {
    color: "white",
    textDecoration: "none",
    fontSize: "18px",
    marginBottom: "10px",
  },
  button: {
    backgroundColor: "#70510f",
    padding: "8px 15px",
    borderRadius: "6px",
    color: "white",
    textDecoration: "none",
    fontSize: "16px",
    marginBottom: "10px",
  },
  mobileToggle: {
    fontSize: "28px",
    color: "white",
    cursor: "pointer",
  },
};

export default Navbar;