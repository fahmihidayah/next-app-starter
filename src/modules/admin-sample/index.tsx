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
    <AdminLayout 
      menuItems={menuItems} 
      title="Admin Dashboard"
      userName="Admin User"
    >
      <div className="space-y-6">
        {/* Welcome Section */}
        <div className="bg-white rounded-xl shadow-sm border border-blue-100 p-6">
          <h2 className="text-xl font-semibold text-blue-900 mb-2">
            Welcome to Admin Dashboard
          </h2>
          <p className="text-blue-600">
            Manage your application from this central admin panel with our new light blue theme.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          <div className="bg-white rounded-xl shadow-sm border border-blue-100 p-6 hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 rounded-xl">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-blue-600">Total Users</p>
                <p className="text-2xl font-bold text-blue-900">142</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-blue-100 p-6 hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-xl">
                <Package className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-blue-600">Products</p>
                <p className="text-2xl font-bold text-blue-900">28</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-blue-100 p-6 hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center">
              <div className="p-3 bg-yellow-100 rounded-xl">
                <MessageSquare className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-blue-600">Messages</p>
                <p className="text-2xl font-bold text-blue-900">5</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-blue-100 p-6 hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center">
              <div className="p-3 bg-purple-100 rounded-xl">
                <BarChart3 className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-blue-600">Revenue</p>
                <p className="text-2xl font-bold text-blue-900">$12,540</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-sm border border-blue-100 p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <button className="flex items-center justify-center px-4 py-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-all duration-200 border border-blue-200 hover:border-blue-300">
              <Users className="h-5 w-5 text-blue-600 mr-2" />
              <span className="text-blue-700 font-medium">Add User</span>
            </button>
            
            <button className="flex items-center justify-center px-4 py-3 bg-green-50 hover:bg-green-100 rounded-lg transition-all duration-200 border border-green-200 hover:border-green-300">
              <Package className="h-5 w-5 text-green-600 mr-2" />
              <span className="text-green-700 font-medium">New Product</span>
            </button>
            
            <button className="flex items-center justify-center px-4 py-3 bg-purple-50 hover:bg-purple-100 rounded-lg transition-all duration-200 border border-purple-200 hover:border-purple-300">
              <FileText className="h-5 w-5 text-purple-600 mr-2" />
              <span className="text-purple-700 font-medium">Generate Report</span>
            </button>
            
            <button className="flex items-center justify-center px-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-all duration-200 border border-gray-200 hover:border-gray-300">
              <Settings className="h-5 w-5 text-gray-600 mr-2" />
              <span className="text-gray-700 font-medium">Settings</span>
            </button>
          </div>
        </div>

        {/* Recent Activity & System Status */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Activity */}
          <div className="bg-white rounded-xl shadow-sm border border-blue-100 p-6">
            <h3 className="text-lg font-semibold text-blue-900 mb-4">Recent Activity</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between py-2">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-400 rounded-full mr-3"></div>
                  <span className="text-blue-700">New user registered: john@example.com</span>
                </div>
                <span className="text-sm text-blue-500">2h ago</span>
              </div>
              
              <div className="flex items-center justify-between py-2">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                  <span className="text-blue-700">Product "Wireless Headphones" updated</span>
                </div>
                <span className="text-sm text-blue-500">4h ago</span>
              </div>
              
              <div className="flex items-center justify-between py-2">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mr-3"></div>
                  <span className="text-blue-700">New message from customer support</span>
                </div>
                <span className="text-sm text-blue-500">6h ago</span>
              </div>
            </div>
          </div>

          {/* System Status */}
          <div className="bg-white rounded-xl shadow-sm border border-blue-100 p-6">
            <h3 className="text-lg font-semibold text-blue-900 mb-4">System Status</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-blue-700">Server Status</span>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                  <span className="text-sm text-green-600 font-medium">Online</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-blue-700">Database</span>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                  <span className="text-sm text-green-600 font-medium">Connected</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-blue-700">API Status</span>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mr-2"></div>
                  <span className="text-sm text-yellow-600 font-medium">Maintenance</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-blue-700">Last Backup</span>
                <span className="text-sm text-blue-600">2 hours ago</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}