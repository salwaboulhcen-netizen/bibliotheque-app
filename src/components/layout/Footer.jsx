import React from "react";
import { Link } from "react-router-dom"; // ✅ Import Link
import { FaMapMarkerAlt, FaPhone, FaEnvelope } from "react-icons/fa";

export default function Footer() {
  return (
    <footer style={styles.footer}>
      <div style={styles.container}>

        {/* Left Section */}
        <div style={styles.column}>
          <h2 style={styles.logoContainer}>
            <img src="/logo.png" alt="logo" style={styles.logoimg} />
            Bibliothèque Universitaire
          </h2>
          <p style={styles.text}>
            Votre espace de découverte et d'apprentissage.
            Accédez à des milliers de ressources académiques et littéraires.
          </p>
        </div>

        {/* Middle Section */}
        <div style={styles.column}>
          <h3 style={styles.title}>Liens Rapides</h3>
          <ul style={styles.list}>
            <li><Link to="/" style={styles.link}>Accueil</Link></li>
            <li><Link to="/books" style={styles.link}>Catalogue</Link></li>
            <li><Link to="/login" style={styles.link}>Connexion</Link></li>
            <li><Link to="/register" style={styles.link}>Inscription</Link></li>
          </ul>
        </div>

        {/* Right Section */}
        <div style={styles.column}>
          <h3 style={styles.title}>Contact</h3>
          <p><FaMapMarkerAlt /> 123 Avenue Universitaire, Paris</p>
          <p><FaPhone /> +33 1 23 45 67 89</p>
          <p><FaEnvelope /> contact@bibliotheque.fr</p>
        </div>

      </div>

      <hr style={styles.divider} />

      <p style={styles.copy}>
        © 2026 Bibliothèque Universitaire. Tous droits réservés.
      </p>
    </footer>
  );
}

const styles = {
  footer: {
    backgroundColor: "#0b1a2b",
    color: "#fff",
    padding: "40px 20px",
  },
  container: {
    display: "flex",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
  column: {
    flex: "1",
    minWidth: "250px",
    margin: "10px",
  },
  logoContainer: {
    display:"flex",
    alignItems: "center",
    fontSize: "20px",
    marginBottom: "10px",
  },
  logoimg: {
    marginRight: "8px",
    width:"30px",
    height:"30px"
  },
  title: {
    marginBottom: "10px",
  },
  text: {
    color: "#ccc",
    lineHeight: "1.6",
  },
  list: {
    listStyle: "none",
    padding: 0,
    lineHeight: "2",
  },
  link:{
    color:"#ccc",               // ✅ Fix color format
    textDecoration:"none",      // ✅ lowercase t
    transition:"color 0.2s",
  },
  divider: {
    margin: "20px 0",
    borderColor: "#333",
  },
  copy: {
    textAlign: "center",
    color: "#aaa",
    fontSize: "14px",
  },
};