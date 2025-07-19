'use client'

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { completePunch } from '@/app/courses/actions';

const taskStatusDisplay: { [key: string]: { text: string; bgColor: string; textColor: string } } = {
  todo: { text: 'Todo', bgColor: 'bg-yellow-100', textColor: 'text-yellow-800' },
  complete: { text: 'Complete', bgColor: 'bg-green-100', textColor: 'text-green-800' },
  overdue: { text: 'Overdue', bgColor: 'bg-red-100', textColor: 'text-red-800' },
};

interface PunchCardProps {
  task: {
    id: number;
    topic: string;
    due_date?: string | null;
    status: 'complete' | 'todo' | 'overdue';
  };
  courseName: string;
}

export default function PunchCard({ task, courseName }: PunchCardProps) {
  const [isPunched, setIsPunched] = useState(task.status === 'complete');
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    if (isPunched || isLoading) return;
    setIsLoading(true);
    const result = await completePunch(task.id);
    if (result.success) {
      setIsPunched(true);
    }
    setIsLoading(false);
  };

  const statusInfo = taskStatusDisplay[isPunched ? 'complete' : task.status];

  return (
    <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-200 flex justify-between items-center">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="font-semibold text-gray-800">{courseName}</span>
          <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusInfo.bgColor} ${statusInfo.textColor}`}>
            {statusInfo.text}
          </span>
        </div>
        <h3 className="text-base font-bold text-gray-900">{task.topic}</h3>
        {task.due_date && (
           <p className="text-sm text-gray-500 mt-1">Due: {new Date(task.due_date).toLocaleDateString()}</p>
        )}
      </div>
      <div>
        <Button onClick={handleClick} disabled={isPunched || isLoading}>
          {isLoading ? '打卡中...' : isPunched ? '已打卡' : '打卡'}
        </Button>
      </div>
    </div>
  );
} 