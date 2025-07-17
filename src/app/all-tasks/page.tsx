'use client'

import { useState } from 'react';
import AppLayout from '@/components/AppLayout'
import TaskCard from '@/components/TaskCard'
import { courses, tasks as initialTasks } from '@/lib/dummy-data'
import { Task } from '@/lib/types';

export default function AllTasksPage() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  const handlePunchComplete = (taskId: number) => {
    setTasks(currentTasks => 
      currentTasks.map(task => 
        task.id === taskId ? { ...task, status: 'complete' } : task
      )
    );
  };

  const allTasks = tasks.map(task => {
    const course = courses.find(c => c.id === task.courseId);
    return {
      ...task,
      courseName: course?.name || 'Unknown Course',
    }
  });

  return (
    <AppLayout>
      <div className="p-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">所有任务</h1>
          <p className="text-lg text-gray-600 mt-2">
            这是你所有课程的任务列表。
          </p>
        </header>

        <div className="space-y-4">
          {allTasks.map((task) => (
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