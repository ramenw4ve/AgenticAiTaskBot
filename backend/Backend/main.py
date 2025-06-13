import sys
import os

from fastapi import FastAPI
from pydantic import BaseModel

# Add project root to sys.path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from Agent_AI_phoQtech.agents.task_classifier import TaskClassifier
from Agent_AI_phoQtech.agents.CalenderRequiredAgent import CalendarAgent
from Agent_AI_phoQtech.agents.subtask_generator import SubtaskGenerator
from Agent_AI_phoQtech.utils.prompt_builder import build_prompt
from Agent_AI_phoQtech.utils.json_storage import save_to_memory, load_from_memory

from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Or replace with your frontend URL like ["http://localhost:3000"]
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class TaskRequest(BaseModel):
    task: str

task_classifier = TaskClassifier()
calendar_agent = CalendarAgent()
subtask_generator = SubtaskGenerator()



@app.post("/plan")
async def process_task(request: TaskRequest):
    task = request.task

    needs_calendar = task_classifier.needs_calendar(task)
    calendar_events = calendar_agent.get_events() if needs_calendar else None
    prompt = build_prompt(task, calendar_events)
    subtasks = subtask_generator.get_subtasks(prompt)

    # Transform plain subtasks list (strings) into structured list of dicts
    structured_subtasks = []
    i = 1
    for idx, subtask in enumerate(subtasks, start=1):
        clean_text = subtask.lstrip("* ").strip()  # remove leading "* " if any
        # For title, pick the first sentence or up to 50 chars
        # title = clean_text.split('.')[0][:50].strip()
        title = f"Task: {i}"
        i+=1
        structured_subtasks.append({
            "id": str(idx),
            "title": title,
            "description": clean_text
        })

    # Optionally save to memory (you can keep this)
    memory_data = load_from_memory()
    memory_data[task] = structured_subtasks
    save_to_memory(memory_data)

    return {
        "success": True,
        "subtasks": structured_subtasks
    }