
import React, { useState } from 'react';
import { Order, OrderStatus } from '../types';

interface OrderTrackerProps {
  order: Order | null;
}

const OrderTracker: React.FC<OrderTrackerProps> = ({ order }) => {
  const [isMinimized, setIsMinimized] = useState(false);

  if (!order || order.status === 'completed') return null;

  const steps: OrderStatus[] = ['kitchen', 'delivery', 'doorstep'];
  const currentStepIndex = steps.indexOf(order.status);
  
  const getStepIcon = (step: OrderStatus) => {
    switch (step) {
      case 'kitchen': return '🍳';
      case 'delivery': return '🛵';
      case 'doorstep': return '🏠';
      default: return '⏱️';
    }
  };

  const getStepLabel = (step: OrderStatus) => {
    switch (step) {
      case 'kitchen': return 'Cooking';
      case 'delivery': return 'On Way';
      case 'doorstep': return 'Arrived';
      default: return 'Pending';
    }
  };

  return (
    <div className={`fixed bottom-6 left-6 z-40 transition-all duration-300 ${isMinimized ? 'w-16 h-16 rounded-full' : 'w-80 rounded-xl'} bg-brand-dark border border-brand-yellow/50 shadow-2xl overflow-hidden`}>
      
      {/* Header */}
      <div 
        className={`bg-brand-yellow text-brand-dark font-bold p-3 flex justify-between items-center cursor-pointer ${isMinimized ? 'h-full justify-center p-0' : ''}`}
        onClick={() => setIsMinimized(!isMinimized)}
      >
        {isMinimized ? (
           <span className="text-2xl animate-pulse">🛵</span>
        ) : (
          <>
            <span className="text-sm">Live Order #{order.id.slice(-4)}</span>
            <button className="text-xs opacity-70 hover:opacity-100">_</button>
          </>
        )}
      </div>

      {!isMinimized && (
        <div className="p-4 bg-black/80 backdrop-blur">
          {/* Progress Bar */}
          <div className="relative flex justify-between items-center mb-2 z-10">
            {/* Connecting Line */}
            <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-800 -z-10"></div>
            <div 
              className="absolute top-1/2 left-0 h-1 bg-brand-yellow -z-10 transition-all duration-1000" 
              style={{width: `${(currentStepIndex / (steps.length - 1)) * 100}%`}}
            ></div>

            {steps.map((step, index) => {
               const isActive = index <= currentStepIndex;
               const isCurrent = index === currentStepIndex;
               
               return (
                 <div key={step} className="flex flex-col items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all duration-500 ${isActive ? 'bg-brand-yellow border-brand-yellow text-black' : 'bg-gray-800 border-gray-600 text-gray-500'} ${isCurrent ? 'animate-bounce' : ''}`}>
                      <span className="text-sm">{getStepIcon(step)}</span>
                    </div>
                    <span className={`text-[10px] uppercase font-bold mt-1 ${isActive ? 'text-brand-yellow' : 'text-gray-600'}`}>
                      {getStepLabel(step)}
                    </span>
                 </div>
               );
            })}
          </div>
          
          <div className="mt-4 pt-3 border-t border-gray-800 text-center">
             <p className="text-xs text-gray-400">Estimated Arrival: <span className="text-white font-mono">15-20 mins</span></p>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderTracker;
