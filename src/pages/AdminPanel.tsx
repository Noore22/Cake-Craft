import React, { useState } from 'react';
import { Package, Users, TrendingUp, Clock, Eye, Edit, Trash2, Plus } from 'lucide-react';
import { Order } from '../types';

interface AdminPanelProps {
  orders: Order[];
  onUpdateOrderStatus: (orderId: string, status: Order['status']) => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ orders, onUpdateOrderStatus }) => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'orders' | 'products' | 'customers'>('dashboard');

  const statusOptions: Order['status'][] = [
    'pending', 'confirmed', 'baking', 'decorating', 'ready', 'out-for-delivery', 'delivered'
  ];

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'confirmed': return 'bg-blue-100 text-blue-800';
      case 'baking': return 'bg-purple-100 text-purple-800';
      case 'decorating': return 'bg-pink-100 text-pink-800';
      case 'ready': return 'bg-green-100 text-green-800';
      case 'out-for-delivery': return 'bg-orange-100 text-orange-800';
      case 'delivered': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatStatus = (status: Order['status']) => {
    switch (status) {
      case 'out-for-delivery': return 'Out for Delivery';
      default: return status.charAt(0).toUpperCase() + status.slice(1);
    }
  };

  const totalRevenue = orders.reduce((sum, order) => sum + order.totalAmount, 0);
  const pendingOrders = orders.filter(order => !['delivered', 'cancelled'].includes(order.status)).length;
  const todayOrders = orders.filter(order => 
    new Date(order.createdAt).toDateString() === new Date().toDateString()
  ).length;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-2xl font-bold text-gray-900">Admin Panel</h1>
            <div className="text-sm text-gray-600">
              CakeCraft Administration
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex">
              {[
                { key: 'dashboard', label: 'Dashboard', icon: TrendingUp },
                { key: 'orders', label: 'Orders', icon: Package },
                { key: 'products', label: 'Products', icon: Plus },
                { key: 'customers', label: 'Customers', icon: Users }
              ].map(({ key, label, icon: Icon }) => (
                <button
                  key={key}
                  onClick={() => setActiveTab(key as any)}
                  className={`flex items-center px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                    activeTab === key
                      ? 'border-orange-500 text-orange-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="h-5 w-5 mr-2" />
                  {label}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'dashboard' && (
              <div>
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                  <div className="bg-gradient-to-r from-orange-500 to-pink-500 rounded-2xl p-6 text-white">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-orange-100">Total Revenue</p>
                        <p className="text-3xl font-bold">${totalRevenue.toFixed(0)}</p>
                      </div>
                      <TrendingUp className="h-8 w-8 text-orange-200" />
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl p-6 text-white">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-blue-100">Total Orders</p>
                        <p className="text-3xl font-bold">{orders.length}</p>
                      </div>
                      <Package className="h-8 w-8 text-blue-200" />
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-green-500 to-teal-500 rounded-2xl p-6 text-white">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-green-100">Today's Orders</p>
                        <p className="text-3xl font-bold">{todayOrders}</p>
                      </div>
                      <Clock className="h-8 w-8 text-green-200" />
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-purple-500 to-indigo-500 rounded-2xl p-6 text-white">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-purple-100">Pending Orders</p>
                        <p className="text-3xl font-bold">{pendingOrders}</p>
                      </div>
                      <Users className="h-8 w-8 text-purple-200" />
                    </div>
                  </div>
                </div>

                {/* Recent Orders */}
                <div className="bg-white rounded-xl border border-gray-200">
                  <div className="p-6 border-b border-gray-200">
                    <h2 className="text-lg font-semibold text-gray-900">Recent Orders</h2>
                  </div>
                  <div className="divide-y divide-gray-200">
                    {orders.slice(-5).reverse().map((order) => (
                      <div key={order.id} className="p-6 flex items-center justify-between">
                        <div>
                          <p className="font-medium text-gray-900">#{order.id}</p>
                          <p className="text-sm text-gray-600">{order.customerInfo.name}</p>
                          <p className="text-sm text-gray-600">
                            {order.cake.base.name} {order.cake.shape.name} {order.cake.size.name}
                          </p>
                        </div>
                        <div className="flex items-center space-x-4">
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                            {formatStatus(order.status)}
                          </span>
                          <span className="font-semibold text-gray-900">${order.totalAmount.toFixed(2)}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'orders' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">Order Management</h2>
                  <div className="flex space-x-2">
                    <select className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500">
                      <option>All Statuses</option>
                      <option>Pending</option>
                      <option>In Progress</option>
                      <option>Completed</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-4">
                  {orders.slice().reverse().map((order) => (
                    <div key={order.id} className="bg-white rounded-xl border border-gray-200 p-6">
                      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
                        <div>
                          <div className="flex items-center space-x-4 mb-2">
                            <h3 className="text-lg font-semibold text-gray-900">#{order.id}</h3>
                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                              {formatStatus(order.status)}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600">
                            Customer: {order.customerInfo.name} • {order.customerInfo.phone}
                          </p>
                          <p className="text-sm text-gray-600">
                            Ordered: {new Date(order.createdAt).toLocaleString()}
                          </p>
                        </div>
                        <div className="flex items-center space-x-2 mt-4 lg:mt-0">
                          <select
                            value={order.status}
                            onChange={(e) => onUpdateOrderStatus(order.id, e.target.value as Order['status'])}
                            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500"
                          >
                            {statusOptions.map(status => (
                              <option key={status} value={status}>
                                {formatStatus(status)}
                              </option>
                            ))}
                          </select>
                          <button className="p-2 text-gray-600 hover:text-orange-600 transition-colors">
                            <Eye className="h-5 w-5" />
                          </button>
                          <button className="p-2 text-gray-600 hover:text-blue-600 transition-colors">
                            <Edit className="h-5 w-5" />
                          </button>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                        <div>
                          <h4 className="font-medium text-gray-900 mb-2">Cake Details</h4>
                          <p className="text-sm text-gray-600">
                            {order.cake.base.name} {order.cake.shape.name} {order.cake.size.name}
                          </p>
                          <p className="text-sm text-gray-600">{order.cake.frosting.name} frosting</p>
                          {order.cake.fillings.length > 0 && (
                            <p className="text-sm text-gray-600">
                              Fillings: {order.cake.fillings.map(f => f.name).join(', ')}
                            </p>
                          )}
                          {order.cake.customMessage && (
                            <p className="text-sm text-gray-600 italic">"{order.cake.customMessage}"</p>
                          )}
                        </div>

                        <div>
                          <h4 className="font-medium text-gray-900 mb-2">Delivery</h4>
                          <p className="text-sm text-gray-600">{order.deliveryDate}</p>
                          <p className="text-sm text-gray-600">{order.deliveryTime}</p>
                          <p className="text-sm text-gray-600">{order.customerInfo.address}</p>
                        </div>

                        <div>
                          <h4 className="font-medium text-gray-900 mb-2">Payment</h4>
                          <p className="text-lg font-semibold text-orange-500">${order.totalAmount.toFixed(2)}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'products' && (
              <div className="text-center py-12">
                <Plus className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Product Management</h3>
                <p className="text-gray-600 mb-6">Manage cake bases, frostings, and add-ons</p>
                <button className="px-6 py-3 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition-colors">
                  Add New Product
                </button>
              </div>
            )}

            {activeTab === 'customers' && (
              <div className="text-center py-12">
                <Users className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Customer Management</h3>
                <p className="text-gray-600 mb-6">View and manage customer accounts</p>
                <div className="bg-white rounded-xl border border-gray-200 max-w-2xl mx-auto">
                  <div className="p-6">
                    <h4 className="font-semibold text-gray-900 mb-4">Recent Customers</h4>
                    <div className="space-y-3">
                      {orders.slice(-10).map((order) => (
                        <div key={order.id} className="flex justify-between items-center">
                          <div>
                            <p className="font-medium text-gray-900">{order.customerInfo.name}</p>
                            <p className="text-sm text-gray-600">{order.customerInfo.email}</p>
                          </div>
                          <span className="text-sm text-gray-500">
                            {new Date(order.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;