# AI Quiz Grader

A fullstack AI-powered assignment grading platform. Instructors create questions with rubrics, students submit answers, and AI instantly grades them with a score, detailed feedback, strengths and improvements.

---

## Live Demo

- **Frontend**: https://ai-quizgrader.vercel.app
- **Backend**: Coming soon (Render)

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Backend | Python, FastAPI, SQLModel |
| Database | PostgreSQL |
| Frontend | React, TypeScript, TailwindCSS |
| AI | OpenRouter API (LLM grading) |
| DevOps | Docker, GitHub |

---

## Features

- Instructors create questions with detailed grading rubrics
- Students submit answers through a clean UI
- AI grades answers instantly with a score out of 10, constructive feedback, strengths, and areas to improve
- Instructor dashboard shows all submissions with scores

---

## Project Structure

```
ai-quiz-grader/
├── backend/
│   ├── main.py              # FastAPI app entry point
│   ├── models.py            # Database models
│   ├── database.py          # Database connection
│   ├── grader.py            # AI grading logic
│   ├── routes/
│   │   ├── questions.py     # Question endpoints
│   │   └── submissions.py   # Submission endpoints
│   ├── tests.py             # Pytest tests
│   └── requirements.txt     # Python dependencies
├── frontend/
│   ├── src/
│   │   ├── api/index.ts     # API calls and TypeScript types
│   │   ├── pages/
│   │   │   ├── StudentPage.tsx
│   │   │   ├── DashboardPage.tsx
│   │   │   └── CreateQuestionPage.tsx
│   │   └── App.tsx
│   └── package.json
└── docker-compose.yml       # PostgreSQL setup
```

---

## Prerequisites

Make sure you have these installed:

- [Python 3.11+](https://www.python.org/downloads/)
- [Node.js 18+](https://nodejs.org/)
- [Docker Desktop](https://www.docker.com/products/docker-desktop/)
- [Git](https://git-scm.com/)
- An [OpenRouter API key](https://openrouter.ai) (free)

---

## Running Locally

### 1. Clone the repository

```bash
git clone https://github.com/Parvamehta123-creator/AI_quizgrader.git
cd AI_quizgrader
```

### 2. Start the database

```bash
docker-compose up -d
```

### 3. Set up the backend

```bash
cd backend
python -m venv venv

# Mac/Linux
source venv/bin/activate

# Windows
venv\Scripts\Activate.ps1

pip install -r requirements.txt
```

### 4. Add environment variables

Create a `.env` file inside the `backend/` folder:

```
OPENROUTER_API_KEY=your_openrouter_api_key_here
DATABASE_URL=postgresql://postgres:password@localhost:5432/quizgrader
```

Get your free OpenRouter API key at: https://openrouter.ai

### 5. Start the backend server

```bash
python -m uvicorn main:app --reload
```

Backend runs at `http://127.0.0.1:8000` and interactive API docs at `http://127.0.0.1:8000/docs`

### 6. Set up the frontend

Open a new terminal:

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at `http://localhost:5173`

---

## Running Tests

```bash
cd backend
python -m pytest tests.py -v
```

---

## API Reference

### Questions

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/questions/` | Create a question |
| GET | `/questions/` | List all questions |
| GET | `/questions/{id}` | Get a question |

### Submissions

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/submissions/` | Submit an answer (triggers AI grading) |
| GET | `/submissions/` | List all submissions |
| GET | `/submissions/{id}` | Get a submission |

---

## How AI Grading Works

When a student submits an answer, the backend fetches the question and rubric from the database, builds a structured prompt, and sends it to an LLM via the OpenRouter API. The model returns a JSON response with the score, feedback, strengths and improvements. The result is saved to PostgreSQL and returned to the frontend.

---

## AI Workflow

This project was built with AI assistance. Here's specifically how:

- Used Claude to scaffold the initial FastAPI route structure and SQLModel schema
- Manually wrote the grading prompt in `grader.py` — this is core product logic that requires careful judgment about how rubrics are interpreted
- Reviewed all AI-generated TypeScript and replaced any `any` types with proper typed interfaces
- Wrote all pytest tests by hand — the mocking strategy requires understanding of how the system fits together
- General approach: AI for boilerplate, manual judgment for anything touching business logic

---

## Deployment

- Frontend: Vercel
- Backend: Render
- Database: Render PostgreSQL

For production this would run on GCP Cloud Run to align with standard infrastructure patterns.


