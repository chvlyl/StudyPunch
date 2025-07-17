import { use } from 'react'
import AppLayout from '@/components/AppLayout'
import { tasks } from '@/lib/dummy-data'
import { notFound } from 'next/navigation'
import TaskDisplay from '@/components/tasks/TaskDisplay'

// This is now a Server Component
export default function TaskPage({ params }: { params: Promise<{ taskId: string }> }) {
  const resolvedParams = use(params)
  const taskId = parseInt(resolvedParams.taskId, 10)
  
  // In a real app, you'd fetch this from a database.
  // The fetch operation can be async here.
  const task = tasks.find((t) => t.id === taskId)

  if (!task) {
    notFound()
  }

  return (
    <AppLayout>
      <TaskDisplay task={task} />
    </AppLayout>
  )
} 