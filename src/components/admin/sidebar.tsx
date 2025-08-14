'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { MenuItem } from './types';

interface SidebarProps {
  menuItems: MenuItem[];
  isCollapsed?: boolean;
  onToggleCollapse?: (collapsed: boolean) => void;
}

export function Sidebar({ menuItems, isCollapsed = false, onToggleCollapse }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(isCollapsed);

  const handleToggle = () => {
    const newCollapsed = !collapsed;
    setCollapsed(newCollapsed);
    onToggleCollapse?.(newCollapsed);
  };

  return (
    <aside 
      className={`
        relative bg-blue-50 border-r border-blue-200 transition-all duration-300 ease-in-out
        ${collapsed ? 'w-16' : 'w-64'}
        min-h-screen flex flex-col shadow-sm
      `}
    >
      {/* Toggle Button */}
      <div className="flex justify-end p-4">
        <button
          onClick={handleToggle}
          className="p-1 rounded-md hover:bg-blue-100 text-blue-600 transition-colors duration-200"
        >
          {collapsed ? (
            <ChevronRight className="h-5 w-5" />
          ) : (
            <ChevronLeft className="h-5 w-5" />
          )}
        </button>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 px-2 pb-4">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.id}>
              <Link
                href={item.href}
                className={`
                  flex items-center px-3 py-2 rounded-lg text-blue-700 
                  hover:bg-blue-100 hover:text-blue-800 transition-all duration-200
                  group relative
                  ${collapsed ? 'justify-center' : 'justify-start'}
                `}
              >
                <item.icon className={`h-5 w-5 ${collapsed ? '' : 'mr-3'}`} />
                
                {!collapsed && (
                  <span className="font-medium">{item.label}</span>
                )}
                
                {!collapsed && item.badge && (
                  <span className="ml-auto bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                    {item.badge}
                  </span>
                )}

                {/* Tooltip for collapsed state */}
                {collapsed && (
                  <div className="
                    absolute left-full ml-2 px-3 py-2 bg-gray-900 text-white 
                    text-sm rounded-lg opacity-0 invisible group-hover:opacity-100 
                    group-hover:visible transition-all duration-200 whitespace-nowrap
                    z-50
                  ">
                    {item.label}
                    {item.badge && (
                      <span className="ml-2 bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                        {item.badge}
                      </span>
                    )}
                  </div>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}