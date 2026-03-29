# MediSense

## Backend (Python / FastAPI)

### Run locally (Windows PowerShell)

```bash
cd explainable-med/backend
python -m venv .venv
.venv\Scripts\Activate.ps1
pip install -r requirements.txt
python run.py
```

- **API docs**: `http://127.0.0.1:8000/docs`
- **Health**: `GET http://127.0.0.1:8000/health`
- **Predict**: `POST http://127.0.0.1:8000/api/predict`
- **Explanation**: `GET http://127.0.0.1:8000/api/explanations/{id}`

### Environment variables

Copy `backend/.env.example` to `backend/.env` and adjust as needed.