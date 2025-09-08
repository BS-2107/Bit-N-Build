'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Header } from '../../../../components/layout/Header';
import { Button } from '../../../../components/ui/Button';
import { PayPalButton } from '../../../../components/ui/PayPalButton';
import { useCart } from '../../../../lib/CartContext';

interface RentPageProps {
  params: Promise<{
    toolName: string;
  }>;
}

export default function RentPage({ params }: RentPageProps) {
  const [toolName, setToolName] = useState<string>('');
  const [selectedDuration, setSelectedDuration] = useState('1');
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const { addToCart } = useCart();

  // Resolve params and decode the tool name from URL
  useEffect(() => {
    const resolveParams = async () => {
      try {
        const resolvedParams = await params;
        const decodedToolName = decodeURIComponent(resolvedParams.toolName);
        setToolName(decodedToolName);
        setIsLoading(false);
      } catch (error) {
        console.error('Error resolving params:', error);
        setIsLoading(false);
      }
    };
    
    resolveParams();
  }, [params]);  // Mock tool data - in real app this would come from API
  const toolData = {
    name: toolName,
    price: 59,
    category: 'Creative Software',
    rating: 4.9,
    users: '2.1k',
    description: 'Professional photo editing and graphic design software used by millions of creatives worldwide.',
    features: [
      'Advanced photo editing tools',
      'Layer-based editing',
      'Professional filters and effects',
      'Cloud sync and storage',
      '24/7 customer support',
      'Regular updates and new features'
    ],
    logo: '/logos/After effects.PNG'
  };

  const durations = [
    { value: '1', label: '1 Hour', multiplier: 1 },
    { value: '3', label: '3 Hours', multiplier: 3, discount: 5 },
    { value: '6', label: '6 Hours', multiplier: 6, discount: 10 },
    { value: '12', label: '12 Hours', multiplier: 12, discount: 15 },
    { value: '24', label: '1 Day', multiplier: 24, discount: 20 },
    { value: '168', label: '1 Week', multiplier: 168, discount: 30 }
  ];

  const selectedDurationData = durations.find(d => d.value === selectedDuration);
  const basePrice = toolData.price * (selectedDurationData?.multiplier || 1);
  const discount = selectedDurationData?.discount || 0;
  const discountAmount = (basePrice * discount) / 100;
  const finalPrice = basePrice - discountAmount;

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-primary">
        <Header />
        <main className="pt-24 pb-16">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="flex items-center justify-center h-96">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-accent mx-auto mb-4"></div>
                  <p className="text-dark/60">Loading tool details...</p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  // Show error state if no tool name
  if (!toolName) {
    return (
      <div className="min-h-screen bg-primary">
        <Header />
        <main className="pt-24 pb-16">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center">
                <h1 className="text-3xl font-bold text-dark mb-4">Tool Not Found</h1>
                <p className="text-dark/60 mb-8">The requested tool could not be found.</p>
                <Link href="/browse">
                  <Button>← Browse All Tools</Button>
                </Link>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <Header />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            
            {/* Breadcrumb */}
            <div className="mb-8">
              <nav className="text-sm">
                <Link href="/" className="text-gray-300 hover:text-gray-100">Home</Link>
                <span className="mx-2 text-gray-500">/</span>
                <Link href="/browse" className="text-gray-300 hover:text-gray-100">Browse</Link>
                <span className="mx-2 text-gray-500">/</span>
                <span className="text-gray-100 font-medium">{toolData.name}</span>
              </nav>
            </div>

            <div className="grid lg:grid-cols-2 gap-12">
              
              {/* Tool Information */}
              <div>
                <div className="modern-card p-8 mb-8">
                  <div className="flex items-center mb-6">
                    <div className="w-20 h-20 bg-gradient-to-br from-accent to-accent-light rounded-xl flex items-center justify-center mr-6">
                      <img 
                        src={toolData.logo} 
                        alt={toolData.name}
                        className="w-12 h-12 object-contain"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                          const fallback = document.createElement('div');
                          fallback.className = 'text-3xl';
                          fallback.textContent = '🎨';
                          e.currentTarget.parentNode!.appendChild(fallback);
                        }}
                      />
                    </div>
                    <div>
                      <h1 className="text-3xl font-bold text-gray-100 mb-2">{toolData.name}</h1>
                      <div className="flex items-center space-x-4">
                        <span className="text-sm bg-accent/20 px-3 py-1 rounded-full text-gray-200">
                          {toolData.category}
                        </span>
                        <div className="flex items-center">
                          <span className="text-yellow-500 mr-1">⭐</span>
                          <span className="text-sm font-medium text-gray-200">{toolData.rating}</span>
                          <span className="text-sm text-gray-400 ml-1">({toolData.users} users)</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-gray-300 mb-6 leading-relaxed">
                    {toolData.description}
                  </p>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-gray-100 mb-4">What's Included:</h3>
                    <ul className="space-y-2">
                      {toolData.features.map((feature, index) => (
                        <li key={index} className="flex items-center">
                          <span className="w-5 h-5 bg-accent rounded-full flex items-center justify-center mr-3">
                            <span className="text-white text-xs">✓</span>
                          </span>
                          <span className="text-gray-300">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Rental Options */}
              <div>
                <div className="modern-card p-8 sticky top-24">
                  <h2 className="text-2xl font-bold text-gray-100 mb-6">Rent Now</h2>
                  
                  {/* Duration Selection */}
                  <div className="mb-6">
                    <label className="block text-sm font-semibold text-gray-100 mb-3">
                      Select Duration
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      {durations.map((duration) => (
                        <button
                          key={duration.value}
                          onClick={() => setSelectedDuration(duration.value)}
                          className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                            selectedDuration === duration.value
                              ? 'border-accent bg-accent/10 shadow-lg'
                              : 'border-gray-600 hover:border-accent/50 bg-gray-800/50'
                          }`}
                        >
                          <div className="text-sm font-semibold text-gray-200">
                            {duration.label}
                          </div>
                          {duration.discount && (
                            <div className="text-xs text-accent font-medium">
                              Save {duration.discount}%
                            </div>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Quantity Selection */}
                  <div className="mb-6">
                    <label className="block text-sm font-semibold text-gray-100 mb-3">
                      Quantity
                    </label>
                    <div className="flex items-center space-x-4">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="w-10 h-10 bg-gray-700 rounded-lg flex items-center justify-center hover:bg-gray-600 transition-colors text-gray-200"
                      >
                        -
                      </button>
                      <span className="text-lg font-semibold text-gray-100 w-8 text-center">
                        {quantity}
                      </span>
                      <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="w-10 h-10 bg-gray-700 rounded-lg flex items-center justify-center hover:bg-gray-600 transition-colors text-gray-200"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Price Breakdown */}
                  <div className="mb-6 p-4 bg-gray-800/50 rounded-xl border border-gray-700">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-300">Base Price ({selectedDurationData?.label})</span>
                      <span className="text-gray-100">₹{basePrice}</span>
                    </div>
                    {discount > 0 && (
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-green-400">Discount ({discount}%)</span>
                        <span className="text-green-400">-₹{discountAmount}</span>
                      </div>
                    )}
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-300">Quantity</span>
                      <span className="text-gray-100">×{quantity}</span>
                    </div>
                    <hr className="my-3 border-gray-600" />
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold text-gray-100">Total</span>
                      <span className="text-2xl font-bold text-accent">₹{finalPrice * quantity}</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-4">
                    <Button 
                      variant="secondary" 
                      className="w-full py-4 text-lg font-bold"
                      onClick={() => {
                        addToCart({
                          name: toolData.name,
                          price: toolData.price,
                          duration: selectedDurationData?.label || '1 Hour',
                          durationHours: selectedDurationData?.multiplier || 1,
                          quantity: quantity,
                          logo: toolData.logo,
                          category: toolData.category,
                          discount: selectedDurationData?.discount || 0
                        });
                        alert(`Added ${quantity}x ${toolData.name} (${selectedDurationData?.label}) to cart!`);
                      }}
                    >
                      🛒 Add to Cart - ₹{finalPrice * quantity}
                    </Button>
                    
                    {/* PayPal Direct Checkout */}
                    <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
                      <h3 className="text-sm font-semibold text-gray-100 mb-3 text-center">
                        Rent Now with PayPal
                      </h3>
                      <PayPalButton 
                        amount={finalPrice * quantity}
                        toolName={toolData.name}
                        quantity={quantity}
                        duration={selectedDurationData?.label || '1 month'}
                        onSuccess={(paymentData) => {
                          alert(`Successfully rented ${quantity}x ${toolData.name} (${selectedDurationData?.label})! Payment ID: ${paymentData?.id}. Access details will be sent to your email.`);
                        }}
                        onError={(error) => {
                          console.error('PayPal payment error:', error);
                          let errorMessage = 'Payment failed. Please try again or add to cart.';
                          
                          if (error instanceof Error) {
                            errorMessage = `Payment failed: ${error.message}`;
                          } else if (typeof error === 'string') {
                            errorMessage = `Payment failed: ${error}`;
                          }
                          
                          alert(errorMessage);
                        }}
                      />
                    </div>
                  </div>

                  {/* Security Notice */}
                  <div className="mt-6 p-4 bg-green-900/20 rounded-xl border border-green-800/30">
                    <div className="flex items-center mb-2">
                      <span className="text-lg mr-2">🔒</span>
                      <span className="font-semibold text-gray-100">Secure & Safe</span>
                    </div>
                    <p className="text-sm text-gray-300">
                      Your rental is protected with end-to-end encryption. Account credentials are automatically reset after your rental period.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}