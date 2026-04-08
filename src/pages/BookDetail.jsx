import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import books from "./booksData";

function BookDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const book = books.find((b) => b.id === parseInt(id));

  if (!book)
    return <h2 style={{ textAlign: "center" }}>Livre non trouvé</h2>;

  const handleBorrow = () => {
    alert("Livre emprunté avec succès 📚");
  };

  return (
    <div style={styles.page}>
      {/* Retour */}
      <button style={styles.backBtn} onClick={() => navigate(-1)}>
        ← Retour
      </button>

      <div style={styles.card}>
        <img src={book.image} alt={book.title} style={styles.image} />

        <h1 style={styles.title}>{book.title}</h1>

        <p style={styles.text}>
          <strong>Auteur:</strong> {book.author}
        </p>

        <p style={styles.text}>
          <strong>Année:</strong> {book.year || "Non spécifiée"}
        </p>

        <p style={styles.text}>
          <strong>Type:</strong> {book.category}
        </p>

        <p style={styles.text}>
          <strong>Description:</strong>{" "}
          {book.description || "Aucune description disponible"}
        </p>

        <span
          style={{
            ...styles.status,
            backgroundColor:
              book.status === "Disponible" ? "#d1fae5" : "#fee2e2",
            color: book.status === "Disponible" ? "#047857" : "#b91c1c",
          }}
        >
          {book.status}
        </span>

        {/* Bouton emprunter */}
        <button
          style={{
            ...styles.borrowBtn,
            opacity: book.status === "Disponible" ? 1 : 0.5,
            cursor: book.status === "Disponible" ? "pointer" : "not-allowed",
          }}
          disabled={book.status !== "Disponible"}
          onClick={handleBorrow}
        >
          📚 Emprunter
        </button>
      </div>
    </div>
  );
}

export default BookDetail;

/* 🎨 STYLES */
const styles = {
  page: {
    minHeight: "100vh",
    background: "#f5f7fb",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "30px 15px",
  },

  backBtn: {
    alignSelf: "flex-start",
    marginLeft: "20px",
    marginBottom: "20px",
    padding: "10px 15px",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    background: "#ffffff",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    fontWeight: "bold",
  },

  card: {
    background: "white",
    width: "100%",
    maxWidth: "600px",
    borderRadius: "15px",
    padding: "20px",
    textAlign: "center",
    boxShadow: "0 6px 20px rgba(0,0,0,0.1)",
  },

  image: {
    width: "100%",
    height: "350px",
    objectFit: "cover",
    borderRadius: "12px",
    marginBottom: "15px",
  },

  title: {
    margin: "10px 0",
  },

  text: {
    margin: "8px 0",
    color: "#444",
  },

  status: {
    display: "inline-block",
    padding: "6px 12px",
    borderRadius: "20px",
    fontWeight: "bold",
    fontSize: "14px",
    marginTop: "10px",
  },

  borrowBtn: {
    marginTop: "20px",
    padding: "12px 20px",
    border: "none",
    borderRadius: "10px",
    background: "#4f6df5",
    color: "white",
    fontWeight: "bold",
    fontSize: "15px",
  },
};