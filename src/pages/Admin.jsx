import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import * as XLSX from 'xlsx';
import {
  FiBook, FiUsers, FiLogOut, FiHome, FiEdit3, FiTrash2,
  FiPlus, FiSearch, FiCheckCircle, FiClock, FiAlertCircle, 
  FiUser, FiMail, FiCalendar, FiX, FiUpload, FiDownload,
  FiPhone, FiCreditCard, FiUserCheck, FiUserX, FiUserMinus
} from "react-icons/fi";

/* ===================== CONFIG ===================== */
const API_URL = "http://localhost:8000/api";

const styles = {
  wrapper: { display: "flex", flexDirection: "column", minHeight: "100vh", backgroundColor: "#f0f4f8", fontFamily: "'Inter', sans-serif" },
  mainContainer: { display: "flex", flex: 1 },
 sidebar: {
  width: 280,
  background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
  color: "#fff",
  padding: "30px 20px",
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  boxShadow: "4px 0 20px rgba(0,0,0,0.1)"
},
  menuItem: (active) => ({
    padding: "14px 18px",
    borderRadius: 12,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: 12,
    fontSize: 15,
    backgroundColor: active ? "rgba(56,189,248,0.15)" : "transparent",
    color: active ? "#38bdf8" : "#cbd5e1",
    marginBottom: 8,
    transition: "all 0.3s ease",
    fontWeight: active ? "600" : "400",
    width: "100%",
    border: active ? "1px solid rgba(56,189,248,0.3)" : "none"
  }),
  main: { flex: 1, padding: "40px", marginLeft: 280, background: "#f0f4f8" },
 
  header: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 30, flexWrap: "wrap", gap: 15 },
  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 20, marginBottom: 40 },
  card: {
    background: "#fff",
    padding: 25,
    borderRadius: 20,
    boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05)",
    border: "1px solid #e2e8f0",
    transition: "all 0.3s ease",
    cursor: "pointer",
    position: "relative",
    overflow: "hidden"
  },
  statsGrid: { display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20, marginBottom: 30 },
  statCard: (color) => ({
    background: "#fff",
    padding: 20,
    borderRadius: 16,
    borderLeft: `4px solid ${color}`,
    boxShadow: "0 2px 4px rgba(0,0,0,0.05)"
  }),
  tableBox: {
    background: "#fff",
    borderRadius: 20,
    boxShadow: "0 1px 3px 0 rgba(0,0,0,0.05)",
    border: "1px solid #e2e8f0",
    overflow: "auto",
    transition: "all 0.3s ease"
  },
  table: { width: "100%", borderCollapse: "collapse", minWidth: 800 },
  th: { padding: "18px 24px", background: "#f8fafc", textAlign: "left", fontSize: 13, color: "#475569", fontWeight: "600", borderBottom: "2px solid #e2e8f0" },
  td: { padding: "16px 24px", borderBottom: "1px solid #f1f5f9", fontSize: 14, color: "#334155" },
  badge: (type) => {
    const map = {
      'Disponible': { bg: "#dcfce7", color: "#15803d" },
      'Emprunté': { bg: "#fee2e2", color: "#b91c1c" },
      'Actif': { bg: "#dcfce7", color: "#15803d" },
      'Inactif': { bg: "#fee2e2", color: "#b91c1c" },
      'Suspendu': { bg: "#fef3c7", color: "#92400e" },
      'Admin': { bg: "#dbeafe", color: "#1e40af" },
      'Utilisateur': { bg: "#e0e7ff", color: "#3730a3" },
      'En retard': { bg: "#fef3c7", color: "#92400e" },
      'Retourné': { bg: "#e0e7ff", color: "#3730a3" },
      'En cours': { bg: "#dbeafe", color: "#1e40af" },
    };
    const style = map[type] || map.Actif;
    return { backgroundColor: style.bg, color: style.color, padding: "6px 12px", borderRadius: 10, fontSize: 12, fontWeight: "600", display: "inline-flex", alignItems: "center", gap: 6 };
  },
  input: { padding: "12px 16px", borderRadius: 12, border: "2px solid #e2e8f0", width: "100%", outline: "none", marginTop: 8, marginBottom: 15, transition: "all 0.3s ease", fontSize: 14, background: "#fff" },
  primaryBtn: { background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)", color: "#fff", padding: "12px 24px", borderRadius: 12, border: "none", cursor: "pointer", fontWeight: "600", display: "flex", alignItems: "center", gap: 8, transition: "all 0.3s ease" },
  secondaryBtn: { background: "#fff", color: "#0f172a", padding: "12px 24px", borderRadius: 12, border: "2px solid #e2e8f0", cursor: "pointer", fontWeight: "600", display: "flex", alignItems: "center", gap: 8, transition: "all 0.3s ease" },
  modalOverlay: { position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", backdropFilter: "blur(5px)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 },
  modal: { background: "#fff", width: 650, borderRadius: 28, padding: 40, boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)", maxHeight: "85vh", overflowY: "auto" },
  profileCard: {
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    padding: 30,
    borderRadius: 24,
    color: "white",
    marginBottom: 30,
    display: "flex",
    alignItems: "center",
    gap: 25,
    flexWrap: "wrap",
    boxShadow: "0 20px 25px -12px rgba(0,0,0,0.1)"
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: "50%",
    background: "rgba(255,255,255,0.2)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 40,
    fontWeight: "bold"
  },
  buttonGroup: { display: "flex", gap: 12, marginBottom: 20, flexWrap: "wrap" },
  uploadArea: { border: "2px dashed #cbd5e1", borderRadius: 12, padding: 20, textAlign: "center", cursor: "pointer", transition: "all 0.3s ease", background: "#f8fafc" },
  imagePreview: { width: 100, height: 120, objectFit: "cover", borderRadius: 12, marginTop: 10, border: "3px solid #e2e8f0" }
};

// Données par défaut
const defaultUsers = [
  { id: 1, name: "Ahmed Benali", email: "ahmed@example.com", phone: "0612345678", cin: "AB123456", role: "admin", status: "active", created_at: "2024-01-15" },
  { id: 2, name: "Fatima Zahra", email: "fatima@example.com", phone: "0623456789", cin: "FZ234567", role: "user", status: "active", created_at: "2024-01-20" },
  { id: 3, name: "Mohamed Tazi", email: "mohamed@example.com", phone: "0634567890", cin: "MT345678", role: "user", status: "active", created_at: "2024-02-01" },
  { id: 4, name: "Sofia Alami", email: "sofia@example.com", phone: "0645678901", cin: "SA456789", role: "user", status: "inactive", created_at: "2024-02-10" },
  { id: 5, name: "Youssef Nouri", email: "youssef@example.com", phone: "0656789012", cin: "YN567890", role: "user", status: "suspended", created_at: "2024-02-15" },
  { id: 6, name: "Leila Hakim", email: "leila@example.com", phone: "0667890123", cin: "LH678901", role: "user", status: "active", created_at: "2024-03-01" },
  { id: 7, name: "Karim Benjelloun", email: "karim@example.com", phone: "0678901234", cin: "KB789012", role: "admin", status: "active", created_at: "2024-03-05" },
  { id: 8, name: "Nadia Fassi", email: "nadia@example.com", phone: "0689012345", cin: "NF890123", role: "user", status: "active", created_at: "2024-03-10" },
  { id: 9, name: "Omar Chafik", email: "omar@example.com", phone: "0690123456", cin: "OC901234", role: "user", status: "inactive", created_at: "2024-03-15" },
  { id: 10, name: "Hind Bennis", email: "hind@example.com", phone: "0612345679", cin: "HB012345", role: "user", status: "active", created_at: "2024-03-20" }
];

const defaultLoans = [
  { id: 1, user_id: 1, user_name: "Ahmed Benali", book_id: 1, book_title: "Le Petit Prince", borrowed_at: "2024-03-01", due_date: "2024-03-15", returned_at: null, status: "active" },
  { id: 2, user_id: 2, user_name: "Fatima Zahra", book_id: 2, book_title: "1984", borrowed_at: "2024-03-05", due_date: "2024-03-19", returned_at: null, status: "overdue" },
  { id: 3, user_id: 3, user_name: "Mohamed Tazi", book_id: 3, book_title: "Les Misérables", borrowed_at: "2024-03-10", due_date: "2024-03-24", returned_at: "2024-03-22", status: "returned" },
  { id: 4, user_id: 4, user_name: "Sofia Alami", book_id: 4, book_title: "Crime and Punishment", borrowed_at: "2024-03-12", due_date: "2024-03-26", returned_at: null, status: "active" },
  { id: 5, user_id: 5, user_name: "Youssef Nouri", book_id: 1, book_title: "Le Petit Prince", borrowed_at: "2024-03-01", due_date: "2024-03-15", returned_at: "2024-03-14", status: "returned" },
  { id: 6, user_id: 6, user_name: "Leila Hakim", book_id: 5, book_title: "The Great Gatsby", borrowed_at: "2024-03-08", due_date: "2024-03-22", returned_at: null, status: "active" },
  { id: 7, user_id: 7, user_name: "Karim Benjelloun", book_id: 2, book_title: "1984", borrowed_at: "2024-02-28", due_date: "2024-03-13", returned_at: null, status: "overdue" },
  { id: 8, user_id: 8, user_name: "Nadia Fassi", book_id: 6, book_title: "To Kill a Mockingbird", borrowed_at: "2024-03-11", due_date: "2024-03-25", returned_at: null, status: "active" },
  { id: 9, user_id: 9, user_name: "Omar Chafik", book_id: 3, book_title: "Les Misérables", borrowed_at: "2024-03-03", due_date: "2024-03-17", returned_at: "2024-03-16", status: "returned" },
  { id: 10, user_id: 10, user_name: "Hind Bennis", book_id: 4, book_title: "Crime and Punishment", borrowed_at: "2024-03-09", due_date: "2024-03-23", returned_at: null, status: "overdue" }
];

export default function AdminFinal() {
  const navigate = useNavigate();
  
  const adminUser = JSON.parse(localStorage.getItem("user")) || { 
    name: "Admin", 
    email: "admin@library.com",
    role: "admin" 
  };
  
  const [page, setPage] = useState("dashboard");
  const [loading, setLoading] = useState(false);
  const [books, setBooks] = useState([]);
  const [users, setUsers] = useState([]);
  const [loans, setLoans] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [modalMode, setModalMode] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    setLoading(true);
    try {
      const [resBooks, resUsers, resLoans] = await Promise.all([
        axios.get(`${API_URL}/books`).catch(() => ({ data: [] })),
        axios.get(`${API_URL}/users`).catch(() => ({ data: defaultUsers })),
        axios.get(`${API_URL}/loans`).catch(() => ({ data: defaultLoans }))
      ]);
      
      setBooks(resBooks.data.length > 0 ? resBooks.data : []);
      setUsers(resUsers.data.length > 0 ? resUsers.data : defaultUsers);
      setLoans(resLoans.data.length > 0 ? resLoans.data : defaultLoans);
    } catch (err) {
      console.error("Error loading data:", err);
    } finally {
      setLoading(false);
    }
  };

  // استيراد من Excel
  const importExcel = (event, type) => {
    const file = event.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(sheet);
      
      if (type === 'users') {
        const newUsers = jsonData.map((item, index) => ({
          id: users.length + index + 1,
          name: item.Nom || item.name || item.NAME,
          email: item.Email || item.email || item.EMAIL,
          phone: item.Telephone || item.phone || item.PHONE || "",
          cin: item.CIN || item.cin || "",
          role: item.Role || item.role || "user",
          status: item.Status || item.status || "active",
          created_at: new Date().toISOString().split('T')[0]
        }));
        setUsers([...users, ...newUsers]);
        alert(`${newUsers.length} utilisateur(s) importé(s) avec succès!`);
      } else if (type === 'books') {
        const newBooks = jsonData.map((item, index) => ({
          id: books.length + index + 1,
          title: item.Titre || item.title || item.TITLE,
          author: item.Auteur || item.author || item.AUTHOR,
          genre: item.Genre || item.genre || "Non spécifié",
          image: item.Image || item.image || "https://via.placeholder.com/200x300?text=No+Image",
          available: item.Disponible === "oui" || item.available === true || item.AVAILABLE === "oui"
        }));
        setBooks([...books, ...newBooks]);
        alert(`${newBooks.length} livre(s) importé(s) avec succès!`);
      }
    };
    reader.readAsArrayBuffer(file);
    event.target.value = '';
  };

  // تصدير إلى Excel
  const exportToExcel = (data, filename) => {
    const exportData = data.map(item => {
      if (filename === "utilisateurs") {
        return {
          Nom: item.name,
          Email: item.email,
          Téléphone: item.phone,
          CIN: item.cin,
          Rôle: item.role,
          Statut: item.status,
          "Date d'inscription": new Date(item.created_at).toLocaleDateString()
        };
      } else if (filename === "livres") {
        return {
          Titre: item.title,
          Auteur: item.author,
          Genre: item.genre,
          Statut: item.available ? "Disponible" : "Emprunté"
        };
      } else if (filename === "emprunts") {
        return {
          Utilisateur: item.user_name,
          Livre: item.book_title,
          "Date d'emprunt": new Date(item.borrowed_at).toLocaleDateString(),
          "Date de retour": item.returned_at ? new Date(item.returned_at).toLocaleDateString() : new Date(item.due_date).toLocaleDateString(),
          Statut: item.status === "active" ? "En cours" : item.status === "overdue" ? "En retard" : "Retourné"
        };
      }
      return item;
    });
    
    const ws = XLSX.utils.json_to_sheet(exportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, filename);
    XLSX.writeFile(wb, `${filename}.xlsx`);
    alert(`Fichier ${filename}.xlsx téléchargé avec succès!`);
  };

  const handleSaveBook = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    let imageUrl = formData.get("image");
    
    if (imageFile) {
      imageUrl = URL.createObjectURL(imageFile);
    }

    const data = {
      title: formData.get("title"),
      author: formData.get("author"),
      genre: formData.get("genre"),
      image: imageUrl || "https://via.placeholder.com/200x300?text=No+Image",
      available: formData.get("available") === "true"
    };

    if (modalMode === "addBook") {
      const newBook = { ...data, id: books.length + 1 };
      setBooks(prev => [...prev, newBook]);
    } else if (modalMode === "editBook") {
      setBooks(prev => prev.map(b => b.id === selectedItem.id ? { ...b, ...data } : b));
    }
    setModalMode(null);
    setImageFile(null);
    setImagePreview(null);
  };

  const deleteBook = async (id) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ce livre ?")) {
      setBooks(prev => prev.filter(b => b.id !== id));
    }
  };

  const handleSaveUser = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      cin: formData.get("cin"),
      role: formData.get("role"),
      status: formData.get("status"),
      created_at: new Date().toISOString().split('T')[0]
    };

    if (modalMode === "addUser") {
      const newUser = { ...data, id: users.length + 1 };
      setUsers(prev => [...prev, newUser]);
    } else if (modalMode === "editUser") {
      setUsers(prev => prev.map(u => u.id === selectedItem.id ? { ...u, ...data } : u));
    }
    setModalMode(null);
  };

  const deleteUser = async (id) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cet utilisateur ?")) {
      setUsers(prev => prev.filter(u => u.id !== id));
    }
  };

  const addLoan = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newLoan = {
      id: loans.length + 1,
      user_id: parseInt(formData.get("user_id")),
      user_name: users.find(u => u.id === parseInt(formData.get("user_id")))?.name,
      book_id: parseInt(formData.get("book_id")),
      book_title: books.find(b => b.id === parseInt(formData.get("book_id")))?.title,
      borrowed_at: formData.get("borrowed_at"),
      due_date: formData.get("due_date"),
      returned_at: null,
      status: "active"
    };
    setLoans(prev => [...prev, newLoan]);
    setModalMode(null);
  };

  const returnBook = (loanId) => {
    setLoans(prev => prev.map(loan => 
      loan.id === loanId 
        ? { ...loan, returned_at: new Date().toISOString().split('T')[0], status: "returned" }
        : loan
    ));
  };

  const getLoanStatus = (loan) => {
    if (loan.status === "returned") return "Retourné";
    const dueDate = new Date(loan.due_date);
    const today = new Date();
    if (dueDate < today) return "En retard";
    return "En cours";
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const filteredData = () => {
    if (page === "livres") {
      return books.filter(b => 
        b?.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        b?.author?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (page === "users") {
      return users.filter(u => 
        u?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u?.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u?.cin?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u?.phone?.includes(searchTerm)
      );
    }
    if (page === "emprunts") {
      return loans.filter(l => 
        l?.user_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        l?.book_title?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    return [];
  };

  const userStats = {
    total: users.length,
    active: users.filter(u => u.status === "active").length,
    inactive: users.filter(u => u.status === "inactive").length,
    suspended: users.filter(u => u.status === "suspended").length
  };

  const stats = {
    totalBooks: books.length,
    totalUsers: users.length,
    activeLoans: loans.filter(l => l.status === "active").length,
    overdueLoans: loans.filter(l => {
      const dueDate = new Date(l.due_date);
      const today = new Date();
      return l.status !== "returned" && dueDate < today;
    }).length
  };

  return (
    <div style={styles.wrapper}>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { transform: translateY(30px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .card-hover:hover {
          transform: translateY(-5px);
          box-shadow: 0 20px 25px -12px rgba(0,0,0,0.1);
        }
        .table-row-hover:hover {
          background: #f8fafc;
          transition: 0.2s;
        }
        button:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        }
        input:focus, select:focus {
          border-color: #667eea;
          box-shadow: 0 0 0 3px rgba(102,126,234,0.1);
        }
      `}</style>

      <div style={styles.mainContainer}>
        <aside style={styles.sidebar}>
          <div style={{ fontSize: 24, fontWeight: "800", color: "#38bdf8", marginBottom: 50, display: "flex", alignItems: "center", gap: 12 }}>
            <FiBook size={30} /> Bibliothèque
          </div>
          <nav style={{ flex: 1, width: "100%" }}>
            {[
              { id: "dashboard", label: "Tableau de bord", icon: <FiHome /> },
              { id: "livres", label: "Livres", icon: <FiBook /> },
              { id: "emprunts", label: "Emprunts", icon: <FiClock /> },
              { id: "users", label: "Utilisateurs", icon: <FiUsers /> },
            ].map(m => (
              <div key={m.id} onClick={() => { setPage(m.id); setSearchTerm(""); }} style={styles.menuItem(page === m.id)}>
                {m.icon} {m.label}
              </div>
            ))}
          </nav>
          <button style={{ ...styles.primaryBtn, background: "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)", width: "100%", justifyContent: "center" }} onClick={() => navigate("/login")}>
            <FiLogOut /> Déconnexion
          </button>
        </aside>

        <main style={styles.main}>
          <div style={styles.profileCard}>
            <div style={styles.avatar}>
              {adminUser.name?.charAt(0).toUpperCase() || "A"}
            </div>
            <div>
              <h2 style={{ margin: 0, fontSize: 26 }}>Bienvenue, {adminUser.name} ! 👋</h2>
              <p style={{ margin: "8px 0 0", opacity: 0.95, display: "flex", alignItems: "center", gap: 8 }}>
                <FiMail size={16} /> {adminUser.email}
              </p>
              <p style={{ margin: "5px 0 0", opacity: 0.85, fontSize: 14 }}>
                Administrateur - Bibliothèque Centrale
              </p>
            </div>
          </div>

          <div style={styles.header}>
            <div>
              <h1 style={{ fontSize: 32, fontWeight: "800", color: "#0f172a", margin: 0 }}>
                {page === "dashboard" && "📊 Tableau de bord"}
                {page === "livres" && "📚 Gestion des Livres"}
                {page === "users" && "👥 Gestion des Utilisateurs"}
                {page === "emprunts" && "📖 Gestion des Emprunts"}
              </h1>
              <p style={{ color: "#64748b", marginTop: 8 }}>
                {page === "dashboard" && "Aperçu général de votre bibliothèque"}
                {page === "livres" && `${books.length} livre(s) au total`}
                {page === "users" && `${users.length} membre(s) inscrit(s)`}
                {page === "emprunts" && `${loans.filter(l => l.status === "active").length} emprunt(s) en cours`}
              </p>
            </div>
            <div style={{ display: "flex", gap: 15, flexWrap: "wrap" }}>
              <div style={{ position: "relative" }}>
                <FiSearch style={{ position: "absolute", left: 14, top: 14, color: "#94a3b8" }} />
                <input 
                  style={{ ...styles.input, width: 280, paddingLeft: 42, marginTop: 0, marginBottom: 0 }} 
                  placeholder="Rechercher..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>

          {page === "users" && (
            <div style={styles.statsGrid}>
              <div style={styles.statCard("#10b981")}>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <FiUserCheck size={24} color="#10b981" />
                  <div>
                    <p style={{ margin: 0, fontSize: 12, color: "#64748b" }}>Actifs</p>
                    <h3 style={{ margin: 0, fontSize: 24 }}>{userStats.active}</h3>
                  </div>
                </div>
              </div>
              <div style={styles.statCard("#ef4444")}>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <FiUserX size={24} color="#ef4444" />
                  <div>
                    <p style={{ margin: 0, fontSize: 12, color: "#64748b" }}>Inactifs</p>
                    <h3 style={{ margin: 0, fontSize: 24 }}>{userStats.inactive}</h3>
                  </div>
                </div>
              </div>
              <div style={styles.statCard("#f59e0b")}>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <FiUserMinus size={24} color="#f59e0b" />
                  <div>
                    <p style={{ margin: 0, fontSize: 12, color: "#64748b" }}>Suspendus</p>
                    <h3 style={{ margin: 0, fontSize: 24 }}>{userStats.suspended}</h3>
                  </div>
                </div>
              </div>
              <div style={styles.statCard("#6366f1")}>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <FiUsers size={24} color="#6366f1" />
                  <div>
                    <p style={{ margin: 0, fontSize: 12, color: "#64748b" }}>Total</p>
                    <h3 style={{ margin: 0, fontSize: 24 }}>{userStats.total}</h3>
                  </div>
                </div>
              </div>
            </div>
          )}

          {(page === "livres" || page === "users" || page === "emprunts") && (
            <div style={styles.buttonGroup}>
              <button style={styles.primaryBtn} onClick={() => { setSelectedItem(null); setModalMode(page === "livres" ? "addBook" : page === "users" ? "addUser" : "addLoan"); }}>
                <FiPlus /> Ajouter
              </button>
              {(page === "livres" || page === "users") && (
                <>
                  <label style={styles.secondaryBtn}>
                    <FiUpload /> Importer Excel
                    <input type="file" accept=".xlsx, .xls" style={{ display: "none" }} onChange={(e) => importExcel(e, page === "livres" ? "books" : "users")} />
                  </label>
                  <button style={styles.secondaryBtn} onClick={() => exportToExcel(page === "livres" ? books : users, page === "livres" ? "livres" : "utilisateurs")}>
                    <FiDownload /> Exporter Excel
                  </button>
                </>
              )}
              {page === "emprunts" && (
                <button style={styles.secondaryBtn} onClick={() => exportToExcel(loans, "emprunts")}>
                  <FiDownload /> Exporter Excel
                </button>
              )}
            </div>
          )}

          {page === "dashboard" && (
            <div style={styles.grid}>
              <div className="card-hover" style={styles.card} onClick={() => setPage("livres")}>
                <FiBook size={28} color="#38bdf8" />
                <h3 style={{ color: "#64748b", fontSize: 14, margin: "15px 0 5px" }}>Total Livres</h3>
                <h2 style={{ margin: 0, fontSize: 36 }}>{stats.totalBooks}</h2>
              </div>
              <div className="card-hover" style={styles.card} onClick={() => setPage("users")}>
                <FiUsers size={28} color="#6366f1" />
                <h3 style={{ color: "#64748b", fontSize: 14, margin: "15px 0 5px" }}>Total Utilisateurs</h3>
                <h2 style={{ margin: 0, fontSize: 36 }}>{stats.totalUsers}</h2>
              </div>
              <div className="card-hover" style={styles.card} onClick={() => setPage("emprunts")}>
                <FiCheckCircle size={28} color="#10b981" />
                <h3 style={{ color: "#64748b", fontSize: 14, margin: "15px 0 5px" }}>Emprunts Actifs</h3>
                <h2 style={{ margin: 0, fontSize: 36 }}>{stats.activeLoans}</h2>
              </div>
              <div className="card-hover" style={styles.card}>
                <FiAlertCircle size={28} color="#f43f5e" />
                <h3 style={{ color: "#64748b", fontSize: 14, margin: "15px 0 5px" }}>En Retard</h3>
                <h2 style={{ margin: 0, fontSize: 36, color: "#f43f5e" }}>{stats.overdueLoans}</h2>
              </div>
            </div>
          )}

          <section style={styles.tableBox}>
            <table style={styles.table}>
              <thead>
                <tr>
                  {page === "livres" && ["Image", "Titre", "Auteur", "Genre", "Statut", "Actions"].map(h => <th key={h} style={styles.th}>{h}</th>)}
                  {page === "users" && ["Nom", "Email", "Téléphone", "CIN", "Rôle", "Statut", "Date inscription", "Actions"].map(h => <th key={h} style={styles.th}>{h}</th>)}
                  {page === "emprunts" && ["Utilisateur", "Livre", "Date emprunt", "Date retour", "Statut", "Actions"].map(h => <th key={h} style={styles.th}>{h}</th>)}
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr><td colSpan="8" style={{ textAlign: "center", padding: 60 }}>⏳ Chargement...</td></tr>
                ) : filteredData().length === 0 ? (
                  <tr><td colSpan="8" style={{ textAlign: "center", padding: 60 }}>📭 Aucune donnée</td></tr>
                ) : (
                  filteredData().map((item) => (
                    <tr key={item.id} className="table-row-hover">
                      {page === "livres" && (
                        <>
                          <td style={styles.td}><img src={item.image || "https://via.placeholder.com/50x70"} style={{ width: 50, height: 65, borderRadius: 10, objectFit: "cover" }} alt={item.title} /></td>
                          <td style={styles.td}><strong>{item.title}</strong></td>
                          <td style={styles.td}>{item.author}</td>
                          <td style={styles.td}>{item.genre || "-"}</td>
                          <td style={styles.td}><span style={styles.badge(item.available ? "Disponible" : "Emprunté")}>{item.available ? "✅ Disponible" : "📖 Emprunté"}</span></td>
                          <td style={styles.td}>
                            <div style={{ display: "flex", gap: 12 }}>
                              <FiEdit3 style={{ cursor: "pointer", color: "#38bdf8", fontSize: 18 }} onClick={() => { setSelectedItem(item); setModalMode("editBook"); }} />
                              <FiTrash2 style={{ cursor: "pointer", color: "#f43f5e", fontSize: 18 }} onClick={() => deleteBook(item.id)} />
                            </div>
                          </td>
                        </>
                      )}
                      {page === "users" && (
                        <>
                          <td style={styles.td}><strong>{item.name}</strong></td>
                          <td style={styles.td}>{item.email}</td>
                          <td style={styles.td}>{item.phone || "-"}</td>
                          <td style={styles.td}>{item.cin || "-"}</td>
                          <td style={styles.td}><span style={styles.badge(item.role === "admin" ? "Admin" : "Utilisateur")}>{item.role === "admin" ? "👑 Admin" : "👤 User"}</span></td>
                          <td style={styles.td}><span style={styles.badge(item.status === "active" ? "Actif" : item.status === "inactive" ? "Inactif" : "Suspendu")}>{item.status === "active" ? "🟢 Actif" : item.status === "inactive" ? "🔴 Inactif" : "🟡 Suspendu"}</span></td>
                          <td style={styles.td}>{new Date(item.created_at).toLocaleDateString()}</td>
                          <td style={styles.td}>
                            <div style={{ display: "flex", gap: 12 }}>
                              <FiEdit3 style={{ cursor: "pointer", color: "#38bdf8", fontSize: 18 }} onClick={() => { setSelectedItem(item); setModalMode("editUser"); }} />
                              <FiTrash2 style={{ cursor: "pointer", color: "#f43f5e", fontSize: 18 }} onClick={() => deleteUser(item.id)} />
                            </div>
                          </td>
                        </>
                      )}
                      {page === "emprunts" && (
                        <>
                          <td style={styles.td}><strong>{item.user_name}</strong></td>
                          <td style={styles.td}>{item.book_title}</td>
                          <td style={styles.td}>{new Date(item.borrowed_at).toLocaleDateString()}</td>
                          <td style={styles.td}>{item.returned_at ? new Date(item.returned_at).toLocaleDateString() : new Date(item.due_date).toLocaleDateString()}</td>
                          <td style={styles.td}>
                            <span style={styles.badge(getLoanStatus(item))}>
                              {getLoanStatus(item) === "En cours" && "🔄 En cours"}
                              {getLoanStatus(item) === "En retard" && "⚠️ En retard"}
                              {getLoanStatus(item) === "Retourné" && "📚 Retourné"}
                            </span>
                          </td>
                          <td style={styles.td}>
                            {item.status !== "returned" && (
                              <button onClick={() => returnBook(item.id)} style={{ ...styles.primaryBtn, padding: "6px 14px", fontSize: 12, background: "#10b981" }}>
                                🔄 Retourner
                              </button>
                            )}
                          </td>
                        </>
                      )}
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </section>
        </main>
      </div>

      

      {modalMode && (
        <div style={styles.modalOverlay}>
          <div style={styles.modal}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 25 }}>
              <h2 style={{ margin: 0 }}>
                {modalMode === "addBook" && "➕ Ajouter un livre"}
                {modalMode === "editBook" && "✏️ Modifier le livre"}
                {modalMode === "addUser" && "👤 Ajouter un utilisateur"}
                {modalMode === "editUser" && "✏️ Modifier l'utilisateur"}
                {modalMode === "addLoan" && "📖 Nouvel emprunt"}
              </h2>
              <button onClick={() => { setModalMode(null); setImageFile(null); setImagePreview(null); }} style={{ background: "none", border: "none", fontSize: 24, cursor: "pointer" }}><FiX /></button>
            </div>
            
            {(modalMode === "addBook" || modalMode === "editBook") && (
              <form onSubmit={handleSaveBook}>
                <label>Titre du livre *</label>
                <input name="title" defaultValue={selectedItem?.title} style={styles.input} required />
                
                <label>Auteur *</label>
                <input name="author" defaultValue={selectedItem?.author} style={styles.input} required />
                
                <label>Genre</label>
                <input name="genre" defaultValue={selectedItem?.genre} style={styles.input} placeholder="Ex: Roman, Science, Histoire..." />
                
                <label>Image du livre</label>
                <div style={styles.uploadArea} onClick={() => document.getElementById("imageUpload").click()}>
                  <FiUpload size={24} color="#667eea" />
                  <p>Cliquez pour choisir une image depuis votre ordinateur</p>
                  <input type="file" id="imageUpload" accept="image/*" style={{ display: "none" }} onChange={handleImageUpload} />
                </div>
                {imagePreview && <img src={imagePreview} alt="Preview" style={styles.imagePreview} />}
                
                <label>OU URL de l'image (optionnel)</label>
                <input name="image" defaultValue={selectedItem?.image} style={styles.input} placeholder="https://..." />
                
                <label>Disponibilité</label>
                <select name="available" defaultValue={selectedItem?.available ? "true" : "false"} style={styles.input}>
                  <option value="true"> Disponible</option>
                  <option value="false"> Emprunté</option>
                </select>
                
                <div style={{ display: "flex", gap: 12, marginTop: 20 }}>
                  <button type="submit" style={{ ...styles.primaryBtn, flex: 1, justifyContent: "center" }}>💾 Enregistrer</button>
                  <button type="button" style={{ ...styles.primaryBtn, background: "#f1f5f9", color: "#64748b", flex: 1, justifyContent: "center" }} onClick={() => setModalMode(null)}>❌ Annuler</button>
                </div>
              </form>
            )}

            {(modalMode === "addUser" || modalMode === "editUser") && (
              <form onSubmit={handleSaveUser}>
                <label>Nom complet *</label>
                <input name="name" defaultValue={selectedItem?.name} style={styles.input} required />
                
                <label>Email *</label>
                <input name="email" type="email" defaultValue={selectedItem?.email} style={styles.input} required />
                
                <label>Téléphone</label>
                <input name="phone" defaultValue={selectedItem?.phone} style={styles.input} placeholder="06XXXXXXXX" />
                
                <label>CIN</label>
                <input name="cin" defaultValue={selectedItem?.cin} style={styles.input} placeholder="AB123456" />
                
                <label>Rôle</label>
                <select name="role" defaultValue={selectedItem?.role || "user"} style={styles.input}>
                  <option value="user">👤 Utilisateur</option>
                  <option value="admin">👑 Administrateur</option>
                </select>
                
                <label>Statut</label>
                <select name="status" defaultValue={selectedItem?.status || "active"} style={styles.input}>
                  <option value="active"> Actif</option>
                  <option value="inactive"> Inactif</option>
                  <option value="suspended"> Suspendu</option>
                </select>
                
                <div style={{ display: "flex", gap: 12, marginTop: 20 }}>
                  <button type="submit" style={{ ...styles.primaryBtn, flex: 1, justifyContent: "center" }}>💾 Enregistrer</button>
                  <button type="button" style={{ ...styles.primaryBtn, background: "#f1f5f9", color: "#64748b", flex: 1, justifyContent: "center" }} onClick={() => setModalMode(null)}>❌ Annuler</button>
                </div>
              </form>
            )}

            {modalMode === "addLoan" && (
              <form onSubmit={addLoan}>
                <label>Utilisateur *</label>
                <select name="user_id" style={styles.input} required>
                  <option value="">Sélectionner un utilisateur</option>
                  {users.filter(u => u.status === "active").map(u => <option key={u.id} value={u.id}>{u.name} ({u.email})</option>)}
                </select>
                
                <label>Livre *</label>
                <select name="book_id" style={styles.input} required>
                  <option value="">Sélectionner un livre</option>
                  {books.filter(b => b.available).map(b => <option key={b.id} value={b.id}>{b.title} - {b.author}</option>)}
                </select>
                
                <label>Date d'emprunt *</label>
                <input name="borrowed_at" type="date" defaultValue={new Date().toISOString().split('T')[0]} style={styles.input} required />
                
                <label>Date de retour prévue *</label>
                <input name="due_date" type="date" defaultValue={new Date(Date.now() + 14*24*60*60*1000).toISOString().split('T')[0]} style={styles.input} required />
                
                <div style={{ display: "flex", gap: 12, marginTop: 20 }}>
                  <button type="submit" style={{ ...styles.primaryBtn, flex: 1, justifyContent: "center" }}>💾 Enregistrer</button>
                  <button type="button" style={{ ...styles.primaryBtn, background: "#f1f5f9", color: "#64748b", flex: 1, justifyContent: "center" }} onClick={() => setModalMode(null)}>❌ Annuler</button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}