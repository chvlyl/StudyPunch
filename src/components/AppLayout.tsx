'use client';

import Sidebar from './Sidebar';
import { Navigation } from './Navigation';
import { useState, useEffect } from 'react';
import { Menu } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AppLayoutProps {
  children: React.ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    const checkIfMobile = () => {
      const isMobileWidth = window.innerWidth < 768; // md breakpoint
      const isMobileUserAgent = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      const isMobile = isMobileWidth || isMobileUserAgent;
      
      setSidebarOpen(!isMobile); // Close on mobile, open on desktop
    };

    // Check on initial load
    checkIfMobile();

    // Listen for window resize
    window.addEventListener('resize', checkIfMobile);
    
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navigation bar */}
      <Navigation />
      
      {!isSidebarOpen && (
        <button 
          onClick={toggleSidebar}
          className="fixed top-20 left-4 z-30 p-2 bg-white rounded-md shadow-lg hover:bg-gray-100 transition-colors"
          aria-label="Open sidebar"
        >
          <Menu className="w-6 h-6 text-gray-700" />
        </button>
      )}

      <div
        className={cn(
          'fixed top-16 left-0 h-full z-40 transition-transform duration-300 ease-in-out',
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <Sidebar toggleSidebar={toggleSidebar} />
      </div>
      
      <main 
        className={cn(
          "transition-all duration-300 ease-in-out pt-16",
          isSidebarOpen ? "pl-64" : "pl-0"
        )}
      >
        <div className="p-6">
          {children}
        </div>
      </main>
    </div>
  );
} 