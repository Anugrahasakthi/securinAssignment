# Securin Assignment

This project consists of:
- **Backend (Flask API)** → `/securin-assignment`
- **Frontend (React UI)** → `/recipe-frontend`

---

## Backend Setup (Flask)

```bash
cd securin-assignment
python -m venv venv
.\venv\Scripts\activate
pip install -r requirements.txt
python load_data.py     # loads JSON into DB
python app.py           # runs API on http://127.0.0.1:5000
