'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { completePunch } from '@/app/courses/actions';

interface TaskCardProps {
  item: {
    id: number;
    type: 'punch' | 'quiz';
    title: string;
    due_date?: string | null;
    status?: 'complete' | 'todo' | 'overdue';
    // For quizzes
    description?: string;
    file_path?: string;
    attempts?: Array<{ id: number; score: number; submitted_at: string }>;
    totalQuestions?: number;
  };
  courseName: string;
}

const statusDisplay: { [key: string]: { text: string; bgColor: string; textColor: string } } = {
  todo: { text: 'Todo', bgColor: 'bg-yellow-100', textColor: 'text-yellow-800' },
  complete: { text: 'Complete', bgColor: 'bg-green-100', textColor: 'text-green-800' },
  overdue: { text: 'Overdue', bgColor: 'bg-red-100', textColor: 'text-red-800' },
  quiz: { text: 'Quiz', bgColor: 'bg-blue-100', textColor: 'text-blue-800' },
};

export default function TaskCard({ item, courseName }: TaskCardProps) {
  const router = useRouter();
  const [isPunched, setIsPunched] = useState(item.status === 'complete');
  const [isLoading, setIsLoading] = useState(false);

  const handlePunchClick = async () => {
    if (isPunched || isLoading || item.type !== 'punch') return;
    setIsLoading(true);
    const result = await completePunch(item.id);
    if (result.success) {
      setIsPunched(true);
    }
    setIsLoading(false);
  };

  const handleQuizClick = () => {
    router.push(`/quiz/${item.id}`);
  };

  // For quiz cards
  if (item.type === 'quiz') {
    const highestScore = item.attempts && item.attempts.length > 0 
      ? Math.max(...item.attempts.map(a => a.score))
      : null;
    
    const attemptCount = item.attempts?.length || 0;

    return (
      <>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <span className="font-semibold text-gray-800">{courseName}</span>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusDisplay.quiz.bgColor} ${statusDisplay.quiz.textColor}`}>
                  Quiz
                </span>
                {highestScore !== null && (
                  <span className="px-2 py-1 text-xs font-medium rounded-full bg-purple-100 text-purple-800">
                    Best: {highestScore}/{item.totalQuestions || '?'}
                  </span>
                )}
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-1">{item.title}</h3>
              {item.description && (
                <p className="text-sm text-gray-600 mb-2">{item.description}</p>
              )}
              {item.due_date && (
                <p className="text-sm text-gray-500">Due: {new Date(item.due_date).toLocaleDateString()}</p>
              )}
              {attemptCount > 0 && (
                <p className="text-xs text-gray-500 mt-1">Attempts: {attemptCount}</p>
              )}
            </div>
            <div className="ml-4">
              <Button onClick={handleQuizClick} variant="outline">
                {highestScore !== null ? '重新测验' : '开始测验'}
              </Button>
            </div>
          </div>
        </div>


      </>
    );
  }

  // For punch cards
  const statusInfo = statusDisplay[isPunched ? 'complete' : item.status || 'todo'];

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
      <div className="flex justify-between items-center">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className="font-semibold text-gray-800">{courseName}</span>
            <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusInfo.bgColor} ${statusInfo.textColor}`}>
              {statusInfo.text}
            </span>
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-1">{item.title}</h3>
          {item.due_date && (
            <p className="text-sm text-gray-500">Due: {new Date(item.due_date).toLocaleDateString()}</p>
          )}
        </div>
        <div className="ml-4">
          <Button 
            onClick={handlePunchClick} 
            disabled={isPunched || isLoading}
            className={isPunched ? 'bg-green-500 hover:bg-green-600' : 'bg-blue-600 hover:bg-blue-700'}
          >
            {isLoading ? '打卡中...' : isPunched ? '已打卡' : '打卡'}
          </Button>
        </div>
      </div>
    </div>
  );
} 