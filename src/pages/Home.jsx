import React from "react";
import { useNavigate } from "react-router-dom";

const books = [
  {
    id: 1,
    title: "Les Misérables",
    author: "Victor Hugo",
    year: "Publié en 1862",
    category: "Littérature",
    image: "https://images.unsplash.com/photo-1512820790803-83ca734da794",
    status: "Disponible",
  },
  {
    id: 2,
    title: "Introduction à la Physique Quantique",
    author: "Dr. Marie Dubois",
    year: "Publié en 2020",
    category: "Science",
    image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f",
    status: "Disponible",
  },
  {
    id: 3,
    title: "Histoire de la Civilisation Romaine",
    author: "Jean Leclerc",
    year: "Publié en 2019",
    category: "Histoire",
    image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c",
    status: "Emprunté",
  },
  {
    id: 4,
    title: "L'Alchimiste",
    author: "Paulo Coelho",
    year: "Publié en 1988",
    category: "Roman",
    image: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d",
    status: "Disponible",
  },
  {
    id: 5,
    title: "Clean Code",
    author: "Robert C. Martin",
    year: "Publié en 2008",
    category: "Programmation",
    image: "https://images.unsplash.com/photo-1519681393784-d120267933ba",
    status: "Disponible",
  },
  {
    id: 6,
    title: "Sapiens",
    author: "Yuval Noah Harari",
    year: "Publié en 2011",
    category: "Histoire",
    image: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da",
    status: "Emprunté",
  },
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
          <button
            style={styles.exploreBtn}
            onClick={() => navigate("/books")}
          >
            Explorer le catalogue
          </button>
        </div>
      </section>

      {/* SEARCH UNDER HERO */}
      <section style={styles.searchSection}>
        <div style={styles.searchContainer}>
          <input
            type="text"
            placeholder="🔍 Rechercher livres, auteurs, genres..."
            style={styles.searchInput}
          />
          <button style={styles.searchButton}>Rechercher</button>
        </div>
      </section>

      {/* STATS */}
      <section style={styles.statsCardsSection}>
        <div style={styles.statsCards}>
          <div style={styles.statCard}>
            <div style={{ fontSize: "30px" }}>📖</div>
            <h2>10,000+</h2>
            <p>Livres disponibles</p>
          </div>

          <div style={styles.statCard}>
            <div style={{ fontSize: "30px" }}>👥</div>
            <h2>5,000+</h2>
            <p>Membres actifs</p>
          </div>

          <div style={styles.statCard}>
            <div style={{ fontSize: "30px" }}>📈</div>
            <h2>50+</h2>
            <p>Catégories</p>
          </div>

          <div style={styles.statCard}>
            <div style={{ fontSize: "30px" }}>⏰</div>
            <h2>24/7</h2>
            <p>Accès en ligne</p>
          </div>
        </div>
      </section>

      {/* BOOKS */}
      <section style={styles.section}>
        <div style={styles.headerRow}>
          <h2>Livres Populaires</h2>
          <span onClick={() => navigate("/books")} style={styles.viewAll}>
            Voir tout →
          </span>
        </div>

        <div style={styles.cards}>
          {books.map((book) => (
            <div
              key={book.id}
              style={styles.card}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "scale(1.05)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "scale(1)")
              }
            >
              <div style={styles.imageWrapper}>
                <img src={book.image} style={styles.bookImage} />
                <span
                  style={{
                    ...styles.badge,
                    backgroundColor:
                      book.status === "Disponible"
                        ? "#22c55e"
                        : "#ef4444",
                  }}
                >
                  {book.status}
                </span>
              </div>
              <div style={styles.cardContent}>
                <span style={styles.category}>{book.category}</span>
                <h3 style={styles.bookTitle}>{book.title}</h3>
                <p>{book.author}</p>
                <p style={styles.year}>{book.year}</p>
              </div>
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
          <button
            style={styles.primaryBtn}onClick={() => navigate("/signup")}
          >
            S'inscrire
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
  container: {
    fontFamily: "Arial",
  },

  hero: {
    position: "relative",
    height: "70vh",
  },

  heroImg: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    filter: "brightness(60%)",
  },

  overlay: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    textAlign: "center",
    color: "white",
    width: "90%",
  },

  title: {
    fontSize: "clamp(28px, 5vw, 48px)",
  },

  subtitle: {
    fontSize: "clamp(14px, 2vw, 20px)",
    marginBottom: "20px",
  },

  exploreBtn: {
    marginTop: "20px",
    padding: "12px 25px",
    backgroundColor: "#fff",
    color: "#a87009",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },

  searchSection: {
    marginTop: "30px",
    textAlign: "center",
  },

  searchContainer: {
    position: "relative",
    width: "90%",
    maxWidth: "500px",
    margin: "0 auto",
  },

  searchInput: {
    width: "100%",
    padding: "15px 50px 15px 50px",
    borderRadius: "60px",
    border: "1px solid #ddd",
    fontSize: "16px",
    outline: "none",
  },

  searchButton: {
    position: "absolute",
    right: "5px",
    top: "50%",
    transform: "translateY(-50%)",
    backgroundColor: "#a87009",
    border: "none",
    color: "#fff",
    padding: "10px 20px",
    borderRadius: "30px",
    cursor: "pointer",
    fontSize: "16px",
  },

  statsCardsSection: {
    padding: "20px",
  },

  statsCards: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "20px",
  },

  statCard: {
    background: "#fff",
    padding: "20px",
    borderRadius: "10px",
    textAlign: "center",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
  },

  section: {
    padding: "40px 20px",
  },

  headerRow: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "20px",
  },

  viewAll: {
    color: "#2c77f0",
    cursor: "pointer",
  },

  cards: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "20px",
  },

  card: {
    borderRadius: "10px",
    overflow: "hidden",
    background: "#fff",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    transition: "0.3s",
    cursor: "pointer",
  },

  imageWrapper: {
    position: "relative",
  },

  bookImage: {
    width: "100%",
    height: "200px",
    objectFit: "cover",
  },

  badge: {
    position: "absolute",
    top: "10px",
    right: "10px",
    color: "#fff",
    padding: "5px 10px",
    borderRadius: "20px",
    fontSize: "12px",
  },

  cardContent: {
    padding: "15px",
  },

  category: {
    background: "#e0e7ff",
    padding: "4px 10px",
    borderRadius: "10px",
    fontSize: "12px",
  },

  bookTitle: {
    marginTop: "10px",
  },

  year: {
    fontSize: "12px",
    color: "#888",
  },

  ctaSection: {
    background: "linear-gradient(135deg, #a36008, #e7aa38)",
    color: "white",
    padding: "60px 20px",
    textAlign: "center",
    width: "100%",
  },

  ctaTitle: {
    fontSize: "clamp(22px, 4vw, 36px)",
  },

  ctaText: {
    marginBottom: "20px",
  },

  ctaButtons: {
    display: "flex",
    justifyContent: "center",
    gap: "15px",
    flexWrap: "wrap",
  },

  primaryBtn: {
    background: "#fff",
    color: "#976810",
    border: "none",
    padding: "12px 25px",
    borderRadius: "8px",
    cursor: "pointer",
  },

  secondaryBtn: {
    background: "#8a6732",
    color: "#fff",
    border: "none",
    padding: "12px 25px",
    borderRadius: "8px",
    cursor: "pointer",
  },
};

export default Home;