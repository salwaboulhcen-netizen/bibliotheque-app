import React, { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";

function Livres() {
  const [books, setBooks] = useState([]);

  const [search, setSearch] = useState("");
  const [genreFilter, setGenreFilter] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8000/api/books")
      .then((res) => res.json())
      .then((data) => setBooks(data))
      .catch((err) => console.log(err));
  }, []);

  // 🔥 FILTER AVANCÉ
  
const filteredBooks = useMemo(() => {
  return books.filter((book) => {
    const title = book.title || "";
    const author = book.author || "";
    const genre = book.genre || "";

    return (
      (
        title.toLowerCase().includes(search.toLowerCase()) ||
        author.toLowerCase().includes(search.toLowerCase())
      ) &&
           (genreFilter
        ? genre.toLowerCase() === genreFilter.toLowerCase()
        : true)
    );
  });
}, [books, search, genreFilter]);
  return (
    <div style={styles.container}>

      {/* 🔍 SEARCH + FILTERS */}
      <div style={styles.searchBox}>

        <input
          type="text"
          placeholder="🔍 Rechercher livre ou auteur..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={styles.input}
        />

        {/* 🎯 GENRE FILTER */}
        <select
          value={genreFilter}
          onChange={(e) => setGenreFilter(e.target.value)}
          style={styles.select}
        >
          <option value="">Tous les genres</option>
          <option value="Informatique">Informatique </option>
          <option value="Science">Science </option>
          <option value="Fiction">Fiction </option>
          <option value="Histoire">Histoire </option>
          <option value="Littérature">Littérature </option>
        </select>

        {/* 🔘 BUTTON ADVANCED (optional reset) */}
        <button
          style={styles.resetBtn}
          onClick={() => {
            setSearch("");
            setGenreFilter("");
          }}
        >
          Reset
        </button>

      </div>

      {/* 📚 BOOKS */}
      <div style={styles.grid}>
        {filteredBooks.length > 0 ? (
          filteredBooks.map((book) => (
            <div key={book.id} style={styles.card}>

              <img src={book.image} alt={book.title} style={styles.image} />

              <h3 style={styles.title}>{book.title}</h3>
              <p style={styles.author}>{book.author}</p>

              <p style={styles.genre}>{book.genre}</p>

              <button
                style={styles.viewBtn}
                onClick={() => navigate(`/books/${book.id}`)}
              >
                Voir plus →
              </button>

            </div>
          ))
        ) : (
          <p style={{ textAlign: "center" }}> Aucun livre trouvé</p>
        )}
      </div>

    </div>
  );
}

const styles = {
  container: {
    padding: "30px",
    background: "#f8f6f0",
    minHeight: "100vh",
  },

  searchBox: {
    display: "flex",
    gap: "10px",
    justifyContent: "center",
    marginBottom: "25px",
    flexWrap: "wrap",
  },

  input: {
    width: "40%",
    padding: "12px",
    borderRadius: "25px",
    border: "1px solid #ccc",
    outline: "none",
  },

  select: {
    padding: "12px",
    borderRadius: "25px",
    border: "1px solid #ccc",
    cursor: "pointer",
  },

  resetBtn: {
    padding: "12px 18px",
    borderRadius: "25px",
    border: "none",
    background: "#444",
    color: "#fff",
    cursor: "pointer",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "20px",
  },

  card: {
    background: "#fff",
    borderRadius: "15px",
    padding: "15px",
    boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
    textAlign: "center",
  },

  image: {
    width: "100%",
    height: "220px",
    objectFit: "cover",
    borderRadius: "10px",
  },

  title: { fontSize: "18px", marginTop: "10px" },
  author: { color: "#777" },
  genre: { color: "#b7791f", fontWeight: "bold" },

  viewBtn: {
    marginTop: "10px",
    padding: "10px",
    width: "100%",
    border: "none",
    borderRadius: "20px",
    background: "#d69e2e",
    color: "#fff",
    cursor: "pointer",
  },
};

export default Livres;
