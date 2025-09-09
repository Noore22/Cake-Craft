import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Star, Repeat, Eye, Heart } from 'lucide-react';
import { Order, User } from '../types';

interface DashboardProps {
  orders: Order[];
  currentUser: User | null;
  onReorder: (order: Order) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ orders, currentUser, onReorder }) => {
  const [activeTab, setActiveTab] = useState<'orders' | 'favorites'>('orders');

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

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-gray-50 py-16">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Please Sign In</h1>
          <p className="text-gray-600 mb-8">Sign in to view your orders and manage your account</p>
          <button className="px-8 py-3 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition-colors">
            Sign In
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Welcome back, {currentUser.name}!</h1>
          <p className="text-gray-600 mt-2">Manage your orders and track your cake deliveries</p>
        </div>

        {/* Dashboard Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center">
              <div className="p-3 bg-orange-100 rounded-lg">
                <Calendar className="h-6 w-6 text-orange-500" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Total Orders</p>
                <p className="text-2xl font-bold text-gray-900">{orders.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-lg">
                <Clock className="h-6 w-6 text-green-500" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Completed</p>
                <p className="text-2xl font-bold text-gray-900">
                  {orders.filter(o => o.status === 'delivered').length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 rounded-lg">
                <MapPin className="h-6 w-6 text-blue-500" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">In Progress</p>
                <p className="text-2xl font-bold text-gray-900">
                  {orders.filter(o => !['delivered', 'cancelled'].includes(o.status)).length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center">
              <div className="p-3 bg-purple-100 rounded-lg">
                <Heart className="h-6 w-6 text-purple-500" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Favorites</p>
                <p className="text-2xl font-bold text-gray-900">{currentUser.favorites?.length || 0}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="border-b border-gray-200">
            <nav className="flex">
              <button
                onClick={() => setActiveTab('orders')}
                className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === 'orders'
                    ? 'border-orange-500 text-orange-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Order History ({orders.length})
              </button>
              <button
                onClick={() => setActiveTab('favorites')}
                className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === 'favorites'
                    ? 'border-orange-500 text-orange-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Favorites ({currentUser.favorites?.length || 0})
              </button>
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'orders' ? (
              <div className="space-y-6">
                {orders.length === 0 ? (
                  <div className="text-center py-12">
                    <Calendar className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">No orders yet</h3>
                    <p className="text-gray-600 mb-6">Start by designing your perfect cake!</p>
                    <button className="px-6 py-3 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition-colors">
                      Design a Cake
                    </button>
                  </div>
                ) : (
                  orders.slice().reverse().map((order) => (
                    <div key={order.id} className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
                      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-1">
                            Order #{order.id}
                          </h3>
                          <p className="text-sm text-gray-600">
                            Placed on {new Date(order.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="flex items-center space-x-4 mt-2 lg:mt-0">
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                            {formatStatus(order.status)}
                          </span>
                          <span className="text-lg font-bold text-orange-500">
                            ${order.totalAmount.toFixed(2)}
                          </span>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
                        <div>
                          <h4 className="font-medium text-gray-900 mb-2">Cake Details</h4>
                          <p className="text-sm text-gray-600">
                            {order.cake.base.name} {order.cake.shape.name} {order.cake.size.name}
                          </p>
                          <p className="text-sm text-gray-600">{order.cake.frosting.name} frosting</p>
                          {order.cake.customMessage && (
                            <p className="text-sm text-gray-600 italic">"{order.cake.customMessage}"</p>
                          )}
                        </div>

                        <div>
                          <h4 className="font-medium text-gray-900 mb-2">Delivery Info</h4>
                          <div className="flex items-center text-sm text-gray-600 mb-1">
                            <Calendar className="h-4 w-4 mr-1" />
                            {order.deliveryDate}
                          </div>
                          <div className="flex items-center text-sm text-gray-600 mb-1">
                            <Clock className="h-4 w-4 mr-1" />
                            {order.deliveryTime}
                          </div>
                          <div className="flex items-start text-sm text-gray-600">
                            <MapPin className="h-4 w-4 mr-1 mt-0.5 flex-shrink-0" />
                            <span className="line-clamp-2">{order.customerInfo.address}</span>
                          </div>
                        </div>

                        <div className="flex flex-col space-y-2">
                          <button
                            onClick={() => onReorder(order)}
                            className="flex items-center justify-center px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                          >
                            <Repeat className="h-4 w-4 mr-2" />
                            Reorder
                          </button>
                          <button className="flex items-center justify-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                            <Eye className="h-4 w-4 mr-2" />
                            View Details
                          </button>
                          {order.status === 'delivered' && (
                            <button className="flex items-center justify-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                              <Star className="h-4 w-4 mr-2" />
                              Rate Order
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Order Progress */}
                      {order.status !== 'delivered' && (
                        <div className="mt-4">
                          <h4 className="font-medium text-gray-900 mb-3">Order Progress</h4>
                          <div className="flex items-center justify-between">
                            {['confirmed', 'baking', 'decorating', 'ready', 'out-for-delivery', 'delivered'].map((step, index, array) => (
                              <div key={step} className="flex items-center">
                                <div className={`w-3 h-3 rounded-full ${
                                  array.indexOf(order.status) >= index ? 'bg-orange-500' : 'bg-gray-300'
                                }`} />
                                {index < array.length - 1 && (
                                  <div className={`w-8 h-0.5 ${
                                    array.indexOf(order.status) > index ? 'bg-orange-500' : 'bg-gray-300'
                                  }`} />
                                )}
                              </div>
                            ))}
                          </div>
                          <div className="flex justify-between text-xs text-gray-600 mt-2">
                            <span>Confirmed</span>
                            <span>Baking</span>
                            <span>Decorating</span>
                            <span>Ready</span>
                            <span>Out</span>
                            <span>Delivered</span>
                          </div>
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
            ) : (
              <div className="text-center py-12">
                <Heart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No favorites yet</h3>
                <p className="text-gray-600 mb-6">Save cakes you love to easily reorder them later!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;