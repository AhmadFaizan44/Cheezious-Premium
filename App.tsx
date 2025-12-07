import React, { useState, useEffect } from 'react';
import { SectionType, MenuItem, CartItem, Order } from './types';
import { MENU_ITEMS, ADMIN_ROUTE } from './constants';
import MenuSection from './components/MenuSection';
import Loader from './components/Loader';
import AdminDashboard from './components/AdminDashboard';
import GeminiTools from './components/GeminiTools';
import CartSidebar from './components/CartSidebar';
import PizzaHero from './components/PizzaHero';

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [isAdminRoute, setIsAdminRoute] = useState(false);
  
  // Lifted State for Global Access
  const [menuItems, setMenuItems] = useState<MenuItem[]>(MENU_ITEMS);
  const [orders, setOrders] = useState<Order[]>([]);
  
  // Cart State
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    // Initial hook animation timer
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500);

    // Simple Hash routing check
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#/', '');
      setIsAdminRoute(hash === ADMIN_ROUTE);
    };

    handleHashChange(); // Check on mount
    window.addEventListener('hashchange', handleHashChange);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  const handleAddToCart = (item: MenuItem) => {
    // Parse price if it's a string, defaulting to the first number found
    let price = 0;
    if (typeof item.price === 'number') {
      price = item.price;
    } else {
      const match = item.price.toString().match(/(\d+)/);
      price = match ? parseInt(match[0]) : 0;
    }

    setCartItems(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { ...item, quantity: 1, selectedPrice: price }];
    });
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCartItems(prev => 
      prev.map(item => {
        if (item.id === id) {
          const newQty = Math.max(1, item.quantity + delta);
          return { ...item, quantity: newQty };
        }
        return item;
      })
    );
  };

  const handleRemoveItem = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const handlePlaceOrder = (newOrder: Order) => {
    setOrders(prev => [newOrder, ...prev]);
    setCartItems([]);
    setIsCartOpen(false);
    alert(`Order Placed Successfully! Order ID: ${newOrder.id}`);
  };

  if (loading) return <Loader />;

  // Render Admin Dashboard if route matches
  if (isAdminRoute) {
    return (
      <AdminDashboard 
        menuItems={menuItems} 
        setMenuItems={setMenuItems}
        orders={orders}
        setOrders={setOrders}
      />
    );
  }

  // Main Public Interface
  return (
    <div className="min-h-screen relative">
      {/* Sticky Header */}
      <header className="fixed top-0 w-full z-40 bg-brand-dark/95 backdrop-blur-md border-b border-white/10 transition-all duration-300 shadow-xl">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🍕</span>
            <span className="text-xl font-serif tracking-widest text-brand-yellow font-bold">CHEEZIOUS</span>
          </div>
          <nav className="hidden md:flex gap-6 text-sm uppercase tracking-widest text-gray-300">
            {Object.values(SectionType).map((section) => (
              <a 
                key={section} 
                href={`#${section}`}
                className="hover:text-brand-yellow transition-colors"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                {section}
              </a>
            ))}
          </nav>
          <div className="flex gap-4">
             <button 
               onClick={() => setIsCartOpen(true)}
               className="relative bg-brand-yellow text-brand-dark px-6 py-2 rounded-full font-bold hover:bg-yellow-400 transition transform hover:scale-105 flex items-center gap-2"
             >
               <span>Order</span>
               {cartItems.length > 0 && (
                 <span className="bg-black text-brand-yellow text-xs rounded-full h-5 w-5 flex items-center justify-center">
                   {cartItems.reduce((acc, i) => acc + i.quantity, 0)}
                 </span>
               )}
             </button>
          </div>
        </div>
      </header>

      {/* Cart Sidebar */}
      <CartSidebar 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onCheckout={handlePlaceOrder}
      />

      {/* New Pizza Hero Section */}
      <PizzaHero />

      {/* AI Features Section - Only Search now */}
      <GeminiTools />

      {/* Menu Sections - mapped from state */}
      <div className="relative">
        {Object.values(SectionType).map((sectionType, index) => {
           const items = menuItems.filter(i => i.category === sectionType);
           if (items.length === 0) return null;
           
           return (
            <React.Fragment key={sectionType}>
              <MenuSection 
                id={sectionType} 
                title={sectionType} 
                items={items} 
                onAddToCart={handleAddToCart}
              />
              {/* Add parallax break after every 2 sections or specific logic */}
              {index === 1 && (
                 <div className="h-64 relative flex items-center justify-center bg-fixed bg-cover bg-center" style={{backgroundImage: 'url("https://image.pollinations.ai/prompt/cheezious%20fresh%20ingredients%20vegetables%20dough?width=1920&height=600&nologo=true")'}}>
                  <div className="absolute inset-0 bg-black/60"></div>
                  <h3 className="relative z-10 text-4xl font-serif text-brand-cream italic">"Baked to Perfection"</h3>
                </div>
              )}
            </React.Fragment>
           );
        })}
      </div>

      {/* Footer */}
      <footer className="bg-black py-12 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-serif text-brand-yellow mb-4">CHEEZIOUS</h2>
          <p className="text-gray-500 mb-8">Taste the excellence in every slice.</p>
          <div className="flex justify-center gap-6 text-gray-400 text-sm">
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-white">Terms of Service</a>
            <a href="#" className="hover:text-white">Contact Us</a>
          </div>
          <p className="mt-8 text-gray-600 text-xs">&copy; 2025 Cheezious Restaurant. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;