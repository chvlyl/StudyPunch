'use client'

import { use } from 'react'
import AppLayout from '@/components/AppLayout'
import Link from 'next/link'
import TaskCard from '@/components/TaskCard'
import { courses, tasks } from '@/lib/dummy-data'
import { notFound } from 'next/navigation'
import { Settings, Info, BarChart3, History } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export default function CoursePage({ params }: { params: Promise<{ courseId: string }> }) {
  const resolvedParams = use(params)
  const courseId = parseInt(resolvedParams.courseId, 10)
  const course = courses.find((c) => c.id === courseId)

  if (!course) {
    notFound()
  }

  const courseTasks = tasks.filter((t) => t.courseId === courseId);
  const isPrivilegedUser = course.role === 'owner' || course.role === 'moderator';

  return (
    <AppLayout>
      <div className="p-8">
        <header className="flex flex-col md:flex-row justify-between md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{course.name}</h1>
            <p className="text-lg text-gray-600 mt-2">{course.shortDescription}</p>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <ButtonAsComponent href={`/courses/${courseId}/intro`} icon={Info}>课程信息</ButtonAsComponent>
            <ButtonAsComponent href={`/courses/${courseId}/dashboard`} icon={BarChart3}>数据看板</ButtonAsComponent>
            <ButtonAsComponent href={`/courses/${courseId}/history`} icon={History}>做题记录</ButtonAsComponent>
            {isPrivilegedUser && (
              <ButtonAsComponent href={`/courses/${courseId}/settings`} icon={Settings} variant="dark">课程管理</ButtonAsComponent>
            )}
          </div>
        </header>

        <section>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">本周任务</h2>
          {courseTasks.length > 0 ? (
            <div className="space-y-4">
              {courseTasks.map((task) => (
                <TaskCard key={task.id} task={task} />
              ))}
            </div>
          ) : (
            <p className="text-gray-600">本周没有已分配的任务。</p>
          )}
        </section>
      </div>
    </AppLayout>
  )
}

const ButtonAsComponent = ({ href, icon: Icon, children, variant = 'light' }: { href?: string, icon: React.ElementType, children: React.ReactNode, variant?: 'light' | 'dark' }) => {
  const content = (
    <div
      className={`flex items-center font-semibold py-2 px-4 rounded-md transition-colors cursor-pointer ${
        variant === 'light'
          ? 'bg-white text-gray-800 hover:bg-gray-100 border border-gray-200'
          : 'bg-gray-800 text-white hover:bg-gray-900'
      }`}
    >
      <Icon className="w-5 h-5 mr-2" />
      {children}
    </div>
  );

  return href ? <Link href={href}>{content}</Link> : content;
}; 