import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // نفضل استخدام axios للتعامل مع Laravel
import {
  FiBook, FiUsers, FiLogOut, FiHome, FiEdit3, FiTrash2,
  FiPlus, FiSearch, FiCheckCircle, FiClock, FiAlertCircle
} from "react-icons/fi";

/* ===================== CONFIG ===================== */
const API_URL = "http://localhost:8000/api";

const styles = {
  wrapper: { display: "flex", minHeight: "100vh", backgroundColor: "#f1f5f9", fontFamily: "'Inter', sans-serif" },
  sidebar: {
    width: 260,
    background: "#041c27",
    color: "#fff",
    padding: "30px 20px",
    display: "flex",
    flexDirection: "column",
    position: "fixed",
    height: "700px", 
    alignItems: "flex-start",
    padding: "20px",
    zIndex: 100,
  },
  menuItem: (active) => ({
    padding: "14px 18px",
    borderRadius: 12,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: 12,
    fontSize: 15,
    backgroundColor: active ? "#38bdf820" : "transparent",
    color: active ? "#38bdf8" : "#94a3b8",
    marginBottom: 8,
    transition: "0.3s",
    fontWeight: active ? "600" : "400",
  }),
  main: { flex: 1, padding: "40px", marginLeft: 260 },
  header: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 30 },
  grid: { display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20, marginBottom: 40 },
  card: {
    background: "#fff",
    padding: 25,
    borderRadius: 20,
    boxShadow: "0 10px 15px -3px rgba(0,0,0,0.05)",
    border: "1px solid #e2e8f0",
  },
  tableBox: {
    background: "#fff",
    borderRadius: 20,
    boxShadow: "0 10px 15px -3px rgba(0,0,0,0.05)",
    border: "1px solid #e2e8f0",
    overflow: "hidden"
  },
  table: { width: "100%", borderCollapse: "collapse" },
  th: { padding: "18px 24px", background: "#f8fafc", textAlign: "left", fontSize: 13, color: "#64748b", fontWeight: "600" },
  td: { padding: "18px 24px", borderBottom: "1px solid #f1f5f9", fontSize: 14, color: "#1e293b" },
  badge: (type) => {
    const map = {
      Active: { bg: "#dcfce7", color: "#15803d" },
      Inactive: { bg: "#fee2e2", color: "#b91c1c" },
      Retard: { bg: "#fef3c7", color: "#92400e" },
    };
    const style = map[type] || map?.Active;
    return { backgroundColor: style.bg, color: style.color, padding: "5px 12px", borderRadius: 8, fontSize: 12, fontWeight: "600" };
  },
  input: { padding: "12px 16px", borderRadius: 10, border: "1px solid #e2e8f0", width: "100%", outline: "none", marginTop: 8, marginBottom: 15 },
  primaryBtn: { background: "#0f172a", color: "#fff", padding: "12px 20px", borderRadius: 10, border: "none", cursor: "pointer", fontWeight: "600", display: "flex", alignItems: "center", gap: 8 },
  modalOverlay: { position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)", backdropFilter: "blur(4px)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 },
  modal: { background: "#fff", width: 450, borderRadius: 24, padding: 35, boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)" }
};

export default function AdminFinal() {
  const navigate = useNavigate();
  const [page, setPage] = useState("dashboard");
  const [loading, setLoading] = useState(false);

  /* --- DATA STATES --- */
  const [books, setBooks] = useState([]);
  const [users, setUsers] = useState([]);
  const [loans, setLoans] = useState([]);

  /* --- UI STATES --- */
  const [searchTerm, setSearchTerm] = useState("");
  const [modalMode, setModalMode] = useState(null); // 'addBook', 'editBook', 'addUser', 'editUser'
  const [selectedItem, setSelectedItem] = useState(null);

  /* --- LOAD DATA FROM LARAVEL --- */
  useEffect(() => {
    setLoading(true);
    const endpoints = [`${API_URL}/books`, `${API_URL}/users`, `${API_URL}/loans`].map(url => axios.get(url).catch(() => ({ data: [] })));
    
    Promise.all(endpoints).then(([resBooks, resUsers, resLoans]) => {
      setBooks(resBooks.data);
      setUsers(resUsers.data);
      setLoans(resLoans.data);
      setLoading(false);
    });
  }, []);

  /* --- HANDLERS (BOOKS) --- */
 const handleSaveBook = async (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const data = Object.fromEntries(formData);

  try {
    if (modalMode === "addBook") {
      const res = await axios.post(`${API_URL}/books`, data);
      setBooks(prev => [...prev, res.data]);
    } else if (modalMode === "editBook") {
      const res = await axios.put(`${API_URL}/books/${selectedItem.id}`, data);
      setBooks(prev => prev.map(b => b.id === selectedItem.id ? res.data : b));
    }

    setModalMode(null);
  } catch (err) {
    console.error(err);
    alert("Error saving");
  }
};
  const deleteBook = async (id) => {
  if (window.confirm("Are you sure?")) {
    try {
      await axios.delete(`${API_URL}/books/${id}`);
      setBooks(prev => prev.filter(b => b.id !== id));
    } catch (err) {
      console.error(err);
      alert("Delete failed");
    }
  }
};

  /* --- UI HELPERS --- */
  const filteredData = () => {
    if (page === "livres") return books.filter(b => b?.title?.toLowerCase().includes(searchTerm.toLowerCase()));
    if (page === "users") return users.filter(u => u?.name?.toLowerCase().includes(searchTerm.toLowerCase()));
    if (page === "emprunts") return loans;
     return [];
  };

  return (
    <div style={styles.wrapper}>
      {/* SIDEBAR */}
      <aside style={styles.sidebar}>
        <div style={{ fontSize: 22, fontWeight: "800", color: "#38bdf8", marginBottom: 40, display: "flex", alignItems: "center", gap: 10 }}>
          <FiBook size={28} /> Admin
        </div>
        <nav style={{ flex: 1 }}>
          {[
            { id: "dashboard", label: "dashboard", icon: <FiHome /> },
            { id: "livres", label: "livres", icon: <FiBook /> },
            { id: "emprunts", label: "emprunts", icon: <FiClock /> },
            { id: "users", label: "users", icon: <FiUsers /> },
          ].map(m => (
            <div key={m.id} onClick={() => setPage(m.id)} style={styles.menuItem(page === m.id)}>
              {m.icon} {m.label}
            </div>
          ))}
        </nav>
        <button style={{ ...styles.primaryBtn, background: "#ef4444", width: "100%", justifyContent: "center" }} onClick={() => navigate("/login")}>
          <FiLogOut /> Log Out
        </button>
      </aside>

      {/* MAIN */}
      <main style={styles.main}>
        <header style={styles.header}>
          <div>
            <h1 style={{ fontSize: 28, fontWeight: "800", color: "#0f172a", margin: 0 }}>Management Console</h1>
            <p style={{ color: "#64748b", marginTop: 5 }}>Welcome back to your library dashboard</p>
          </div>
          <div style={{ display: "flex", gap: 15 }}>
            <div style={{ position: "relative" }}>
              <FiSearch style={{ position: "absolute", left: 12, top: 14, color: "#94a3b8" }} />
              <input 
                style={{ ...styles.input, width: 300, paddingLeft: 40, marginTop: 0, marginBottom: 0 }} 
                placeholder="Global search..." 
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            {page === "livres" && (
              <button style={styles.primaryBtn} onClick={() => { setSelectedItem(null); setModalMode("addBook"); }}>
                <FiPlus /> Add Book
              </button>
            )}
            {page === "users" && (
              <button style={styles.primaryBtn} onClick={() => { setSelectedItem(null); setModalMode("addUser"); }}>
                <FiPlus /> Add Member
              </button>
            )}
          </div>
        </header>

        {/* DASHBOARD */}
        {page === "dashboard" && (
          <div style={styles.grid}>
            <div style={styles.card}>
              <FiBook size={24} color="#38bdf8" />
              <h3 style={{ color: "#64748b", fontSize: 14, margin: "15px 0 5px" }}>Total Books</h3>
              <h2 style={{ margin: 0 }}>{books.length}</h2>
            </div>
            <div style={styles.card}>
              <FiUsers size={24} color="#6366f1" />
              <h3 style={{ color: "#64748b", fontSize: 14, margin: "15px 0 5px" }}>Total Users</h3>
              <h2 style={{ margin: 0 }}>{users.length}</h2>
            </div>
            <div style={styles.card}>
              <FiCheckCircle size={24} color="#10b981" />
              <h3 style={{ color: "#64748b", fontSize: 14, margin: "15px 0 5px" }}>Active Loans</h3>
              <h2 style={{ margin: 0 }}>{loans.length}</h2>
            </div>
            <div style={styles.card}>
              <FiAlertCircle size={24} color="#f43f5e" />
              <h3 style={{ color: "#64748b", fontSize: 14, margin: "15px 0 5px" }}>Overdue</h3>
              <h2 style={{ margin: 0, color: "#f43f5e" }}>02</h2>
            </div>
          </div>
        )}

        {/* DATA TABLES (Generic UI for Books, Users, Loans) */}
        <section style={styles.tableBox}>
          <table style={styles.table}>
            <thead>
              <tr>
                {page === "livres" && ["Cover", "Details", "Genre", "Status", "Actions"].map(h => <th key={h} style={styles.th}>{h}</th>)}
                {page === "users" && ["Member", "Email", "Current Book", "Status", "Actions"].map(h => <th key={h} style={styles.th}>{h}</th>)}
                {page === "emprunts" && ["User", "Book", "Due Date", "Status", "Actions"].map(h => <th key={h} style={styles.th}>{h}</th>)}
              </tr>
            </thead>
            <tbody>
              {filteredData().map((item) => (
                <tr key={item.id} style={{ transition: "0.2s" }}>
                  {page === "livres" && (
                    <>
                      <td style={styles.td}><img src={item.image || "https://via.placeholder.com/50x70"} style={{ width: 45, height: 60, borderRadius: 8, objectFit: "cover" }} /></td>
                      <td style={styles.td}><b>{item.title}</b><div style={{ fontSize: 12, color: "#64748b" }}>{item.author}</div></td>
                      <td style={styles.td}>{item.genre}</td>
                      <td style={styles.td}><span style={styles.badge(item.available ? "Active" : "Inactive")}>{item.available ? "Available" : "Borrowed"}</span></td>
                      <td style={styles.td}>
                        <div style={{ display: "flex", gap: 15 }}>
                          <FiEdit3 style={{ cursor: "pointer", color: "#38bdf8" }} onClick={() => { setSelectedItem(item); setModalMode("editBook"); }} />
                          <FiTrash2 style={{ cursor: "pointer", color: "#f43f5e" }} onClick={() => deleteBook(item.id)} />
                        </div>
                      </td>
                    </>
                  )}
                  {/* ... Add User mapping here similarly ... */}
                </tr>
                
              ))}
            </tbody>
          </table>
          {loading && <p style={{ padding: 20, textAlign: "center", color: "#94a3b8" }}>Loading from Laravel API...</p>}
        </section>
      </main>

      {/* MODALS SYSTEM */}
      {modalMode && (
        <div style={styles.modalOverlay}>
          <div style={styles.modal}>
            <h2 style={{ margin: "0 0 20px 0" }}>{modalMode.includes("add") ? "Add New" : "Update"} Asset</h2>
            <form onSubmit={handleSaveBook}>
              <label>Name/Title</label>
              <input name="title" defaultValue={selectedItem?.title} style={styles.input} required />
              
              <label>Additional Info (Author/Email)</label>
              <input name="info" defaultValue={selectedItem?.author || selectedItem?.email} style={styles.input} />

              <div style={{ display: "flex", gap: 12, marginTop: 20 }}>
                <button type="submit" style={{ ...styles.primaryBtn, flex: 1, justifyContent: "center" }}>Save Changes</button>
                <button type="button" style={{ ...styles.primaryBtn, background: "#f1f5f9", color: "#64748b", flex: 1, justifyContent: "center" }} onClick={() => setModalMode(null)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}