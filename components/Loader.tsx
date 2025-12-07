import React from 'react';

const Loader: React.FC = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-brand-dark">
      <div className="text-center">
        <div className="relative w-32 h-32 mx-auto mb-8 animate-pulse">
             {/* Abstract Cheese Pull Animation */}
             <div className="absolute inset-0 border-4 border-brand-yellow rounded-full animate-spin-slow border-t-transparent"></div>
             <div className="absolute inset-4 border-4 border-brand-cream rounded-full animate-spin border-b-transparent"></div>
             <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-4xl">🍕</span>
             </div>
        </div>
        <h1 className="text-4xl font-serif text-brand-yellow tracking-widest animate-slide-up">
          CHEEZIOUS
        </h1>
        <p className="mt-2 text-brand-cream text-sm uppercase tracking-[0.3em] animate-fade-in opacity-0" style={{animationDelay: '0.5s'}}>
          Premium Taste
        </p>
      </div>
    </div>
  );
};

export default Loader;