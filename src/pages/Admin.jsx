import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Admin() {
  const navigate = useNavigate();
  const [page, setPage] = useState("dashboard");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user || user.role !== "admin") {
      navigate("/");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  const stats = [
    { icon: "📘", label: "Total livres", value: 20 },
    { icon: "✅", label: "Disponibles", value: 15 },
    { icon: "📥", label: "Emprunts actifs", value: 100 },
    { icon: "👥", label: "Lecteurs", value: 99 },
    { icon: "⏳", label: "En attente", value: 10 },
    { icon: "⚠️", label: "Retards", value: 5 },
    { icon: "📈", label: "Total emprunts", value: 50 },
    { icon: "📗", label: "Livres empruntés", value: 25 },
    { icon: "📚", label: "Catégories", value: 3 },
  ];

  return (
    <div className="wrapper" style={styles.wrapper}>

      {/* SIDEBAR */}
      <aside style={styles.sidebar}>
        <h2>Bibliothèque</h2>
        <p style={{ color: "#ddd" }}>Administrateur</p>

        <div style={styles.menu}>
          <button className="menu-btn" onClick={() => setPage("dashboard")}>
            Tableau de bord
          </button>

          <button className="menu-btn" onClick={() => setPage("livres")}>
            Livres
          </button>
          <button className="menu-btn" onClick={() => setPage("categories")}>
           Catégories
          </button>
          <button className="menu-btn" onClick={() => setPage("emprunts")}>
           Emprunts
            </button>
            
         <button className="menu-btn" onClick={() => setPage("users")}>
         Utilisateurs
        </button>
        </div>

        <button className="logout-btn" onClick={handleLogout}>
          Déconnexion
        </button>
      </aside>

      {/* MAIN */}
      <main style={styles.main}>

        {page === "dashboard" && (
          <>
            <h1>Tableau de bord</h1>
            <p>Vue d'ensemble de la bibliothèque</p>

            <div style={styles.grid}>
              {stats.map((s, i) => (
                <div key={i} className="card">
                  <div style={{ fontSize: 28 }}>{s.icon}</div>
                  <h2>{s.value}</h2>
                  <p>{s.label}</p>
                </div>
              ))}
            </div>
          </>
        )}

        {page === "livres" && <LivresPage />}
        {page === "categories" && <CategoriesPage />}
        {page === "emprunts" && <EmpruntsPage />}
        {page === "users" && <UsersPage />}
      </main>

      {/* STYLE */}
      <style>{`
        .menu-btn {
          background: transparent;
          border: none;
          padding: 10px;
          text-align: left;
          cursor: pointer;
          border-radius: 8px;
          transition: 0.3s;
          color: white;
        }

        .menu-btn:hover {
          background: #d49e56;
          transform: translateX(5px);
        }

        .logout-btn {
          margin-top: auto;
          background: #a7712c;
          border: none;
          padding: 10px;
          border-radius: 8px;
          cursor: pointer;
          color: white;
        }

        .logout-btn:hover {
          background: #d49e56;
        }

        .card {
          background: #ebe8e7;
          padding: 20px;
          border-radius: 12px;
          text-align: center;
          transition: 0.3s;
          cursor: pointer;
        }

        .card:hover {
          transform: translateY(-10px);
          box-shadow: 0 15px 30px rgba(0,0,0,0.15);
        }

        table {
          width: 100%;
          margin-top: 20px;
          background: white;
          border-collapse: collapse;
        }

        th, td {
          padding: 10px;
          border: 1px solid #eee;
          text-align: center;
        }

        th {
          background: #b8914a;
          color: white;
        }

        tr:hover {
          background: #f9f9f9;
        }
      `}</style>

    </div>
  );
}

function LivresPage() {
  const [books, setBooks] = useState([
    { id: 1, title: "Le Petit Prince", category: "Littérature", copies: "3/3", status: "Disponible" },
    { id: 2, title: "Clean Code", category: "Informatique", copies: "2/2", status: "Emprunté" },
    { id: 3, title: "1984", category: "Fiction", copies: "4/4", status: "Disponible" },
    { id: 4, title: "Laravel", category: "Informatique", copies: "2/2", status: "Emprunté" },
  ]);

  const [search, setSearch] = useState("");

  const [form, setForm] = useState({
    id: null,
    title: "",
    category: "",
    copies: "",
    status: "Disponible",
  });

  // ➕ ADD / ✏️ EDIT
  const saveBook = () => {
    if (!form.title || !form.category) return;

    if (form.id) {
      setBooks(books.map(b => b.id === form.id ? form : b));
    } else {
      setBooks([...books, { ...form, id: Date.now() }]);
    }

    setForm({
      id: null,
      title: "",
      category: "",
      copies: "",
      status: "Disponible",
    });
  };

  // ✏️ EDIT
  const editBook = (book) => {
    setForm(book);
  };

  // 🗑️ DELETE
  const deleteBook = (id) => {
    setBooks(books.filter(b => b.id !== id));
  };

  // 🔄 TOGGLE STATUS
  const toggleStatus = (id) => {
    setBooks(
      books.map(b =>
        b.id === id
          ? {
              ...b,
              status: b.status === "Disponible" ? "Emprunté" : "Disponible",
            }
          : b
      )
    );
  };

  // 🔍 SEARCH
  const filteredBooks = books.filter(
    (b) =>
      b.title.toLowerCase().includes(search.toLowerCase()) ||
      b.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>

      <div style={styles.header}>
        <h2>Gestion des livres</h2>

        {/* ➕ ADD BUTTON */}
        <button className="add-btn" onClick={saveBook}>
          {form.id ? "Modifier livre" : "+ Ajouter un livre"}
        </button>
      </div>

      {/* FORM */}
      <div style={{ marginBottom: 10 }}>
        <input
          placeholder="Titre"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />

        <input
          placeholder="Catégorie"
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
        />

        <input
          placeholder="Copies"
          value={form.copies}
          onChange={(e) => setForm({ ...form, copies: e.target.value })}
        />
      </div>

      {/* SEARCH */}
      <input
        placeholder="Rechercher..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={styles.search}
      />

      {/* TABLE */}
      <table>
        <thead>
          <tr>
            <th>Livre</th>
            <th>Catégorie</th>
            <th>Copies</th>
            <th>Status</th>
            <th>Modifier</th>
            <th>Supprimer</th>
          </tr>
        </thead>

        <tbody>
          {filteredBooks.map((b) => (
            <tr key={b.id}>
              <td>{b.title}</td>
              <td>{b.category}</td>
              <td>{b.copies}</td>

              {/* 🔄 STATUS CLICK */}
              <td>
                <span
                  onClick={() => toggleStatus(b.id)}
                  style={{
                    padding: "6px 12px",
                    borderRadius: 20,
                    color: "white",
                    cursor: "pointer",
                    background: b.status === "Disponible" ? "#2ecc71" : "#e74c3c",
                  }}
                >
                  {b.status}
                </span>
              </td>

              {/* ✏️ EDIT */}
              <td>
                <button className="menu-btn" onClick={() => editBook(b)}>
                  ✏️
                </button>
              </td>

              {/* 🗑️ DELETE */}
              <td>
                <button className="menu-btn" onClick={() => deleteBook(b.id)}>
                  🗑️
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <style>{`
        .add-btn {
          background: #daaa62;
          color: black;
          border: none;
          padding: 10px 15px;
          border-radius: 10px;
          cursor: pointer;
          font-weight: bold;
        }

        .add-btn:hover {
          background: #bb874c;
          transform: scale(1.05);
        }
      `}</style>

    </div>
  );
}

function CategoriesPage() {
  const [categories, setCategories] = useState([
    { id: 1, name: "Littérature" },
    { id: 2, name: "Informatique" },
    { id: 3, name: "Fiction" },
  ]);

  const [name, setName] = useState("");
  const [editId, setEditId] = useState(null);

  // ADD / EDIT
  const saveCategory = () => {
    if (!name) return;

    if (editId) {
      setCategories(
        categories.map((c) =>
          c.id === editId ? { ...c, name } : c
        )
      );
    } else {
      setCategories([
        ...categories,
        { id: Date.now(), name },
      ]);
    }

    setName("");
    setEditId(null);
  };

  // EDIT
  const editCategory = (cat) => {
    setName(cat.name);
    setEditId(cat.id);
  };

  // DELETE
  const deleteCategory = (id) => {
    setCategories(categories.filter((c) => c.id !== id));
  };

  return (
    <div>
      <h2>Gestion des catégories</h2>

      {/* FORM */}
      <div style={{ marginBottom: 10 }}>
        <input
          placeholder="Nom catégorie"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <button className="add-btn" onClick={saveCategory}>
          {editId ? "Modifier" : "+ Ajouter"}
        </button>
      </div>

      {/* TABLE */}
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Catégorie</th>
            <th>Modifier</th>
            <th>Supprimer</th>
          </tr>
        </thead>

        <tbody>
          {categories.map((c) => (
            <tr key={c.id}>
              <td>{c.id}</td>
              <td>{c.name}</td>

              {/* ✏️ BUTTON FIXED */}
              <td>
                <button
                  onClick={() => editCategory(c)}
                  style={{
                    background: "#ad9064",
                    color: "white",
                    border: "none",
                    padding: "6px 10px",
                    borderRadius: "6px",
                    cursor: "pointer",
                  }}
                >
                   modifier
                </button>
              </td>

              {/* 🗑️ BUTTON FIXED */}
              <td>
                <button
                  onClick={() => deleteCategory(c.id)}
                  style={{
                    background: "#e74c3c",
                    color: "white",
                    border: "none",
                    padding: "6px 10px",
                    borderRadius: "6px",
                    cursor: "pointer",
                  }}
                >
                   supprimer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <style>{`
        input {
          padding: 10px;
          margin-right: 10px;
          border-radius: 8px;
          border: 1px solid #ccc;
        }

        .add-btn {
          background: #daaa62;
          border: none;
          padding: 10px 15px;
          border-radius: 10px;
          cursor: pointer;
          font-weight: bold;
        }

        .add-btn:hover {
          background: #bb874c;
        }
      `}</style>
    </div>
  );
}

function EmpruntsPage() {
  const [emprunts, setEmprunts] = useState([
    {
      id: 1,
      user: "Ahmed",
      book: "Clean Code",
      dateEmprunt: "2026-04-10",
      dateRetour: "2026-04-20",
      status: "En cours",
    },
    {
      id: 2,
      user: "Sara",
      book: "1984",
      dateEmprunt: "2026-04-01",
      dateRetour: "2026-04-12",
      status: "Retourné",
    },
  ]);

  const toggleStatus = (id) => {
    setEmprunts(
      emprunts.map((e) =>
        e.id === id
          ? { ...e, status: e.status === "En cours" ? "Retourné" : "En cours" }
          : e
      )
    );
  };

  const deleteEmprunt = (id) => {
    setEmprunts(emprunts.filter((e) => e.id !== id));
  };

  const btn = {
    background: "#3498db",
    color: "white",
    border: "none",
    padding: "6px 10px",
    borderRadius: "6px",
    marginRight: "5px",
    cursor: "pointer",
  };

  return (
    <div style={{ padding: 20 }}>
      
      {/* HEADER */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h2> Gestion des emprunts</h2>
      </div>

      
      {/* TABLE CONTAINER */}
      <div style={{ marginTop: 20, background: "#fff", padding: 15, borderRadius: 10, boxShadow: "0 8px 20px rgba(0,0,0,0.08)" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#b8914a", color: "white" }}>
              <th>Utilisateur</th>
              <th>Livre</th>
              <th>Emprunt</th>
              <th>Retour</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {emprunts.map((e) => (
              <tr key={e.id} style={{ borderBottom: "1px solid #eee" }}>
                <td>{e.user}</td>
                <td>{e.book}</td>
                <td>{e.dateEmprunt}</td>
                <td>{e.dateRetour}</td>

                <td>
                  <span
                    style={{
                      padding: "6px 12px",
                      borderRadius: 20,
                      color: "white",
                      fontWeight: "bold",
                      background: e.status === "En cours" ? "#f39c12" : "#2ecc71",
                    }}
                  >
                    {e.status}
                  </span>
                </td>

                <td>
                  <button onClick={() => toggleStatus(e.id)} style={btn}>
                    ✔ changer
                  </button>

                  <button
                    onClick={() => deleteEmprunt(e.id)}
                    style={{ ...btn, background: "#e74c3c" }}
                  >
                    🗑 supprimer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}


function UsersPage() {
  const [users, setUsers] = React.useState([
    { id: 1, name: "Ahmed", email: "ahmed@gmail.com", role: "Admin", status: "Active" },
    { id: 2, name: "Sara", email: "sara@gmail.com", role: "User", status: "Active" },
  ]);

  const toggleStatus = (id) => {
    setUsers(users.map(u =>
      u.id === id
        ? { ...u, status: u.status === "Active" ? "Blocked" : "Active" }
        : u
    ));
  };

  const deleteUser = (id) => {
    setUsers(users.filter(u => u.id !== id));
  };

  return (
    <div>
      <h2> Utilisateurs</h2>

      <table style={{ width: "100%", marginTop: 20, background: "white" }}>
        <thead>
          <tr>
            <th>Nom</th>
            <th>Email</th>
            <th>Role</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {users.map(u => (
            <tr key={u.id}>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>{u.role}</td>

              <td>
                <span
                  style={{
                    padding: "5px 10px",
                    borderRadius: 20,
                    background: u.status === "Active" ? "#2ecc71" : "#e74c3c",
                    color: "white"
                  }}
                >
                  {u.status}
                </span>
              </td>

              <td>
                <button className="menu-btn" onClick={() => toggleStatus(u.id)}>
                  🔁
                </button>

                <button className="menu-btn" onClick={() => deleteUser(u.id)}>
                  🗑
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ================= STYLES ================= */
const styles = {
  wrapper: {
    display: "flex",
    minHeight: "100vh",
    fontFamily: "Arial",
    background: "#f4f6f9",
  },
  sidebar: {
    width: 240,
    background: "#b8914a",
    color: "#fff",
    padding: 20,
    display: "flex",
    flexDirection: "column",
  },
  menu: { display: "flex", flexDirection: "column", gap: 10, marginTop: 30 },
  main: { flex: 1, padding: 20 },
  grid: { display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 15, marginTop: 20 },
  header: { display: "flex", justifyContent: "space-between", alignItems: "center" },
  search: { width: "100%", padding: 10, margin: "10px 0", borderRadius: 8, border: "1px solid #ddd" },
};