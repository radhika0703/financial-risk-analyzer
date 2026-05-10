import React, { useState } from "react";

function RiskForm() {
  const [formData, setFormData] = useState({
    income: "",
    loan: "",
    credit_score: ""
  });

  const [result, setResult] = useState(null);

  // handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // send data to Flask
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      setResult(data);

    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Financial Risk Analyzer</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="number"
          name="income"
          placeholder="Income"
          onChange={handleChange}
        />
        <br /><br />

        <input
          type="number"
          name="loan"
          placeholder="Loan Amount"
          onChange={handleChange}
        />
        <br /><br />

        <input
          type="number"
          name="credit_score"
          placeholder="Credit Score"
          onChange={handleChange}
        />
        <br /><br />

        <button type="submit">Predict Risk</button>
      </form>

      {/* SHOW RESULT */}
      {result && (
        <div style={{ marginTop: "20px" }}>
          <h3>Result:</h3>
          <p><b>Prediction:</b> {result.prediction}</p>
          <p><b>Probability:</b> {result.probability}</p>
        </div>
      )}
    </div>
  );
}

export default RiskForm;