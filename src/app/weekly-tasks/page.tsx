'use client'

import { useState, useMemo } from 'react';
import AppLayout from '@/components/AppLayout'
import TaskCard from '@/components/TaskCard'
import { courses, tasks as initialTasks } from '@/lib/dummy-data'
import { Task } from '@/lib/types';

export default function WeeklyTaskPage() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  const handlePunchComplete = (taskId: number) => {
    setTasks(currentTasks => 
      currentTasks.map(task => 
        task.id === taskId ? { ...task, status: 'complete' } : task
      )
    );
  };

  const weeklyTasks = useMemo(() => {
    const now = new Date();
    const oneWeekFromNow = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);

    return tasks
      .filter(task => {
        const dueDate = new Date(task.dueDate);
        return dueDate >= now && dueDate <= oneWeekFromNow;
      })
      .map(task => {
        const course = courses.find(c => c.id === task.courseId);
        return {
          ...task,
          courseName: course?.name || 'Unknown Course',
        };
      });
  }, [tasks]);

  return (
    <AppLayout>
      <div className="p-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">本周任务</h1>
          <p className="text-lg text-gray-600 mt-2">
            这是你所有课程中，未来7天内到期的任务列表。
          </p>
        </header>

        <div className="space-y-4">
          {weeklyTasks.map((task) => (
            <TaskCard 
              key={task.id} 
              task={task} 
              courseName={task.courseName}
              onPunchComplete={handlePunchComplete}
            />
          ))}
        </div>
      </div>
    </AppLayout>
  )
} 