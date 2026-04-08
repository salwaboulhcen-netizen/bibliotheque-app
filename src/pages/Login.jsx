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
    if (!email.includes("@")) return setError("Email invalide !");
    if (password.length < 6) return setError("Mot de passe doit être au moins 6 caractères !");
    setError("");
    setLoading(true);

    setTimeout(() => {
      if (email === "admin@example.com" && password === "123456") {
        navigate("/books");
      } else {
        setError("Email ou mot de passe incorrect !");
      }
      setLoading(false);
    }, 1000);
  };

  const handleGoogleLogin = () => navigate("/books");

  return (
    <div style={styles.container}>
      {/* بطاقة تسجيل الدخول */}
      <div style={styles.card}>
        

        {/* نص ترحيبي */}
        <h2 style={styles.title}>Bienvenue!</h2>
        <p style={styles.subtitle}>
          Connectez-vous pour accéder à votre bibliothèque personnelle.
        </p>

        {error && <p style={styles.error}>{error}</p>}

        {/* زر تسجيل الدخول عبر Google */}
        <button onClick={handleGoogleLogin} style={styles.googleButton}>
          <img
            src="https://cdn-icons-png.flaticon.com/512/2991/2991148.png"
            alt="google"
            style={{ width: 20, height: 20, marginRight: "10px" }}
          />
          Continuer avec Google
        </button>

        {/* Separator "ou" */}
        <div style={styles.separator}>
          <hr style={styles.hr} />
          <span style={styles.orText}>ou</span>
          <hr style={styles.hr} />
        </div>

        {/* نموذج تسجيل الدخول */}
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
              style={styles.eyeIcon}
            >
              {showPassword ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  stroke="#555"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 5c-7 0-11 7-11 7s4 7 11 7 11-7 11-7-4-7-11-7z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  stroke="#555"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path d="M17.94 17.94A10.94 10.94 0 0112 20c-7 0-11-8-11-8a21.87 21.87 0 015.24-6.38M1 1l22 22"></path>
                </svg>
              )}
            </span>
          </div>
          <button type="submit" style={styles.button}>
            {loading ? "Chargement..." : "Se connecter"}
          </button>
        </form>

        {/* روابط مساعدة */}
        <div style={styles.links}>
          <span style={styles.link} onClick={() => alert("Redirection vers mot de passe oublié")}>
            Mot de passe oublié ?
          </span>
          <span style={styles.link} onClick={() => navigate("/register")}>
            Créer un compte
          </span>
        </div>

        <p style={styles.footer} onClick={() => navigate("/")}>
          ← Retour à l'accueil
        </p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    background: "linear-gradient(135deg, #f5f6fa, #f5f6fa)",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  card: {
    padding: "40px 30px",
    borderRadius: "15px",
    width: "380px",
    boxShadow: "0 15px 40px rgba(0,0,0,0.3)",
    textAlign: "center",
    backgroundColor: "#fff",
    color: "#333",
    transition: "0.3s",
  },
  logo: {
    fontSize: "28px",
    fontWeight: "700",
    marginBottom: "10px",
  },
  title: {
    fontSize: "24px",
    marginBottom: "5px",
    fontWeight: "700",
    color: "#333",
  },
  subtitle: {
    fontSize: "14px",
    marginBottom: "20px",
    color: "#777",
  },
  form: { display: "flex", flexDirection: "column" },
  input: {
    padding: "14px",
    margin: "10px 0",
    borderRadius: "10px",
    border: "1px solid #ccc",
    fontSize: "15px",
    width: "100%",
    boxSizing: "border-box",
    transition: "0.3s",
  },
  button: {
    padding: "14px",
    borderRadius: "10px",
    border: "none",
    background: "linear-gradient(135deg, #3d5dc7, #3d5dc7)",
    color: "#fff",
    fontWeight: "600",
    cursor: "pointer",
    marginTop: "15px",
    transition: "0.3s",
  },
  googleButton: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "12px",
    borderRadius: "10px",
    border: "1px solid #ddd",
    cursor: "pointer",
    background: "#fff",
    width: "100%",
    fontWeight: "600",
    transition: "0.3s",
    marginBottom: "15px",
  },
  separator: {
    display: "flex",
    alignItems: "center",
    margin: "15px 0",
    color: "#777",
  },
  hr: {
    flex: 1,
    border: "none",
    height: "1px",
    backgroundColor: "#ccc",
  },
  orText: {
    margin: "0 10px",
    fontWeight: "600",
  },
  eyeIcon: {
    position: "absolute",
    right: "10px",
    top: "50%",
    transform: "translateY(-50%)",
    cursor: "pointer",
    width: "24px",
    height: "24px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  error: { color: "red", fontSize: "14px" },
  links: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "15px",
  },
  link: { color: "#667eea", fontWeight: "bold", cursor: "pointer", fontSize: "13px" },
  footer: { marginTop: "10px", fontSize: "12px", color: "#888", cursor: "pointer" },
};

export default Login;