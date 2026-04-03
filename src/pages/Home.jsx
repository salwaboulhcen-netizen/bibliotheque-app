import React from "react";

const books = [
  { id: 1, title: "React Basics", author: "John Doe", icon: "📘" },
  { id: 2, title: "Learn JavaScript", author: "Jane Smith", icon: "📗" },
  { id: 3, title: "Node.js Guide", author: "Ali Ahmed", icon: "📙" },
];

function Home() {
  return (
    <div style={styles.container}>
      {/* HERO SECTION */}
      <section style={styles.hero}>
        <img src="/biblio.png" alt="biblio" style={styles.heroImg} />
        <div style={styles.overlay}>
          <h1 style={styles.title}>Bienvenue à notre bibliothèque</h1>
          <p style={styles.subtitle}>
            Explorez des milliers de livres facilement
          </p>

          <div style={styles.searchBox}>
            <input
              type="text"
              placeholder="Rechercher livres, auteurs, genres..."
              style={styles.input}
            />
            <button style={styles.searchBtn}>Recherche</button>
          </div>
        </div>
      </section>

      {/* LIVRES POPULAIRES */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Livres Populaires 📚</h2>

        <div style={styles.cards}>
          {books.map((book) => (
            <div key={book.id} style={styles.card}>
              <div style={styles.bookIcon}>{book.icon}</div>
              <h3>{book.title}</h3>
              <p>{book.author}</p>
              <button style={styles.btn}>Emprunter</button>
            </div>
          ))}
        </div>
      </section>

      {/* POURQUOI NOUS */}
      <section style={styles.sectionGray}>
        <h2 style={styles.sectionTitle}>Pourquoi choisir notre bibliothèque ? ⭐</h2>

        <div style={styles.features}>
          <div style={styles.feature}>📚 Large collection</div>
          <div style={styles.feature}>⚡ Accès rapide</div>
          <div style={styles.feature}>🔒 Sécurité</div>
          <div style={styles.feature}>🎯 Recherche facile</div>
        </div>
      </section>

      {/* STATISTIQUES */}
      <section style={styles.section}>
        <div style={styles.stats}>
          <div>
            <h2>1000+ 📖</h2>
            <p>Livres</p>
          </div>
          <div>
            <h2>500+ 👤</h2>
            <p>Utilisateurs</p>
          </div>
          <div>
            <h2>200+ 🏷️</h2>
            <p>Emprunts</p>
          </div>
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section style={styles.cta}>
        <h2>Rejoignez notre bibliothèque dès aujourd’hui ! 🚀</h2>
        <button style={styles.ctaBtn}>S'inscrire</button>
      </section>
    </div>
  );
}

const styles = {
  container: {
    fontFamily: "Arial, sans-serif",
  },

  hero: {
    position: "relative",
    height: "80vh",
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
  },
  title: {
    fontSize: "48px",
  },
  subtitle: {
    marginBottom: "20px",
    fontSize: "20px",
  },
  searchBox: {
    display: "flex",
    justifyContent: "center",
    gap: "10px",
  },
  input: {
    padding: "10px",
    width: "300px",
    borderRadius: "5px 0 0 5px",
    border: "none",
    outline: "none",
  },
  searchBtn: {
    padding: "10px 20px",
    backgroundColor: "#a87009",
    color: "white",
    border: "none",
    cursor: "pointer",
  },

  section: {
    padding: "40px",
    textAlign: "center",
  },
  sectionGray: {
    padding: "40px",
    backgroundColor: "#f5f5f5",
    textAlign: "center",
  },
  sectionTitle: {
    marginBottom: "20px",
  },

  cards: {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
  },
  card: {
    border: "1px solid #ddd",
    padding: "20px",
    width: "200px",
    borderRadius: "8px",
    textAlign: "center",
    transition: "0.3s",
  },
  bookIcon: {
    fontSize: "40px",
    marginBottom: "10px",
  },
  btn: {
    backgroundColor: "#70510f",
    color: "white",
    border: "none",
    padding: "8px",
    cursor: "pointer",
  },

  features: {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
    flexWrap: "wrap",
  },
  feature: {
    backgroundColor: "white",
    padding: "15px",
    borderRadius: "8px",
    width: "150px",
    fontSize: "18px",
  },

  stats: {
    display: "flex",
    justifyContent: "center",
    gap: "50px",
  },

  cta: {
    backgroundColor: "#a87009",
    color: "white",
    padding: "40px",
    textAlign: "center",
  },
  ctaBtn: {
    marginTop: "10px",
    padding: "10px 20px",
    backgroundColor: "#fff",
    color: "#a87009",
    border: "none",
    cursor: "pointer",
  },
};

export default Home;