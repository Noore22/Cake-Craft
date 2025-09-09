import React from 'react';
import { CustomCake } from '../../types';

interface CakePreviewProps {
  cake: Partial<CustomCake>;
  totalPrice: number;
}

const CakePreview: React.FC<CakePreviewProps> = ({ cake, totalPrice }) => {
  const getPreviewImage = () => {
    if (cake.frosting?.image) {
      return cake.frosting.image;
    }
    if (cake.base?.image) {
      return cake.base.image;
    }
    return 'https://images.pexels.com/photos/1126359/pexels-photo-1126359.jpeg?auto=compress&cs=tinysrgb&w=300';
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
      <h3 className="text-xl font-bold text-gray-900 mb-4">Your Cake Preview</h3>
      
      <div className="relative mb-6">
        <img
          src={getPreviewImage()}
          alt="Cake Preview"
          className="w-full h-64 object-cover rounded-lg"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg" />
      </div>

      <div className="space-y-3 mb-6">
        {cake.base && (
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Base:</span>
            <span className="font-medium">{cake.base.name}</span>
          </div>
        )}
        
        {cake.shape && cake.size && (
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Shape & Size:</span>
            <span className="font-medium">{cake.shape.name} {cake.size.name}</span>
          </div>
        )}

        {cake.size && (
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Serves:</span>
            <span className="font-medium">{cake.size.serves} people</span>
          </div>
        )}

        {cake.frosting && (
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Frosting:</span>
            <span className="font-medium">{cake.frosting.name}</span>
          </div>
        )}

        {cake.fillings && cake.fillings.length > 0 && (
          <div className="flex justify-between items-start">
            <span className="text-gray-600">Fillings:</span>
            <div className="text-right">
              {cake.fillings.map((filling, index) => (
                <div key={filling.id} className="font-medium text-sm">
                  {filling.name}
                </div>
              ))}
            </div>
          </div>
        )}

        {cake.addons && cake.addons.length > 0 && (
          <div className="flex justify-between items-start">
            <span className="text-gray-600">Add-ons:</span>
            <div className="text-right">
              {cake.addons.map((addon, index) => (
                <div key={addon.id} className="font-medium text-sm">
                  {addon.name}
                </div>
              ))}
            </div>
          </div>
        )}

        {cake.customMessage && (
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Message:</span>
            <span className="font-medium text-sm">"{cake.customMessage}"</span>
          </div>
        )}
      </div>

      <div className="border-t pt-4">
        <div className="flex justify-between items-center">
          <span className="text-lg font-semibold text-gray-900">Total Price:</span>
          <span className="text-2xl font-bold text-orange-500">${totalPrice.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};

export default CakePreview;