import React from 'react';
import { Subtask } from '../types';
import { Check, Circle } from 'lucide-react';

interface SubtaskItemProps {
  subtask: Subtask;
  onToggleComplete: (id: string, completed: boolean) => void;
}

const SubtaskItem: React.FC<SubtaskItemProps> = ({ subtask, onToggleComplete }) => {
  return (
    <div 
      className="flex p-4 border-b border-neutral-100 last:border-b-0 animate-slide-up"
      style={{ 
        animationDelay: `${parseInt(subtask.id) * 0.1}s`,
        opacity: 0,
        animation: `slideUp 0.3s ease-out ${parseInt(subtask.id) * 0.1}s forwards`
      }}
    >
      <div className="mr-3 pt-0.5">
        <button
          onClick={() => onToggleComplete(subtask.id, !subtask.completed)}
          className={`w-5 h-5 flex items-center justify-center rounded-full border transition-all duration-200 ${
            subtask.completed 
              ? 'bg-primary-500 border-primary-500 text-white' 
              : 'border-neutral-300 hover:border-primary-400'
          }`}
        >
          {subtask.completed ? (
            <Check size={12} />
          ) : (
            <div className="w-5 h-5 rounded-full hover:bg-primary-50 transition-colors"></div>
          )}
        </button>
      </div>
      <div className="flex-1">
        <h3 
          className={`font-medium mb-1 transition-all duration-200 ${
            subtask.completed ? 'text-neutral-400 line-through' : 'text-neutral-800'
          }`}
        >
          {subtask.title}
        </h3>
        {subtask.description && (
          <p 
            className={`text-sm transition-all duration-200 ${
              subtask.completed ? 'text-neutral-400' : 'text-neutral-600'
            }`}
          >
            {subtask.description}
          </p>
        )}
      </div>
    </div>
  );
};

export default SubtaskItem;