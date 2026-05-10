from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import numpy as np
import os
import json

app = Flask(__name__)
CORS(app)

# --------------------------
# LOAD MODEL SAFELY
# --------------------------
model = pickle.load(open("risk_model.pkl", "rb"))

# --------------------------
# SIMPLE FILE STORAGE (NO MYSQL FOR NOW)
# --------------------------
USER_FILE = "users.json"

def load_users():
    if os.path.exists(USER_FILE):
        with open(USER_FILE, "r") as f:
            return json.load(f)
    return []

def save_users(users):
    with open(USER_FILE, "w") as f:
        json.dump(users, f)

users = load_users()

# --------------------------
# REGISTER
# --------------------------
@app.route('/register', methods=['POST'])
def register():
    data = request.json

    # check duplicate user
    for u in users:
        if u["username"] == data["username"]:
            return jsonify({"success": False, "message": "User already exists"})

    users.append(data)
    save_users(users)

    return jsonify({"success": True, "message": "User registered successfully"})

# --------------------------
# LOGIN
# --------------------------
@app.route('/login', methods=['POST'])
def login():
    data = request.json

    username = data.get("username", "").strip()
    password = data.get("password", "").strip()

    for u in users:
        if u["username"].strip() == username and u["password"].strip() == password:
            return jsonify({"success": True, "message": "Login successful"})

    return jsonify({"success": False, "message": "Invalid credentials"})

# --------------------------
# PREDICT RISK
# --------------------------
@app.route('/predict', methods=['POST'])
def predict():
    data = request.json

    income = float(data['income'])
    loan = float(data['loan'])
    credit_score = int(data['credit_score'])

    input_data = np.array([[income, loan, credit_score]])

    prediction = model.predict(input_data)[0]
    probability = model.predict_proba(input_data)[0][1]

    result = "HIGH RISK" if prediction == 1 else "LOW RISK"

    return jsonify({
        "prediction": result,
        "probability": float(probability)
    })

# --------------------------
# RUN APP
# --------------------------
if __name__ == "__main__":
    app.run(debug=True)