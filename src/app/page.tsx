import AppLayout from '@/components/AppLayout'
import Link from 'next/link'
import { courses, roleDisplay } from '@/lib/dummy-data'

export default function Home() {
  return (
    <AppLayout>
      <div className="p-8">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">我的课程</h1>
          <Link
            href="/create-course"
            className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
          >
            创建新课程
          </Link>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <Link key={course.id} href={`/courses/${course.id}`}>
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 h-full">
                <h3 className="text-xl font-bold text-gray-900">{course.name}</h3>
                <p className="text-gray-600 mt-2">{course.shortDescription}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </AppLayout>
  )
}
