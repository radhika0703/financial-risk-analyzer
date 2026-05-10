import React, { useState } from "react";

function RiskForm({ setResult }) {
  const [formData, setFormData] = useState({
    name: "",
    income: "",
    loan: "",
    credit_score: ""
  });

  const [loading, setLoading] = useState(false);

  // Handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Submit data to Flask API
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          income: Number(formData.income),
          loan: Number(formData.loan),
          credit_score: Number(formData.credit_score)
        })
      });

      const data = await response.json();

      setResult(data); // send to dashboard

    } catch (error) {
      alert("Server not responding. Check Flask backend.");
    }

    setLoading(false);
  };

  return (
    <div style={styles.container}>
      <h2>Financial Risk Analyzer</h2>

      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          onChange={handleChange}
          style={styles.input}
        />

        <input
          type="number"
          name="income"
          placeholder="Income"
          onChange={handleChange}
          required
          style={styles.input}
        />

        <input
          type="number"
          name="loan"
          placeholder="Loan Amount"
          onChange={handleChange}
          required
          style={styles.input}
        />

        <input
          type="number"
          name="credit_score"
          placeholder="Credit Score"
          onChange={handleChange}
          required
          style={styles.input}
        />

        <button type="submit" style={styles.button}>
          {loading ? "Predicting..." : "Predict Risk"}
        </button>
      </form>
    </div>
  );
}

const styles = {
  container: {
    textAlign: "center",
    marginTop: "20px"
  },
  form: {
    display: "flex",
    flexDirection: "column",
    width: "250px",
    margin: "auto"
  },
  input: {
    margin: "8px 0",
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc"
  },
  button: {
    padding: "10px",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer"
  }
};

export default RiskForm;