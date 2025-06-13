import React from 'react';
import { ListTodo } from 'lucide-react';

const EmptyState: React.FC = () => {
  return (
    <div className="w-full max-w-xl mx-auto bg-white rounded-lg shadow-medium p-8 text-center animate-fade-in">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-50 text-primary-500 mb-5">
        <ListTodo size={28} />
      </div>
      <h2 className="text-xl font-semibold text-neutral-800 mb-2">
        Enter a task to get started
      </h2>
      <p className="text-neutral-600 mb-4 max-w-md mx-auto">
        Type a natural language prompt like "Plan my vacation" or "Organize a team offsite" and we'll break it down into manageable subtasks.
      </p>
      <div className="text-sm text-neutral-500 p-3 bg-neutral-50 rounded-md inline-block">
        Try: "Plan my week" or "Build a website"
      </div>
    </div>
  );
};

export default EmptyState;