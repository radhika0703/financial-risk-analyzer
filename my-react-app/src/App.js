import React, { useState } from "react";
import Login from "./Login";
import Register from "./Register";
import RiskForm from "./RiskForm";
import Dashboard from "./Dashboard";

function App() {
  const [user, setUser] = useState(null);
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);
  const [page, setPage] = useState("login");

  // Logout function
  const handleLogout = () => {
    setUser(null);
    setResult(null);
    setHistory([]);
    setPage("login");
  };

  // Result handling
  const handleResult = (data) => {
    setResult(data);

    setHistory((prev) => [
      {
        ...data,
        time: new Date().toLocaleTimeString(),
      },
      ...prev,
    ].slice(0, 10));
  };

  // LOGIN / REGISTER SCREEN
  if (!user) {
    return (
      <div style={styles.authRoot}>
        <div style={styles.authOrb1} />
        <div style={styles.authOrb2} />

        <div style={styles.authContainer}>
          <div style={styles.brand}>
            <div style={styles.brandIcon}>⬡</div>
            <span style={styles.brandName}>RiskLens</span>
          </div>

          <p style={styles.brandTagline}>
            AI-Powered Financial Risk Intelligence
          </p>

          <div style={styles.tabs}>
            <button
              style={{
                ...styles.tab,
                ...(page === "login" ? styles.tabActive : {}),
              }}
              onClick={() => setPage("login")}
            >
              Login
            </button>

            <button
              style={{
                ...styles.tab,
                ...(page === "register" ? styles.tabActive : {}),
              }}
              onClick={() => setPage("register")}
            >
              Register
            </button>
          </div>

          {page === "login" ? (
            <Login setUser={setUser} />
          ) : (
            <Register onSuccess={() => setPage("login")} />
          )}
        </div>
      </div>
    );
  }

  // MAIN APP
  return (
    <div style={styles.appRoot}>

      {/* NAVBAR */}
      <nav style={styles.nav}>
        <div style={styles.navLeft}>
          <div style={styles.brandIcon}>⬡</div>
          <span style={styles.navBrand}>RiskLens</span>
        </div>

        <div style={styles.navRight}>
          <div style={styles.navUser}>
            <div style={styles.avatar}>
              {user[0].toUpperCase()}
            </div>

            <span style={styles.navUsername}>
              {user}
            </span>
          </div>

          {/* LOGOUT BUTTON */}
          <button
            style={styles.logoutBtn}
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </nav>

      {/* MAIN CONTENT */}
      <div style={styles.mainLayout}>
        <Dashboard
          user={user}
          result={result}
          history={history}
        />

        <RiskForm setResult={handleResult} />
      </div>
    </div>
  );
}

const styles = {
  authRoot: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    overflow: "hidden",
    padding: "20px",
    background: "linear-gradient(135deg, #050816 0%, #0f172a 50%, #111827 100%)",
  },

  authOrb1: {
    position: "fixed",
    width: "500px",
    height: "500px",
    borderRadius: "50%",
    background:
      "radial-gradient(circle, rgba(56,189,248,0.08) 0%, transparent 70%)",
    top: "-150px",
    left: "-150px",
  },

  authOrb2: {
    position: "fixed",
    width: "400px",
    height: "400px",
    borderRadius: "50%",
    background:
      "radial-gradient(circle, rgba(129,140,248,0.08) 0%, transparent 70%)",
    bottom: "-100px",
    right: "-100px",
  },

  authContainer: {
  width: "100%",
  maxWidth: "440px",
  background: "rgba(15,23,42,0.7)",
  border: "1px solid rgba(255,255,255,0.08)",
  borderRadius: "30px",
  padding: "48px",
  backdropFilter: "blur(30px)",
  boxShadow:
    "0 10px 50px rgba(0,0,0,0.7), 0 0 30px rgba(56,189,248,0.1)",
},

  brand: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
    marginBottom: "8px",
  },

  brandIcon: {
    fontSize: "28px",
    fontWeight: "800",
    background: "linear-gradient(135deg, #38bdf8, #818cf8)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },

  brandName: {
  fontSize: "34px",
  fontWeight: "900",
  letterSpacing: "2px",
  background:
    "linear-gradient(135deg, #38bdf8 0%, #818cf8 45%, #c084fc 100%)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  textShadow: "0 0 25px rgba(56,189,248,0.35)",
},
  brandTagline: {
    textAlign: "center",
    color: "#64748b",
    fontSize: "13px",
    marginBottom: "32px",
  },

  tabs: {
    display: "flex",
    gap: "4px",
    background: "rgba(255,255,255,0.04)",
    borderRadius: "12px",
    padding: "4px",
    marginBottom: "28px",
  },

  tab: {
  flex: 1,
  padding: "12px",
  border: "none",
  borderRadius: "12px",
  cursor: "pointer",
  background: "transparent",
  color: "#94a3b8",
  fontSize: "15px",
  fontWeight: "600",
  transition: "all 0.3s ease",
},

  tabActive: {
  background:
    "linear-gradient(135deg, rgba(56,189,248,0.25), rgba(129,140,248,0.25))",
  color: "#ffffff",
  boxShadow: "0 0 25px rgba(56,189,248,0.25)",
},

  appRoot: {
  minHeight: "100vh",
  background: `
    radial-gradient(circle at top left, #1e293b 0%, transparent 30%),
    radial-gradient(circle at bottom right, #312e81 0%, transparent 30%),
    linear-gradient(135deg, #020617 0%, #0f172a 50%, #111827 100%)
  `,
  color: "white",
},

  nav: {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "18px 36px",
  background: "rgba(15,23,42,0.75)",
  borderBottom: "1px solid rgba(255,255,255,0.08)",
  backdropFilter: "blur(25px)",
  boxShadow: "0 8px 32px rgba(0,0,0,0.45)",
  position: "sticky",
  top: 0,
  zIndex: 100,
},

  navLeft: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },

  navBrand: {
    fontSize: "20px",
    fontWeight: "800",
  },

  navRight: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
  },

  navUser: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },

  avatar: {
    width: "34px",
    height: "34px",
    borderRadius: "50%",
    background: "#38bdf8",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#080b14",
    fontWeight: "700",
  },

  navUsername: {
    color: "#94a3b8",
  },

 logoutBtn: {
  padding: "10px 22px",
  borderRadius: "12px",
  border: "1px solid rgba(248,113,113,0.3)",
  background: "rgba(239,68,68,0.12)",
  color: "#fca5a5",
  cursor: "pointer",
  fontWeight: "700",
  fontSize: "14px",
transition: "all 0.3s ease",
backdropFilter: "blur(12px)",
boxShadow: "0 0 20px rgba(239,68,68,0.15)",
},

mainLayout: {
  display: "grid",
  gridTemplateColumns: "1fr 400px",
  minHeight: "calc(100vh - 70px)",
},
};

export default App;