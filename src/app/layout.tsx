import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "学霸打卡 (Study-Punch)",
  description: "帮助学习小组巩固在线课程视频内容的日常测验打卡工具",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh">
      <body
        className="font-sans antialiased"
      >
        {children}
      </body>
    </html>
  );
}
