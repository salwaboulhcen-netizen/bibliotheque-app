import React, { useState, useEffect, useRef, useMemo } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
const [books, setBooks] = useState([]);

useEffect(() => {
  fetch("http://localhost:8000/api/books")
    .then((res) => res.json())
    .then((data) => {
      console.log(data); 
      setBooks(data);
    })
    .catch((err) => console.log(err));
}, []);
  // ✅ state dyal search
  const [search, setSearch] = useState("");

  // ✅ filter books
  
  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(search.toLowerCase()) ||
    book.author.toLowerCase().includes(search.toLowerCase())
  );
   // 👇 refs خاصين بكل category
  const scrollRefs = useRef({});

  const scroll = (cat, dir) => {
    const amount = 300;

    if (scrollRefs.current[cat]) {
      scrollRefs.current[cat].scrollBy({
        left: dir === "left" ? -amount : amount,
        behavior: "smooth",
      });
    }
  };

  const genre = [
    "Informatique",
    "Science",
    "Fiction",
    "Histoire",
    "Littérature",
  ];


  return (
    <div style={styles.container}>

      {/* HERO */}
      <section style={styles.hero}>
        <img src="/biblio.png" alt="biblio" style={styles.heroImg} />

        <div style={styles.overlay}>
          <h1 style={styles.title}>Bienvenue à notre bibliothèque</h1>
          <p style={styles.subtitle}>
            Explorez des milliers de livres facilement
          </p>

          <div style={styles.heroSearchContainer}>
            <div style={styles.searchWrapper}>
              <input
                type="text"
                placeholder="🔍 Rechercher livres, auteurs, genres..."
                style={styles.heroSearchInput}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <button
                style={styles.heroSearchButton}
                onMouseEnter={(e) => (e.target.style.background = "#d97706")}
                onMouseLeave={(e) => (e.target.style.background = "#af7208")}
              >
                Rechercher
              </button>
            </div>
          </div>

          <button
            style={styles.exploreBtn}
            onClick={() => navigate("/books")}
            onMouseEnter={(e) => (e.target.style.background = "#d97706")}
            onMouseLeave={(e) => (e.target.style.background = "#db9214")}
          >
            Explorer le catalogue
          </button>
        </div>
      </section>

      {/* STATS */}
      <section style={styles.statsCardsSection}>
        <div style={styles.statsCards}>
          {[
            { icon: "📖", value: "10,000+", label: "Livres disponibles" },
            { icon: "👥", value: "5,000+", label: "Membres actifs" },
            { icon: "📚", value: "50+", label: "Catégories" },
            { icon: "⏰", value: "24/7", label: "Accès en ligne" },
          ].map((stat, i) => (
            <div
              key={i}
              style={styles.statCard}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-8px)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
            >
              <div style={{ fontSize: "28px" }}>{stat.icon}</div>
              <h2>{stat.value}</h2>
              <p>{stat.label}</p>
            </div>
          ))}
        </div>
      </section>


      {/* BOOKS BY CATEGORY */}
      <section style={styles.booksSection}>
        {genre.map((cat, index) => {
          const booksByCat = filteredBooks.filter((book) =>
            book.genre?.toLowerCase().includes(cat.toLowerCase())
          );

          return (
            <div key={index} style={{ marginBottom: "40px", position: "relative" }}>

              {/* HEADER */}
              <div style={styles.headerRow}>
                <h2>{cat}</h2>
              </div>

              {/* ARROWS */}
              <button
                onClick={() => scroll(cat, "left")}
                style={{ ...styles.arrow, left: "0" }}
              >
                ◀
              </button>

              <button
                onClick={() => scroll(cat, "right")}
                style={{ ...styles.arrow, right: "0" }}
              >
                ▶
              </button>

              {/* CAROUSEL */}
              <div
                ref={(el) => (scrollRefs.current[cat] = el)}
                style={styles.carousel}
              >
                {booksByCat.length > 0 ? (
                  booksByCat.map((book) => (
                    <div key={book.id} style={styles.card}>
                      <img src={book.image} alt="" style={styles.bookImage} />

                      <button
                        style={styles.detailsBtn}
                        onClick={() => navigate(`/books/${book.id}`)}
                      >
                        Voir plus →
                      </button>
                    </div>
                  ))
                ) : (
                  <p>Aucun livre</p>
                )}
              </div>
            </div>
          );
        })}
      </section>
      {/* CTA */}
      <div style={styles.ctaSection}>
        <h2 style={styles.ctaTitle}>Prêt à commencer ?</h2>
        <p style={styles.ctaText}>
          Créez votre compte gratuitement et accédez à notre collection complète
        </p>

        <div style={styles.ctaButtons}>
          <button
            style={styles.primaryBtn}
            onClick={() => navigate("/register")}
          >
            S'inscrire maintenant
          </button>

          <button
            style={styles.secondaryBtn}
            onClick={() => navigate("/books")}
          >
            Voir les livres
          </button>
        </div>
      </div>

    </div>
  );
}

const styles = {
  container: { fontFamily: "Poppins, sans-serif", background: "#f9f6f0" },

  hero: { position: "relative", height: "75vh" },

  heroImg: {
      
    width: "100%",
    height: "100%",
    objectFit: "cover",
    filter: "brightness(50%)",
    
   
  },

  overlay: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    textAlign: "center",
    color: "white",
    width: "90%"
  },

  title: { fontSize: "clamp(32px, 5vw, 50px)", fontWeight: "600" },
  subtitle: { fontSize: "clamp(16px, 2vw, 20px)", marginBottom: "20px" },

  exploreBtn: {
    marginTop: "20px",
    padding: "14px 30px",
    backgroundColor: "#cf9009",
    color: "#fff",
    border: "none",
    borderRadius: "30px",
    cursor: "pointer"
  },

  heroSearchContainer: {
    display: "flex",
    justifyContent: "center",
    marginBottom: "20px"
  },

  searchWrapper: { position: "relative", width: "100%", maxWidth: "600px" },

  heroSearchInput: {
    width: "100%",
    padding: "15px 120px 15px 20px",
    borderRadius: "50px",
    border: "none",
    color: "#0e0d0d",
    boxShadow: "0 5px 20px rgba(0,0,0,0.2)"
  },

  heroSearchButton: {
    position: "absolute",
    right: "5px",
    top: "50%",
    transform: "translateY(-50%)",
    padding: "10px 20px",
    borderRadius: "50px",
    border: "none",
    backgroundColor: "#bb740a",
    color: "#fff",
    cursor: "pointer"
  },

  statsCardsSection: { padding: "40px 20px" },

  statsCards: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "20px"
  },

  statCard: {
    background: "#fff",
    padding: "25px",
    borderRadius: "15px",
    textAlign: "center",
    boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
    cursor: "pointer",
    transition: "0.3s"
  },

  booksSection: { padding: "50px 20px" },

  headerRow: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "25px"
  },
carousel: {
  display: "flex",
  gap: "25px",
  overflowX: "auto",
  scrollBehavior: "x mandatory",
  padding: "20px 10px",
},

arrow: {
  position: "absolute",
  top: "50%",
  transform: "translateY(-50%)",
  background: "#00000088",
  color: "#fff",
  border: "none",
  borderRadius: "50%",
  width: "35px",
  height: "35px",
  cursor: "pointer",
  zIndex: 10,
},
  viewAll: { color: "#c7952b", cursor: "pointer", fontWeight: "bold" },

  cards: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
    gap: "25px"
  },

  card: {
     minWidth: "200px",
  background: "#fff",
  borderRadius: "15px",
  overflow: "hidden",
  boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
  flexShrink: 0,
   scrollSnapAlign: "start",
},

  bookImage: { 
    width: "100%", 
    height: "220px", 
    objectFit: "cover" },
    diplaylay:"block",
  detailsBtn: {
    width: "100%",
    padding: "14px",
    backgroundColor: "#ddab3e",
    color: "#fff",
    border: "none",
    cursor: "pointer"
  },

  ctaSection: {
    background: "linear-gradient(135deg, #d1921c, #ac7414)",
    color: "white",
    padding: "70px 20px",
    textAlign: "center"
  },

  ctaTitle: { fontSize: "clamp(24px, 4vw, 38px)" },

  ctaText: { marginBottom: "25px" },

  ctaButtons: {
    display: "flex",
    justifyContent: "center",
    gap: "15px",
    flexWrap: "wrap"
  },

  primaryBtn: {
    background: "#fff",
    color: "#8b5300",
    border: "none",
    padding: "14px 28px",
    borderRadius: "30px",
    cursor: "pointer"
  },

  secondaryBtn: {
    background: "transparent",
    border: "2px solid #fff",
    color: "#fff",
    padding: "14px 28px",
    borderRadius: "30px",
    cursor: "pointer"
  }
  
};

export default Home;