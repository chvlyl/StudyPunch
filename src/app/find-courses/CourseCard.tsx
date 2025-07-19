'use client';

import { enrollInCourse } from './actions';
import { useTransition, useState } from 'react';

interface Course {
  id: number;
  name: string;
  short_description: string | null;
}

interface CourseCardProps {
  course: Course;
  isEnrolled: boolean;
}

export default function CourseCard({ course, isEnrolled: initialIsEnrolled }: CourseCardProps) {
  const [isPending, startTransition] = useTransition();
  const [isEnrolled, setIsEnrolled] = useState(initialIsEnrolled);

  const handleEnroll = () => {
    startTransition(async () => {
      const result = await enrollInCourse(course.id);
      if (result.success) {
        setIsEnrolled(true);
      }
    });
  };

  return (
    <div className="border border-gray-200 rounded-lg p-6 flex justify-between items-center shadow-sm bg-white hover:shadow-md transition-shadow">
      <div>
        <h3 className="text-xl font-bold text-gray-900">{course.name}</h3>
        <p className="text-gray-600 mt-2">{course.short_description}</p>
      </div>
      {isEnrolled ? (
         <button
          disabled={true}
          className="bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg cursor-not-allowed"
        >
          已加入
        </button>
      ) : (
        <button
          onClick={handleEnroll}
          disabled={isPending}
          className="bg-green-600 text-white font-semibold py-2 px-6 rounded-lg hover:bg-green-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {isPending ? '加入中...' : '加入课程'}
        </button>
      )}
    </div>
  );
} 