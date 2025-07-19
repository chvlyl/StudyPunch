import AppLayout from '@/components/AppLayout'
import { notFound } from 'next/navigation'
import { getCourse } from '../actions'
import PunchCard from '@/components/PunchCard';

type CoursePageProps = {
  params: { courseId: string };
};

export default async function CoursePage({ params }: CoursePageProps) {
  const courseId = parseInt(params.courseId, 10);
  const { course, tasks } = await getCourse(courseId);

  if (!course) {
    notFound();
  }

  return (
    <AppLayout>
      <div className="p-8">
        <header className="flex flex-col md:flex-row justify-between md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{course.name}</h1>
            <p className="text-lg text-gray-600 mt-2">{course.short_description}</p>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <main className="md:col-span-2">
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 border-b pb-2 mb-4">
                课程介绍
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed whitespace-pre-line">
                {course.description}
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">本周任务</h2>
              {tasks.length > 0 ? (
                <div className="space-y-4">
                  {tasks.map((task: any) => (
                    <PunchCard
                      key={task.id}
                      task={task}
                      courseName={course.name}
                    />
                  ))}
                </div>
              ) : (
                <p className="text-gray-600">本周没有已分配的任务。</p>
              )}
            </section>
          </main>

          <aside className="md:col-span-1">
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm border">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">学习资源</h3>
              {course.resources && course.resources.length > 0 ? (
                <ul className="space-y-3">
                  {course.resources.map((resource: any, index: number) => (
                    <li key={index}>
                      <a
                        href={resource.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 hover:underline transition-colors"
                      >
                        {resource.title}
                      </a>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-600">暂无学习资源。</p>
              )}
            </div>
          </aside>
        </div>
      </div>
    </AppLayout>
  )
}
