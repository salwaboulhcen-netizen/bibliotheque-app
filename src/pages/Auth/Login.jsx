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
    let role = "";

    if (email === "admin@example.com") {
      role = "admin";
    } else if (email === "user@example.com") {
      role = "user";
    } else {
      role = "lecteur";
    }

    const user = { email, role };
    localStorage.setItem("user", JSON.stringify(user));

    setLoading(false);

    // ✅ Navigation صحيحة
    if (role === "admin") {
      navigate("/admin");
    } else if (role === "user") {
      navigate("/user");
    } else {
      navigate("/books");
    }

  }, 1000);
};

  const handleGoogleLogin = () => {
  window.location.href = "http://localhost:8000/api/auth/google";
};

  return (
    <div style={styles.container}>
      <div style={styles.wrapper}>
        
        {/* LEFT */}
        <div style={styles.left}>
          <div style={styles.overlay}>
            <h1 style={styles.welcome}>Bienvenue à notre bibliothèque!</h1>
            <p style={styles.desc}>
              Découvrez votre bibliothèque digitale, explorez les livres
              et profitez d'une expérience unique 
            </p>
          </div>
        </div>

        {/* RIGHT */}
        <div style={styles.card}>
          <h2 style={styles.title}>Bienvenue</h2>
          <p style={styles.subtitle}>
            Connectez-vous à votre bibliothèque
          </p>

          {error && <p style={styles.error}>{error}</p>}

          <button onClick={handleGoogleLogin} style={styles.googleBtn}>
            <img
              src="https://cdn-icons-png.flaticon.com/512/2991/2991148.png"
              alt="google"
              style={{ width: 20, marginRight: 10 }}
            />
            Continuer avec Google
          </button>

          <div style={styles.separator}>ou</div>

          <form onSubmit={handleLogin}>
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

              {/* 👁 ICON */}
              <span
                onClick={() => setShowPassword(!showPassword)}
                style={styles.eye}
              >
                {showPassword ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="#5c3a1e" viewBox="0 0 24 24">
                    <path d="M12 5c-7 0-11 7-11 7s4 7 11 7 11-7 11-7-4-7-11-7zm0 12a5 5 0 1 1 0-10 5 5 0 0 1 0 10zm0-8a3 3 0 1 0 0 6 3 3 0 0 0 0-6z"/>
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="#5c3a1e" viewBox="0 0 24 24">
                    <path d="M2 4.27l1.28-1.27 18.45 18.45-1.27 1.27-2.5-2.5C16.34 20.72 14.26 21 12 21c-7 0-11-7-11-7 1.38-2.3 3.47-4.5 6.27-5.94L2 4.27zM12 7a5 5 0 0 1 5 5c0 .55-.09 1.08-.26 1.58l-6.32-6.32C10.92 7.09 11.45 7 12 7zm0-4c7 0 11 7 11 7-1.02 1.7-2.45 3.38-4.33 4.73l-1.45-1.45A5 5 0 0 0 12 7c-.53 0-1.04.08-1.52.22L8.87 5.61C9.88 5.23 10.92 5 12 5z"/>
                  </svg>
                )}
              </span>
            </div>

            <button type="submit" style={styles.button}>
              {loading ? "Chargement..." : "Se connecter"}
            </button>
          </form>

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
    </div>
  );
};

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #5c3a1e, #a67c52, #e6c378)",
    fontFamily: "Arial",
    padding: "20px",
  },

  wrapper: {
    display: "flex",
    flexDirection: window.innerWidth < 768 ? "column" : "row",
    width: "900px",
    maxWidth: "100%",
    height: window.innerWidth < 768 ? "auto" : "520px",
    borderRadius: "20px",
    overflow: "hidden",
    boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
  },

  left: {
    flex: 1,
    backgroundImage:
      "url('https://images.unsplash.com/photo-1512820790803-83ca734da794')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },

  overlay: {
    position: "absolute",
    width: "100%",
    height: "100%",
    background: "rgba(0,0,0,0.6)",
    backdropFilter: "blur(6px)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: "40px",
    color: "#fff",
    textAlign: "center",
  },

  welcome: {
    fontSize: "32px",
    fontWeight: "bold",
    marginBottom: "15px",
    letterSpacing: "1px",
  },

  desc: {
    fontSize: "15px",
    lineHeight: "1.6",
  },

  card: {
    flex: 1,
    padding: "30px",
    background: "rgba(92,58,30,0.85)",
    backdropFilter: "blur(10px)",
    color: "#fff",
    textAlign: "center",
  },

  title: {
    marginBottom: "5px",
  },

  subtitle: {
    fontSize: "14px",
    marginBottom: "20px",
  },

  input: {
    width: "100%",
    padding: "12px",
    margin: "10px 0",
    borderRadius: "8px",
    border: "none",
    background: "rgba(145, 86, 9, 0.9)",
  },

  button: {
    width: "100%",
    padding: "12px",
    background: "#e6c378",
    color: "#5c3a1e",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    marginTop: "10px",
    fontWeight: "bold",
  },

  googleBtn: {
    width: "100%",
    padding: "10px",
    borderRadius: "8px",
    background: "rgba(255,255,255,0.2)",
    border: "1px solid rgba(255,255,255,0.3)",
    color: "#fff",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  separator: {
    margin: "15px 0",
  },

  eye: {
    position: "absolute",
    right: "12px",
    top: "50%",
    transform: "translateY(-50%)",
    cursor: "pointer",
    background: "#e6c378",
    padding: "5px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  links: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "15px",
    fontSize: "13px",
    cursor: "pointer",
  },

  back: {
    marginTop: "15px",
    fontSize: "12px",
    cursor: "pointer",
  },

  error: {
    color: "#ff6b6b",
    fontSize: "13px",
  },
};

export default Login;