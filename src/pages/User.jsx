import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function User() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");
  const [openMenu, setOpenMenu] = useState(false);
  const [hoveredId, setHoveredId] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8000/api/books")
      .then((res) => res.json())
      .then((data) => {
        // Hna k-nassigniw stock mkhtalf l-kol ktab b-tariqa "Dynamic"
        const stockValues = [
          { total: 6, current: 2 },
          { total: 15, current: 15 },
          { total: 10, current: 0 },
          { total: 8, current: 5 },
          { total: 20, current: 12 },
          { total: 12, current: 4 }
        ];

        const updatedData = data.map((b, index) => ({
          ...b,
          totalStock: stockValues[index % stockValues.length].total,
          currentStock: stockValues[index % stockValues.length].current,
          isBorrowedByUser: false // Hadchi bach l-bouton t-t-toggle
        }));
        setBooks(updatedData);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleToggleBorrow = (id) => {
    setBooks((prev) =>
      prev.map((b) => {
        if (b.id === id) {
          // Ila l-user deja khdah, bgha y-rej3o
          if (b.isBorrowedByUser) {
            return { ...b, currentStock: b.currentStock + 1, isBorrowedByUser: false };
          } 
          // Ila l-user bgha y-akhdo o kayn l-stock
          else if (b.currentStock > 0) {
            return { ...b, currentStock: b.currentStock - 1, isBorrowedByUser: true };
          }
        }
        return b;
      })
    );
  };

  const filteredBooks = books.filter((b) =>
    b.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={styles.page}>
      {/* TOPBAR */}
      <div style={styles.topbar}>
        <h2 style={styles.logo}>📚 Library</h2>

        <input
          placeholder="🔍 Rechercher un livre..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={styles.topSearch}
        />

        <div style={styles.profileBox}>
          <div 
            style={styles.avatar} 
            onClick={() => setOpenMenu(!openMenu)}
          >
            👤
          </div>

          {openMenu && (
            <div style={styles.dropdown}>
              <p style={{ margin: "0 0 10px 0", fontWeight: "600", color: "#333" }}>{user?.email}</p>
              <button
                style={styles.logout}
                onClick={() => {
                  localStorage.removeItem("user");
                  navigate("/login");
                }}
              >
                Déconnexion
              </button>
            </div>
          )}
        </div>
      </div>

      <div style={styles.container}>
        {/* HEADER */}
        <div style={styles.header}>
          <h1 style={{ margin: 0, color: "#1e293b" }}>User Dashboard</h1>
          <p style={{ color: "#64748b", marginTop: "5px" }}>Gérez vos emprunts en un seul clic.</p>
        </div>

        {/* STATS */}
        <div style={styles.stats}>
          <div style={styles.statCard}>
            <h2 style={{ margin: 0, color: "#3b82f6" }}>{books.length}</h2>
            <p style={styles.statLabel}>Total Books</p>
          </div>

          <div style={{...styles.statCard, background: "#f0fdf4"}}>
            <h2 style={{ margin: 0, color: "#22c55e" }}>
              {books.reduce((acc, b) => acc + b.currentStock, 0)}
            </h2>
            <p style={styles.statLabel}>Disponibles</p>
          </div>

          <div style={{...styles.statCard, background: "#fef2f2"}}>
            <h2 style={{ margin: 0, color: "#ef4444" }}>
              {books.filter(b => b.isBorrowedByUser).length}
            </h2>
            <p style={styles.statLabel}>Mes Emprunts</p>
          </div>
        </div>

        {/* TABLE */}
        <div style={styles.tableBox}>
          <div style={styles.tableWrapper}>
            <table style={styles.table}>
              <thead>
                <tr style={styles.theadRow}>
                  <th style={styles.th}>ID</th>
                  <th style={styles.th}>Livre</th>
                  <th style={styles.th}>Auteur</th>
                  <th style={styles.th}>Stock (Dispo/Total)</th>
                  <th style={styles.th}>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredBooks.map((b) => (
                  <tr 
                    key={b.id} 
                    style={{
                      ...styles.row, 
                      backgroundColor: hoveredId === b.id ? "#f8fafc" : "white"
                    }}
                    onMouseEnter={() => setHoveredId(b.id)}
                    onMouseLeave={() => setHoveredId(null)}
                  >
                    <td style={styles.td}>{b.id}</td>
                    <td style={{...styles.td, ...styles.bookCell}}>
                      <img src={b.image} alt="" style={styles.img} />
                      <span style={{ fontWeight: "600", color: "#334155" }}>{b.title}</span>
                    </td>
                    <td style={styles.td}>{b.author}</td>
                    <td style={styles.td}>
                      <div style={styles.stockContainer}>
                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                          <span style={{ 
                            fontSize: "13px", 
                            fontWeight: "700",
                            color: b.currentStock === 0 ? "#ef4444" : "#1e293b"
                          }}>
                            {b.currentStock} / {b.totalStock}
                          </span>
                        </div>
                        <div style={styles.progressBar}>
                          <div style={{
                            ...styles.progressFill,
                            width: `${(b.currentStock / b.totalStock) * 100}%`,
                            backgroundColor: b.currentStock === 0 ? "#cbd5e1" : (b.currentStock < 3 ? "#f59e0b" : "#22c55e")
                          }} />
                        </div>
                      </div>
                    </td>
                    <td style={styles.td}>
                      <button
                        onClick={() => handleToggleBorrow(b.id)}
                        disabled={b.currentStock === 0 && !b.isBorrowedByUser}
                        style={{
                          ...styles.badge,
                          backgroundColor: b.isBorrowedByUser ? "#6366f1" : (b.currentStock === 0 ? "#94a3b8" : "#22c55e"),
                          cursor: (b.currentStock === 0 && !b.isBorrowedByUser) ? "not-allowed" : "pointer",
                          transform: hoveredId === b.id ? "translateY(-2px)" : "none"
                        }}
                      >
                        {b.isBorrowedByUser ? "Rendre" : (b.currentStock === 0 ? "Épuisé" : "Emprunter")}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    fontFamily: "'Inter', 'Poppins', sans-serif",
    background: "#f1f5f9",
    minHeight: "100vh",
  },
  container: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "20px"
  },
  topbar: {
    background: "#1e293b",
    color: "white",
    padding: "15px 40px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
    position: "sticky",
    top: 0,
    zIndex: 10,
  },
  logo: { margin: 0, fontSize: "1.5rem", letterSpacing: "-0.5px" },
  topSearch: {
    width: "350px",
    padding: "10px 18px",
    borderRadius: "10px",
    border: "1px solid #334155",
    outline: "none",
    background: "#334155",
    color: "white",
    transition: "0.2s",
  },
  profileBox: { position: "relative" },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: "12px",
    background: "#f59e0b",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    fontSize: "20px",
    transition: "0.2s",
  },
  dropdown: {
    position: "absolute",
    right: 0,
    top: "55px",
    background: "white",
    padding: "15px",
    borderRadius: "12px",
    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
    width: "200px",
    border: "1px solid #e2e8f0",
    
  },
  logout: {
    width: "100%",
    background: "#ef4444",
    color: "white",
    border: "none",
    padding: "8px",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "600",
  },
  header: { padding: "20px 0", marginBottom: "10px" },
  stats: {
    display: "flex",
    gap: "20px",
    marginBottom: "30px",
  },
  statCard: {
    flex: 1,
    background: "white",
    padding: "20px",
    borderRadius: "16px",
    boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
  },
  statLabel: { margin: "5px 0 0 0", color: "#64748b", fontSize: "14px", fontWeight: "500" },
  tableBox: { width: "100%" },
  tableWrapper: {
    background: "white",
    borderRadius: "16px",
    overflow: "hidden",
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
  },
  table: { width: "100%", borderCollapse: "collapse" },
  theadRow: { background: "#f8fafc", borderBottom: "1px solid #e2e8f0" },
  th: { padding: "16px 20px", textAlign: "left", color: "#475569", fontSize: "12px", textTransform: "uppercase", fontWeight: "600" },
  td: { padding: "16px 20px", borderBottom: "1px solid #f1f5f9", verticalAlign: "middle" },
  bookCell: { display: "flex", alignItems: "center", gap: "15px" },
  img: { width: "45px", height: "65px", objectFit: "cover", borderRadius: "8px", boxShadow: "0 2px 4px rgba(0,0,0,0.1)" },
  stockContainer: { width: "120px" },
  progressBar: { width: "100%", height: "6px", background: "#e2e8f0", borderRadius: "10px", overflow: "hidden" },
  progressFill: { height: "100%", transition: "width 0.4s ease" },
  badge: {
    border: "none",
    padding: "8px 16px",
    borderRadius: "10px",
    color: "white",
    fontWeight: "600",
    fontSize: "12px",
    transition: "0.2s all",
    boxShadow: "0 1px 2px rgba(0,0,0,0.05)"
  },
};