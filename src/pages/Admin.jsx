import React, { useState } from "react";
import booksData from "../data/booksData";

function Admin() {
  const [books, setBooks] = useState(booksData);

  const [newBook, setNewBook] = useState({
    title: "",
    author: "",
    category: "",
    year: "",
    image: "",
    status: "Disponible",
    description: "",
  });

  // ➕ ADD BOOK
  const addBook = () => {
    if (!newBook.title || !newBook.author) return;

    const book = {
      id: Date.now(),
      ...newBook,
    };

    setBooks([...books, book]);

    setNewBook({
      title: "",
      author: "",
      category: "",
      year: "",
      image: "",
      status: "Disponible",
      description: "",
    });
  };

  // ❌ DELETE BOOK
  const deleteBook = (id) => {
    setBooks(books.filter((b) => b.id !== id));
  };

  return (
    <div style={styles.page}>
      <h1>📊 Admin Dashboard</h1>

      {/* FORM */}
      <div style={styles.form}>
        <input
          placeholder="Titre"
          value={newBook.title}
          onChange={(e) =>
            setNewBook({ ...newBook, title: e.target.value })
          }
        />

        <input
          placeholder="Auteur"
          value={newBook.author}
          onChange={(e) =>
            setNewBook({ ...newBook, author: e.target.value })
          }
        />

        <input
          placeholder="Catégorie"
          value={newBook.category}
          onChange={(e) =>
            setNewBook({ ...newBook, category: e.target.value })
          }
        />

        <input
          placeholder="Année"
          value={newBook.year}
          onChange={(e) =>
            setNewBook({ ...newBook, year: e.target.value })
          }
        />

        <input
          placeholder="Image URL"
          value={newBook.image}
          onChange={(e) =>
            setNewBook({ ...newBook, image: e.target.value })
          }
        />

        <textarea
          placeholder="Description"
          value={newBook.description}
          onChange={(e) =>
            setNewBook({ ...newBook, description: e.target.value })
          }
        />

        <button onClick={addBook}>➕ Ajouter Livre</button>
      </div>

      {/* LIST */}
      <div style={styles.list}>
        {books.map((book) => (
          <div key={book.id} style={styles.card}>
            <img src={book.image} alt="" style={styles.img} />

            <div>
              <h3>{book.title}</h3>
              <p>{book.author}</p>
              <p>{book.category}</p>

              <button
                style={styles.deleteBtn}
                onClick={() => deleteBook(book.id)}
              >
                ❌ Supprimer
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Admin;

/* 🎨 STYLE */
const styles = {
  page: {
    padding: "20px",
    background: "#f5f7fb",
    minHeight: "100vh",
  },

  form: {
    display: "grid",
    gap: "10px",
    maxWidth: "500px",
    marginBottom: "30px",
  },

  list: {
    display: "grid",
    gap: "15px",
  },

  card: {
    display: "flex",
    gap: "15px",
    background: "white",
    padding: "10px",
    borderRadius: "10px",
    alignItems: "center",
  },

  img: {
    width: "80px",
    height: "100px",
    objectFit: "cover",
    borderRadius: "8px",
  },

  deleteBtn: {
    background: "red",
    color: "white",
    border: "none",
    padding: "5px 10px",
    borderRadius: "6px",
    cursor: "pointer",
  },
};