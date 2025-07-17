import AppLayout from '@/components/AppLayout';
import { courses, tasks } from '@/lib/dummy-data';
import { notFound } from 'next/navigation';
import { use } from 'react';
import TaskCard from '@/components/TaskCard';

export default function HistoryPage({ params }: { params: Promise<{ courseId: string }> }) {
  const resolvedParams = use(params);
  const courseId = parseInt(resolvedParams.courseId, 10);
  const course = courses.find((c) => c.id === courseId);

  if (!course) {
    notFound();
  }

  const courseTasks = tasks.filter((task) => task.courseId === courseId);

  return (
    <AppLayout>
      <div className="p-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">做题记录 for {course.name}</h1>
          <p className="text-lg text-gray-600 mt-2">
            这里是你在本课程中所有任务的记录。
          </p>
        </header>

        <div className="space-y-4">
          {courseTasks.length > 0 ? (
            courseTasks.map((task) => (
              <TaskCard key={task.id} task={task} courseName={course.name} />
            ))
          ) : (
            <p className="text-gray-600">本课程没有任务记录。</p>
          )}
        </div>
      </div>
    </AppLayout>
  );
} 