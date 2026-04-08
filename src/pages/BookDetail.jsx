import React from "react";
import { useParams } from "react-router-dom";
import books from "./booksData";

function BookDetail() {
  const { id } = useParams();
  const book = books.find((b) => b.id === parseInt(id));

  if (!book) return <h2 style={{ textAlign: "center" }}>Livre non trouvé</h2>;

  return (
    <div style={{ maxWidth: "600px", margin: "40px auto", textAlign: "center" }}>
      <h1>{book.title}</h1>
      <p>{book.author}</p>
      <p style={{ fontWeight: "bold", color: book.status === "Disponible" ? "green" : "red" }}>
        {book.status}
      </p>
      <img src={book.image} alt={book.title} style={{ width: "100%", maxHeight: "400px", objectFit: "cover" }} />
    </div>
  );
}

export default BookDetail;