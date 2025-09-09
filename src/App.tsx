import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import HomePage from './pages/HomePage';
import CakeCustomizer from './pages/CakeCustomizer';
import OrderPage from './pages/OrderPage';
import Dashboard from './pages/Dashboard';
import AdminPanel from './pages/AdminPanel';
import { CustomCake, Order, User } from './types';
import { useLocalStorage } from './hooks/useLocalStorage';

// Mock user for demo purposes
const mockUser: User = {
  id: '1',
  name: 'Sarah Johnson',
  email: 'sarah@example.com',
  phone: '+1 (555) 123-4567',
  address: '123 Baker Street, Sweet City, SC 12345',
  orders: [],
  favorites: []
};

function App() {
  const [cart, setCart] = useLocalStorage<CustomCake[]>('cakecraft-cart', []);
  const [orders, setOrders] = useLocalStorage<Order[]>('cakecraft-orders', []);
  const [currentUser] = useState<User>(mockUser); // In real app, this would be managed by auth

  const handleAddToCart = (cake: CustomCake) => {
    setCart([...cart, cake]);
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const handlePlaceOrder = (order: Order) => {
    setOrders([...orders, order]);
  };

  const handleReorder = (order: Order) => {
    setCart([order.cake]);
  };

  const handleUpdateOrderStatus = (orderId: string, status: Order['status']) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status } : order
    ));
  };

  const handleAuthClick = () => {
    alert('Authentication would be implemented here in a real application');
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Header 
          cartItemCount={cart.length} 
          currentUser={currentUser}
          onAuthClick={handleAuthClick}
        />
        
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route 
              path="/customize" 
              element={
                <CakeCustomizer 
                  onAddToCart={handleAddToCart}
                />
              } 
            />
            <Route 
              path="/order" 
              element={
                <OrderPage 
                  cart={cart}
                  onPlaceOrder={handlePlaceOrder}
                  onClearCart={handleClearCart}
                />
              } 
            />
            <Route 
              path="/dashboard" 
              element={
                <Dashboard 
                  orders={orders}
                  currentUser={currentUser}
                  onReorder={handleReorder}
                />
              } 
            />
            <Route 
              path="/admin" 
              element={
                <AdminPanel 
                  orders={orders}
                  onUpdateOrderStatus={handleUpdateOrderStatus}
                />
              } 
            />
          </Routes>
        </main>
        
        <Footer />
      </div>
    </Router>
  );
}

export default App;