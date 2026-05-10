import numpy as np
import pandas as pd
from sklearn.ensemble import RandomForestClassifier
import pickle

# Simple clean dataset
data = {
    "income": [80000, 50000, 30000, 120000, 45000, 90000, 20000, 150000],
    "loan": [10000, 20000, 100000, 15000, 50000, 10000, 120000, 20000],
    "credit_score": [780, 650, 500, 800, 600, 770, 450, 820],
    "risk": [0, 0, 1, 0, 1, 0, 1, 0]
}

df = pd.DataFrame(data)

X = df[["income", "loan", "credit_score"]]
y = df["risk"]

model = RandomForestClassifier()
model.fit(X, y)

# Save model safely
with open("risk_model.pkl", "wb") as f:
    pickle.dump(model, f)

print("Model trained successfully!")