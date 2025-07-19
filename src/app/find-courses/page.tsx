import AppLayout from '@/components/AppLayout';
import { getCoursesWithEnrollmentStatus } from './actions';
import CourseCard from './CourseCard';

export default async function FindCoursesPage() {
  const { courses, enrolledCourseIds } = await getCoursesWithEnrollmentStatus();

  return (
    <AppLayout>
      <div className="p-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Find New Courses</h1>
          <p className="text-lg text-gray-600 mt-2">
            Browse and enroll in public courses to start learning.
          </p>
        </header>

        <section>
          {courses.length > 0 ? (
            <div className="space-y-6">
              {courses.map((course) => (
                <CourseCard
                  key={course.id}
                  course={course}
                  isEnrolled={enrolledCourseIds.has(course.id)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 px-6 bg-white rounded-lg shadow-sm">
                <h3 className="text-xl font-bold text-gray-800">No Courses Found</h3>
                <p className="text-gray-600 mt-2">
                  There are no public courses available at the moment. Please check back later!
                </p>
            </div>
          )}
        </section>
      </div>
    </AppLayout>
  );
} 