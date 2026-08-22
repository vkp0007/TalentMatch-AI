# TalentMatch AI

TalentMatch AI is an AI-powered career assistance platform that helps candidates analyze resumes against job descriptions, improve applications, generate application emails, manage drafts, and practice interviews.

## Live Demo

- **Frontend:** https://talent-match-ai.vercel.app/
- **Node.js API:** https://talent-match-ai-server.vercel.app/
- **AI Service:** https://talentmatch-ai-1-aok7.onrender.com/

## Demo Credentials

> Replace these placeholders with a **dedicated demo account** before publishing the README.

- **Email:** `YOUR_DEMO_EMAIL`
- **Password:** `YOUR_DEMO_PASSWORD`

**Security:** Never publish personal credentials, API keys, MongoDB credentials, JWT secrets, or Groq API keys. Use a separate demo account for public testing.

---

## Features

- User authentication
- Resume upload for PDF/DOCX
- AI-powered resume parsing
- Candidate information extraction
- Technical skill and tool extraction
- Experience, project, education, certification, training, and achievement extraction
- Resume/job-description analysis
- Semantic similarity scoring
- Required and preferred skill matching
- Missing and additional skill detection
- Education and experience eligibility analysis
- Application email generation
- AI-powered email refinement
- Saved application email drafts
- AI interview coaching
- Resume-aware interview preparation

---

## Technology Stack

### Frontend

- React
- React Router
- Tailwind CSS
- Axios
- Lucide React
- Vercel

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- Multer
- Axios
- Vercel

### AI Service

- Python
- FastAPI
- Uvicorn
- scikit-learn
- pdfplumber
- PyMuPDF
- python-docx
- Groq API
- python-dotenv
- Render

### AI / NLP

- LLM-based structured resume extraction
- Job-description extraction
- HashingVectorizer
- Cosine similarity
- Skill normalization
- Skill matching
- Eligibility matching
- Weighted scoring

---

## Architecture

```text
                    ┌──────────────────────┐
                    │      React App       │
                    │   Tailwind + Axios   │
                    │        Vercel        │
                    └──────────┬───────────┘
                               │
                               │ REST API
                               ▼
                    ┌──────────────────────┐
                    │   Node.js / Express  │
                    │      Backend API     │
                    │        Vercel        │
                    └───────┬───────┬──────┘
                            │       │
                            │       │ AI requests
                            ▼       ▼
                     ┌──────────┐ ┌────────────────────┐
                     │ MongoDB  │ │   Python AI API    │
                     │          │ │ FastAPI + Render   │
                     └──────────┘ └─────────┬──────────┘
                                            │
                                   ┌────────┴────────┐
                                   ▼                 ▼
                              Groq LLM       ML Matching
                                            HashingVectorizer
```

---

## Repository Structure

```text
TalentMatch-AI/
│
├── client/                         # React frontend
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   │   ├── analysis/
│   │   │   ├── applicationEmail/
│   │   │   ├── drafts/
│   │   │   ├── interview/
│   │   │   ├── resume/
│   │   │   └── common/
│   │   ├── modules/
│   │   │   ├── auth/
│   │   │   ├── dashboard/
│   │   │   ├── analysis/
│   │   │   ├── application-email/
│   │   │   ├── drafts/
│   │   │   ├── interview/
│   │   │   └── resumes/
│   │   ├── hooks/
│   │   ├── layouts/
│   │   ├── services/
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
│
├── server/                         # Node.js / Express API
│   ├── controllers/
│   ├── middlewares/
│   │   ├── auth.middleware.js
│   │   ├── error.middleware.js
│   │   └── upload.middleware.js
│   ├── models/
│   ├── routes/
│   ├── services/
│   │   ├── ai.service.js
│   │   ├── analysis.service.js
│   │   ├── applicationEmail.service.js
│   │   ├── interview.service.js
│   │   └── resume.service.js
│   ├── config/
│   ├── utils/
│   ├── app.js
│   ├── server.js
│   └── package.json
│
├── ai-service/                     # Python FastAPI AI service
│   ├── extraction/
│   │   ├── parser.py
│   │   ├── llm_extractor.py
│   │   ├── jd_extractor.py
│   │   └── prompts.py
│   ├── matching/
│   │   ├── embedding_service.py
│   │   ├── semantic_matcher.py
│   │   ├── skill_matcher.py
│   │   ├── eligibility_matcher.py
│   │   └── scoring.py
│   ├── models/
│   │   └── embedding_model.py
│   ├── routes/
│   │   └── ai_routes.py
│   ├── llm/
│   │   └── client.py
│   ├── utils/
│   │   ├── json_cleaner.py
│   │   └── skill_normalizer.py
│   ├── main.py
│   └── requirements.txt
│
└── README.md
```

---

## Main Modules

### Authentication

JWT-based registration, login, protected routes, and authenticated user workflows.

### Resume Management

Users can upload resumes, specify a target role, view extracted information, and delete resumes.

The AI service extracts:

- Candidate information
- Technical skills
- Tools
- Experience
- Projects
- Education
- Certifications
- Training
- Achievements
- Candidate summary

### Job Analysis

The selected resume is compared against a job description.

The analysis provides:

- Semantic score
- Skill score
- Matched skills
- Missing skills
- Additional skills
- Matched required skills
- Matched preferred skills
- Missing required skills
- Missing preferred skills
- Education match
- Experience match
- Eligibility warnings
- Final score

### Application Email

Generates application emails and allows users to refine them with natural-language instructions.

### Drafts

Users can save and manage generated application emails.

### Interview Coach

AI-powered interview practice supporting:

- Technical questions
- Project discussions
- HR preparation
- Mock interviews
- Resume-based coaching

---

## API Endpoints

### Node.js API

Base URL:

```text
https://talent-match-ai-server.vercel.app
```

Common endpoints:

```text
POST   /api/auth/register
POST   /api/auth/login

GET    /api/resume
POST   /api/resume
GET    /api/resume/:resumeId
DELETE /api/resume/:resumeId

POST   /api/analysis

POST   /api/application-email
GET    /api/application-email
GET    /api/application-email/:id
DELETE /api/application-email/:id

POST   /api/interview-chat
```

### AI Service

Base URL:

```text
https://talentmatch-ai-1-aok7.onrender.com
```

Health check:

```text
GET /
```

Expected response:

```json
{
  "status": "ok",
  "service": "TalentMatch AI Service"
}
```

AI endpoints:

```text
POST /api/ai/extract-resume
POST /api/ai/analyze-job
```

---

## Resume Processing Flow

```text
PDF / DOCX
    │
    ▼
React Frontend
    │
    ▼
Node.js API
    │
    ▼
FastAPI AI Service
    │
    ├── PDF/DOCX text extraction
    ├── Groq LLM structured extraction
    └── 384-dimensional HashingVectorizer
    │
    ▼
Node.js API
    │
    ▼
MongoDB
    │
    ▼
Frontend
```

---

## Job Analysis Flow

```text
Saved Resume
     │
     ├── Structured Resume Data
     └── Resume Embedding
              │
              ▼
       Job Description
              │
              ▼
        JD Extraction
              │
      ┌───────┼────────┐
      ▼       ▼        ▼
 Semantic   Skill   Eligibility
 Matching  Matching   Matching
      │       │        │
      └───────┼────────┘
              ▼
        Final Score
              │
              ▼
         Node.js API
              │
              ▼
           Frontend
```

---

## Environment Variables

### Frontend

```env
VITE_API_URL=https://talent-match-ai-server.vercel.app
```

### Node.js Server

```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
AI_SERVICE_URL=https://talentmatch-ai-1-aok7.onrender.com/api/ai
CLIENT_URL=your_frontend_url
```

### AI Service

```env
GROQ_API_KEY=your_groq_api_key
```

Never commit `.env` files.

---

## Local Development

### Frontend

```bash
cd client
npm install
npm run dev
```

### Node.js Backend

```bash
cd server
npm install
npm run dev
```

### AI Service

```bash
cd ai-service

python -m venv venv
```

Windows:

```bash
venv\Scriptsctivate
```

Linux/macOS:

```bash
source venv/bin/activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Run:

```bash
uvicorn main:app --reload
```

---

## Deployment

| Component | Platform | URL |
|---|---|---|
| Frontend | Vercel | https://talent-match-ai.vercel.app/ |
| Node.js API | Vercel | https://talent-match-ai-server.vercel.app/ |
| AI Service | Render | https://talentmatch-ai-1-aok7.onrender.com/ |
| Database | MongoDB | Private |

The Node.js server communicates with the AI service using:

```env
AI_SERVICE_URL=https://talentmatch-ai-1-aok7.onrender.com/api/ai
```

---

## Performance / Deployment Decision

The AI service originally used SentenceTransformer/PyTorch embeddings. This caused the Render service to exceed its 512 MiB memory limit.

The current lightweight implementation uses:

```text
HashingVectorizer
+
Cosine Similarity
```

This removes the heavy PyTorch/SentenceTransformer runtime and makes the AI service suitable for the current deployment environment.

---

## Security

For a public repository:

- Use a dedicated demo account.
- Never commit `.env`.
- Never publish Groq API keys.
- Never publish MongoDB credentials.
- Never publish JWT secrets.
- Do not use personal production credentials in the README.
- Avoid uploading sensitive personal resumes to the public demo account.

---

## Future Improvements

- Persistent cloud resume storage
- More advanced semantic embeddings
- Improved JD extraction
- Resume versioning
- Application tracking
- Interview performance analytics
- Job-board integrations
- Email sending integration
- Advanced ATS recommendations
- Recruiter-facing features

---

## Author

TalentMatch AI is a full-stack AI career assistance platform combining React, Node.js, MongoDB, FastAPI, LLMs, NLP, and machine-learning-based job matching.
