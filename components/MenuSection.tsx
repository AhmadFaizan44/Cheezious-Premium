
import React from 'react';
import { MenuItem } from '../types';

interface MenuSectionProps {
  title: string;
  items: MenuItem[];
  id: string;
  onAddToCart: (item: MenuItem) => void;
  favorites: Set<string>;
  onToggleFavorite: (id: string) => void;
}

const MenuSection: React.FC<MenuSectionProps> = ({ title, items, id, onAddToCart, favorites, onToggleFavorite }) => {
  // Group by subcategory if exists
  const groupedItems = items.reduce((acc, item) => {
    const key = item.subCategory || 'General';
    if (!acc[key]) acc[key] = [];
    acc[key].push(item);
    return acc;
  }, {} as Record<string, MenuItem[]>);

  return (
    <section id={id} className="py-12 px-6 max-w-7xl mx-auto relative z-10 animate-fade-in">
      {/* Removed Title Header to avoid duplication with Tabs, but kept grouping headers */}
      
      {Object.entries(groupedItems).map(([subCat, subItems]) => (
        <div key={subCat} className="mb-12">
          {subCat !== 'General' && (
            <h3 className="text-2xl text-brand-cream mb-8 pl-4 border-l-4 border-brand-yellow font-light tracking-widest uppercase">
              {subCat}
            </h3>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {subItems.map((item) => (
              <div key={item.id} className="group flex flex-col relative overflow-hidden bg-brand-gray rounded-lg hover:bg-white/10 transition-colors duration-300 shadow-xl border border-white/5">
                
                {/* Image Area */}
                <div className="h-64 overflow-hidden relative">
                  <img 
                    src={item.imageUrl} 
                    alt={item.name}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-60"></div>
                  
                  {/* Favorite Icon */}
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleFavorite(item.id);
                    }}
                    className="absolute top-3 right-3 p-2 rounded-full bg-black/40 hover:bg-black/60 transition-colors z-20"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 transition-colors ${favorites.has(item.id) ? 'text-red-500 fill-current' : 'text-white'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </button>
                </div>

                <div className="p-6 flex flex-col flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="text-xl font-bold text-brand-cream">{item.name}</h4>
                  </div>
                  <p className="text-gray-400 text-sm leading-relaxed mb-4 flex-1">{item.description}</p>
                  
                  <div className="mt-4 flex items-center justify-between border-t border-gray-700 pt-4">
                    <span className="text-brand-yellow font-bold text-lg whitespace-nowrap">
                       {typeof item.price === 'number' ? `Rs. ${item.price}` : item.price}
                    </span>
                    <button 
                      onClick={() => onAddToCart(item)}
                      className="bg-brand-yellow text-brand-dark px-6 py-2 rounded-full font-bold text-sm hover:bg-yellow-300 transition-colors shadow-lg active:scale-95 uppercase tracking-wide"
                    >
                      Customize
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
};

export default MenuSection;
