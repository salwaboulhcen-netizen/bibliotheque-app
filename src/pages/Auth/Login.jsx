import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");

    // validation
    if (!email.includes("@")) {
      setError("Email invalide !");
      return;
    }
    if (password.length < 6) {
      setError("Mot de passe doit être au moins 6 caractères !");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      // 🔥 Fake login (React only)
      const role = email === "admin@example.com" ? "admin" : "lecteur";
      const user = {
        email,
        role,
      };
      localStorage.setItem("user", JSON.stringify(user));
      setLoading(false);
      if (role === "admin") {
        navigate("/admin");
      } else {
        navigate("/books");
      }
    }, 1000);
  };

  const handleGoogleLogin = () => {
    // Simulate Google login (in real app, use Google SDK)
    const googleEmail = "googleuser@gmail.com";
    const role = googleEmail === "admin@example.com" ? "admin" : "lecteur";
    const user = {
      email: googleEmail,
      role,
    };
    localStorage.setItem("user", JSON.stringify(user));
    if (role === "admin") {
      navigate("/admin");
    } else {
      navigate("/books");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Bienvenue </h2>
        <p style={styles.subtitle}>
          Connectez-vous à votre bibliothèque
        </p>

        {error && <p style={styles.error}>{error}</p>}

        {/* Google Login */}
        <button onClick={handleGoogleLogin} style={styles.googleBtn}>
          <img
            src="https://cdn-icons-png.flaticon.com/512/2991/2991148.png"
            alt="google"
            style={{ width: 20, marginRight: 10 }}
          />
          Continuer avec Google
        </button>

        <div style={styles.separator}>ou</div>

        {/* FORM */}
        <form onSubmit={handleLogin} style={styles.form}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
          />

          <div style={{ position: "relative" }}>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
            />

            <span
              onClick={() => setShowPassword(!showPassword)}
              style={styles.eye}
            >
              👁
            </span>
          </div>

          <button type="submit" style={styles.button}>
            {loading ? "Chargement..." : "Se connecter"}
          </button>
        </form>

        {/* links */}
        <div style={styles.links}>
          <span onClick={() => alert("Mot de passe oublié")}>
            Mot de passe oublié ?
          </span>

          <span onClick={() => navigate("/register")}>
            Créer un compte
          </span>
        </div>

        <p style={styles.back} onClick={() => navigate("/")}>
          ← Retour accueil
        </p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f5f6fa",
    fontFamily: "Arial",
  },
  card: {
    width: "380px",
    padding: "30px",
    background: "#fff",
    borderRadius: "15px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
    textAlign: "center",
  },
  title: {
    marginBottom: "5px",
  },
  subtitle: {
    fontSize: "14px",
    color: "#777",
    marginBottom: "20px",
  },
  input: {
    width: "100%",
    padding: "12px",
    margin: "10px 0",
    borderRadius: "8px",
    border: "1px solid #ccc",
  },
  button: {
    width: "100%",
    padding: "12px",
    background: "#3d5dc7",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    marginTop: "10px",
  },
  googleBtn: {
    width: "100%",
    padding: "10px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    background: "#fff",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  separator: {
    margin: "15px 0",
    color: "#777",
  },
  eye: {
    position: "absolute",
    right: "10px",
    top: "40%",
    cursor: "pointer",
  },
  links: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "15px",
    fontSize: "13px",
    color: "#3d5dc7",
    cursor: "pointer",
  },
  back: {
    marginTop: "15px",
    fontSize: "12px",
    color: "#888",
    cursor: "pointer",
  },
  error: {
    color: "red",
    fontSize: "13px",
  },
};

export default Login;