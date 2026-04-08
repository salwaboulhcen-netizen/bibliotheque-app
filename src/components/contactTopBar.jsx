import React from "react";

export default function ContactTopBar() {
  return (
    <div style={styles.topBar}>
      📍 123 Avenue Universitaire, Paris
      &nbsp; | &nbsp;
      📞 +33 1 23 45 67 89
      &nbsp; | &nbsp;
      ✉️ contact@bibliotheque.fr
    </div>
  );
}

const styles = {
  topBar: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    backgroundColor: "#8a610c",
    color: "white",
    textAlign: "center",
    padding: "8px 10px",
    fontSize: "14px",
    zIndex: 10000, // فوق navbar
  },
};