'use client';

import { useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { usePathname } from 'next/navigation';

// 不需要认证的公共路由列表
const PUBLIC_ROUTES = [
  '/',                    // 首页
  '/auth',                // 登录页
  '/auth/callback',       // OAuth 回调
  '/auth/verify-email',   // 邮箱验证
  '/auth/update-password',// 更新密码
  '/auth/auth-error',     // 认证错误页
];

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth();
  const pathname = usePathname();

  useEffect(() => {
    // 如果正在加载中，不做任何操作
    if (isLoading) return;

    // 如果用户未登录且当前页面不是公共路由，则重定向到登录页
    if (!user && !PUBLIC_ROUTES.includes(pathname)) {
      console.log("ProtectedRoute - 未认证用户访问受保护页面，重定向到登录页");
      const redirectUrl = `/auth?redirect=${encodeURIComponent(pathname)}`;
      window.location.assign(redirectUrl);
    }
  }, [user, isLoading, pathname]);

  // 显示加载状态
  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col space-y-4 items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <div className="text-gray-600">正在加载中...</div>
      </div>
    );
  }

  // 如果是公共路由或用户已认证，则正常渲染页面
  if (PUBLIC_ROUTES.includes(pathname) || user) {
    return <>{children}</>;
  }

  // 其他情况返回空，等待重定向
  return null;
} 