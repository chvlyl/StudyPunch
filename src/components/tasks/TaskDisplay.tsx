'use client'

import { Punch } from '@/lib/types';
// import QuizFlow from './QuizFlow';

interface TaskDisplayProps {
  task: Punch;
}

export default function TaskDisplay({ task }: TaskDisplayProps) {
  // if (task.task_type === 'quiz-multiple-choice') {
  //   return <QuizFlow task={task} />;
  // }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">{task.topic}</h1>
      <p className="text-gray-600">{task.description}</p>
      {/* Punch card specific UI can go here */}
    </div>
  );
}
