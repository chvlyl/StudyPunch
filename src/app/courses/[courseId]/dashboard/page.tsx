import AppLayout from '@/components/AppLayout';
import { courses } from '@/lib/dummy-data';
import { notFound } from 'next/navigation';
import { use } from 'react';

export default function DashboardPage({ params }: { params: Promise<{ courseId: string }> }) {
  const resolvedParams = use(params);
  const courseId = parseInt(resolvedParams.courseId, 10);
  const course = courses.find((c) => c.id === courseId);

  if (!course) {
    notFound();
  }

  return (
    <AppLayout>
      <div className="p-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">数据看板 for {course.name}</h1>
          <p className="text-lg text-gray-600 mt-2">
            这里是课程的统计数据和分析。
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md border">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Quiz 1 平均分</h2>
            <p className="text-4xl font-bold text-gray-900">2/2</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md border">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">打卡任务完成率</h2>
            <p className="text-4xl font-bold text-gray-900">10/15</p>
            <p className="text-sm text-gray-500 mt-1">已完成</p>
          </div>
        </div>
      </div>
    </AppLayout>
  );
} 