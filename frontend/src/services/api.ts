// import { Subtask } from '../types';

// interface ApiResponse {
//   success: boolean;
//   subtasks: Omit<Subtask, 'completed'>[];
// }

// export const fetchSubtasks = async (prompt: string): Promise<Subtask[]> => {
//   // In a real app, this would make a real API call
//   // For demo purposes, we're simulating the API response
  
//   // Simulate API delay
//   await new Promise(resolve => setTimeout(resolve, 1200));
  
//   // Mock API response based on prompt
//   const mockResponses: Record<string, Omit<Subtask, 'completed'>[]> = {
//     'Plan my week': [
//       { id: '1', title: 'Review calendar and identify key meetings', description: 'Block out time for preparation and follow-up' },
//       { id: '2', title: 'Set 2-3 major goals for the week', description: 'Focus on high-impact tasks that align with monthly objectives' },
//       { id: '3', title: 'Schedule deep work blocks', description: 'At least 2 hours per day for focused, uninterrupted work' },
//       { id: '4', title: 'Plan exercise routine', description: 'Schedule at least 3 workout sessions' },
//       { id: '5', title: 'Meal prep for the week', description: 'Plan and shop for healthy meals' },
//     ],
//     'Build a website': [
//       { id: '1', title: 'Define project goals and target audience', description: 'Clarify purpose, key features, and user personas' },
//       { id: '2', title: 'Create sitemap and wireframes', description: 'Outline page structure and basic layout' },
//       { id: '3', title: 'Design visual elements and branding', description: 'Develop color scheme, typography, and imagery' },
//       { id: '4', title: 'Develop frontend components', description: 'Implement responsive layouts and interactive elements' },
//       { id: '5', title: 'Set up backend functionality', description: 'Configure databases, APIs, and server-side logic' },
//       { id: '6', title: 'Test across devices and browsers', description: 'Ensure consistent experience across platforms' },
//     ]
//   };
  
//   // Get specific response or generate generic one
//   const subtasks = mockResponses[prompt] || generateGenericSubtasks(prompt);
  
//   // Add completed: false to each subtask
//   return subtasks.map(subtask => ({
//     ...subtask,
//     completed: false
//   }));
// };

// // Generate generic subtasks based on prompt
// function generateGenericSubtasks(prompt: string): Omit<Subtask, 'completed'>[] {
//   // Split the prompt into words and use them to create somewhat relevant subtasks
//   const words = prompt.split(' ').filter(word => word.length > 3);
  
//   return [
//     { id: '1', title: `Research ${prompt}`, description: 'Gather information and resources' },
//     { id: '2', title: `Create initial plan for ${prompt}`, description: 'Outline steps and timeline' },
//     { id: '3', title: `Identify key resources for ${prompt}`, description: 'Tools, materials, or assistance needed' },
//     { id: '4', title: `Execute first phase of ${prompt}`, description: 'Begin implementation of initial steps' },
//     { id: '5', title: `Review progress on ${prompt}`, description: 'Assess results and adjust approach if needed' },
//   ];
// }


import { Subtask } from '../types';

interface ApiResponse {
  success: boolean;
  subtasks: Omit<Subtask, 'completed'>[];
}

export const fetchSubtasks = async (prompt: string): Promise<Subtask[]> => {
  console.log(JSON.stringify({ task: prompt }))
  const response = await fetch('http://127.0.0.1:8000/plan', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ task: prompt }),
  });
  const data: ApiResponse = await response.json();

  if (data.success) {
    // Here you get the subtasks array in the right format
    // Return with completed field defaulted to false if needed
    return data.subtasks.map(st => ({ ...st, completed: false }));
  } else {
    throw new Error('Failed to fetch subtasks');
  }
};
