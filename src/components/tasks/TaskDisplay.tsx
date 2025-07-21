'use client'

import { Punch } from '@/lib/types';

interface TaskDisplayProps {
  task: Punch;
}

export default function TaskDisplay({ task }: TaskDisplayProps) {

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">{task.topic}</h1>
    </div>
  );
}
