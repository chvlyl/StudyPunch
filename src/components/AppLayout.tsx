'use client';

import { Navigation } from './Navigation';

interface AppLayoutProps {
  children: React.ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navigation bar */}
      <Navigation />
      
      {/* Main content */}
      <main className="pt-16">
        <div className="p-6">
          {children}
        </div>
      </main>
    </div>
  );
} 