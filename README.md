# Agentic AI Task Completion Bot

A semi-agentic task planner that takes natural language inputs and breaks them into structured, actionable subtasks — enriched with real-time calendar context and powered by a local LLM using Ollama.

---

## Features

- Accepts free-form input like “Plan my week” or “Organize a college fest”
- Uses LangChain + Ollama (LLaMA 3) to extract subtasks from contextual prompts
- Integrates Google Calendar to avoid conflicts with existing events
- Stores results using local JSON and frontend localStorage
- Subtasks come with titles, descriptions, and smart formatting

---

## Project Structure

```

agentic-ai-task-bot/
│
├── frontend/              # React app (Vite + Tailwind)
│   ├── src/
│   ├── public/
│   └── ...
│
├── backend/               # FastAPI app
│   ├── main.py            # Core API endpoint
│   ├── agents/            # TaskClassifier, SubtaskGenerator, CalendarAgent
│   ├── utils/             # Prompt builder, memory storage
│   └── ...
│
└── README.md

````

---

## Getting Started

### Prerequisites

- Python 3.11+
- Node.js 18+
- [Ollama](https://ollama.com) with `llama3` pulled locally
- Google Calendar API credentials (OAuth2)

---

### Backend Setup (FastAPI)

```bash
cd backend
python -m venv venv
source venv/bin/activate  # or .\venv\Scripts\activate on Windows
pip install -r requirements.txt
uvicorn main:app --reload
````

Ensure `ollama serve` is running in the background, and `llama3` is available.

---

### Frontend Setup (React)

```bash
cd frontend
npm install
npm run dev
```

Make sure the FastAPI backend is running at `http://localhost:8000`.

---

## API

### `POST /plan`

**Request Body:**

```json
{
  "task": "Plan my monthly schedule"
}
```

**Sample Response:**

```json
{
  "success": true,
  "subtasks": [
    {
      "id": "1",
      "title": "Set goals",
      "description": "Set goals for personal or professional aspects of life..."
    },
    
  ]
}
```

---

## Google Calendar Setup

Enable Google Calendar API and create OAuth2 credentials. Update the `CalendarAgent` in `backend/agents/CalenderRequiredAgent.py` to authenticate with your account and fetch event data.

---

## Tech Stack

* **Frontend**: React + Vite + Tailwind CSS
* **Backend**: FastAPI + LangChain + Ollama
* **LLM**: LLaMA 3 (local, via Ollama)
* **Calendar Integration**: Google Calendar API
* **Storage**: JSON file (backend) + LocalStorage (frontend)

---

## Future Improvements

* User login and session support
* Inline editing and reordering of subtasks
* Model selector (e.g., llama3, mistral, etc.)
* Smart scheduling with time estimates

