import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


export default function User() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");
  const [openMenu, setOpenMenu] = useState(false);

useEffect(() => {
  fetch("http://localhost:8000/api/books")
    .then((res) => res.json())
    .then((data) => {
      console.log("BOOKS FROM API:", data); // 👈 هنا حطيتو
      setBooks(data);
    })
    .catch((err) => console.log(err));
}, []);

  const handleToggleBorrow = (id) => {
    setBooks((prev) =>
      prev.map((b) =>
        b.id === id ? { ...b, available: !b.available } : b
      )
    );
  };

  const filteredBooks = books.filter((b) =>
    b.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={styles.page}>

      {/* TOPBAR */}
      <div style={styles.topbar}>
  <h2 style={styles.logo}>Library</h2>

  {/* SEARCH */}
  <input
    placeholder="🔍 Search..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    style={styles.topSearch}
  />

  {/* PROFILE */}
  <div style={styles.profileBox}>
    <div style={styles.avatar} onClick={() => setOpenMenu(!openMenu)}>
      👤
    </div>

    {openMenu && (
      <div style={styles.dropdown}>
        <p>{user?.email}</p>
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
          
        
     

      {/* HEADER */}
      <div style={styles.header}>
        <h1>User Dashboard</h1>

    
      </div>

      {/* STATS */}
      <div style={styles.stats}>
        <div style={styles.statCard}>
          <h2>{books.length}</h2>
          <p>Total Books</p>
        </div>

        <div style={styles.statCardGreen}>
          <h2>{books.filter(b => b.available).length}</h2>
          <p>Disponible</p>
        </div>

        <div style={styles.statCardRed}>
          <h2>{books.filter(b => !b.available).length}</h2>
          <p>Empruntés</p>
        </div>
      </div>

      {/* TABLE */}
      <div style={styles.tableBox}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Book</th>
              <th>Author</th>
              <th>Genre</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {filteredBooks.map((b) => (
              <tr key={b.id} style={styles.row}>
                <td>{b.id}</td>

                <td style={styles.bookCell}>
                  <img src={b.image} alt="" style={styles.img} />
                  {b.title}
                </td>

                <td>{b.author}</td>
                <td>{b.genre}</td>

                <td>
                  <span
                    onClick={() => handleToggleBorrow(b.id)}
                    style={{
                      ...styles.badge,
                      background: b.available ? "#22c55e" : "#ef4444",
                    }}
                  >
                    {b.available ? "Disponible" : "Emprunté"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}
const styles = {
  page: {
    fontFamily: "Poppins",
    background: "#f5f5f5",
    minHeight: "100vh",
  },

  topbar: {
    background: "#8e9094",
    color: "white",
    padding: "15px 25px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  logo: {
    margin: 0,
  },

  avatar: {
    width: 40,
    height: 40,
    borderRadius: "50%",
    background: "#fbbf24",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
  },

  dropdown: {
  position: "absolute",
  right: 0,
  top: "100%",  
  marginTop: "10px", 
  background: "#a79e9e",
  padding: 15,
  borderRadius: 10,
  boxShadow: "0 5px 20px rgba(0,0,0,0.2)",
},

  logout: {
    marginTop: 10,
    background: "#917046",
    color: "white",
    border: "none",
    padding: 8,
    borderRadius: 6,
    cursor: "pointer",
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    padding: 20,
  },

  search: {
    padding: 10,
    borderRadius: 8,
    border: "1px solid #ddd",
  },

  stats: {
    display: "flex",
    gap: 20,
    padding: 20,
  },

  statCard: {
    flex: 1,
    background: "white",
    padding: 20,
    borderRadius: 10,
    textAlign: "center",
  },

  statCardGreen: {
    flex: 1,
    background: "#dcfce7",
    padding: 20,
    borderRadius: 10,
    textAlign: "center",
  },

  statCardRed: {
    flex: 1,
    background: "#fee2e2",
    padding: 20,
    borderRadius: 10,
    textAlign: "center",
  },

  tableBox: {
    padding: 20,
  },

  table: {
    width: "100%",
    background: "white",
    borderRadius: 10,
    overflow: "hidden",
  },

  row: {
    borderBottom: "1px solid #eee",
  },

  bookCell: {
    display: "flex",
    alignItems: "center",
    gap: 10,
  },

  img: {
    width: 40,
    height: 60,
    objectFit: "cover",
    borderRadius: 5,
  },

  badge: {
    padding: "6px 12px",
    borderRadius: 20,
    color: "white",
    cursor: "pointer",
  },
  profileBox: {
  position: "relative", 
},
topSearch: {
  width: "300px",
  padding: "8px 15px",
  borderRadius: "20px",
  border: "none",
  outline: "none",
  background: "#ffffff",
color: "#000",
boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
},
};