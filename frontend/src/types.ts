export interface Subtask {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
}

export interface Task {
  id: string;
  prompt: string;
  subtasks: Subtask[];
  createdAt: string;
}