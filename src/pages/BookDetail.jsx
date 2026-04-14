





import React, { useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import books from "../data/booksData";

function BookDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const isLoggedIn = localStorage.getItem("user");

  // Find selected book
  const book = useMemo(() => books.find((b) => String(b.id) === String(id)), [id]);

  // Real-time search (title or author)
  const searchResults = useMemo(() => {
    if (!search.trim()) return books;
    const q = search.toLowerCase();
    return books.filter(
      (b) =>
        b.title.toLowerCase().includes(q) ||
        (b.author && b.author.toLowerCase().includes(q))
    );
  }, [search]);

  // Related books (same category, not self)
  const relatedBooks = useMemo(() => {
    if (!book) return [];
    const filtered = books.filter(
      (b) => b.category === book.category && String(b.id) !== String(book.id)
    );
    if (filtered.length > 0) return filtered;
    // Fallback: random books (not self)
    return books.filter((b) => String(b.id) !== String(book.id)).slice(0, 4);
  }, [book]);

  if (!book) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-700">Livre non trouvé</h2>
          <button
            className="mt-6 px-6 py-2 rounded-lg bg-black/80 text-white hover:bg-black/90 transition"
            onClick={() => navigate("/")}
          >
            ⬅ Retour à l'accueil
          </button>
        </div>
      </div>
    );
  }

  // Borrow button logic
  const handleBorrow = () => {
    if (!isLoggedIn) {
      alert("Veuillez vous inscrire pour emprunter");
      navigate("/login");
      return;
    }
    alert("📚 Livre emprunté avec succès");
  };

  // Borrow button for related books
  const handleRelatedBorrow = (b) => {
    if (!isLoggedIn) {
      alert("Veuillez vous inscrire pour emprunter");
      navigate("/login");
      return;
    }
    alert(`📚 Livre emprunté: ${b.title}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      {/* 1. TOP HEADER */}
      <div className="w-full max-w-5xl mx-auto pt-10 px-4 flex flex-col items-center relative">
        <button
          className="absolute left-0 top-0 px-5 py-2 rounded-xl bg-white shadow-md hover:bg-gray-100 text-gray-700 font-medium transition"
          onClick={() => navigate(-1)}
        >
          ← Retour
        </button>
        <h1 className="text-2xl font-bold text-center mb-10 text-gray-800 tracking-tight">Page détails des livres</h1>
      </div>

      {/* 2. SEARCH SECTION */}
      <div className="w-full max-w-3xl mx-auto mb-12 px-4">
        <div className="bg-white rounded-xl shadow-md p-8 flex flex-col gap-4">
          <div className="text-lg font-semibold text-gray-700 mb-2">Rechercher un livre</div>
          <div className="relative w-full">
            <input
              type="text"
              className="w-full px-6 py-4 pr-20 rounded-xl border border-gray-200 shadow-sm focus:ring-2 focus:ring-black focus:outline-none text-lg bg-white placeholder-gray-400 transition"
              placeholder="Rechercher livre ou auteur..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            <button
              className="absolute right-3 top-1/2 -translate-y-1/2 px-6 py-2 bg-black text-white rounded-lg font-semibold hover:bg-gray-800 transition"
              onClick={() => setSearch("")}
              type="button"
            >
              Rechercher
            </button>
          </div>
          <div className="mt-1 text-base text-gray-500 min-h-[24px]">
            {search.trim() && searchResults.length === 0 && (
              <span className="text-red-500">❌ Aucun livre trouvé</span>
            )}
            {search.trim() && searchResults.length > 0 && (
              <span>{searchResults.length} résultat{searchResults.length > 1 ? "s" : ""}</span>
            )}
            {!search.trim() && <span>{books.length} livres au total</span>}
          </div>
        </div>
      </div>

      {/* 3. MAIN BOOK CARD */}
      <div className="w-full max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-xl shadow-xl flex flex-col md:flex-row gap-10 p-10 md:p-14 mb-8 items-center md:items-stretch relative">
          {/* LEFT: Book image */}
          <div className="flex-shrink-0 flex justify-center items-center">
            <img
              src={book.image}
              alt={book.title}
              className="w-56 h-80 object-cover rounded-xl shadow-lg border border-gray-100 bg-gray-100"
            />
          </div>
          {/* RIGHT: Book details */}
          <div className="flex-1 flex flex-col justify-between h-full">
            <div>
              <h2 className="text-3xl font-extrabold text-gray-900 mb-4 leading-tight">{book.title}</h2>
              <div className="text-gray-700 mb-2 text-xl"><span className="font-semibold">Auteur:</span> {book.author}</div>
              <div className="text-gray-700 mb-2 text-xl"><span className="font-semibold">Genre:</span> {book.category}</div>
              <div className="text-gray-700 mb-2 text-xl"><span className="font-semibold">Année:</span> {book.year || "-"}</div>
              {book.publisher && (
                <div className="text-gray-700 mb-2 text-xl"><span className="font-semibold">Éditeur:</span> {book.publisher}</div>
              )}
              <div className="text-gray-600 text-lg leading-relaxed whitespace-pre-line mt-6">
                {book.description || "Aucune description disponible"}
              </div>
            </div>
            {/* BORROW BUTTON INSIDE CARD */}
            <button
              className="mt-8 w-full py-4 rounded-lg bg-black text-white font-bold text-lg hover:bg-gray-800 transition shadow-md"
              onClick={handleBorrow}
            >
              Emprunter
            </button>
          </div>
        </div>
      </div>

      {/* 4. RELATED BOOKS SECTION */}
      <div className="w-full max-w-5xl mx-auto mt-16 px-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-8">Livres du même genre</h2>
        <div className="flex flex-col gap-8">
          {relatedBooks.map((b) => (
            <div
              key={b.id}
              className="flex flex-col md:flex-row items-center bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-200 p-8 gap-8 hover:scale-[1.02] cursor-pointer relative"
              onClick={e => {
                // Only trigger navigation if not clicking the borrow button
                if (e.target.tagName !== 'BUTTON') navigate(`/bookdetail/${b.id}`);
              }}
            >
              <img
                src={b.image}
                alt={b.title}
                className="w-40 h-56 object-cover rounded-xl border border-gray-100 bg-gray-100 mb-6 md:mb-0"
              />
              <div className="flex-1 flex flex-col justify-between h-full w-full">
                <div>
                  <div className="font-bold text-2xl text-gray-900 mb-2 truncate">{b.title}</div>
                  <div className="text-gray-700 text-lg mb-1"><span className="font-semibold">Auteur:</span> {b.author}</div>
                  {b.publisher && (
                    <div className="text-gray-700 text-lg mb-1"><span className="font-semibold">Éditeur:</span> {b.publisher}</div>
                  )}
                  <div className="text-gray-600 text-base mb-1"><span className="font-semibold">Année:</span> {b.year || "-"}</div>
                  <div className="text-gray-500 text-base mb-4 truncate">
                    {b.description ? b.description.slice(0, 120) + (b.description.length > 120 ? "..." : "") : "Aucune description"}
                  </div>
                </div>
                {/* BORROW BUTTON INSIDE CARD */}
                <button
                  className="mt-4 w-full py-3 rounded-lg bg-brown text-white font-bold text-base hover:bg-gray-800 transition shadow-md"
                  onClick={e => { e.stopPropagation(); handleRelatedBorrow(b); }}
                >
                  Emprunter
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default BookDetail;


