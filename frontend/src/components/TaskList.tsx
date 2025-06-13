import React from 'react';
import { Subtask } from '../types';
import SubtaskItem from './SubtaskItem';

interface TaskListProps {
  prompt: string;
  subtasks: Subtask[];
  onToggleComplete: (id: string, completed: boolean) => void;
}

const TaskList: React.FC<TaskListProps> = ({ prompt, subtasks, onToggleComplete }) => {
  const completedCount = subtasks.filter(subtask => subtask.completed).length;
  const progressPercentage = Math.round((completedCount / subtasks.length) * 100);

  return (
    <div className="w-full max-w-xl mx-auto bg-white rounded-lg shadow-medium overflow-hidden animate-fade-in">
      <div className="px-6 py-5 border-b border-neutral-100">
        <h2 className="font-semibold text-lg text-neutral-800">{prompt}</h2>
        <div className="mt-2 flex items-center">
          <div className="flex-1 bg-neutral-100 h-2 rounded-full overflow-hidden">
            <div 
              className="bg-primary-500 h-full rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
          <span className="ml-3 text-sm text-neutral-600">
            {completedCount} of {subtasks.length}
          </span>
        </div>
      </div>
      <div className="divide-y divide-neutral-100">
        {subtasks.length === 0 ? (
          <div className="p-6 text-center text-neutral-500">
            No tasks available
          </div>
        ) : (
          subtasks.map(subtask => (
            <SubtaskItem
              key={subtask.id}
              subtask={subtask}
              onToggleComplete={onToggleComplete}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default TaskList;