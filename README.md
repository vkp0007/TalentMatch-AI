# 🚀 TalentMatch AI - AI-Powered Resume Intelligence Platform

TalentMatch AI is a full-stack AI-powered Resume Intelligence Platform that helps candidates evaluate, optimize, and improve their resumes against job descriptions using ATS-style analysis, semantic matching, and AI-generated recommendations.

Unlike traditional keyword-based resume checkers, TalentMatch AI leverages Natural Language Processing (NLP), Sentence Transformers, and Large Language Models (LLMs) to provide deeper insights into resume-job fit.

---

## ✨ Features

### 📄 Resume Management

* Upload and manage multiple resumes
* Resume parsing and structured data extraction
* Resume-specific ATS reports
* Analysis history tracking

### 🤖 AI-Powered Resume Analysis

* Job Description (JD) parsing
* Semantic resume-job matching
* ATS score generation
* Skill gap analysis
* Missing skill detection
* Additional skill identification
* AI-powered recommendations

### 📊 ATS Report Dashboard

* Resume-wise analysis reports
* Detailed ATS score breakdown
* Matched skills visualization
* Missing skills insights
* Actionable recommendations

### 🔐 Authentication

* User Registration
* User Login
* JWT Authentication
* Protected Routes
* Persistent Sessions

---

## 🏗️ System Architecture

```text
React Frontend
        │
        ▼
Node.js + Express Backend
        │
        ▼
FastAPI AI Service
        │
 ┌──────┼────────┐
 ▼      ▼        ▼
Resume  JD      Semantic
Parser  Parser  Matching
        │
        ▼
 ATS Scoring Engine
        │
        ▼
Recommendations Engine
        │
        ▼
MongoDB Database
```

---

## 🧠 AI Analysis Pipeline

```text
Resume Upload
      │
      ▼
Resume Text Extraction
      │
      ▼
Structured Resume Parsing
      │
      ▼
Job Description Analysis
      │
      ▼
Embedding Generation
      │
      ▼
Semantic Similarity Matching
      │
      ▼
Skill Gap Analysis
      │
      ▼
ATS Score Calculation
      │
      ▼
AI Recommendations
      │
      ▼
Store Analysis Report
```

---

## 🛠️ Tech Stack

### Frontend

* React.js
* React Router
* Tailwind CSS
* Axios
* Lucide React

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication

### AI Service

* FastAPI
* Sentence Transformers
* Scikit-learn
* PDFPlumber
* PyMuPDF
* Python-Docx
* Groq API

### Database

* MongoDB Atlas

---

## 📂 Project Structure

```text
TalentMatch-AI
│
├── frontend
│   ├── src
│   │   ├── api
│   │   ├── components
│   │   ├── context
│   │   ├── pages
│   │   ├── routes     
│
├── server
│   ├── config
│   ├── controllers
│   ├── routes
│   ├── middlewares
│   ├── models
│   └── services
│
├── ai-service
│   ├── extraction
│   ├── matching
│   ├── utils
│   ├── models
│   ├── ai_routes
│   └── main.py
│   
└── README.md
```

---

## 🎯 ATS Scoring Methodology

The final ATS score is calculated using a weighted combination of:

| Metric              | Weight |
| ------------------- | ------ |
| Semantic Similarity | 60%    |
| Skill Matching      | 40%    |

### Semantic Analysis

Measures how closely the resume content aligns with the job description using Sentence Transformers.

### Skill Matching

Compares:

* Required Skills
* Preferred Skills
* Candidate Skills

using:

* Exact Matching
* Skill Alias Mapping
* Semantic Matching

---

## 🧩 Skill Intelligence Engine

TalentMatch AI normalizes and maps skill aliases to improve ATS accuracy.

Examples:

```text
ReactJS      → React
NodeJS       → Node.js
Frontend     → Front-End Development
NLP          → Natural Language Processing
```

This improves matching quality beyond simple keyword comparisons.

---

## 🚀 Getting Started

### 1. Clone Repository

```bash
git clone https://github.com/your-username/TalentMatch-AI.git

cd TalentMatch-AI
```

---

### 2. Frontend Setup

```bash
cd client

npm install

npm run dev
```

---

### 3. Backend Setup

```bash
cd server

npm install

npm run dev
```

---

### 4. AI Service Setup

```bash
cd ai-service

pip install -r requirements.txt

uvicorn main:app --reload
```

---

## ⚙️ Environment Variables

### Server (.env)

```env
PORT=5000

MONGO_URI=your_mongodb_uri

JWT_SECRET=your_jwt_secret

AI_SERVICE_URL=http://localhost:8000
```

### AI Service (.env)

```env
GROQ_API_KEY=your_groq_api_key
```

---

## 📸 Screenshots

Add screenshots here:

### Dashboard

```text
<img width="1894" height="867" alt="image" src="https://github.com/user-attachments/assets/6480afbf-fb31-4e79-990f-28a94f25fe8f" />

```

### Resume Upload

```text
<img width="1477" height="877" alt="image" src="https://github.com/user-attachments/assets/b716e389-90c2-47ce-9ed4-bdd350de5dca" />

```

### ATS Analysis Report

```text
<img width="1473" height="872" alt="image" src="https://github.com/user-attachments/assets/75387e7e-6dab-420c-98a3-bfd0fb5acaee" />

```

---

## 🔮 Future Enhancements

* Resume Rewrite Assistant
* AI Resume Optimization Suggestions
* Resume Versioning
* PDF Report Export
* Cover Letter Generation
* Job Recommendation Engine
* Resume Comparison
* ATS Score Trend Analysis

---

## 📚 Learning Outcomes

This project demonstrates:

* Full Stack Development (MERN)
* FastAPI Microservices
* Natural Language Processing (NLP)
* Semantic Similarity Analysis
* LLM Integration
* REST API Design
* JWT Authentication
* MongoDB Data Modeling
* AI Product Architecture

---

## 👨‍💻 Author

**Vinay Kumar Patel**

* MERN Stack Developer
* Machine Learning Enthusiast
* B.Tech Student

GitHub: https://github.com/vkp0007

---

⭐ If you found this project interesting, consider giving it a star.
