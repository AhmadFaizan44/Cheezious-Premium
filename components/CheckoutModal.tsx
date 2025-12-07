
import React, { useState } from 'react';
import { DeliveryDetails } from '../types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartTotal: number;
  onSubmit: (details: DeliveryDetails) => void;
}

const CheckoutModal: React.FC<CheckoutModalProps> = ({ isOpen, onClose, cartTotal, onSubmit }) => {
  const [step, setStep] = useState(1);
  const [isLoadingLoc, setIsLoadingLoc] = useState(false);
  
  const [details, setDetails] = useState<DeliveryDetails>({
    name: '',
    phone: '',
    address: '',
    paymentMethod: 'cod'
  });

  if (!isOpen) return null;

  const simulateGeolocation = () => {
    setIsLoadingLoc(true);
    // Simulate API delay
    setTimeout(() => {
      setDetails(prev => ({
        ...prev,
        address: '123 Gourmet Street, Foodie District, Islamabad',
        coordinates: { lat: 33.6844, lng: 73.0479 }
      }));
      setIsLoadingLoc(false);
    }, 1500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(details);
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center sm:items-center">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose}></div>
      
      <div className="relative w-full max-w-md bg-brand-gray rounded-t-2xl sm:rounded-2xl border-t sm:border border-brand-yellow/20 shadow-2xl animate-slide-up overflow-hidden">
        
        {/* Header */}
        <div className="p-6 bg-brand-yellow/10 border-b border-brand-yellow/10">
          <h2 className="text-2xl font-serif text-brand-yellow">Checkout</h2>
          <p className="text-gray-400 text-sm">Complete your order details</p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          
          {/* Input Group */}
          <div className="space-y-4">
             <div>
               <label className="block text-xs uppercase text-gray-500 mb-1">Full Name</label>
               <input 
                 required
                 type="text" 
                 value={details.name}
                 onChange={e => setDetails({...details, name: e.target.value})}
                 className="w-full bg-black/50 border border-gray-700 rounded p-3 text-white focus:border-brand-yellow outline-none"
                 placeholder="John Doe"
               />
             </div>
             <div>
               <label className="block text-xs uppercase text-gray-500 mb-1">Phone Number</label>
               <input 
                 required
                 type="tel" 
                 value={details.phone}
                 onChange={e => setDetails({...details, phone: e.target.value})}
                 className="w-full bg-black/50 border border-gray-700 rounded p-3 text-white focus:border-brand-yellow outline-none"
                 placeholder="0300-1234567"
               />
             </div>
             <div>
               <label className="block text-xs uppercase text-gray-500 mb-1">Delivery Address</label>
               <div className="flex gap-2">
                 <textarea 
                   required
                   value={details.address}
                   onChange={e => setDetails({...details, address: e.target.value})}
                   className="flex-1 bg-black/50 border border-gray-700 rounded p-3 text-white focus:border-brand-yellow outline-none h-24 resize-none"
                   placeholder="House #, Street, Area..."
                 />
                 <button 
                   type="button"
                   onClick={simulateGeolocation}
                   className="bg-brand-gray border border-gray-600 rounded p-2 text-brand-yellow hover:bg-gray-700 transition-colors flex flex-col items-center justify-center gap-1 w-16"
                   title="Use Current Location"
                 >
                   {isLoadingLoc ? (
                     <div className="w-5 h-5 border-2 border-brand-yellow border-t-transparent rounded-full animate-spin"></div>
                   ) : (
                     <>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span className="text-[10px] leading-tight text-center">Locate Me</span>
                     </>
                   )}
                 </button>
               </div>
             </div>
          </div>

          {/* Payment Method */}
          <div>
             <label className="block text-xs uppercase text-gray-500 mb-3">Payment Method</label>
             <div className="grid grid-cols-2 gap-4">
               <div 
                 onClick={() => setDetails({...details, paymentMethod: 'cod'})}
                 className={`cursor-pointer p-4 rounded-lg border flex flex-col items-center gap-2 transition-all ${details.paymentMethod === 'cod' ? 'bg-brand-yellow/20 border-brand-yellow text-brand-yellow' : 'bg-black/50 border-gray-700 text-gray-400 hover:bg-gray-800'}`}
               >
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                 </svg>
                 <span className="font-bold text-sm">Cash on Delivery</span>
               </div>
               <div 
                 onClick={() => setDetails({...details, paymentMethod: 'card'})}
                 className={`cursor-pointer p-4 rounded-lg border flex flex-col items-center gap-2 transition-all ${details.paymentMethod === 'card' ? 'bg-brand-yellow/20 border-brand-yellow text-brand-yellow' : 'bg-black/50 border-gray-700 text-gray-400 hover:bg-gray-800'}`}
               >
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                 </svg>
                 <span className="font-bold text-sm">Credit Card (Sim)</span>
               </div>
             </div>
          </div>

          <button 
            type="submit"
            className="w-full bg-brand-yellow text-brand-dark py-4 rounded-lg font-bold text-lg hover:bg-yellow-400 transition shadow-lg active:scale-95"
          >
            Confirm Order - Rs. {cartTotal}
          </button>

        </form>
      </div>
    </div>
  );
};

export default CheckoutModal;
