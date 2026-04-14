import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import books from "../data/booksData";

export default function Catalogue() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [availability, setAvailability] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  const booksPerPage = 6;

  // FILTER
  const filteredBooks = books.filter((b) => {
    const matchSearch = b.title.toLowerCase().includes(query.toLowerCase());
    const matchCategory = category === "all" || b.category === category;

    const matchAvailability =
      availability === "all" ||
      (availability === "available" && b.available) ||
      (availability === "unavailable" && !b.available);

    return matchSearch && matchCategory && matchAvailability;
  });

  // PAGINATION
  const indexOfLast = currentPage * booksPerPage;
  const indexOfFirst = indexOfLast - booksPerPage;
  const currentBooks = filteredBooks.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredBooks.length / booksPerPage);

  const categories = [
    "all",
    "littérature",
    "science",
    "histoire",
    "informatique",
    "fiction",
    "economie",
  ];

  return (
    <div className="catalogue">

      {/* HEADER */}
      <div className="top-bar">
        <div className="header-card">
          <h1>Catalogue des Livres</h1>

          {!user && (
            <p style={{ color: "#888" }}>
              Connectez-vous pour voir la disponibilité des livres
            </p>
          )}

          <div className="search-wrapper">
            <input
              type="text"
              placeholder="Rechercher par titre..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <button
              onClick={() => {
                setQuery(search);
                setCurrentPage(1);
              }}
            >
              Rechercher
            </button>
          </div>
        </div>
      </div>

      {/* LAYOUT */}
      <div className="layout">

        {/* SIDEBAR */}
        <div className="sidebar">
          <h3>Filtres</h3>

          <div className="filter-group">
            <p>Catégorie</p>
            {categories.map((cat) => (
              <label key={cat}>
                <input
                  type="radio"
                  name="cat"
                  checked={category === cat}
                  onChange={() => {
                    setCategory(cat);
                    setCurrentPage(1);
                  }}
                />
                {cat === "all" ? "Toutes les catégories" : cat}
              </label>
            ))}
          </div>

          <div className="filter-group">
            <p>Disponibilité</p>

            <label>
              <input
                type="radio"
                checked={availability === "all"}
                onChange={() => setAvailability("all")}
              />
              Tous
            </label>

            <label>
              <input
                type="radio"
                checked={availability === "available"}
                onChange={() => setAvailability("available")}
              />
              Disponible
            </label>

            <label>
              <input
                type="radio"
                checked={availability === "unavailable"}
                onChange={() => setAvailability("unavailable")}
              />
              Non disponible
            </label>
          </div>

          <button
            className="reset"
            onClick={() => {
              setCategory("all");
              setAvailability("all");
              setSearch("");
              setQuery("");
              setCurrentPage(1);
            }}
          >
            Réinitialiser
          </button>
        </div>

        {/* CONTENT */}
        <div className="content">
          <p className="count">{filteredBooks.length} livres trouvés</p>

          <div className="grid">
            {currentBooks.length > 0 ? (
              currentBooks.map((book) => (
                <div className="card" key={book.id}>

                  {/* BADGE ONLY IF LOGGED IN */}
                  {user && (
                    <span className={`badge ${book.available ? "green" : "red"}`}>
                      {book.available ? "Disponible" : "Emprunté"}
                    </span>
                  )}

                  <img src={book.image} alt={book.title} />

                  <button
                    className="details-btn"
                    onClick={() => navigate(`/books/${book.id}`)}
                  >
                    Voir plus
                  </button>
                </div>
              ))
            ) : (
              <h2>Aucun livre trouvé</h2>
            )}
          </div>

          {/* PAGINATION */}
          <div className="pagination">
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Précédent
            </button>

            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                className={currentPage === i + 1 ? "active" : ""}
                onClick={() => setCurrentPage(i + 1)}
              >
                {i + 1}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Suivant
            </button>
          </div>
        </div>
      </div>

      {/* STYLE */}
      <style>{`
        .catalogue {
          padding: 30px;
          background: #f6f7fb;
          min-height: 100vh;
          font-family: Arial;
        }

        .header-card {
          background: linear-gradient(135deg,#fff,#f7f7f7);
          padding: 25px;
          border-radius: 15px;
          box-shadow: 0 8px 25px rgba(0,0,0,0.08);
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 15px;
          align-items: center;
        }

        .search-wrapper {
          display: flex;
          width: 100%;
          border-radius: 50px;
          overflow: hidden;
          box-shadow: 0 4px 15px rgba(0,0,0,0.08);
        }

        .search-wrapper input {
          flex: 1;
          padding: 16px;
          border: none;
          outline: none;
        }

        .search-wrapper button {
          background: #4f6df5;
          color: white;
          border: none;
          padding: 0 25px;
          cursor: pointer;
        }

        .layout {
          display: flex;
          gap: 20px;
          margin-top: 30px;
        }

        .sidebar {
          width: 250px;
          background: white;
          padding: 20px;
          border-radius: 12px;
        }

        .content {
          flex: 1;
        }

        .grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
          gap: 20px;
        }

        .card {
          background: white;
          border-radius: 12px;
          overflow: hidden;
          position: relative;
        }

        .card img {
          width: 100%;
          height: 250px;
          object-fit: cover;
        }

        .details-btn {
          width: 100%;
          padding: 10px;
          background: #c58a2b;
          color: white;
          border: none;
        }

        .badge {
          position: absolute;
          top: 10px;
          right: 10px;
          padding: 5px 10px;
          border-radius: 10px;
          color: white;
          font-size: 12px;
        }

        .green { background: green; }
        .red { background: red; }

        .pagination {
          display: flex;
          justify-content: center;
          margin-top: 30px;
          gap: 10px;
        }

        .pagination button {
          padding: 8px 12px;
          border: none;
          background: #eee;
          cursor: pointer;
        }

        .pagination .active {
          background: #4f6df5;
          color: white;
        }

        @media (max-width: 768px) {
          .layout {
            flex-direction: column;
          }

          .sidebar {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
}