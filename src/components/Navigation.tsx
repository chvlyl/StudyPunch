'use client';

import { useAuth } from '@/contexts/AuthContext';
import { User, LogOut, LogIn } from 'lucide-react';
import Link from 'next/link';

export function Navigation() {
  const { user, signOut, isLoading } = useAuth();

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('登出失败:', error);
    }
  };

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">📚</span>
            <span className="text-xl font-bold text-gray-800">学霸打卡</span>
          </Link>

          {/* User info and auth buttons */}
          <div className="flex items-center gap-4">
            {isLoading ? (
              <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            ) : user ? (
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 text-gray-700">
                  <User className="w-5 h-5" />
                  <span className="text-sm">
                    {user.email || '已登录用户'}
                  </span>
                </div>
                <button
                  onClick={handleSignOut}
                  className="flex items-center gap-2 px-3 py-2 text-red-600 hover:text-red-700 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="text-sm">登出</span>
                </button>
              </div>
            ) : (
              <Link
                href="/auth"
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <LogIn className="w-4 h-4" />
                <span className="text-sm">登录</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
} 