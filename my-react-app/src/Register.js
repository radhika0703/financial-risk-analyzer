import React, { useState } from "react";

function Register({ onSuccess }) {
  const [form, setForm] = useState({ username: "", password: "", confirm: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirm) {
      setError("Passwords do not match");
      return;
    }
    if (form.password.length < 4) {
      setError("Password must be at least 4 characters");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("http://127.0.0.1:5000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: form.username, password: form.password }),
      });
      const data = await res.json();
      if (data.success) {
        setSuccess("Account created! Redirecting to login...");
        setTimeout(() => onSuccess && onSuccess(), 1800);
      } else {
        setError(data.message || "Registration failed");
      }
    } catch {
      setError("Cannot connect to server. Is Flask running?");
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleRegister} style={styles.form}>
      <div style={styles.field}>
        <label style={styles.label}>Username</label>
        <div style={styles.inputWrap}>
          <span style={styles.inputIcon}>👤</span>
          <input
            name="username"
            placeholder="Choose a username"
            onChange={handleChange}
            value={form.username}
            style={styles.input}
            required
          />
        </div>
      </div>

      <div style={styles.field}>
        <label style={styles.label}>Password</label>
        <div style={styles.inputWrap}>
          <span style={styles.inputIcon}>🔒</span>
          <input
            type="password"
            name="password"
            placeholder="Create a password"
            onChange={handleChange}
            value={form.password}
            style={styles.input}
            required
          />
        </div>
      </div>

      <div style={styles.field}>
        <label style={styles.label}>Confirm Password</label>
        <div style={styles.inputWrap}>
          <span style={styles.inputIcon}>✅</span>
          <input
            type="password"
            name="confirm"
            placeholder="Repeat your password"
            onChange={handleChange}
            value={form.confirm}
            style={styles.input}
            required
          />
        </div>
      </div>

      {error && <div style={styles.error}>{error}</div>}
      {success && <div style={styles.successMsg}>{success}</div>}

      <button type="submit" style={styles.submitBtn} disabled={loading}>
        {loading ? "Creating Account..." : "Create Account →"}
      </button>
    </form>
  );
}

const styles = {
  form: { display: 'flex', flexDirection: 'column', gap: '16px' },
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
  },
  error: {
    background: 'rgba(248,113,113,0.1)',
    border: '1px solid rgba(248,113,113,0.25)',
    borderRadius: '8px',
    padding: '10px 14px',
    color: '#f87171',
    fontSize: '13px',
  },
  successMsg: {
    background: 'rgba(52,211,153,0.1)',
    border: '1px solid rgba(52,211,153,0.25)',
    borderRadius: '8px',
    padding: '10px 14px',
    color: '#34d399',
    fontSize: '13px',
  },
  submitBtn: {
    padding: '14px',
    background: 'linear-gradient(135deg, #34d399, #38bdf8)',
    border: 'none',
    borderRadius: '12px',
    color: '#080b14',
    fontSize: '15px',
    fontWeight: 700,
    fontFamily: 'Syne, sans-serif',
    cursor: 'pointer',
    marginTop: '4px',
    letterSpacing: '0.5px',
  },
};

export default Register;

