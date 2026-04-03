import React from "react";

export default function Footer() {
  return (
    <footer style={styles.footer}>
      <p>© 2026 Bibliothèque -Faculté des Lettres et des Sciences Humaines Marrakech</p>
    </footer>
  );
}

const styles = {
  footer: {
    textAlign: "center",
    padding: "20px",
    backgroundColor: "#70510f",
    color: "white",
    marginTop: "20px",
  },
};