'use client'

import Link from 'next/link'
import { Task } from '@/lib/types'
import { taskStatusDisplay } from '@/lib/dummy-data'

interface TaskCardProps {
  task: Task;
  courseName?: string;
  onPunchComplete?: (taskId: number) => void;
}

export default function TaskCard({ task, courseName, onPunchComplete }: TaskCardProps) {
  const handlePunch = () => {
    if (onPunchComplete) {
      onPunchComplete(task.id);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
      <div className="flex justify-between items-start mb-2">
        <div>
          {courseName && (
            <p className="text-sm font-semibold text-blue-600">{courseName}</p>
          )}
          <div className="flex items-center gap-3">
            <h3 className="text-xl font-semibold text-gray-900">{task.title}</h3>
            <span className="text-xs font-semibold text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
              {task.type === 'quiz-multiple-choice' ? '做题' : '打卡'}
            </span>
          </div>
        </div>
        <span className={`text-sm font-medium px-3 py-1 rounded-full ${taskStatusDisplay[task.status].bgColor} ${taskStatusDisplay[task.status].textColor}`}>
          {taskStatusDisplay[task.status].text}
        </span>
      </div>
      <p className="text-gray-500 text-sm mt-1 mb-4">
        截止日期: {task.dueDate}
        {task.questionCount && ` | ${task.questionCount} 个问题`}
      </p>
      <p className="text-gray-600">{task.description}</p>
      <div className="mt-6 flex justify-end">
        {task.type === 'punch' ? (
          <button
            onClick={handlePunch}
            className="bg-green-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-green-700 transition-colors disabled:bg-gray-400"
            disabled={task.status === 'complete'}
          >
            {task.status === 'complete' ? '已完成' : '完成打卡'}
          </button>
        ) : (
          <Link
            href={`/courses/${task.courseId}/task/${task.id}`}
            className="bg-green-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-green-700 transition-colors"
          >
            {task.status === 'complete' ? '查看结果' : '开始答题'}
          </Link>
        )}
      </div>
    </div>
  );
} 