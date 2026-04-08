import React from "react";
import { useNavigate } from "react-router-dom";
import books from "./booksData";

const Books = () => {
  const navigate = useNavigate();

  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ textAlign: "center", marginBottom: "30px" }}>Catalogue des Livres</h1>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)", // 4 livres par ligne
        gap: "20px",
      }}>
        {books.map((book) => (
          <div key={book.id} style={cardStyle}>
            <img src={book.image} alt={book.title} style={imageStyle} />
            <button
              onClick={() => navigate(`/books/${book.id}`)}
              style={btnStyle}
            >
              Voir plus de détails
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

const cardStyle = {
  border: "1px solid #ddd",
  borderRadius: "10px",
  overflow: "hidden",
  textAlign: "center",
  padding: "10px",
};

const imageStyle = {
  width: "100%",
  height: "200px",
  objectFit: "cover",
  marginBottom: "10px",
};

const btnStyle = {
  padding: "10px",
  backgroundColor: "#a87009",
  color: "#fff",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  width: "100%",
};

export default Books;