import React, { useState } from 'react';
import { Send } from 'lucide-react';

interface TaskPromptProps {
  onSubmit: (prompt: string) => void;
  isLoading: boolean;
}

const TaskPrompt: React.FC<TaskPromptProps> = ({ onSubmit, isLoading }) => {
  const [prompt, setPrompt] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim().length > 0 && !isLoading) {
      onSubmit(prompt.trim());
    }
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className="w-full max-w-xl mx-auto mb-8 animate-fade-in"
    >
      <div className="relative">
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter a task like 'Plan my week' or 'Build a website'"
          className="w-full px-4 py-3 pr-12 bg-white border border-neutral-200 rounded-lg shadow-soft focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-300 transition-all"
          disabled={isLoading}
        />
        <button
          type="submit"
          className={`absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-400 hover:text-primary-600 transition-colors ${
            isLoading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          disabled={isLoading || prompt.trim().length === 0}
        >
          <Send size={20} />
        </button>
      </div>
      {isLoading && (
        <div className="text-sm text-neutral-500 mt-2 animate-pulse text-center">
          Breaking down your task...
        </div>
      )}
    </form>
  );
};

export default TaskPrompt;