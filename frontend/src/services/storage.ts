import { Task } from '../types';

const STORAGE_KEY = 'taskbreak_tasks';

export const saveTask = (task: Task): void => {
  const savedTasks = getTasks();
  const taskIndex = savedTasks.findIndex(t => t.id === task.id);
  
  if (taskIndex >= 0) {
    savedTasks[taskIndex] = task;
  } else {
    savedTasks.push(task);
  }
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(savedTasks));
};

export const getTasks = (): Task[] => {
  const tasksJson = localStorage.getItem(STORAGE_KEY);
  if (!tasksJson) return [];
  
  try {
    return JSON.parse(tasksJson);
  } catch (error) {
    console.error('Failed to parse tasks from localStorage:', error);
    return [];
  }
};

export const getLatestTask = (): Task | null => {
  const tasks = getTasks();
  if (tasks.length === 0) return null;
  
  // Sort by createdAt in descending order and get the first one
  return tasks.sort((a, b) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  )[0];
};

export const updateSubtaskCompletion = (
  taskId: string, 
  subtaskId: string, 
  completed: boolean
): void => {
  const savedTasks = getTasks();
  const taskIndex = savedTasks.findIndex(t => t.id === taskId);
  
  if (taskIndex >= 0) {
    const task = savedTasks[taskIndex];
    const subtaskIndex = task.subtasks.findIndex(st => st.id === subtaskId);
    
    if (subtaskIndex >= 0) {
      task.subtasks[subtaskIndex].completed = completed;
      savedTasks[taskIndex] = task;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(savedTasks));
    }
  }
};