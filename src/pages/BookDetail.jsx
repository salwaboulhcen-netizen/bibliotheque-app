import React, { useState, useEffect, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";

function BookDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const isLoggedIn = localStorage.getItem("user");



const [books, setBooks] = useState([]);
  useEffect(() => {
  fetch("http://localhost:8000/api/books")
    .then((res) => res.json())
    .then((data) => setBooks(data))
    .catch((err) => console.log(err));
}, []);





 const book = useMemo(
  () => books.find((b) => String(b.id) === String(id)),
  [books, id]
);

  const searchResults = useMemo(() => {
    if (!search.trim()) return books;
    const q = search.toLowerCase();
    return books.filter(
      (b) =>
        b.title.toLowerCase().includes(q) ||
        (b.author && b.author.toLowerCase().includes(q))
    );
  }, [search]);

  const relatedBooks = useMemo(() => {
  if (!book) return [];

  const filtered = books.filter(
    (b) => b.genre === book.genre && String(b.id) !== String(book.id)
  );

  if (filtered.length > 0) return filtered;

  return books.filter((b) => String(b.id) !== String(book.id)).slice(0, 8);
}, [books, book]);

  const handleBorrow = () => {
    if (!isLoggedIn) {
      alert("❌ Impossible d’emprunter. Vous devez vous inscrire / connecter.");
      navigate("/login");
      return;
    }
    alert(" Livre emprunté avec succès !");
  };

  if (!book) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <h2>Livre non trouvé</h2>
      </div>
    );
  }

  return (
    <div className="page">

      {/* HEADER */}
      <div className="header">
        <button onClick={() => navigate(-1)}>← Retour</button>
        <h1> Détails du livre</h1>
      </div>

      {/* SEARCH */}
      <div className="searchBox">
        <input
          type="text"
          placeholder="Rechercher..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button onClick={() => setSearch("")}>Effacer</button>
      </div>

      {/* MAIN BOOK */}
      <div className="mainCard fadeIn">

        <img src={book.image} alt={book.title} />

        <div className="info">
          <h2>{book.title}</h2>
          <p><b>Auteur:</b> {book.author}</p>
          <p><b>Genre:</b> {book.category}</p>
          <p><b>Année:</b> {book.year || "-"}</p>
          <p><b>description:</b> {book.description}</p>

          <button className="borrow" onClick={handleBorrow}>
            Emprunter
          </button>

          {!isLoggedIn && (
            <p className="warning">
              Vous devez vous connecter pour utiliser le service de prêt.
            </p>
          )}
        </div>
      </div>

      {/* ⭐ ADDED SECTION: LES LIVRES CAROUSEL */}
      <h2 className="sectionTitle"> Les livres</h2>

      <div className="carousel">
        <button
          className="arrow"
          onClick={() => {
            document.getElementById("scroll").scrollLeft -= 300;
          }}
        >
          {"<"}
        </button>

        <div className="scroll" id="scroll">
          {relatedBooks.map((b) => (
            <div
              key={b.id}
              className="miniCard"
              onClick={() => navigate(`/bookdetail/${b.id}`)}
            >
              <img src={b.image} />
              <p>{b.title}</p>
            </div>
          ))}
        </div>

        <button
          className="arrow"
          onClick={() => {
            document.getElementById("scroll").scrollLeft += 300;
          }}
        >
          {">"}
        </button>
      </div>

      <style>{`
        .page{
          min-height:100vh;
          background: linear-gradient(135deg,#f7f2e9,#efe3d0);
          font-family:Arial;
          padding:20px;
          color:#3b2b1a;
        }

        .header{
          display:flex;
          justify-content:space-between;
          align-items:center;
        }

        .header button{
          padding:8px 12px;
          border:none;
          border-radius:8px;
          background:white;
          cursor:pointer;
        }

        .searchBox{
          display:flex;
          gap:10px;
          margin:15px 0;
        }

        .searchBox input{
          flex:1;
          padding:10px;
          border-radius:20px;
          border:1px solid #ddd;
        }

        .searchBox button{
          background:#b07a2b;
          color:white;
          border:none;
          border-radius:10px;
          padding:10px;
        }

        .mainCard{
          display:flex;
          gap:20px;
          background:white;
          padding:20px;
          border-radius:15px;
          transition:0.3s;
        }

        .fadeIn{
          animation:fade 0.6s ease-in-out;
        }

        @keyframes fade{
          from{opacity:0; transform:translateY(20px);}
          to{opacity:1; transform:translateY(0);}
        }

        .mainCard img{
          width:220px;
          height:320px;
          object-fit:cover;
          border-radius:10px;
        }

        .borrow{
          margin-top:10px;
          width:100%;
          padding:10px;
          background:#c28a3a;
          color:white;
          border:none;
          border-radius:8px;
        }

        .warning{
          color:red;
          font-size:13px;
        }

        /* ⭐ ADDED CAROUSEL */
        .sectionTitle{
          margin-top:30px;
        }

        .carousel{
          display:flex;
          align-items:center;
          gap:10px;
          margin-top:10px;
        }

        .scroll{
          display:flex;
          overflow-x:auto;
          scroll-behavior:smooth;
          gap:15px;
          padding:10px;
          width:100%;
        }

        .miniCard{
          min-width:150px;
          background:white;
          border-radius:10px;
          padding:10px;
          text-align:center;
          cursor:pointer;
          transition:0.3s;
        }

        .miniCard:hover{
          transform:scale(1.05);
        }

        .miniCard img{
          width:100%;
          height:180px;
          object-fit:cover;
          border-radius:8px;
        }

        .arrow{
          background:#b07a2b;
          color:white;
          border:none;
          padding:10px;
          border-radius:50%;
          cursor:pointer;
        }
      `}</style>
    </div>
  );
}

export default BookDetail;