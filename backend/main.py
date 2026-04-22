from fastapi import FastAPI, UploadFile, File
import pandas as pd
import joblib
import os
import io

# =========================
# INIT APP
# =========================
app = FastAPI()

# =========================
# LOAD MODEL SAFELY
# =========================
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# ✅ FIXED: safer absolute path handling
model_path = os.path.join(BASE_DIR, "risk_model.pkl")

model = None

try:
    if os.path.exists(model_path):
        model = joblib.load(model_path)
        print("✅ Model loaded successfully from:", model_path)
    else:
        print("❌ Model not found at:", model_path)
except Exception as e:
    print("❌ Error loading model:", str(e))

# =========================
# HOME ROUTE
# =========================
@app.get("/")
def home():
    return {
        "message": "API is working 🚀",
        "model_loaded": model is not None
    }

# =========================
# PREDICTION ROUTE
# =========================
@app.post("/predict")
async def predict(file: UploadFile = File(...)):

    if model is None:
        return {"error": "ML model is not loaded. Please check server setup."}

    try:
        contents = await file.read()
        df = pd.read_csv(io.BytesIO(contents))

        required_cols = [
            'TransactionAmount',
            'AccountBalance',
            'TransactionDuration',
            'LoginAttempts'
        ]

        missing = [col for col in required_cols if col not in df.columns]
        if missing:
            return {"error": f"Missing columns: {missing}"}

        X = df[required_cols]

        predictions = model.predict(X)

        df['Risk_Prediction'] = predictions

        return {
            "status": "success",
            "summary": {
                "total_records": len(df),
                "risk_detected": int((predictions == 1).sum()),
                "safe_transactions": int((predictions == 0).sum())
            },
            "sample_output": df.head(5).to_dict(orient="records")
        }

    except Exception as e:
        return {"error": str(e)}