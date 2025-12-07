
import React, { useState, useEffect } from 'react';
import { MenuItem, SectionType, Size, Crust, CartItem } from '../types';

interface ProductCustomizerProps {
  item: MenuItem | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (cartItem: CartItem) => void;
}

const ProductCustomizer: React.FC<ProductCustomizerProps> = ({ item, isOpen, onClose, onAddToCart }) => {
  const [size, setSize] = useState<Size>('Regular');
  const [crust, setCrust] = useState<Crust>('Pan');
  const [extras, setExtras] = useState<string[]>([]);
  const [basePrice, setBasePrice] = useState(0);

  useEffect(() => {
    if (item) {
      // Extract base price number
      let price = 0;
      if (typeof item.price === 'number') {
        price = item.price;
      } else {
        const match = item.price.toString().match(/(\d+)/);
        price = match ? parseInt(match[0]) : 0;
      }
      setBasePrice(price);
      // Reset defaults
      setSize('Regular');
      setCrust('Pan');
      setExtras([]);
    }
  }, [item]);

  if (!isOpen || !item) return null;

  const calculateTotal = () => {
    let total = basePrice;
    
    // Size Logic
    if (size === 'Large') total += 400;
    if (size === 'Small') total -= 200;

    // Crust Logic
    if (crust === 'Stuffed') total += 150;

    // Extras Logic
    total += extras.length * 100;

    return Math.max(0, total);
  };

  const handleAddToCart = () => {
    const finalItem: CartItem = {
      ...item,
      quantity: 1,
      selectedPrice: calculateTotal(),
      selectedSize: size,
      selectedCrust: item.category === SectionType.PIZZAS ? crust : undefined,
      selectedExtras: extras
    };
    onAddToCart(finalItem);
    onClose();
  };

  const toggleExtra = (extra: string) => {
    setExtras(prev => 
      prev.includes(extra) ? prev.filter(e => e !== extra) : [...prev, extra]
    );
  };

  const isPizza = item.category === SectionType.PIZZAS;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative bg-brand-gray w-full max-w-lg rounded-2xl overflow-hidden border border-brand-yellow/20 shadow-2xl animate-slide-up">
        
        {/* Header Image */}
        <div className="h-48 relative">
           <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
           <div className="absolute inset-0 bg-gradient-to-t from-brand-gray to-transparent"></div>
           <button onClick={onClose} className="absolute top-4 right-4 bg-black/50 p-2 rounded-full hover:bg-black text-white">
             <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
             </svg>
           </button>
           <div className="absolute bottom-4 left-6">
             <h2 className="text-3xl font-serif text-brand-yellow">{item.name}</h2>
             <p className="text-gray-300 text-sm">{item.description}</p>
           </div>
        </div>

        {/* Options */}
        <div className="p-6 space-y-6 max-h-[50vh] overflow-y-auto">
          
          {/* Size Selection */}
          <div>
            <h3 className="text-brand-cream font-bold mb-3 uppercase text-sm tracking-wider">Select Size</h3>
            <div className="grid grid-cols-3 gap-3">
              {(['Small', 'Regular', 'Large'] as Size[]).map(s => (
                <button
                  key={s}
                  onClick={() => setSize(s)}
                  className={`py-2 rounded-lg border transition-all ${size === s ? 'bg-brand-yellow text-brand-dark border-brand-yellow font-bold' : 'border-gray-700 text-gray-400 hover:border-gray-500'}`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Crust Selection (Pizzas Only) */}
          {isPizza && (
            <div>
              <h3 className="text-brand-cream font-bold mb-3 uppercase text-sm tracking-wider">Select Crust</h3>
              <div className="grid grid-cols-3 gap-3">
                {(['Pan', 'Thin', 'Stuffed'] as Crust[]).map(c => (
                  <button
                    key={c}
                    onClick={() => setCrust(c)}
                    className={`py-2 rounded-lg border transition-all ${crust === c ? 'bg-brand-yellow text-brand-dark border-brand-yellow font-bold' : 'border-gray-700 text-gray-400 hover:border-gray-500'}`}
                  >
                    {c} {c === 'Stuffed' && '(+150)'}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Extras */}
          <div>
            <h3 className="text-brand-cream font-bold mb-3 uppercase text-sm tracking-wider">Add Extras (+100 each)</h3>
            <div className="flex flex-wrap gap-2">
              {['Extra Cheese', 'Mushrooms', 'Olives', 'Dip Sauce', 'Spicy Sprinkle'].map(e => (
                <button
                  key={e}
                  onClick={() => toggleExtra(e)}
                  className={`px-4 py-2 rounded-full border text-sm transition-all ${extras.includes(e) ? 'bg-brand-yellow/20 border-brand-yellow text-brand-yellow' : 'border-gray-700 text-gray-400 hover:border-gray-500'}`}
                >
                  {extras.includes(e) ? '✓ ' : '+ '}{e}
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-6 bg-black/40 border-t border-white/5 flex justify-between items-center">
           <div>
             <span className="block text-xs text-gray-500">Total Price</span>
             <span className="text-2xl font-bold text-brand-yellow">Rs. {calculateTotal()}</span>
           </div>
           <button 
             onClick={handleAddToCart}
             className="bg-brand-yellow text-brand-dark px-8 py-3 rounded-full font-bold hover:bg-yellow-400 transition-transform active:scale-95 shadow-lg"
           >
             Add to Order
           </button>
        </div>

      </div>
    </div>
  );
};

export default ProductCustomizer;
