import AppLayout from '@/components/AppLayout'

export default function Home() {
  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            欢迎来到学霸打卡
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            通过每日测验巩固学习成果，与小组成员一起进步
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                今日任务
              </h3>
              <p className="text-gray-600">
                完成每日测验，检验学习成果
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                历史记录
              </h3>
              <p className="text-gray-600">
                查看过往的打卡记录和成绩
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                数据看板
              </h3>
              <p className="text-gray-600">
                了解整个学习小组的进度情况
              </p>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
