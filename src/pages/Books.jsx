import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import books from "./booksData";

export default function Catalogue() {
  const navigate = useNavigate();

  const sliderRefs = [useRef(), useRef(), useRef(), useRef()];

  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("");

  const filteredBooks = books.filter((b) =>
    b.title.toLowerCase().includes(query.toLowerCase())
  );

  const scroll = (direction, index) => {
    const scrollAmount = 250;
    if (direction === "left") {
      sliderRefs[index].current.scrollLeft -= scrollAmount;
    } else {
      sliderRefs[index].current.scrollLeft += scrollAmount;
    }
  };

  const rowTitles = ["Top Books", "Nouveautés", "Populaires", "Recommandés"];

  return (
    <div className="catalogue">
      <h1>Catalogue des livres</h1>

      {/* 🔍 SEARCH */}
      <div className="search-box">
        <div className="search-input-wrapper">
          <input
            type="text"
            placeholder="Rechercher un livre..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button onClick={() => setQuery(search)}>Rechercher</button>
        </div>
      </div>

      <div className="all-rows">
        {rowTitles.map((title, rowIndex) => (
          <div className="row-container" key={rowIndex}>
            <div className="slider-container">
              <button
                className="nav left"
                onClick={() => scroll("left", rowIndex)}
              >
                ❮
              </button>

              <div className="slider" ref={sliderRefs[rowIndex]}>
                {filteredBooks.length > 0 ? (
                  filteredBooks.map((book) => (
                    <div className="card" key={`${rowIndex}-${book.id}`}>
                      <img src={book.image} alt={book.title} />
                      <button
                        className="details-btn"
                        onClick={() => navigate(`/books/${book.id}`)}
                      >
                        Voir plus de détails
                      </button>
                    </div>
                  ))
                ) : (
                  <h1 className="no-result">Aucun livre trouvé</h1>
                )}
              </div>

              <button
                className="nav right"
                onClick={() => scroll("right", rowIndex)}
              >
                ❯
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* 🎨 STYLE */}
      <style>{`
        .catalogue {
          padding: 40px;
          background: #f1e393;
          color: #333;
          min-height: 100vh;
        }

        h1 {
          text-align: center;
          margin-bottom: 30px;
        }

        .all-rows {
          display: flex;
          flex-direction: column;
          gap: 30px;
        }

        .row-container {
          position: relative;
        }

        /* SEARCH */
        .search-box {
          display: flex;
          justify-content: center;
          margin-bottom: 40px;
        }

        .search-input-wrapper {
          position: relative;
          width: 400px;
        }

        .search-input-wrapper input {
          width: 100%;
          padding: 12px 50px 12px 20px;
          border-radius: 25px;
          border: none;
          outline: none;
          font-size: 16px;
        }

        .search-input-wrapper button {
          position: absolute;
          right: 5px;
          top: 50%;
          transform: translateY(-50%);
          border: none;
          background: #3b5ed7;
          color: white;
          padding: 10px 15px;
          border-radius: 15px;
          cursor: pointer;
          font-size: 16px;
          transition: background 0.3s;
        }

        .search-input-wrapper button:hover {
          background: #2a46b0;
        }

        /* SLIDER */
        .slider-container {
          width: 100%;
          position: relative;
        }

        .slider {
          display: flex;
          overflow-x: auto;
          scroll-behavior: smooth;
          gap: 20px;
          padding: 10px 20px;
        }

        .slider::-webkit-scrollbar {
          display: none;
        }

        /* CARD */
        .card {
          min-width: 220px;
          height: 380px;
          border-radius: 15px;
          overflow: hidden;
          background: white;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          box-shadow: 0 4px 8px rgba(0,0,0,0.1);
          transition: transform 0.3s, box-shadow 0.3s;
        }

        .card:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 16px rgba(0,0,0,0.2);
        }

        .card img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .details-btn {
          width: 100%;
          padding: 12px;
          background: #c58a2b;
          color: white;
          border: none;
          cursor: pointer;
          font-weight: bold;
          transition: background 0.3s, transform 0.2s;
        }

        .details-btn:hover {
          background: #e6c378;
          transform: scale(1.05);
        }

        .nav {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background: rgba(0,0,0,0.6);
          border: none;
          color: white;
          font-size: 25px;
          padding: 10px;
          cursor: pointer;
          border-radius: 50%;
          z-index: 10;
        }

        .left {
          left: -15px; /* زيادة المسافة قليلاً عن الكارد */
        }

        .right {
          right: -15px; /* زيادة المسافة قليلاً عن الكارد */
        }

        .no-result {
          margin: auto;
          width: 100%;
          text-align: center;
        }

        /* responsive */
        @media (max-width: 768px) {
          .search-input-wrapper {
            width: 80%;
          }

          .card {
            min-width: 80%;
            height: 300px;
          }

          .card img {
            height: 100%;
          }

          .slider {
            padding: 10px;
          }
        }
      `}</style>
    </div>
  );
}