import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import StepIndicator from '../components/CakeCustomizer/StepIndicator';
import CakePreview from '../components/CakeCustomizer/CakePreview';
import { CustomCake, CakeBase, CakeShape, CakeSize, CakeFilling, CakeFrosting, CakeAddon } from '../types';
import { cakeBases, cakeShapes, cakeFillings, cakeFrostings, cakeAddons } from '../data/cakeData';

const steps = ['Base', 'Shape & Size', 'Fillings', 'Frosting', 'Add-ons', 'Message'];

interface CakeCustomizerProps {
  onAddToCart: (cake: CustomCake) => void;
}

const CakeCustomizer: React.FC<CakeCustomizerProps> = ({ onAddToCart }) => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [customMessage, setCustomMessage] = useState('');
  
  const [selectedItems, setSelectedItems] = useState({
    base: null as CakeBase | null,
    shape: null as CakeShape | null,
    size: null as CakeSize | null,
    fillings: [] as CakeFilling[],
    frosting: null as CakeFrosting | null,
    addons: [] as CakeAddon[]
  });

  const calculatePrice = (): number => {
    let total = 0;
    
    if (selectedItems.base) total += selectedItems.base.price;
    if (selectedItems.shape && selectedItems.size) {
      const basePrice = selectedItems.base?.price || 0;
      total += basePrice * selectedItems.shape.priceMultiplier * selectedItems.size.priceMultiplier;
      total -= selectedItems.base?.price || 0; // Remove base price to avoid double counting
    }
    if (selectedItems.frosting) total += selectedItems.frosting.price;
    
    selectedItems.fillings.forEach(filling => total += filling.price);
    selectedItems.addons.forEach(addon => total += addon.price);
    
    if (customMessage) total += 5; // Custom message fee
    
    return total;
  };

  const isStepComplete = (step: number): boolean => {
    switch (step) {
      case 0: return selectedItems.base !== null;
      case 1: return selectedItems.shape !== null && selectedItems.size !== null;
      case 2: return true; // Fillings are optional
      case 3: return selectedItems.frosting !== null;
      case 4: return true; // Add-ons are optional
      case 5: return true; // Message is optional
      default: return false;
    }
  };

  const canProceed = (): boolean => {
    return isStepComplete(currentStep);
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1 && canProceed()) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleAddToCart = () => {
    if (selectedItems.base && selectedItems.shape && selectedItems.size && selectedItems.frosting) {
      const customCake: CustomCake = {
        base: selectedItems.base,
        shape: selectedItems.shape,
        size: selectedItems.size,
        fillings: selectedItems.fillings,
        frosting: selectedItems.frosting,
        addons: selectedItems.addons,
        customMessage: customMessage || undefined,
        totalPrice: calculatePrice()
      };
      
      onAddToCart(customCake);
      navigate('/order');
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Choose Your Cake Base</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {cakeBases.map((base) => (
                <div
                  key={base.id}
                  className={`cursor-pointer rounded-lg border-2 p-4 transition-all hover:shadow-lg ${
                    selectedItems.base?.id === base.id
                      ? 'border-orange-500 bg-orange-50'
                      : 'border-gray-200 hover:border-orange-300'
                  }`}
                  onClick={() => setSelectedItems({ ...selectedItems, base })}
                >
                  <img src={base.image} alt={base.name} className="w-full h-32 object-cover rounded-md mb-3" />
                  <h3 className="font-semibold text-gray-900">{base.name}</h3>
                  <p className="text-orange-500 font-medium">${base.price}</p>
                </div>
              ))}
            </div>
          </div>
        );

      case 1:
        return (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Select Shape & Size</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Shape:</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {cakeShapes.map((shape) => (
                    <div
                      key={shape.id}
                      className={`cursor-pointer rounded-lg border-2 p-4 text-center transition-all ${
                        selectedItems.shape?.id === shape.id
                          ? 'border-orange-500 bg-orange-50'
                          : 'border-gray-200 hover:border-orange-300'
                      }`}
                      onClick={() => setSelectedItems({ ...selectedItems, shape, size: null })}
                    >
                      <h4 className="font-medium">{shape.name}</h4>
                      <p className="text-sm text-gray-600">+{((shape.priceMultiplier - 1) * 100).toFixed(0)}%</p>
                    </div>
                  ))}
                </div>
              </div>

              {selectedItems.shape && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Size:</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {selectedItems.shape.sizes.map((size) => (
                      <div
                        key={size.id}
                        className={`cursor-pointer rounded-lg border-2 p-4 transition-all ${
                          selectedItems.size?.id === size.id
                            ? 'border-orange-500 bg-orange-50'
                            : 'border-gray-200 hover:border-orange-300'
                        }`}
                        onClick={() => setSelectedItems({ ...selectedItems, size })}
                      >
                        <h4 className="font-medium">{size.name}</h4>
                        <p className="text-sm text-gray-600">Serves {size.serves} people</p>
                        <p className="text-orange-500 font-medium">
                          ${((selectedItems.base?.price || 0) * selectedItems.shape!.priceMultiplier * size.priceMultiplier).toFixed(2)}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        );

      case 2:
        return (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Choose Fillings (Optional)</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {cakeFillings.map((filling) => (
                <label
                  key={filling.id}
                  className={`cursor-pointer rounded-lg border-2 p-4 flex items-center space-x-3 transition-all hover:shadow-md ${
                    selectedItems.fillings.some(f => f.id === filling.id)
                      ? 'border-orange-500 bg-orange-50'
                      : 'border-gray-200 hover:border-orange-300'
                  }`}
                >
                  <input
                    type="checkbox"
                    className="rounded border-gray-300 text-orange-500 focus:ring-orange-500"
                    checked={selectedItems.fillings.some(f => f.id === filling.id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedItems({
                          ...selectedItems,
                          fillings: [...selectedItems.fillings, filling]
                        });
                      } else {
                        setSelectedItems({
                          ...selectedItems,
                          fillings: selectedItems.fillings.filter(f => f.id !== filling.id)
                        });
                      }
                    }}
                  />
                  <div className="flex-1">
                    <h4 className="font-medium">{filling.name}</h4>
                    <p className="text-orange-500 font-medium">${filling.price}</p>
                  </div>
                </label>
              ))}
            </div>
          </div>
        );

      case 3:
        return (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Select Frosting</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {cakeFrostings.map((frosting) => (
                <div
                  key={frosting.id}
                  className={`cursor-pointer rounded-lg border-2 p-4 transition-all hover:shadow-lg ${
                    selectedItems.frosting?.id === frosting.id
                      ? 'border-orange-500 bg-orange-50'
                      : 'border-gray-200 hover:border-orange-300'
                  }`}
                  onClick={() => setSelectedItems({ ...selectedItems, frosting })}
                >
                  <img src={frosting.image} alt={frosting.name} className="w-full h-32 object-cover rounded-md mb-3" />
                  <h3 className="font-semibold text-gray-900">{frosting.name}</h3>
                  <p className="text-orange-500 font-medium">${frosting.price}</p>
                </div>
              ))}
            </div>
          </div>
        );

      case 4:
        return (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Add Decorations (Optional)</h2>
            <div className="space-y-6">
              {['decoration', 'candle', 'message'].map((category) => (
                <div key={category}>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 capitalize">
                    {category === 'message' ? 'Message Options' : `${category}s`}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {cakeAddons.filter(addon => addon.category === category).map((addon) => (
                      <label
                        key={addon.id}
                        className={`cursor-pointer rounded-lg border-2 p-4 flex items-center space-x-3 transition-all hover:shadow-md ${
                          selectedItems.addons.some(a => a.id === addon.id)
                            ? 'border-orange-500 bg-orange-50'
                            : 'border-gray-200 hover:border-orange-300'
                        }`}
                      >
                        <input
                          type="checkbox"
                          className="rounded border-gray-300 text-orange-500 focus:ring-orange-500"
                          checked={selectedItems.addons.some(a => a.id === addon.id)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedItems({
                                ...selectedItems,
                                addons: [...selectedItems.addons, addon]
                              });
                            } else {
                              setSelectedItems({
                                ...selectedItems,
                                addons: selectedItems.addons.filter(a => a.id !== addon.id)
                              });
                            }
                          }}
                        />
                        <div className="flex-1">
                          <h4 className="font-medium">{addon.name}</h4>
                          <p className="text-orange-500 font-medium">${addon.price}</p>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 5:
        return (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Custom Message (Optional)</h2>
            <div className="max-w-md">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Add a personal message to your cake ($5)
              </label>
              <textarea
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500"
                rows={3}
                placeholder="e.g., Happy Birthday Sarah!"
                value={customMessage}
                onChange={(e) => setCustomMessage(e.target.value)}
                maxLength={100}
              />
              <p className="text-sm text-gray-500 mt-1">
                {customMessage.length}/100 characters
              </p>
            </div>
            
            {/* Final Summary */}
            <div className="mt-8 bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Base Cake ({selectedItems.base?.name})</span>
                  <span>${selectedItems.base?.price}</span>
                </div>
                {selectedItems.shape && selectedItems.size && (
                  <div className="flex justify-between">
                    <span>{selectedItems.shape.name} {selectedItems.size.name}</span>
                    <span>
                      ${(((selectedItems.base?.price || 0) * selectedItems.shape.priceMultiplier * selectedItems.size.priceMultiplier) - (selectedItems.base?.price || 0)).toFixed(2)}
                    </span>
                  </div>
                )}
                {selectedItems.frosting && (
                  <div className="flex justify-between">
                    <span>{selectedItems.frosting.name} Frosting</span>
                    <span>${selectedItems.frosting.price}</span>
                  </div>
                )}
                {selectedItems.fillings.map(filling => (
                  <div key={filling.id} className="flex justify-between">
                    <span>{filling.name} Filling</span>
                    <span>${filling.price}</span>
                  </div>
                ))}
                {selectedItems.addons.map(addon => (
                  <div key={addon.id} className="flex justify-between">
                    <span>{addon.name}</span>
                    <span>${addon.price}</span>
                  </div>
                ))}
                {customMessage && (
                  <div className="flex justify-between">
                    <span>Custom Message</span>
                    <span>$5</span>
                  </div>
                )}
                <div className="border-t pt-2 font-semibold">
                  <div className="flex justify-between text-lg">
                    <span>Total</span>
                    <span className="text-orange-500">${calculatePrice().toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const isComplete = selectedItems.base && selectedItems.shape && selectedItems.size && selectedItems.frosting;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <button
            onClick={() => navigate('/')}
            className="flex items-center text-gray-600 hover:text-orange-600 transition-colors mb-4"
          >
            <ArrowLeft className="h-5 w-5 mr-1" />
            Back to Home
          </button>
          <h1 className="text-3xl font-bold text-gray-900">Design Your Perfect Cake</h1>
        </div>

        <StepIndicator steps={steps} currentStep={currentStep} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              {renderStep()}
            </div>

            <div className="flex justify-between mt-6">
              <button
                onClick={prevStep}
                disabled={currentStep === 0}
                className={`flex items-center px-6 py-3 rounded-lg font-medium transition-colors ${
                  currentStep === 0
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                <ArrowLeft className="h-5 w-5 mr-2" />
                Previous
              </button>

              {currentStep === steps.length - 1 ? (
                <button
                  onClick={handleAddToCart}
                  disabled={!isComplete}
                  className={`px-8 py-3 rounded-lg font-medium transition-colors ${
                    isComplete
                      ? 'bg-orange-500 text-white hover:bg-orange-600'
                      : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  Add to Cart - ${calculatePrice().toFixed(2)}
                </button>
              ) : (
                <button
                  onClick={nextStep}
                  disabled={!canProceed()}
                  className={`flex items-center px-6 py-3 rounded-lg font-medium transition-colors ${
                    canProceed()
                      ? 'bg-orange-500 text-white hover:bg-orange-600'
                      : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  Next
                  <ArrowRight className="h-5 w-5 ml-2" />
                </button>
              )}
            </div>
          </div>

          <div className="lg:col-span-1">
            <CakePreview 
              cake={{
                base: selectedItems.base,
                shape: selectedItems.shape,
                size: selectedItems.size,
                fillings: selectedItems.fillings,
                frosting: selectedItems.frosting,
                addons: selectedItems.addons,
                customMessage
              }}
              totalPrice={calculatePrice()}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CakeCustomizer;