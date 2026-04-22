import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
    phone: "",
    address: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (form.password !== form.confirm) {
      alert("Les mots de passe ne correspondent pas");
      return;
    }

    axios
      .post("http://127.0.0.1:8000/api/register", {
        name: form.name,
        email: form.email,
        password: form.password,
        phone: form.phone,
        address: form.address,
      })
      .then((res) => {
        console.log("Inscription réussie :", res.data);
        navigate("/login");
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div className="register-container">
        <div className="card">
          <div className="logo"> <span>Bibliothèque</span></div>
          <h2>Créer un compte</h2>

          <form onSubmit={handleRegister}>
            <label>Nom complet *</label>
            <input
              type="text"
              name="name"
              placeholder="Votre nom"
              value={form.name}
              onChange={handleChange}
              required
            />

            <label>Email *</label>
            <input
              type="email"
              name="email"
              placeholder="votre@email.com"
              value={form.email}
              onChange={handleChange}
              required
            />

            <div className="row">
              <div>
                <label>Mot de passe *</label>
                <input
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  value={form.password}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label>Confirmer *</label>
                <input
                  type="password"
                  name="confirm"
                  placeholder="••••••••"
                  value={form.confirm}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <label>Téléphone</label>
            <input
              type="text"
              name="phone"
              placeholder="0612345678"
              value={form.phone}
              onChange={handleChange}
            />

            <label>Adresse</label>
            <input
              type="text"
              name="address"
              placeholder="Votre adresse"
              value={form.address}
              onChange={handleChange}
            />

            <button type="submit">Créer mon compte</button>
          </form>

          <p className="login-link">
            Déjà inscrit ?{" "}
            <span onClick={() => navigate("/login")}>Se connecter</span>
          </p>

          <p className="back" onClick={() => navigate("/")}>
            ← Retour à l'accueil
          </p>
        </div>
      </div>

      <style>{`
        body {
          margin: 0;
          font-family: Arial, sans-serif;
        }

        .register-container {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          background: linear-gradient(135deg, #5c3a1e, #a67c52, #e6c378);
          padding: 20px;
        }

        .card {
          background: rgba(255,255,255,0.15);
          backdrop-filter: blur(12px);
          padding: 30px;
          width: 420px;
          border-radius: 15px;
          box-shadow: 0 10px 40px rgba(0,0,0,0.3);
          color: white;
        }

        .logo {
          text-align: center;
          font-size: 24px;
          margin-bottom: 10px;
        }

        .logo span {
          font-weight: bold;
        }

        h2 {
          text-align: center;
          margin-bottom: 20px;
        }

        label {
          display: block;
          margin-top: 10px;
          font-size: 14px;
        }

        input {
          width: 100%;
          padding: 12px;
          margin-top: 5px;
          border-radius: 8px;
          border: none;
          outline: none;
          background: rgba(255,255,255,0.9);
        }

        input:focus {
          box-shadow: 0 0 0 2px #e6c378;
        }

        .row {
          display: flex;
          gap: 10px;
        }

        .row div {
          flex: 1;
        }

        button {
          width: 100%;
          margin-top: 20px;
          padding: 12px;
          background: #e6c378;
          color: #5c3a1e;
          border: none;
          border-radius: 8px;
          font-weight: bold;
          cursor: pointer;
          transition: 0.3s;
        }

        button:hover {
          background: #d4a94f;
          transform: scale(1.03);
        }

        .login-link {
          text-align: center;
          margin-top: 15px;
        }

        .login-link span {
          color: #ffe4a3;
          cursor: pointer;
        }

        .login-link span:hover {
          text-decoration: underline;
        }

        .back {
          text-align: center;
          margin-top: 10px;
          color: #ddd;
          cursor: pointer;
        }

        .back:hover {
          color: white;
        }
      `}</style>
    </>
  );
}