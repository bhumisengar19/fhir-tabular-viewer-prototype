# 🚀 FHIR Tabular Viewer Prototype

A full-stack prototype built for **GSoC 2026** to simplify exploration of complex FHIR healthcare data by transforming deeply nested resources into an intuitive and searchable tabular format.

---

## 🧠 Overview

FHIR (Fast Healthcare Interoperability Resources) data is inherently complex, with deeply nested structures and interlinked resources. This makes direct exploration difficult for researchers, clinicians, and developers.

This prototype demonstrates how FHIR data can be:

* Extracted from real-world APIs
* Flattened into a structured format
* Presented in a clean, interactive table

The goal is to improve **data accessibility, usability, and exploration efficiency**.

---

## ✨ Key Features

* 🔗 **Live FHIR Data Integration**
  Fetches real-time patient data from public FHIR API
  (`https://hapi.fhir.org/baseR4/Patient`)

* 🧩 **Data Flattening Engine**
  Converts nested JSON into tabular format for easier analysis

* ⚡ **FastAPI Backend**
  Handles data fetching, processing, and API exposure

* 🎨 **Modern React Frontend**
  Clean UI with:

  * Readable table layout
  * Hover effects
  * Color-coded gender tags

* 🌐 **CORS Enabled**
  Enables seamless communication between frontend and backend

---

## 🏗️ Architecture

```
FHIR API (HAPI Server)
        ↓
FastAPI Backend (Python)
        ↓
Data Processing & Flattening
        ↓
React Frontend
        ↓
Interactive Table View
```

---

## 📸 Demo

<img src="https://github.com/user-attachments/assets/859696f2-0de8-4893-90e1-53c4aee6d26b" width="600"/>

> Displays patient ID, name, and gender using live FHIR data
---

## 🛠️ Tech Stack

| Layer       | Technology         |
| ----------- | ------------------ |
| Backend     | FastAPI (Python)   |
| Frontend    | React (JavaScript) |
| API Source  | HAPI FHIR (R4)     |
| HTTP Client | Requests / Axios   |

---

## ⚙️ Installation & Setup

### 1️⃣ Clone Repository

```bash
git clone https://github.com/bhumisengar19/fhir-tabular-viewer-prototype.git
cd fhir-tabular-viewer-prototype
```

---

### 2️⃣ Run Backend

```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```

Backend runs on:

```
http://127.0.0.1:8000
```

---

### 3️⃣ Run Frontend

```bash
cd frontend
npm install
npm start
```

Frontend runs on:

```
http://localhost:3000
```

---

## 🔍 API Endpoint

| Endpoint    | Description                    |
| ----------- | ------------------------------ |
| `/patients` | Returns flattened patient data |

---

## 📊 Example Output

```json
[
  {
    "id": "90242074",
    "name": "John",
    "gender": "male"
  }
]
```

---

## ⚠️ Current Limitations

* ❌ No reference resolution
  (e.g., linking Patient → Observation)

* ❌ Limited pagination handling
  (does not fetch all pages dynamically)

* ❌ Basic flattening logic
  (does not fully support deeply nested arrays)

---

## 🚀 Future Improvements

* 🔄 Reference resolution with caching
* 📄 Full pagination support using FHIR Bundle links
* 🔍 Advanced filtering and search
* ☁️ Multi-source support (local files, S3)
* 📊 Enhanced UI with sorting and column selection

---

## 🎯 Motivation

Healthcare data is powerful but difficult to explore due to its complexity.
This project aims to bridge that gap by making FHIR data:

* Easier to understand
* Faster to explore
* More accessible for real-world use

---

## 📌 Project Status

* ✅ Working prototype
* 🚧 Actively being enhanced for GSoC 2026

---

## 👩‍💻 Author

**Bhumi Sengar**
Full Stack Developer | Backend & AI Explorer

---

## 💡 Note

This prototype was built as part of preparation for **Google Summer of Code 2026**, focusing on improving FHIR data usability and visualization.

---
