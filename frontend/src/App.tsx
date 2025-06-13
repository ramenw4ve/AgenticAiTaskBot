import React, { useState, useEffect } from 'react';
import { Sparkles } from 'lucide-react';
import TaskPrompt from './components/TaskPrompt';
import TaskList from './components/TaskList';
import EmptyState from './components/EmptyState';
import { fetchSubtasks } from './services/api';
import { saveTask, getLatestTask, updateSubtaskCompletion } from './services/storage';
import { Task, Subtask } from './types';
import './index.css';

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [currentTask, setCurrentTask] = useState<Task | null>(null);

  // Load the most recent task on initial render
  useEffect(() => {
    const latestTask = getLatestTask();
    if (latestTask) {
      setCurrentTask(latestTask);
    }
  }, []);

  const handlePromptSubmit = async (prompt: string) => {
    setIsLoading(true);
    try {
      const subtasks = await fetchSubtasks(prompt);
      
      // Create a new task with the prompt and subtasks
      const newTask: Task = {
        id: Date.now().toString(),
        prompt,
        subtasks,
        createdAt: new Date().toISOString()
      };
      
      // Save to localStorage
      saveTask(newTask);
      setCurrentTask(newTask);
    } catch (error) {
      console.error('Error fetching subtasks:', error);
      // Could add error handling UI here
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleComplete = (subtaskId: string, completed: boolean) => {
    if (!currentTask) return;
    
    // Update state
    const updatedTask = {
      ...currentTask,
      subtasks: currentTask.subtasks.map(subtask => 
        subtask.id === subtaskId ? { ...subtask, completed } : subtask
      )
    };
    setCurrentTask(updatedTask);
    
    // Persist to localStorage
    updateSubtaskCompletion(currentTask.id, subtaskId, completed);
  };

  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col items-center justify-start pt-10 sm:pt-20 px-4 pb-20">
      <header className="mb-8 text-center">
        <div className="flex items-center justify-center mb-2">
          <Sparkles className="text-primary-500 mr-2" size={24} />
          <h1 className="text-2xl font-semibold text-neutral-800">TaskBreak</h1>
        </div>
        <p className="text-neutral-600 max-w-md">
          Transform complex tasks into simple, actionable steps
        </p>
      </header>

      <TaskPrompt onSubmit={handlePromptSubmit} isLoading={isLoading} />

      {isLoading ? (
        <div className="w-full max-w-xl mx-auto bg-white rounded-lg shadow-medium p-8 animate-pulse-once">
          <div className="h-6 bg-neutral-100 rounded w-3/4 mb-4"></div>
          <div className="h-4 bg-neutral-100 rounded w-full mb-6"></div>
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="mb-4">
              <div className="h-5 bg-neutral-100 rounded w-5/6 mb-2"></div>
              <div className="h-4 bg-neutral-100 rounded w-3/4"></div>
            </div>
          ))}
        </div>
      ) : currentTask ? (
        <TaskList 
          prompt={currentTask.prompt} 
          subtasks={currentTask.subtasks} 
          onToggleComplete={handleToggleComplete}
        />
      ) : (
        <EmptyState />
      )}
    </div>
  );
}

export default App;