import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiBook,
  FiUsers,
  FiLogOut,
  FiHome,
  FiEdit3,
  FiTrash2,
} from "react-icons/fi";

/* ================= COMPONENTS ================= */




const Card = ({ title, value }) => (
  <div style={styles.card}>
    <h4 style={{ opacity: 0.6 }}>{title}</h4>
    <h2>{value}</h2>
  </div>
);

const Table = ({ children }) => (
  <div style={styles.tableBox}>
    <table style={styles.table}>
      <tbody>{children}</tbody>
    </table>
  </div>
);

/* ================= MAIN ================= */

export default function Admin() {
  const navigate = useNavigate();
  const [page, setPage] = useState("dashboard");
fetch("http://localhost:8000/api/admins", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    name: "Admin React",
    email: "react@admin.com",
    password: "123456",
  }),
});
const [admins, setAdmins] = useState([]);
useEffect(() => {
  fetch("http://localhost:8000/api/admins")
    .then((res) => res.json())
    .then((data) => setAdmins(data));
}, []);
  /* BOOKS */
const toggleBookAvailability = (id) => {
  setBooks((prev) =>
    prev.map((b) =>
      b.id === id
        ? { ...b, available: b.available === 1 ? 0 : 1 }
        : b
    )
  );
};


  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/api/books")
      .then((res) => res.json())
      .then((data) => setBooks(data))
      .catch((err) => console.log(err));
  }, []);


  /* USERS */
  const [users, setUsers] = useState([
    { id: 1, name: "Ahmed", email: "ahmed@mail.com", status: "Active" },
    { id: 2, name: "Sara", email: "sara@mail.com", status: "Inactive" },
  ]);

  const [searchUser, setSearchUser] = useState("");

  const toggleUser = (id) => {
    setUsers((prev) =>
      prev.map((u) =>
        u.id === id
          ? { ...u, status: u.status === "Active" ? "Inactive" : "Active" }
          : u
      )
    );
  };

  const deleteUser = (id) => {
    if (window.confirm("Delete user?")) {
      setUsers((prev) => prev.filter((u) => u.id !== id));
    }
  };


  /*====books =====*/
  const [search, setSearch] = useState("");

const [showAdd, setShowAdd] = useState(false);

const [newBook, setNewBook] = useState({
  title: "",
  author: "",
  genre: "",
  description: "",
  image: "",
  available: 1,
});


const deleteBook = (id) => {
  if (window.confirm("Delete this book?")) {
    setBooks((prev) => prev.filter((b) => b.id !== id));
  }
};

const [editBook, setEditBook] = useState(null);

const saveEdit = () => {
  setBooks((prev) =>
    prev.map((b) =>
      b.id === editBook.id ? editBook : b
    )
  );

  setEditBook(null);
};
  /* EMPRUNTS */
  const [emprunts, setEmprunts] = useState([
    { id: 1, user: "Sara", book: "Clean Code", date: "2026-04-19", status: "En cours" },
    { id: 2, user: "Omar", book: "1984", date: "2026-04-18", status: "Retourné" },
  ]);

  const changeStatus = (id) => {
    const order = ["En cours", "Retard", "Retourné"];

    setEmprunts((prev) =>
      prev.map((e) =>
        e.id === id
          ? {
              ...e,
              status: order[(order.indexOf(e.status) + 1) % order.length],
            }
          : e
      )
    );
  };

  const retard = emprunts.filter((e) => e.status === "Retard");

  /* MENU */
  const menu = [
    { key: "dashboard", label: "Dashboard", icon: <FiHome /> },
    { key: "livres", label: "Books", icon: <FiBook /> },
    { key: "emprunts", label: "Loans", icon: <FiBook /> },
    { key: "users", label: "Users", icon: <FiUsers /> },
  ];

  const statusStyle = (status) => {
    switch (status) {
      case "En cours":
        return { background: "#facc15", color: "#000" };
      case "Retard":
        return { background: "#ef4444", color: "#fff" };
      case "Retourné":
        return { background: "#22c55e", color: "#fff" };
      default:
        return {};
    }
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.app}>

        {/* SIDEBAR */}
        <aside style={styles.sidebar}>
          <h2 style={{ marginBottom: 20 }}> Admin</h2>

          {menu.map((m) => {
            const active = page === m.key;

            return (
              <div
                key={m.key}
                onClick={() => setPage(m.key)}
                style={{
                  ...styles.menuItem,
                  ...(active ? styles.menuItemActive : {}),
                }}
              >
                <span style={{ fontSize: 16, display:"flex" }}>{m.icon}</span>
                {m.label}
              </div>
            );
          })}

          <button style={styles.logout} onClick={() => navigate("/login")}>
            <FiLogOut /> Logout
          </button>
        </aside>

        {/* MAIN */}
        <main style={styles.main}>

          {/* DASHBOARD */}
          {page === "dashboard" && (
            <>
              <h1>Dashboard</h1>

              <div style={styles.grid}>
                <Card title="Books" value={books.length} />
                <Card title="Users" value={users.length} />
                <Card title="Loans" value={emprunts.length} />
                <Card title="Late" value={retard.length} />
              </div>
            </>
          )}

          {/* LIVRES */}
          {page === "livres" && (
            <>
              <h1> Books</h1>

<div style={{ display: "flex", gap: 10, marginBottom: 10 }}>
  <input
    placeholder="Search by title or author..."
    style={styles.input}
    value={search}
    onChange={(e) => setSearch(e.target.value)}
  />

  <button
    style={styles.addBtn}
    onClick={() => setShowAdd(true)}
  >
    + Add Book
  </button>
</div>

              <Table>
                {books
  .filter((b) =>
    (b.title + b.author)
      .toLowerCase()
      .includes(search.toLowerCase())
  )
  .map((b) => (
                  <tr key={b.id} style={styles.row}>
                    <td>
                      <img src={b.image} style={styles.img} />
                    </td>
                    <td>
                      <b>{b.title}</b>
                      <br />
                      <small>{b.author}</small>
                    </td>
                    <td>{b.genre}</td>
                    <td>
                      <span
                        style={
                          b.available === 1 ? styles.green : styles.red
                        }
                      >
                       {b.available === 1 ? "Available" : "Borrowed"}
                      </span>
                    </td>
                    


                                <td style={styles.actions}>
  
                    {/* EDIT */}
                     <FiEdit3
                     onClick={() => setEditBook(b)}
                      
                          />

                           {/* DELETE */}
                        <FiTrash2
                                    onClick={() => deleteBook(b.id)}
                             
                               />
                                 </td>
                      <FiEdit3 />
                      <FiTrash2 />
                    
                  </tr>
                ))}
              </Table>
            </>
          )}
          {showAdd && (
  <div style={styles.modalOverlay}>
    <div style={styles.modal}>

      <h2>➕ Add Book</h2>

      <input
        placeholder="Title"
        style={styles.input}
        onChange={(e) =>
          setNewBook({ ...newBook, title: e.target.value })
        }
      />

      <input
        placeholder="Author"
        style={styles.input}
        onChange={(e) =>
          setNewBook({ ...newBook, author: e.target.value })
        }
      />

      <input
        placeholder="Genre"
        style={styles.input}
        onChange={(e) =>
          setNewBook({ ...newBook, genre: e.target.value })
        }
      />

      <textarea
        placeholder="Description"
        style={styles.input}
        onChange={(e) =>
          setNewBook({ ...newBook, description: e.target.value })
        }
      />

      <input
        placeholder="Image URL"
        style={styles.input}
        onChange={(e) =>
          setNewBook({ ...newBook, image: e.target.value })
        }
      />

      <select
        style={styles.input}
        onChange={(e) =>
          setNewBook({
            ...newBook,
            available: Number(e.target.value),
          })
        }
      >
        <option value={1}>Available</option>
        <option value={0}>Borrowed</option>
      </select>

      <div style={{ display: "flex", gap: 10 }}>
        <button
          style={styles.addBtn}
          onClick={() => {
            setBooks([
              ...books,
              { id: Date.now(), ...newBook },
            ]);

            setShowAdd(false);
            setNewBook({
              title: "",
              author: "",
              genre: "",
              description: "",
              image: "",
              available: 1,
            });
          }}
        >
          Save
        </button>

        <button
          style={{ ...styles.addBtn, background: "gray" }}
          onClick={() => setShowAdd(false)}
        >
          Cancel
        </button>
      </div>

    </div>
  </div>
)}

{editBook && (
  <div style={styles.modalOverlay}>
    <div style={styles.modal}>

      <h2>✏️ Edit Book</h2>

      <input
        value={editBook.title}
        onChange={(e) =>
          setEditBook({ ...editBook, title: e.target.value })
        }
        style={styles.input}
      />

      <input
        value={editBook.author}
        onChange={(e) =>
          setEditBook({ ...editBook, author: e.target.value })
        }
        style={styles.input}
      />

      <input
        value={editBook.genre}
        onChange={(e) =>
          setEditBook({ ...editBook, genre: e.target.value })
        }
        style={styles.input}
      />

      <div style={{ display: "flex", gap: 10 }}>
        <button style={styles.addBtn} onClick={saveEdit}>
          Save
        </button>

        <button
          style={{ ...styles.addBtn, background: "gray" }}
          onClick={() => setEditBook(null)}
        >
          Cancel
        </button>
      </div>

    </div>
  </div>
)}

          {/* EMPRUNTS */}
          {page === "emprunts" && (
            <>
              <h1>📦 Loans</h1>

              <Table>
                {emprunts.map((e) => (
                  <tr key={e.id} style={styles.row}>
                    <td>#{e.id}</td>
                    <td>{e.user}</td>
                    <td>{e.book}</td>
                    <td>{e.date}</td>
                    <td>
                      <span
                        onClick={() => changeStatus(e.id)}
                        style={{
                          ...styles.badge,
                          ...statusStyle(e.status),
                        }}
                      >
                        {e.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </Table>
            </>
          )}

          {/* USERS */}
          {page === "users" && (
            <>
              <h1>👥 Users</h1>

              <input
                placeholder="Search..."
                style={styles.input}
                onChange={(e) => setSearchUser(e.target.value)}
              />

              <Table>
                {users
                  .filter((u) =>
                    (u.name + u.email)
                      .toLowerCase()
                      .includes(searchUser.toLowerCase())
                  )
                  .map((u) => (
                    <tr key={u.id} style={styles.row}>
                      <td>#{u.id}</td>
                      <td>{u.name}</td>
                      <td>{u.email}</td>
                      <td onClick={() => toggleUser(u.id)}>
                        <span
                          style={
                            u.status === "Active"
                              ? styles.green
                              : styles.red
                          }
                        >
                          {u.status}
                        </span>
                      </td>
                      <td style={styles.actions}>
                        <FiEdit3 />
                        <FiTrash2 onClick={() => deleteUser(u.id)} />
                      </td>
                    </tr>
                  ))}
              </Table>
            </>
          )}

        </main>
      </div>

      
    </div>
  );
}

/* ================= STYLES ================= */

const styles = {
  wrapper: { display: "flex", flexDirection: "column", minHeight: "100vh" },

  app: { display: "flex", flex: 1, background: "#f1f5f9" },

  sidebar: {
    width: 220,
    background: "#0f172a",
    color: "#fff",
    padding: 16,
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },

  menuItem: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    padding: "10px 12px",
    borderRadius: 10,
    cursor: "pointer",
    color: "#cbd5e1",
      fontSize: 14,
  transition: "0.2s",
  lineHeight: 1,
  },

  menuItemActive: {
    background: "#1e293b",
    color: "#fff",
  },

  logout: {
    marginTop: "auto",
    padding: "10px",
    background: "#c77736",
    border: "none",
    borderRadius: 10,
    color: "#fff",
  },

 

  main: { flex: 1, padding: 24 },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: 16,
    marginTop: 20,
  },

  card: {
    background: "#fff",
    padding: 20,
    borderRadius: 16,
    boxShadow: "0 6px 18px rgba(0,0,0,0.06)",
  },

  tableBox: {
    background: "#fff",
    padding: 16,
    borderRadius: 16,
    marginTop: 20,
  },

  table: { width: "100%", borderCollapse: "collapse" },

  row: { borderBottom: "1px solid #eee" },

  img: { width: 45, height: 60, borderRadius: 8, objectFit: "cover" },

  green: {
    background: "#22c55e20",
    color: "#22c55e",
    padding: "5px 10px",
    borderRadius: 20,
  },

  red: {
    background: "#ef444420",
    color: "#ef4444",
    padding: "5px 10px",
    borderRadius: 20,
  },

  badge: {
    padding: "6px 12px",
    borderRadius: 20,
    fontSize: 12,
    cursor: "pointer",
  },

  input: {
    padding: 10,
    borderRadius: 10,
    border: "1px solid #ddd",
    marginBottom: 10,
    width: "100%",
  },
  addBtn: {
  padding: "10px 14px",
  background: "#0f172a",
  color: "#fff",
  border: "none",
  borderRadius: 10,
  cursor: "pointer",
  whiteSpace: "nowrap",
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

modal: {
  background: "#fff",
  padding: 20,
  borderRadius: 15,
  width: 350,
},

  actions: { display: "flex", gap: 10, cursor: "pointer" },
};
  