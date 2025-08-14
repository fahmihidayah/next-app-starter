'use client'
import { AdminLayout, MenuItem } from '@/components/admin';
import { 
  Home, 
  Users, 
  Settings, 
  BarChart3, 
  FileText, 
  Shield,
  Package,
  MessageSquare 
} from 'lucide-react';

const menuItems: MenuItem[] = [
  { 
    id: 'dashboard', 
    label: 'Dashboard', 
    icon: Home, 
    href: '/admin' 
  },
  { 
    id: 'users', 
    label: 'Users', 
    icon: Users, 
    href: '/admin/users', 
    badge: '142' 
  },
  { 
    id: 'products', 
    label: 'Products', 
    icon: Package, 
    href: '/admin/products',
    badge: '28'
  },
  { 
    id: 'analytics', 
    label: 'Analytics', 
    icon: BarChart3, 
    href: '/admin/analytics' 
  },
  { 
    id: 'reports', 
    label: 'Reports', 
    icon: FileText, 
    href: '/admin/reports' 
  },
  { 
    id: 'messages', 
    label: 'Messages', 
    icon: MessageSquare, 
    href: '/admin/messages',
    badge: '5'
  },
  { 
    id: 'security', 
    label: 'Security', 
    icon: Shield, 
    href: '/admin/security' 
  },
  { 
    id: 'settings', 
    label: 'Settings', 
    icon: Settings, 
    href: '/admin/settings' 
  }
];

export default function AdminPage() {
  return (
    <AdminLayout menuItems={menuItems} title="Admin Dashboard">
      <div className="space-y-6">
        {/* Welcome Section */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Welcome to Admin Dashboard
          </h2>
          <p className="text-gray-600">
            Manage your application from this central admin panel.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Users</p>
                <p className="text-2xl font-semibold text-gray-900">142</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <Package className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Products</p>
                <p className="text-2xl font-semibold text-gray-900">28</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <MessageSquare className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Messages</p>
                <p className="text-2xl font-semibold text-gray-900">5</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <BarChart3 className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Revenue</p>
                <p className="text-2xl font-semibold text-gray-900">$12,540</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <button className="flex items-center justify-center px-4 py-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors duration-200">
              <Users className="h-5 w-5 text-blue-600 mr-2" />
              <span className="text-blue-700 font-medium">Add User</span>
            </button>
            
            <button className="flex items-center justify-center px-4 py-3 bg-green-50 hover:bg-green-100 rounded-lg transition-colors duration-200">
              <Package className="h-5 w-5 text-green-600 mr-2" />
              <span className="text-green-700 font-medium">New Product</span>
            </button>
            
            <button className="flex items-center justify-center px-4 py-3 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors duration-200">
              <FileText className="h-5 w-5 text-purple-600 mr-2" />
              <span className="text-purple-700 font-medium">Generate Report</span>
            </button>
            
            <button className="flex items-center justify-center px-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors duration-200">
              <Settings className="h-5 w-5 text-gray-600 mr-2" />
              <span className="text-gray-700 font-medium">Settings</span>
            </button>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between py-2">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-3"></div>
                <span className="text-gray-700">New user registered: john@example.com</span>
              </div>
              <span className="text-sm text-gray-500">2 hours ago</span>
            </div>
            
            <div className="flex items-center justify-between py-2">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                <span className="text-gray-700">Product "Wireless Headphones" updated</span>
              </div>
              <span className="text-sm text-gray-500">4 hours ago</span>
            </div>
            
            <div className="flex items-center justify-between py-2">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-yellow-400 rounded-full mr-3"></div>
                <span className="text-gray-700">New message from customer support</span>
              </div>
              <span className="text-sm text-gray-500">6 hours ago</span>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}