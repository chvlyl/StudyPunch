'use client';

import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from '@/contexts/AuthContext';
import ProtectedRoute from '@/contexts/ProtectedRoute';

// 将metadata移到单独的文件中，因为这是client component
// export const metadata: Metadata = {
//   title: "学霸打卡 (Study-Punch)",
//   description: "帮助学习小组巩固在线课程视频内容的日常测验打卡工具",
// };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh">
      <head>
        <title>学霸打卡 (Study-Punch)</title>
        <meta name="description" content="帮助学习小组巩固在线课程视频内容的日常测验打卡工具" />
      </head>
      <body className="font-sans antialiased">
        <AuthProvider>
          <ProtectedRoute>
            {children}
          </ProtectedRoute>
        </AuthProvider>
      </body>
    </html>
  );
}
