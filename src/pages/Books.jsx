
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";

export default function Catalogue() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

const [books, setBooks] = useState([]);
  useEffect(() => {
  fetch("http://localhost:8000/api/books")
    .then((res) => res.json())
    .then((data) => setBooks(data))
    .catch((err) => console.log(err));
}, []);



  const [search, setSearch] = useState("");
  const [tempSearch, setTempSearch] = useState("");

  const [category, setCategory] = useState("all");
  const [availability, setAvailability] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  const booksPerPage = 15;

  // ✅ FILTER
  const filteredBooks = books.filter((b) => {
    const matchSearch =
      search.trim() === "" ||
      b.title?.toLowerCase().includes(search.toLowerCase());

    const matchCategory =
      category === "all" ||
      (b.category &&
        b.category.toLowerCase() === category.toLowerCase());

    const matchAvailability =
      availability === "all" ||
      (availability === "available" && b.available === true) ||
      (availability === "unavailable" && b.available === false);

    return matchSearch && matchCategory && matchAvailability;
  });

  // ✅ PAGINATION
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

  const goToPage = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [search, category, availability]);

  return (
    <div className="page">

      {/* HEADER */}
      <div className="header">
        <h1> Catalogue des Livres</h1>

        {/* SEARCH */}
        <div className="searchBox">
          <input
            type="text"
            placeholder="Rechercher un livre..."
            value={tempSearch}
            onChange={(e) => setTempSearch(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                setSearch(tempSearch);
              }
            }}
          />

          <button
            onClick={() => setSearch(tempSearch)}
          >
             Rechercher
          </button>
        </div>
      </div>

      <div className="layout">

        {/* SIDEBAR */}
        <div className="sidebar">
          <h3> Filtres</h3>

          <div className="section">
            <p>Catégories</p>
            {categories.map((cat) => (
              <label key={cat}>
                <input
                  type="radio"
                  name="cat"
                  checked={category === cat}
                  onChange={() => setCategory(cat)}
                />
                {cat === "all" ? "Toutes" : cat}
              </label>
            ))}
          </div>

          <div className="section">
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
              Emprunté
            </label>
          </div>

          <button
            className="reset"
            onClick={() => {
              setSearch("");
              setTempSearch("");
              setCategory("all");
              setAvailability("all");
              setCurrentPage(1);
            }}
          >
            Reset
          </button>
        </div>

        {/* CONTENT */}
        <div className="content">

          <div className="count">
            {filteredBooks.length} livres trouvés
          </div>

          <div className="grid">
            {currentBooks.length > 0 ? (
              currentBooks.map((book) => (
                <div className="card" key={book.id}>

                  {user && (
                    <span
                      className={`badge ${
                        book.available ? "green" : "red"
                      }`}
                    >
                      {book.available ? "Disponible" : "Emprunté"}
                    </span>
                  )}

                  <img
                    src={book.image}
                    alt={book.title}
                    onError={(e) => {
                      e.target.src =
                        "https://via.placeholder.com/200x300?text=No+Image";
                    }}
                  />

                  <div className="info">
                    <h4>{book.title}</h4>
                  </div>

                  <button
                    onClick={() => {
                      if (!user) {
                        alert("🔒 خاصك تسجيل الدخول");
                        navigate("/login");
                        return;
                      }
                      navigate(`/books/${book.id}`);
                    }}
                  >
                    Voir détails →
                  </button>
                </div>
              ))
            ) : (
              <div style={{ textAlign: "center", padding: "40px" }}>
                <h2> Aucun livre trouvé</h2>
              </div>
            )}
          </div>

          {/* PAGINATION */}
          <div className="pagination">
            <button
              disabled={currentPage === 1}
              onClick={() => goToPage(currentPage - 1)}
            >
              ←
            </button>

            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                className={currentPage === i + 1 ? "active" : ""}
                onClick={() => goToPage(i + 1)}
              >
                {i + 1}
              </button>
            ))}

            <button
              disabled={currentPage === totalPages}
              onClick={() => goToPage(currentPage + 1)}
            >
              →
            </button>
          </div>

        </div>
      </div>

      {/* BACK TO TOP */}
      {currentPage > 1 && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="topBtn"
        >
          ⬆
        </button>
      )}

      {/* STYLE */}
      <style>{`
        .page{
          font-family: Arial;
          background: #f6f1e8;
          min-height: 100vh;
        }

        .header{
          text-align:center;
          padding:30px;
          background: linear-gradient(135deg,#d8b26a,#b8872b);
          color:white;
          border-radius:0 0 25px 25px;
        }

        .searchBox{
          display:flex;
          justify-content:center;
          margin-top:15px;
          border-radius:30px;
          overflow:hidden;
          width:60%;
          margin:auto;
          box-shadow:0 8px 20px rgba(0,0,0,0.15);
          
        }

        .searchBox input{
          flex:1;
          padding:12px;
          border:none;
          outline:none;
           color: "#0e0d0d",
         
        }

        .searchBox button{
          background:#b8872b;
           color: "#0e0d0d",
          border:none;
          padding:0 20px;
          cursor:pointer;
        }

        .layout{
          display:flex;
          gap:20px;
          padding:20px;
        }

        .sidebar{
  width:260px;
  background:white;
  padding:20px;
  border-radius:20px;
  box-shadow:0 15px 35px rgba(0,0,0,0.12);
  height:fit-content;
  position:sticky;
  top:20px;
  border:1px solid #eee;
}

.sidebar h3{
  margin-bottom:15px;
  color:#b8872b;
  font-size:18px;
  text-align:center;
}

.section{
  margin-bottom:20px;
  padding-bottom:15px;
  border-bottom:1px solid #f1f1f1;
}

.section p{
  font-weight:bold;
  margin-bottom:10px;
  color:#444;
}

.sidebar label{
  display:flex;
  align-items:center;
  gap:8px;
  margin:6px 0;
  cursor:pointer;
  transition:0.2s;
}

.sidebar label:hover{
  color:#b8872b;
  transform:translateX(3px);
}

.sidebar input{
  accent-color:#b8872b;
}

.reset{
  width:100%;
  padding:10px;
  border:none;
  border-radius:12px;
  background:#f3f3f3;
  cursor:pointer;
  transition:0.3s;
  font-weight:bold;
}

.reset:hover{
  background:#b8872b;
  color:white;
}

        .content{
          flex:1;
        }

        .grid{
          display:grid;
          grid-template-columns:repeat(auto-fill,minmax(200px,1fr));
          gap:20px;
        }

        .card{
          background:white;
          border-radius:15px;
          display:flex;
          flex-direction:column;
          overflow:hidden;
        }

        .card img{
          height:260px;
          object-fit:cover;
        }

        .info{
          padding:10px;
          flex:1;
          text-align:center;
        }

        .card button{
          background:#b8872b;
          color:white;
          border:none;
          padding:10px;
          cursor:pointer;
        }

        .badge{
          position:absolute;
          top:10px;
          right:10px;
          padding:5px 10px;
          border-radius:12px;
          color:white;
        }

        .green{background:#2fa84f;}
        .red{background:#d64545;}

        .pagination{
          display:flex;
          justify-content:center;
          gap:10px;
          margin-top:25px;
        }

        .active{
          background:#b8872b;
          color:white;
        }

        .topBtn{
          position:fixed;
          bottom:20px;
          right:20px;
          padding:12px;
          border-radius:50%;
          background:#b8872b;
          color:white;
          border:none;
        }
      `}</style>
    </div>
  );
}