import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Cake, ShoppingCart, User, Settings } from 'lucide-react';

interface HeaderProps {
  cartItemCount: number;
  currentUser: any;
  onAuthClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ cartItemCount, currentUser, onAuthClick }) => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2 group">
            <Cake className="h-8 w-8 text-orange-500 group-hover:text-orange-600 transition-colors" />
            <span className="text-xl font-bold text-gray-900 group-hover:text-orange-600 transition-colors">
              CakeCraft
            </span>
          </Link>

          <nav className="hidden md:flex space-x-8">
            <Link
              to="/"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/') 
                  ? 'text-orange-600 bg-orange-50' 
                  : 'text-gray-700 hover:text-orange-600 hover:bg-orange-50'
              }`}
            >
              Home
            </Link>
            <Link
              to="/customize"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/customize') 
                  ? 'text-orange-600 bg-orange-50' 
                  : 'text-gray-700 hover:text-orange-600 hover:bg-orange-50'
              }`}
            >
              Design Cake
            </Link>
            <Link
              to="/dashboard"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/dashboard') 
                  ? 'text-orange-600 bg-orange-50' 
                  : 'text-gray-700 hover:text-orange-600 hover:bg-orange-50'
              }`}
            >
              Dashboard
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            <Link
              to="/order"
              className="relative p-2 text-gray-700 hover:text-orange-600 transition-colors"
            >
              <ShoppingCart className="h-6 w-6" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </Link>

            {currentUser ? (
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-700">Hi, {currentUser.name}</span>
                <Link
                  to="/admin"
                  className="p-2 text-gray-700 hover:text-orange-600 transition-colors"
                >
                  <Settings className="h-5 w-5" />
                </Link>
              </div>
            ) : (
              <button
                onClick={onAuthClick}
                className="flex items-center space-x-1 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
              >
                <User className="h-4 w-4" />
                <span>Sign In</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;