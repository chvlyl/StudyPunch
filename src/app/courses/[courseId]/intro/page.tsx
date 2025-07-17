import AppLayout from '@/components/AppLayout';
import { courses } from '@/lib/dummy-data';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { use } from 'react';

export default function CoursePage({ params }: { params: Promise<{ courseId: string }> }) {
  const resolvedParams = use(params);
  const courseId = parseInt(resolvedParams.courseId, 10);
  const course = courses.find((c) => c.id === courseId);

  if (!course) {
    notFound();
  }

  return (
    <AppLayout>
      <div className="p-8">
        {/* Course Title */}
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900">{course.name}</h1>
        </header>

        {/* Course Description */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 border-b pb-2 mb-4">
            课程介绍
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            {course.description}
          </p>
        </section>

        {/* Course Resources */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-800 border-b pb-2 mb-4">
            课程资源
          </h2>
          {course.resources ? (
            <Link href={course.resources} target="_blank" rel="noopener noreferrer" className="text-lg text-blue-600 hover:underline">
              {course.resources}
            </Link>
          ) : (
            <p className="text-lg text-gray-500">No resources available.</p>
          )}
        </section>
      </div>
    </AppLayout>
  );
}
