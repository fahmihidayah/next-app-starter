'use client';

import { useState, useEffect } from 'react';
import { Sidebar } from './sidebar';
import { AdminNavbar } from './admin-navbar';
import { MenuItem } from './types';

interface AdminLayoutProps {
  children: React.ReactNode;
  menuItems: MenuItem[];
  title?: string;
  defaultCollapsed?: boolean;
  userName?: string;
  userAvatar?: string;
}

export function AdminLayout({ 
  children, 
  menuItems, 
  title = 'Admin Panel',
  defaultCollapsed = false,
  userName,
  userAvatar
}: AdminLayoutProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(defaultCollapsed);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Handle responsive behavior
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileSidebarOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleToggleMobileSidebar = () => {
    setIsMobileSidebarOpen(!isMobileSidebarOpen);
  };

  return (
    <div className="flex min-h-screen bg-blue-50/30">
      {/* Mobile sidebar overlay */}
      {isMobileSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsMobileSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-50 lg:relative lg:translate-x-0 transition-transform duration-300
        ${isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:block
      `}>
        <Sidebar 
          menuItems={menuItems}
          isCollapsed={sidebarCollapsed}
          onToggleCollapse={setSidebarCollapsed}
        />
      </div>
      
      {/* Main content */}
      <main className="flex-1 flex flex-col overflow-hidden lg:ml-0">
        <AdminNavbar 
          title={title}
          onToggleSidebar={handleToggleMobileSidebar}
          userName={userName}
          userAvatar={userAvatar}
        />
        
        {/* Content */}
        <div className="flex-1 overflow-auto p-4 sm:p-6">
          {children}
        </div>
      </main>
    </div>
  );
}