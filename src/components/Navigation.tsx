'use client';

import { useAuth } from '@/contexts/AuthContext';
import { User, LogOut, LogIn, BookCopy, Search } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const navigationItems = [
  { name: '我的课程', href: '/', icon: BookCopy },
  { name: '寻找课程', href: '/find-courses', icon: Search },
];

export function Navigation() {
  const { user, signOut, isLoading } = useAuth();
  const pathname = usePathname();

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('登出失败:', error);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-slate-200/20 dark:border-slate-700/50 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 flex-shrink-0 group">
            <div className="text-3xl transition-transform duration-300 group-hover:scale-110">
              📚
            </div>
            <div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                学霸打卡
              </span>
              <div className="text-xs text-slate-500 dark:text-slate-400 -mt-1 flex items-center gap-2">
                <span>StudyPunch</span>
                <span>v0.7.22</span>
              </div>
            </div>
          </Link>

          {/* Navigation Menu - 中间位置 */}
          <div className="hidden md:flex items-center space-x-1">
            {navigationItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    'flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 relative group',
                    isActive
                      ? 'bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 shadow-sm'
                      : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-blue-600 dark:hover:text-blue-400'
                  )}
                >
                  <item.icon className={cn(
                    "w-4 h-4 transition-transform duration-300 group-hover:scale-110",
                    isActive && "text-blue-600 dark:text-blue-400"
                  )} />
                  {item.name}
                  {isActive && (
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg" />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Mobile Navigation Menu - 更现代的下拉 */}
          <div className="md:hidden flex items-center">
            <div className="relative group">
              <button className="flex items-center gap-2 px-4 py-2 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-all duration-300">
                <span className="text-sm font-medium">菜单</span>
                <svg 
                  className="w-4 h-4 transition-transform duration-300 group-hover:rotate-180" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className="absolute right-0 top-full mt-2 w-56 glass-card border border-slate-200/20 dark:border-slate-700/50 rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                <div className="py-2">
                  {navigationItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        className={cn(
                          'flex items-center gap-3 px-4 py-3 text-sm transition-all duration-300 relative group/item',
                          isActive
                            ? 'bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 border-r-2 border-blue-500'
                            : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-blue-600 dark:hover:text-blue-400'
                        )}
                      >
                        <item.icon className={cn(
                          "w-4 h-4 transition-all duration-300 group-hover/item:scale-110",
                          isActive && "text-blue-600 dark:text-blue-400"
                        )} />
                        {item.name}
                        {isActive && (
                          <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 to-purple-500 rounded-r" />
                        )}
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* User info and auth buttons */}
          <div className="flex items-center gap-4 flex-shrink-0">
            {isLoading ? (
              <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            ) : user ? (
              <div className="flex items-center gap-3">
                <div className="hidden sm:flex items-center gap-3 px-3 py-2 bg-slate-100 dark:bg-slate-800 rounded-lg">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-slate-900 dark:text-slate-100">
                      {user.email?.split('@')[0] || '用户'}
                    </div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">
                      已登录
                    </div>
                  </div>
                </div>
                <button
                  onClick={handleSignOut}
                  className="flex items-center gap-2 px-4 py-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950 rounded-lg transition-all duration-300 group"
                >
                  <LogOut className="w-4 h-4 transition-transform duration-300 group-hover:scale-110" />
                  <span className="text-sm font-medium">登出</span>
                </button>
              </div>
            ) : (
              <Link
                href="/auth"
                className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl group"
              >
                <LogIn className="w-4 h-4 transition-transform duration-300 group-hover:scale-110" />
                <span className="text-sm font-medium">登录</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
} 