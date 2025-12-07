import React, { useMemo } from 'react';
import { CartItem, Order } from '../types';

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onCheckout: (order: Order) => void;
}

const CartSidebar: React.FC<CartSidebarProps> = ({ 
  isOpen, 
  onClose, 
  cartItems, 
  onUpdateQuantity, 
  onRemoveItem,
  onCheckout 
}) => {
  const total = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + (item.selectedPrice * item.quantity), 0);
  }, [cartItems]);

  const handleCheckout = () => {
    if (cartItems.length === 0) return;

    const newOrder: Order = {
      id: `ORD-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`,
      date: new Date().toLocaleString(),
      items: [...cartItems],
      total: total,
      status: 'pending'
    };

    onCheckout(newOrder);
  };

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 transition-opacity" 
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed top-0 right-0 h-full w-full max-w-md bg-brand-dark border-l border-brand-yellow/20 z-50 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'} flex flex-col`}>
        
        {/* Header */}
        <div className="p-6 border-b border-white/10 flex justify-between items-center bg-brand-yellow/5">
          <h2 className="text-2xl font-serif text-brand-yellow">Your Order</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-500 space-y-4">
              <span className="text-6xl">🛒</span>
              <p>Your cart is empty</p>
              <button onClick={onClose} className="text-brand-yellow hover:underline">Start Ordering</button>
            </div>
          ) : (
            cartItems.map((item) => (
              <div key={item.id} className="flex gap-4 bg-white/5 p-4 rounded-lg border border-white/5">
                <div className="w-20 h-20 rounded-md overflow-hidden flex-shrink-0">
                  <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <h4 className="font-bold text-brand-cream text-sm leading-tight">{item.name}</h4>
                    <span className="text-brand-yellow font-bold text-sm ml-2">Rs. {item.selectedPrice * item.quantity}</span>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <div className="flex items-center bg-black rounded-full border border-gray-700">
                      <button 
                        onClick={() => onUpdateQuantity(item.id, -1)}
                        className="px-3 py-1 text-gray-400 hover:text-white hover:bg-gray-800 rounded-l-full transition-colors"
                      >
                        -
                      </button>
                      <span className="text-sm w-4 text-center">{item.quantity}</span>
                      <button 
                        onClick={() => onUpdateQuantity(item.id, 1)}
                        className="px-3 py-1 text-gray-400 hover:text-white hover:bg-gray-800 rounded-r-full transition-colors"
                      >
                        +
                      </button>
                    </div>
                    <button 
                      onClick={() => onRemoveItem(item.id)}
                      className="text-xs text-red-500 hover:text-red-400 underline"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
          <div className="p-6 border-t border-white/10 bg-black/40">
            <div className="flex justify-between items-center mb-6">
              <span className="text-gray-400">Total Amount</span>
              <span className="text-2xl font-bold text-brand-yellow">Rs. {total}</span>
            </div>
            <button 
              onClick={handleCheckout}
              className="w-full bg-brand-yellow text-brand-dark font-bold py-4 rounded-lg hover:bg-yellow-400 transition-all transform active:scale-95 shadow-lg"
            >
              Checkout Now
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default CartSidebar;