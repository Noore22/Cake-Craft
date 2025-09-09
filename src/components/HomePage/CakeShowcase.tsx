import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Heart, ShoppingCart } from 'lucide-react';
import { trendingCakes } from '../../data/cakeData';

const CakeShowcase: React.FC = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Trending Cakes</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover our most popular creations, loved by customers and perfect for any celebration
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {trendingCakes.map((cake) => (
            <div
              key={cake.id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden group hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300"
            >
              <div className="relative overflow-hidden">
                <img
                  src={cake.image}
                  alt={cake.name}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute top-4 right-4">
                  <button className="p-2 bg-white/80 hover:bg-white rounded-full transition-colors shadow-lg">
                    <Heart className="h-5 w-5 text-gray-600 hover:text-red-500" />
                  </button>
                </div>
                <div className="absolute bottom-4 left-4">
                  <div className="flex items-center bg-white/90 rounded-full px-3 py-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-semibold ml-1">4.8</span>
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{cake.name}</h3>
                <p className="text-gray-600 mb-4 text-sm">{cake.description}</p>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-2xl font-bold text-orange-500">${cake.price}</span>
                    <span className="text-gray-500 text-sm ml-1">starting</span>
                  </div>
                  <button className="p-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors shadow-md">
                    <ShoppingCart className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            to="/customize"
            className="inline-flex items-center px-8 py-3 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transform hover:scale-105 transition-all duration-200 shadow-lg"
          >
            <ShoppingCart className="h-5 w-5 mr-2" />
            Design Your Custom Cake
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CakeShowcase;