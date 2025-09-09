import React from 'react';
import { Cake, Phone, Mail, MapPin, Facebook, Instagram, Twitter } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <Cake className="h-8 w-8 text-orange-500" />
              <span className="text-xl font-bold">CakeCraft</span>
            </div>
            <p className="text-gray-400 mb-4">
              Creating delicious memories, one cake at a time. Custom cakes made with love and the finest ingredients.
            </p>
            <div className="flex space-x-4">
              <Facebook className="h-5 w-5 text-gray-400 hover:text-orange-500 cursor-pointer transition-colors" />
              <Instagram className="h-5 w-5 text-gray-400 hover:text-orange-500 cursor-pointer transition-colors" />
              <Twitter className="h-5 w-5 text-gray-400 hover:text-orange-500 cursor-pointer transition-colors" />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-orange-500 transition-colors">About Us</a></li>
              <li><a href="#" className="text-gray-400 hover:text-orange-500 transition-colors">Our Cakes</a></li>
              <li><a href="#" className="text-gray-400 hover:text-orange-500 transition-colors">Custom Orders</a></li>
              <li><a href="#" className="text-gray-400 hover:text-orange-500 transition-colors">Delivery Info</a></li>
              <li><a href="#" className="text-gray-400 hover:text-orange-500 transition-colors">FAQ</a></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-orange-500 transition-colors">Birthday Cakes</a></li>
              <li><a href="#" className="text-gray-400 hover:text-orange-500 transition-colors">Wedding Cakes</a></li>
              <li><a href="#" className="text-gray-400 hover:text-orange-500 transition-colors">Corporate Events</a></li>
              <li><a href="#" className="text-gray-400 hover:text-orange-500 transition-colors">Cupcakes</a></li>
              <li><a href="#" className="text-gray-400 hover:text-orange-500 transition-colors">Dessert Tables</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-orange-500" />
                <span className="text-gray-400">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-orange-500" />
                <span className="text-gray-400">orders@cakecraft.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-orange-500" />
                <span className="text-gray-400">123 Baker St, Sweet City</span>
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm text-gray-400">Store Hours:</p>
              <p className="text-sm text-gray-400">Mon-Sat: 8AM - 8PM</p>
              <p className="text-sm text-gray-400">Sun: 10AM - 6PM</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">© 2025 CakeCraft. All rights reserved. Made with ❤️ and lots of sugar.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;