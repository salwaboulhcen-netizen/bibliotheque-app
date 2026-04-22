import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiBook, FiUsers, FiLogOut, FiHome, FiEdit3, FiTrash2 } from "react-icons/fi";

export default function Admin() {
  const navigate = useNavigate();
  const [page, setPage] = useState("dashboard");

  /* ================= DATA ================= */
  const [books, setBooks] = useState([
    { id: 1, title: "Clean Code", author: "Robert Martin", status: "Disponible" },
    { id: 2, title: "1984", author: "George Orwell", status: "Emprunté" },
  ]);

  const [emprunts] = useState([
    { id: 1, user: "Ahmed", book: "Clean Code", date: "2026-04-20", status: "In progress" },
    { id: 2, user: "Sara", book: "1984", date: "2026-04-18", status: "Returned" },
  ]);

  const [users, setUsers] = useState([
    { id: 1, name: "Ahmed", email: "ahmed@mail.com", status: "Active" },
    { id: 2, name: "Sara", email: "sara@mail.com", status: "Inactive" },
  ]);

  /* ================= STATE ================= */
  const [userSearch, setUserSearch] = useState("");
  const [showUserForm, setShowUserForm] = useState(false);
  const [userForm, setUserForm] = useState({ id: null, name: "", email: "" });

  /* ================= USERS FUNCTIONS ================= */

  const handleAddOrUpdateUser = () => {
    if (userForm.id) {
      // UPDATE
      setUsers((prev) =>
        prev.map((u) =>
          u.id === userForm.id
            ? { ...u, name: userForm.name, email: userForm.email }
            : u
        )
      );
    } else {
      // ADD
      setUsers([
        ...users,
        {
          id: Date.now(),
          name: userForm.name,
          email: userForm.email,
          status: "Active",
        },
      ]);
    }

    setShowUserForm(false);
    setUserForm({ id: null, name: "", email: "" });
  };

  const handleEditUser = (user) => {
    setUserForm(user);
    setShowUserForm(true);
  };

  const handleDeleteUser = (id) => {
    if (window.confirm("Voulez-vous supprimer cet utilisateur ?")) {
      setUsers((prev) => prev.filter((u) => u.id !== id));
    }
  };

  const toggleStatus = (id) => {
    setUsers((prev) =>
      prev.map((u) =>
        u.id === id
          ? { ...u, status: u.status === "Active" ? "Inactive" : "Active" }
          : u
      )
    );
  };

  /* ================= MENU ================= */
  const menu = [
    { key: "dashboard", label: "Dashboard", icon: <FiHome /> },
    { key: "livres", label: "Livres", icon: <FiBook /> },
    { key: "users", label: "Users", icon: <FiUsers /> },
    { key: "emprunts", label: "Emprunts", icon: <FiBook /> },
  ];

  /* ================= CARD ================= */
  const Card = ({ title, value }) => (
    <div style={styles.card}>
      <p style={{ color: "#6b7280" }}>{title}</p>
      <h2>{value}</h2>
    </div>
  );

  const StatCard = ({ title, value }) => (
    <div style={styles.statCard}>
      <p style={styles.muted}>{title}</p>
      <h2>{value}</h2>
    </div>
  );

  /* ================= UI ================= */
  return (
    <div style={styles.app}>

      {/* SIDEBAR */}
      <aside style={styles.sidebar}>
        <h2 style={styles.logo}>Admin</h2>

        {menu.map((m) => (
          <div
            key={m.key}
            onClick={() => setPage(m.key)}
            style={{
              ...styles.menuItem,
              background: page === m.key ? "#ffffff22" : "transparent",
            }}
          >
            <span style={{ marginRight: 10 }}>{m.icon}</span>
            {m.label}
          </div>
        ))}

        <button style={styles.logout} onClick={() => navigate("/Login")}>
          <FiLogOut /> Logout
        </button>
      </aside>

      {/* MAIN */}
      <main style={styles.main}>

        {/* DASHBOARD */}
        {page === "dashboard" && (
          <div>
            <h1 style={styles.title}>Dashboard</h1>

            <div style={styles.grid}>
              <Card title="Books" value={books.length} />
              <Card title="Users" value={users.length} />
              <Card title="Emprunts" value={emprunts.length} />
              <Card
                title="Disponible"
                value={books.filter(b => b.status === "Disponible").length}
              />
            </div>
          </div>
        )}

        {/* USERS */}
        {page === "users" && (
          <div>

            <h1 style={styles.title}>👥 Users</h1>

            {/* TOP */}
            <div style={styles.topBarModern}>
              <input
                placeholder="Search..."
                style={styles.searchModern}
                onChange={(e) => setUserSearch(e.target.value)}
              />

              <button
                style={styles.addBtnModern}
                onClick={() => {
                  setUserForm({ id: null, name: "", email: "" });
                  setShowUserForm(true);
                }}
              >
                + Ajouter
              </button>
            </div>

            {/* TABLE */}
            <div style={styles.tableContainer}>
              <table style={styles.tableModern}>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Utilisateur</th>
                    <th>Email</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {users
                    .filter((u) =>
                      (u.name + u.email)
                        .toLowerCase()
                        .includes(userSearch.toLowerCase())
                    )
                    .map((u) => (
                      <tr key={u.id}>

                        <td>#{u.id}</td>

                        <td style={styles.userCell}>
                          <div style={styles.avatar}></div>
                          {u.name}
                        </td>

                        <td>{u.email}</td>

                        <td>
                          <span
                            onClick={() => toggleStatus(u.id)}
                            style={{
                              ...styles.badgeModern,
                              background:
                                u.status === "Active"
                                  ? "#22c55e20"
                                  : "#ef444420",
                              color:
                                u.status === "Active"
                                  ? "#22c55e"
                                  : "#ef4444",
                              cursor: "pointer",
                            }}
                          >
                            {u.status}
                          </span>
                        </td>

                        {/* ACTIONS */}
                        <td>
                          <div style={styles.actionsCell}>

                            <span
                              onClick={() => handleEditUser(u)}
                              style={styles.iconEdit}
                            >
                              <FiEdit3 />
                            </span>

                            <span
                              onClick={() => handleDeleteUser(u.id)}
                              style={styles.iconDelete}
                            >
                              <FiTrash2 />
                            </span>

                          </div>
                        </td>

                      </tr>
                    ))}
                </tbody>
              </table>
            </div>

            {/* MODAL */}
            {showUserForm && (
              <div style={styles.modalOverlay}>
                <div style={styles.modalBox}>

                  <h2>
                    {userForm.id ? "Modifier User" : "Ajouter User"}
                  </h2>

                  <input
                    placeholder="Name"
                    value={userForm.name}
                    style={styles.inputModern}
                    onChange={(e) =>
                      setUserForm({ ...userForm, name: e.target.value })
                    }
                  />

                  <input
                    placeholder="Email"
                    value={userForm.email}
                    style={styles.inputModern}
                    onChange={(e) =>
                      setUserForm({ ...userForm, email: e.target.value })
                    }
                  />

                  <div style={styles.modalActions}>
                    <button onClick={handleAddOrUpdateUser} style={styles.saveBtn}>
                      Save
                    </button>

                    <button
                      onClick={() => setShowUserForm(false)}
                      style={styles.cancelBtn}
                    >
                      Cancel
                    </button>
                  </div>

                </div>
              </div>
            )}

          </div>
        )}

      </main>
    </div>
  );
}

/* ================= STYLES ================= */
const styles = {

  app: { display: "flex", height: "100vh", background: "#f4f6f8" },

  sidebar: {
    width: 250,
    background: "#9e5d1f",
    color: "white",
    padding: 20,
    display: "flex",
    flexDirection: "column",
  },

  logo: { marginBottom: 20 },

  menuItem: {
    padding: 12,
    borderRadius: 8,
    cursor: "pointer",
  },

  logout: {
    marginTop: "auto",
    padding: 10,
    background: "#cc890b",
    border: "none",
    color: "white",
    borderRadius: 8,
  },

  main: { flex: 1, padding: 20, overflowY: "auto" },

  title: { marginBottom: 20 },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(4,1fr)",
    gap: 15,
  },

  card: { background: "white", padding: 20, borderRadius: 12 },

  statCard: { background: "white", padding: 20, borderRadius: 12 },

  topBarModern: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: 20,
  },

  searchModern: {
    width: "60%",
    padding: 10,
    borderRadius: 10,
  },

  addBtnModern: {
    background: "#f59e0b",
    color: "white",
    border: "none",
    padding: "10px 15px",
    borderRadius: 10,
  },

  tableContainer: {
    background: "white",
    padding: 15,
    borderRadius: 20,
  },

  tableModern: {
    width: "100%",
  },

  userCell: {
    display: "flex",
    alignItems: "center",
    gap: 10,
  },

  avatar: {
    width: 30,
    height: 30,
    borderRadius: "50%",
    background: "#3b82f6",
  },

  badgeModern: {
    padding: "5px 10px",
    borderRadius: 20,
    fontSize: 12,
  },

  actionsCell: {
    display: "flex",
    gap: 10,
  },

  iconEdit: {
    cursor: "pointer",
    padding: 8,
    background: "#3b82f610",
    color: "#3b82f6",
    borderRadius: 8,
    display: "flex",
  },

  iconDelete: {
    cursor: "pointer",
    padding: 8,
    background: "#ef444610",
    color: "#ef4444",
    borderRadius: 8,
    display: "flex",
  },

  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(0,0,0,0.4)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  modalBox: {
    background: "white",
    padding: 20,
    borderRadius: 20,
    width: 350,
  },

  inputModern: {
    width: "100%",
    padding: 10,
    marginTop: 10,
  },

  modalActions: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: 15,
  },

  saveBtn: {
    background: "#22c55e",
    color: "white",
    border: "none",
    padding: 10,
    borderRadius: 10,
  },

  cancelBtn: {
    background: "#ef4444",
    color: "white",
    border: "none",
    padding: 10,
    borderRadius: 10,
  },
};