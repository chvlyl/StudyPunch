import { use } from 'react'
import AppLayout from '@/components/AppLayout'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'

export default function CourseSettingsPage({ params }: { params: Promise<{ courseId: string }> }) {
  const resolvedParams = use(params)
  
  return (
    <AppLayout>
      <div className="p-8 max-w-4xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            课程管理 (ID: {resolvedParams.courseId})
          </h1>
          <p className="text-lg text-gray-600 mt-2">
            在这里，你可以设计和管理你的课程。
          </p>
        </header>

        <div className="space-y-12">
          <section className="bg-white p-8 rounded-lg shadow-md border">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">编辑课程信息</h2>
            <div className="space-y-6">
              <div>
                <Label htmlFor="course-name">课程名称</Label>
                <Input id="course-name" defaultValue="CS 336: 从0构建大模型" />
              </div>
              <div>
                <Label htmlFor="course-description">课程描述</Label>
                <Textarea id="course-description" defaultValue="从0构建大模型" />
              </div>
              <div className="flex justify-end">
                <Button>保存更改</Button>
              </div>
            </div>
          </section>

          <section className="bg-white p-8 rounded-lg shadow-md border">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">题库管理</h2>
              <Button variant="outline">添加新题目</Button>
            </div>
            <div className="space-y-4">
              {/* Placeholder for question list */}
              <div className="p-4 border rounded-md bg-gray-50 text-center text-gray-500">
                题目列表将显示在这里...
              </div>
            </div>
          </section>
        </div>
      </div>
    </AppLayout>
  )
} 