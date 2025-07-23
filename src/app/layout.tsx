'use client';

import { AuthProvider } from '@/contexts/AuthContext';
import ProtectedRoute from '@/contexts/ProtectedRoute';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <head>
        <title>学霸打卡 - StudyPunch</title>
        <meta name="description" content="高效的学习管理和任务跟踪平台" />
      </head>
      <body className={inter.className}>
        <AuthProvider>
          <ProtectedRoute>
            {children}
          </ProtectedRoute>
        </AuthProvider>
      </body>
    </html>
  );
}
