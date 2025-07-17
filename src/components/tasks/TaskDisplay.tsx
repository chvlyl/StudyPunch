'use client'

import { Task } from '@/lib/types';
import QuizFlow from './QuizFlow';

interface TaskDisplayProps {
  task: Task;
}

export default function TaskDisplay({ task }: TaskDisplayProps) {
  if (task.type === 'quiz-multiple-choice') {
    return <QuizFlow task={task} />;
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">{task.title}</h1>
      <p className="text-gray-600">{task.description}</p>
      {/* Punch card specific UI can go here */}
    </div>
  );
}
