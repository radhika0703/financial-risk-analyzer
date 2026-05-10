import React, { useState } from "react";

function Login({ setUser }) {
  const [form, setForm] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPass, setShowPass] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("http://127.0.0.1:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.success) {
        setUser(form.username);
      } else {
        setError(data.message || "Invalid credentials");
      }
    } catch {
      setError("Cannot connect to server. Is Flask running?");
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleLogin} style={styles.form}>
      <div style={styles.field}>
        <label style={styles.label}>Username</label>
        <div style={styles.inputWrap}>
          <span style={styles.inputIcon}>👤</span>
          <input
            name="username"
            placeholder="Enter your username"
            onChange={handleChange}
            value={form.username}
            style={styles.input}
            autoComplete="username"
          />
        </div>
      </div>

      <div style={styles.field}>
        <label style={styles.label}>Password</label>
        <div style={styles.inputWrap}>
          <span style={styles.inputIcon}>🔒</span>
          <input
            type={showPass ? "text" : "password"}
            name="password"
            placeholder="Enter your password"
            onChange={handleChange}
            value={form.password}
            style={{ ...styles.input, paddingRight: '44px' }}
            autoComplete="current-password"
          />
          <button type="button" onClick={() => setShowPass(!showPass)} style={styles.eyeBtn}>
            {showPass ? "🙈" : "👁"}
          </button>
        </div>
      </div>

      {error && <div style={styles.error}>{error}</div>}

      <button type="submit" style={styles.submitBtn} disabled={loading}>
        {loading ? (
          <span style={styles.spinner}>⟳ Authenticating...</span>
        ) : (
          "Sign In →"
        )}
      </button>
    </form>
  );
}

const styles = {
  form: { display: 'flex', flexDirection: 'column', gap: '18px' },
  field: { display: 'flex', flexDirection: 'column', gap: '7px' },
  label: { fontSize: '12px', fontWeight: 600, color: '#94a3b8', letterSpacing: '0.8px', textTransform: 'uppercase' },
  inputWrap: { position: 'relative', display: 'flex', alignItems: 'center' },
  inputIcon: { position: 'absolute', left: '14px', fontSize: '15px', pointerEvents: 'none', opacity: 0.6 },
  input: {
    width: '100%',
    padding: '12px 14px 12px 42px',
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(56,189,248,0.15)',
    borderRadius: '10px',
    color: '#e2e8f0',
    fontSize: '14px',
    fontFamily: 'DM Sans, sans-serif',
    outline: 'none',
    transition: 'border-color 0.2s',
  },
  eyeBtn: {
    position: 'absolute',
    right: '12px',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    fontSize: '16px',
    opacity: 0.5,
    padding: '4px',
  },
  error: {
    background: 'rgba(248,113,113,0.1)',
    border: '1px solid rgba(248,113,113,0.25)',
    borderRadius: '8px',
    padding: '10px 14px',
    color: '#f87171',
    fontSize: '13px',
  },
  submitBtn: {
    padding: '14px',
    background: 'linear-gradient(135deg, #38bdf8, #818cf8)',
    border: 'none',
    borderRadius: '12px',
    color: '#080b14',
    fontSize: '15px',
    fontWeight: 700,
    fontFamily: 'Syne, sans-serif',
    cursor: 'pointer',
    marginTop: '6px',
    transition: 'opacity 0.2s',
    letterSpacing: '0.5px',
  },
  spinner: { display: 'inline-block', animation: 'spin 1s linear infinite' },
};

export default Login;
