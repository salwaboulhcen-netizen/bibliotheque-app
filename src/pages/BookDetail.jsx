import React from "react";
import { useLocation } from "react-router-dom";

function BookDetail() {
  const { state } = useLocation();
  const book = state;

  return (
    <div style={{ padding: "40px" }}>
      <img src={book.image} style={{ width: "300px" }} />
      <h1>{book.title}</h1>
      <p>{book.author}</p>
      <p>{book.category}</p>
      <p>{book.year}</p>
      <p>{book.available ? "Disponible" : "Emprunté"}</p>
    </div>
  );
}

export default BookDetail;