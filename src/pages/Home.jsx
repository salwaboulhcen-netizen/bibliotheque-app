import React from "react";
import { useNavigate } from "react-router-dom";

const books = [
  { id: 1, title: "Les Misérables", author: "Victor Hugo", category: "Littérature", image: "https://images.unsplash.com/photo-1512820790803-83ca734da794" },
  { id: 2, title: "Physique Quantique", author: "Marie Curie", category: "Physique", image: "https://images.unsplash.com/photo-1509228627152-72ae9ae6848d" },
  { id: 3, title: "Algèbre Linéaire", author: "Gilbert Strang", category: "Mathématiques", image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b" },
  { id: 4, title: "Introduction à l’Algorithmique", author: "Thomas H. Cormen", category: "Informatique", image: "https://images.unsplash.com/photo-1518779578993-ec3579fee39f" },
  { id: 5, title: "Philosophie Moderne", author: "Descartes", category: "Philosophie", image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f" },
  { id: 6, title: "Clean Code", author: "Robert C. Martin", category: "Programmation", image: "https://images.unsplash.com/photo-1519681393784-d120267933ba" },
  { id: 7, title: "Analyse Mathématique", author: "Jean Dieudonné", category: "Mathématiques", image: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d" },
  { id: 8, title: "Intelligence Artificielle", author: "Stuart Russell", category: "Informatique", image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c" },
  { id: 9, title: "Mécanique Classique", author: "Isaac Newton", category: "Physique", image: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da" },
  { id: 10, title: "Logique et Raisonnement", author: "Aristote", category: "Philosophie", image: "https://images.unsplash.com/photo-1516979187457-637abb4f9353" },
];

function Home() {
  const navigate = useNavigate();

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
              />

              <button style={styles.heroSearchButton}>
                Rechercher
              </button>
            </div>
          </div>

          <button
            style={styles.exploreBtn}
            onClick={() => navigate("/books")}
          >
            Explorer le catalogue
          </button>
        </div>
      </section>

      {/* STATS */}
      <section style={styles.statsCardsSection}>
        <div style={styles.statsCards}>
          <div style={styles.statCard}>
            📖 <h2>10,000+</h2>
            <p>Livres disponibles</p>
          </div>

          <div style={styles.statCard}>
            👥 <h2>5,000+</h2>
            <p>Membres actifs</p>
          </div>

          <div style={styles.statCard}>
            📈 <h2>50+</h2>
            <p>Catégories</p>
          </div>

          <div style={styles.statCard}>
            ⏰ <h2>24/7</h2>
            <p>Accès en ligne</p>
          </div>
        </div>
      </section>

      {/* BOOKS POPULAR */}
      <section style={styles.booksSection}>
        <div style={styles.headerRow}>
          <h2>Livres Populaires</h2>
          <span onClick={() => navigate("/books")} style={styles.viewAll}>
            Voir tout →
          </span>
        </div>

        <div style={styles.cards}>
          {books.map((book) => (
            <div key={book.id} style={styles.card}>
              <img src={book.image} style={styles.bookImage} />

              <button
                style={styles.detailsBtn}
                onClick={() => navigate(`/books/${book.id}`)}
              >
                Voir plus de détails
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <div style={styles.ctaSection}>
        <h2 style={styles.ctaTitle}>Prêt à commencer ?</h2>
        <p style={styles.ctaText}>
          Créez votre compte gratuitement et accédez à notre collection complète
        </p>

        <div style={styles.ctaButtons}>
          <button style={styles.primaryBtn} onClick={() => navigate("/register")}>
            S'inscrire maintenant
          </button>

          <button style={styles.secondaryBtn} onClick={() => navigate("/books")}>
            Voir les livres
          </button>
        </div>
      </div>

    </div>
  );
}

const styles = {
  container: { fontFamily: "Arial" },

  hero: { position: "relative", height: "70vh" },

  heroImg: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    filter: "brightness(60%)"
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

  title: { fontSize: "clamp(28px, 5vw, 48px)" },
  subtitle: { fontSize: "clamp(14px, 2vw, 20px)", marginBottom: "20px" },

  exploreBtn: {
    marginTop: "20px",
    padding: "12px 25px",
    backgroundColor: "#fff",
    color: "#a87009",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer"
  },

  heroSearchContainer: {
    display: "flex",
    justifyContent: "center",
    marginBottom: "20px",
    width: "100%",
  },

  searchWrapper: {
    position: "relative",
    width: "100%",
    maxWidth: "600px",
  },

  heroSearchInput: {
    width: "100%",
    padding: "14px 120px 14px 20px",
    borderRadius: "50px",
    border: "none",
    fontSize: "14px",
    outline: "none",
  },

  heroSearchButton: {
    position: "absolute",
    right: "5px",
    top: "50%",
    transform: "translateY(-50%)",
    padding: "10px 18px",
    borderRadius: "50px",
    border: "none",
    backgroundColor: "#a87009",
    color: "#fff",
    cursor: "pointer",
  },

  statsCardsSection: { padding: "20px" },

  statsCards: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "20px"
  },

  statCard: {
    background: "#fff",
    padding: "20px",
    borderRadius: "10px",
    textAlign: "center",
    boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
    transition: "0.3s",
    cursor: "pointer"
  },

  booksSection: {
    padding: "40px 20px",
    background: "linear-gradient(180deg, #f9f6f0, #f9f6f0)"
  },

  headerRow: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "20px"
  },

  viewAll: { color: "#2c77f0", cursor: "pointer" },

  cards: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "20px"
  },

  card: {
    borderRadius: "10px",
    overflow: "hidden",
    background: "#fff",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    cursor: "pointer"
  },

  bookImage: { width: "100%", height: "200px", objectFit: "cover" },

  detailsBtn: {
    width: "100%",
    padding: "12px",
    backgroundColor: "#a87009",
    color: "#fff",
    border: "none",
    fontSize: "14px",
    cursor: "pointer"
  },

  ctaSection: {
    background: "linear-gradient(135deg, #a36008, #e7aa38)",
    color: "white",
    padding: "60px 20px",
    textAlign: "center",
    width: "100%"
  },

  ctaTitle: { fontSize: "clamp(22px, 4vw, 36px)" },
  ctaText: { marginBottom: "20px" },

  ctaButtons: {
    display: "flex",
    justifyContent: "center",
    gap: "15px",
    flexWrap: "wrap"
  },

  primaryBtn: {
    background: "#fff",
    color: "#976810",
    border: "none",
    padding: "12px 25px",
    borderRadius: "8px",
    cursor: "pointer"
  },

  secondaryBtn: {
    background: "#8a6732",
    color: "#fff",
    border: "none",
    padding: "12px 25px",
    borderRadius: "8px",
    cursor: "pointer"
  },
};

export default Home;