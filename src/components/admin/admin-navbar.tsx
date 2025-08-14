'use client';

import { Menu, Search, Bell, User, LogOut, Settings } from 'lucide-react';
import { useState } from 'react';

interface AdminNavbarProps {
  title?: string;
  onToggleSidebar?: () => void;
  userName?: string;
  userAvatar?: string;
}

export function AdminNavbar({ 
  title = 'Admin Panel', 
  onToggleSidebar,
  userName = 'Admin User',
  userAvatar
}: AdminNavbarProps) {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  return (
    <header className="bg-white border-b border-blue-200 shadow-sm">
      <div className="flex items-center justify-between px-4 py-3 lg:px-6">
        {/* Left section */}
        <div className="flex items-center space-x-4">
          {/* Mobile sidebar toggle */}
          <button
            onClick={onToggleSidebar}
            className="p-2 rounded-lg hover:bg-blue-50 text-blue-600 lg:hidden"
          >
            <Menu className="h-5 w-5" />
          </button>
          
          <h1 className="text-xl font-semibold text-blue-900 hidden sm:block">
            {title}
          </h1>
        </div>

        {/* Center section - Search */}
        <div className="flex-1 max-w-md mx-4 hidden md:block">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-blue-400" />
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-10 pr-4 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-blue-50/50"
            />
          </div>
        </div>

        {/* Right section */}
        <div className="flex items-center space-x-2">
          {/* Search button for mobile */}
          <button className="p-2 rounded-lg hover:bg-blue-50 text-blue-600 md:hidden">
            <Search className="h-5 w-5" />
          </button>

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
              className="relative p-2 rounded-lg hover:bg-blue-50 text-blue-600"
            >
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full flex items-center justify-center">
                <span className="text-xs text-white font-bold">3</span>
              </span>
            </button>

            {/* Notifications dropdown */}
            {isNotificationsOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-white border border-blue-200 rounded-lg shadow-lg z-50">
                <div className="p-4 border-b border-blue-100">
                  <h3 className="text-sm font-semibold text-blue-900">Notifications</h3>
                </div>
                <div className="max-h-64 overflow-y-auto">
                  <div className="p-3 hover:bg-blue-50 border-b border-blue-50">
                    <p className="text-sm text-blue-800">New user registered</p>
                    <p className="text-xs text-blue-500 mt-1">2 minutes ago</p>
                  </div>
                  <div className="p-3 hover:bg-blue-50 border-b border-blue-50">
                    <p className="text-sm text-blue-800">System backup completed</p>
                    <p className="text-xs text-blue-500 mt-1">1 hour ago</p>
                  </div>
                  <div className="p-3 hover:bg-blue-50">
                    <p className="text-sm text-blue-800">New message from support</p>
                    <p className="text-xs text-blue-500 mt-1">3 hours ago</p>
                  </div>
                </div>
                <div className="p-3 border-t border-blue-100">
                  <button className="text-sm text-blue-600 hover:text-blue-800 w-full text-center">
                    View all notifications
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* User menu */}
          <div className="relative">
            <button
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              className="flex items-center space-x-2 p-2 rounded-lg hover:bg-blue-50 text-blue-600"
            >
              {userAvatar ? (
                <img 
                  src={userAvatar} 
                  alt={userName}
                  className="h-6 w-6 rounded-full"
                />
              ) : (
                <div className="h-6 w-6 bg-blue-500 rounded-full flex items-center justify-center">
                  <User className="h-4 w-4 text-white" />
                </div>
              )}
              <span className="hidden sm:block text-sm font-medium">{userName}</span>
            </button>

            {/* User dropdown */}
            {isUserMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-blue-200 rounded-lg shadow-lg z-50">
                <div className="p-3 border-b border-blue-100">
                  <p className="text-sm font-medium text-blue-900">{userName}</p>
                  <p className="text-xs text-blue-500">admin@example.com</p>
                </div>
                <div className="py-1">
                  <button className="flex items-center w-full px-4 py-2 text-sm text-blue-700 hover:bg-blue-50">
                    <User className="h-4 w-4 mr-2" />
                    Profile
                  </button>
                  <button className="flex items-center w-full px-4 py-2 text-sm text-blue-700 hover:bg-blue-50">
                    <Settings className="h-4 w-4 mr-2" />
                    Settings
                  </button>
                  <hr className="my-1 border-blue-100" />
                  <button className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50">
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile search bar */}
      <div className="px-4 pb-3 md:hidden">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-blue-400" />
          <input
            type="text"
            placeholder="Search..."
            className="w-full pl-10 pr-4 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-blue-50/50"
          />
        </div>
      </div>
    </header>
  );
}