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




/* STYLES */
const styles = {
  wrapper: { display: "flex", minHeight: "100vh" },
  app: { display: "flex", flex: 1 },
  card: { background: "#fff" },
  tableBox: { background: "#fff" },
  table: { width: "100%" },
 
  sidebar: {
    width: 230,
    background: "linear-gradient(#0f172a,#1e293b)",
    color: "#fff",
    padding: 20,
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },
menuItem: {
  padding: "12px 14px",
  borderRadius: 12,
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  gap: 10,
  fontSize: 14,
  color: "#cbd5e1",
  transition: "0.2s",
},

 menuItemActive: {
  background: "#1e293b",
  color: "#fff",
},

  logout: {
    marginTop: "auto",
    padding: 10,
    background: "#c77736",
    border: "none",
    color: "#fff",
    borderRadius: 10,
  },

  main: { flex: 1, padding: 30, background: "#f8fafc" },

  grid: { display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 15 },

  card: {
    background: "#fff",
    padding: 20,
    borderRadius: 15,
    boxShadow: "0 5px 15px rgba(0,0,0,0.05)",
  },

  tableBox: {
    background: "#fff",
    padding: 20,
    borderRadius: 15,
    marginTop: 20,
  },

  table: { width: "100%" },
  row: { borderBottom: "1px solid #eee" },

  img: { width: 50, height: 70, borderRadius: 10 },

  green: { background: "#22c55e20", color: "#22c55e", padding: 5, borderRadius: 10 },
  red: { background: "#ef444420", color: "#ef4444", padding: 5, borderRadius: 10 },

  actions: { display: "flex", gap: 10, cursor: "pointer" },

  input: { padding: 10, borderRadius: 10, border: "1px solid #ddd" },

  addBtn: {
    padding: "10px 15px",
    background: "#0f172a",
    color: "#fff",
    border: "none",
    borderRadius: 10,
  },
  modal: {
  background: "#fff",
  width: "420px",
  maxHeight: "90vh",
  overflowY: "auto",
  borderRadius: "15px",
  padding: "25px",
  boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
  animation: "fadeIn 0.2s ease-in-out",
},

modalTitle: {
  marginBottom: "15px",
  fontSize: "20px",
  fontWeight: "bold",
  color: "#0f172a",
},

modalActions: {
  display: "flex",
  justifyContent: "space-between",
  marginTop: "15px",
},

fileInput: {
  padding: "10px",
  border: "1px dashed #aaa",
  borderRadius: "10px",
  background: "#f8fafc",
  cursor: "pointer",
},

};


/* COMPONENTS */


const Table = ({ children }) => (
  <div style={styles.tableBox}>
    <table style={styles.table}>
      <tbody>{children}</tbody>
    </table>
  </div>
);
const Card = ({ title, value }) => (
    <div style={styles.card}>
      <h4>{title}</h4>
      <h2>{value}</h2>
    </div>
  );


export default function Admin() {

  const navigate = useNavigate();
  const [page, setPage] = useState("dashboard");

  /* BOOKS */
 const handleImageUpload = (file) => {
  const reader = new FileReader();

  reader.onloadend = () => {
    const img = reader.result;

    if (editBook) {
      setEditBook((prev) => ({ ...prev, image: img }));
    } else {
      setNewBook((prev) => ({ ...prev, image: img }));
    }
  };

  if (file) reader.readAsDataURL(file);
};
  const [imageFile, setImageFile] = useState(null);
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("http://localhost:8000/api/books")
      .then((res) => res.json())
      .then((data) => setBooks(data))
      .catch((err) => console.log(err));
  }, []);

  const toggleBookAvailability = (id) => {
    setBooks((prev) =>
      prev.map((b) =>
        b.id === id
          ? { ...b, available: b.available === 1 ? 0 : 1 }
          : b
      )
    );
  };

  const deleteBook = (id) => {
    if (window.confirm("Delete this book?")) {
      setBooks((prev) => prev.filter((b) => b.id !== id));
    }
  };

  const [editBook, setEditBook] = useState(null);
  const updateBook = () => {
  if (!editBook.title || !editBook.author) return;

  setBooks((prev) =>
    prev.map((b) => (b.id === editBook.id ? editBook : b))
  );

  setEditBook(null);
};
  const saveEdit = () => {
    setBooks((prev) =>
      prev.map((b) => (b.id === editBook.id ? editBook : b))
    );
    setEditBook(null);
  };

  const [showAdd, setShowAdd] = useState(false);
  const [newBook, setNewBook] = useState({
    title: "",
    author: "",
    genre: "",
    description: "",
    image: "",
    available: 1,
  });
  const addBook = () => {
  if (!newBook.title || !newBook.author) {
    alert("Title and Author required!");
    return;
  }

  const bookToAdd = {
    id: Date.now(),
    ...newBook,
  };

  setBooks((prev) => [...prev, bookToAdd]);

  setNewBook({
    title: "",
    author: "",
    genre: "",
    description: "",
    image: "",
    available: 1,
  });

  setShowAdd(false);
};

  /* USERS */

 
  const addUser = () => {
  if (!newUser.name || !newUser.email) return;

  const userToAdd = {
    id: Date.now(),
    ...newUser,
  };

  setUsers((prev) => [...prev, userToAdd]);

  setNewUser({ name: "", email: "", status: "Active" });
  setShowAddUser(false);
};

const updateUser = () => {
  setUsers((prev) =>
    prev.map((u) => (u.id === editUser.id ? editUser : u))
  );

  setEditUser(null);
};
  const [showAddUser, setShowAddUser] = useState(false);
const [editUser, setEditUser] = useState(null);

const [newUser, setNewUser] = useState({
  name: "",
  email: "",
  status: "Active",
});
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
          ? { ...e, status: order[(order.indexOf(e.status) + 1) % 3] }
          : e
      )
    );
  };

  const retard = emprunts.filter((e) => e.status === "Retard");

  const menu = [
    { key: "dashboard", label: "Dashboard", icon: <FiHome /> },
    { key: "livres", label: "Books", icon: <FiBook /> },
    { key: "emprunts", label: "Loans", icon: <FiBook /> },
    { key: "users", label: "Users", icon: <FiUsers /> },
  ];

  return (
    <div style={styles.wrapper}>
      <div style={styles.app}>

        {/* SIDEBAR */}
        <aside style={styles.sidebar}>
          <h2>Admin Panel</h2>

          {menu.map((m) => (
            <div
              key={m.key}
              onClick={() => setPage(m.key)}
              style={{
                ...styles.menuItem,
                ...(page === m.key && styles.menuItemActive),
              }}
            >
              <span style={{ fontSize: 18, display: "flex" }}>
  {m.icon}
</span>
<span>{m.label}</span>
            </div>
          ))}

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
                <Card title="Emprunts" value={emprunts.length} />
                <Card title="retard" value={retard.length} />
              </div>
            </>
          )}

          {/* BOOKS */}
          {page === "livres" && (
            <>
              <h1>Books</h1>

              <div style={{ display: "flex", gap: 10 }}>
                <input
                  placeholder="Search..."
                  style={styles.input}
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <button style={styles.addBtn} onClick={() => setShowAdd(true)}>
                  + Ajouter un livre
                </button>
              </div>
                                      {showAdd && (
  <div style={styles.modalOverlay}>
    <div style={styles.modal}>

      <h2 style={styles.modalTitle}> Ajouter un livre</h2>

      <input
        placeholder="Title"
        style={styles.input}
        value={newBook.title}
        onChange={(e) =>
          setNewBook({ ...newBook, title: e.target.value })
        }
      />

      <input
        placeholder="Author"
        style={styles.input}
        value={newBook.author}
        onChange={(e) =>
          setNewBook({ ...newBook, author: e.target.value })
        }
      />

      <input
        placeholder="Genre"
        style={styles.input}
        value={newBook.genre}
        onChange={(e) =>
          setNewBook({ ...newBook, genre: e.target.value })
        }
      />

      <textarea
        placeholder="Description"
        style={{ ...styles.input, height: "80px" }}
        value={newBook.description}
        onChange={(e) =>
          setNewBook({ ...newBook, description: e.target.value })
        }
      />

      {/* IMAGE */}
      <input
        type="file"
        accept="image/*"
        style={styles.fileInput}
        onChange={(e) => handleImageUpload(e.target.files[0])}
      />

      <select
        style={styles.input}
        value={newBook.available}
        onChange={(e) =>
          setNewBook({
            ...newBook,
            available: Number(e.target.value),
          })
        }
      >
        <option value={1}>Disponible</option>
        <option value={0}>Indisponible</option>
      </select>

      <div style={styles.modalActions}>
        <button style={styles.addBtn} onClick={addBook}>
          Save
        </button>

        <button
          style={{ ...styles.addBtn, background: "#64748b" }}
          onClick={() => setShowAdd(false)}
        >
          Cancel
        </button>
      </div>

    </div>
  </div>
)}{editBook && (
  <div style={styles.modalOverlay}>
    <div style={styles.modal}>

      <h2 style={styles.modalTitle}>✏️ Modifier Livre</h2>

      <input
        style={styles.input}
        value={editBook.title}
        onChange={(e) =>
          setEditBook({ ...editBook, title: e.target.value })
        }
      />

      <input
        style={styles.input}
        value={editBook.author}
        onChange={(e) =>
          setEditBook({ ...editBook, author: e.target.value })
        }
      />

      <input
        style={styles.input}
        value={editBook.genre}
        onChange={(e) =>
          setEditBook({ ...editBook, genre: e.target.value })
        }
      />

      <textarea
        style={{ ...styles.input, height: "80px" }}
        value={editBook.description}
        onChange={(e) =>
          setEditBook({ ...editBook, description: e.target.value })
        }
      />

      {/* IMAGE UPDATE */}
      <input
        type="file"
        accept="image/*"
        style={styles.fileInput}
        onChange={(e) => handleImageUpload(e.target.files[0])}
      />

      {/* preview image */}
      {editBook.image && (
        <img
          src={editBook.image}
          style={{
            width: "100%",
            height: "160px",
            objectFit: "cover",
            marginTop: "10px",
            borderRadius: "10px",
          }}
        />
      )}

      <select
        style={styles.input}
        value={editBook.available}
        onChange={(e) =>
          setEditBook({
            ...editBook,
            available: Number(e.target.value),
          })
        }
      >
        <option value={1}>Disponible</option>
        <option value={0}>Indisponible</option>
      </select>

      <div style={styles.modalActions}>
        <button style={styles.addBtn} onClick={updateBook}>
          Save Changes
        </button>

        <button
          style={{ ...styles.addBtn, background: "#64748b" }}
          onClick={() => setEditBook(null)}
        >
          Cancel
        </button>
      </div>

    </div>
  </div>
)}

              <Table>
                {books
                  .filter((b) =>
                    (b.title + b.author)
                      .toLowerCase()
                      .includes(search.toLowerCase())
                  )
                  .map((b) => (
                    <tr key={b.id} style={styles.row}>
                      <td><img src={b.image} style={styles.img} /></td>
                      <td><b>{b.title}</b><br /><small>{b.author}</small></td>
                      <td>{b.genre}</td>

                      <td>
                        <span
                          onClick={() => toggleBookAvailability(b.id)}
                          style={b.available ? styles.green : styles.red}
                        >
                          {b.available ? "Available" : "Borrowed"}
                        </span>
                      </td>

                      <td style={styles.actions}>
                        <FiEdit3 onClick={() => setEditBook(b)} />
                        <FiTrash2 onClick={() => deleteBook(b.id)} />
                      </td>
                    </tr>
                  ))}
              </Table>
            </>
          )}

          {/* USERS */}
        {page === "users" && (
  <>
    <h1>Users</h1>

    <div style={{ display: "flex", gap: 10 }}>
      <input
        placeholder="Search..."
        style={styles.input}
        onChange={(e) => setSearchUser(e.target.value)}
      />

      <button style={styles.addBtn} onClick={() => setShowAddUser(true)}>
        + Add User
      </button>
    </div>

              <Table>
             {users
  .filter((u) =>
    (u.name + u.email)
      .toLowerCase()
      .includes(searchUser.toLowerCase())
  )
  .slice(0, 10)
  .map((u) => (
                    <tr key={u.id} style={styles.row}>
                      <td>{u.name}</td>
                      <td>{u.email}</td>
                      <td onClick={() => toggleUser(u.id)}>
                        <span style={u.status === "Active" ? styles.green : styles.red}>
                          {u.status}
                        </span>
                      </td>
                      <td style={styles.actions}>
  <FiEdit3 onClick={() => setEditUser(u)} />
  <FiTrash2 onClick={() => deleteUser(u.id)} />
</td>
                    </tr>
                  ))}
              </Table>

 {editUser && (
  <div style={styles.modalOverlay}>
    <div style={styles.modal}>

      <h2>Edit User</h2>

      <input
        style={styles.input}
        value={editUser.name}
        onChange={(e) =>
          setEditUser({ ...editUser, name: e.target.value })
        }
      />

      <input
        style={styles.input}
        value={editUser.email}
        onChange={(e) =>
          setEditUser({ ...editUser, email: e.target.value })
        }
      />

      <select
        style={styles.input}
        value={editUser.status}
        onChange={(e) =>
          setEditUser({ ...editUser, status: e.target.value })
        }
      >
        <option>Active</option>
        <option>Inactive</option>
      </select>

      <div style={styles.modalActions}>
        <button style={styles.addBtn} onClick={updateUser}>
          Save
        </button>

        <button
          style={{ ...styles.addBtn, background: "#64748b" }}
          onClick={() => setEditUser(null)}
        >
          Cancel
        </button>
      </div>

    </div>
  </div>
)}
  {showAddUser && (
  <div style={styles.modalOverlay}>
    <div style={styles.modal}>

      <h2>Add User</h2>

      <input
        placeholder="Name"
        style={styles.input}
        value={newUser.name}
        onChange={(e) =>
          setNewUser({ ...newUser, name: e.target.value })
        }
      />

      <input
        placeholder="Email"
        style={styles.input}
        value={newUser.email}
        onChange={(e) =>
          setNewUser({ ...newUser, email: e.target.value })
        }
      />

      <div style={styles.modalActions}>
        <button style={styles.addBtn} onClick={addUser}>
          Save
        </button>

        <button
          style={{ ...styles.addBtn, background: "#64748b" }}
          onClick={() => setShowAddUser(false)}
        >
          Cancel
        </button>
      </div>

    </div>
  </div>
)}


            </>
          )}

        </main>
      </div>
    </div>
  );

};
