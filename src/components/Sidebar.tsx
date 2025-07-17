'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { 
  Calendar, 
  BookCopy,
  LogOut 
} from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

const navigationItems = [
  { name: '所有任务', href: '/all-tasks', icon: Calendar },
  { name: '本周任务', href: '/weekly-tasks', icon: Calendar },
  { name: '我的课程', href: '/', icon: BookCopy },
]

export default function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const supabase = createClient()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/login')
  }

  return (
    <div className="flex flex-col h-full bg-gray-50 border-r border-gray-200 w-64">
      {/* Logo */}
      <Link href="/">
        <div className="flex items-center justify-center h-16 px-4 border-b border-gray-200 cursor-pointer">
          <h1 className="text-xl font-bold text-gray-900">学霸打卡</h1>
        </div>
      </Link>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-4 space-y-2">
        {navigationItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors',
                isActive
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-700 hover:bg-gray-100'
              )}
            >
              <item.icon className="w-5 h-5 mr-3" />
              {item.name}
            </Link>
          )
        })}
      </nav>

      {/* User/Logout Section */}
      <div className="p-4 border-t border-gray-200">
        <button
          onClick={handleLogout}
          className="flex items-center w-full px-3 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-100 transition-colors"
        >
          <LogOut className="w-5 h-5 mr-3" />
          退出登录
        </button>
      </div>
    </div>
  )
} 