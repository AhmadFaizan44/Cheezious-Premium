
import React, { useState, useEffect, useMemo } from 'react';
import { SectionType, MenuItem, CartItem, Order, DeliveryDetails, VideoItem } from './types';
import { MENU_ITEMS, ADMIN_ROUTE, INITIAL_VIDEOS } from './constants';
import MenuSection from './components/MenuSection';
import Loader from './components/Loader';
import AdminDashboard from './components/AdminDashboard';
import GeminiTools from './components/GeminiTools';
import CartSidebar from './components/CartSidebar';
import PizzaHero from './components/PizzaHero';
import ProductCustomizer from './components/ProductCustomizer';
import CheckoutModal from './components/CheckoutModal';
import OrderTracker from './components/OrderTracker';
import VideoGallery from './components/VideoGallery';

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [isAdminRoute, setIsAdminRoute] = useState(false);
  
  // Lifted State for Global Access
  const [menuItems, setMenuItems] = useState<MenuItem[]>(MENU_ITEMS);
  const [orders, setOrders] = useState<Order[]>([]);
  const [videos, setVideos] = useState<VideoItem[]>(INITIAL_VIDEOS);
  
  // Tabs State (Includes Sections + Videos)
  const [activeTab, setActiveTab] = useState<string>(SectionType.PIZZAS);
  
  // Cart & Order State
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  // New Features State
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [customizingItem, setCustomizingItem] = useState<MenuItem | null>(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [activeOrder, setActiveOrder] = useState<Order | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500);

    const handleHashChange = () => {
      const hash = window.location.hash.replace('#/', '');
      setIsAdminRoute(hash === ADMIN_ROUTE);
    };

    handleHashChange(); 
    window.addEventListener('hashchange', handleHashChange);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  // Simulate Order Progress
  useEffect(() => {
    if (activeOrder && activeOrder.status !== 'completed') {
      const sequence: Order['status'][] = ['kitchen', 'delivery', 'doorstep', 'completed'];
      let idx = sequence.indexOf(activeOrder.status);
      
      const interval = setInterval(() => {
        idx++;
        if (idx < sequence.length) {
          const nextStatus = sequence[idx];
          setActiveOrder(prev => prev ? { ...prev, status: nextStatus } : null);
          setOrders(prevOrders => 
            prevOrders.map(o => o.id === activeOrder.id ? { ...o, status: nextStatus } : o)
          );
        } else {
          clearInterval(interval);
        }
      }, 5000); // Advance status every 5 seconds for demo

      return () => clearInterval(interval);
    }
  }, [activeOrder?.id]);

  const toggleFavorite = (id: string) => {
    setFavorites(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleOpenCustomizer = (item: MenuItem) => {
    setCustomizingItem(item);
  };

  const handleAddToCart = (item: CartItem) => {
    setCartItems(prev => [...prev, item]);
    setCustomizingItem(null);
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

  const cartTotal = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + (item.selectedPrice * item.quantity), 0);
  }, [cartItems]);

  const handleCheckoutSubmit = (details: DeliveryDetails) => {
    const newOrder: Order = {
      id: `ORD-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`,
      date: new Date().toLocaleString(),
      items: [...cartItems],
      total: cartTotal,
      status: 'kitchen',
      deliveryDetails: details
    };

    setOrders(prev => [newOrder, ...prev]);
    setCartItems([]);
    setIsCheckoutOpen(false);
    setIsCartOpen(false);
    setActiveOrder(newOrder);
    alert('Order Placed! Track your food live.');
  };

  if (loading) return <Loader />;

  if (isAdminRoute) {
    return (
      <AdminDashboard 
        menuItems={menuItems} 
        setMenuItems={setMenuItems}
        orders={orders}
        setOrders={setOrders}
        videos={videos}
        setVideos={setVideos}
      />
    );
  }

  // Define Tabs (Sections + Videos)
  const navTabs = [...Object.values(SectionType), 'VIDEOS'];

  return (
    <div className="min-h-screen relative flex flex-col">
      <header className="fixed top-0 w-full z-40 bg-brand-dark/95 backdrop-blur-md border-b border-white/10 shadow-xl">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setActiveTab(SectionType.PIZZAS)}>
            <span className="text-2xl">🍕</span>
            <span className="text-xl font-serif tracking-widest text-brand-yellow font-bold">CHEEZIOUS</span>
          </div>
          
          <div className="flex gap-4 items-center">
             {favorites.size > 0 && (
               <span className="text-red-500">❤️ {favorites.size}</span>
             )}
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
        
        {/* Tab Navigation Bar */}
        <div className="border-t border-white/5 bg-black/40 overflow-x-auto">
          <div className="max-w-7xl mx-auto px-6 flex">
            {navTabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-4 text-sm font-bold uppercase tracking-widest whitespace-nowrap transition-colors border-b-2 ${
                  activeTab === tab 
                  ? 'border-brand-yellow text-brand-yellow bg-white/5' 
                  : 'border-transparent text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 pt-32 pb-20">
        
        {/* Render Logic based on Active Tab */}
        {activeTab === 'VIDEOS' ? (
          <VideoGallery videos={videos} />
        ) : activeTab === SectionType.PIZZAS ? (
           <>
             {/* Show Hero only on Pizza Tab */}
             <PizzaHero />
             <MenuSection 
               id={SectionType.PIZZAS}
               title="Our Pizzas"
               items={menuItems.filter(i => i.category === SectionType.PIZZAS)}
               onAddToCart={handleOpenCustomizer}
               favorites={favorites}
               onToggleFavorite={toggleFavorite}
             />
           </>
        ) : (
          <MenuSection 
             id={activeTab}
             title={activeTab}
             items={menuItems.filter(i => i.category === activeTab)}
             onAddToCart={handleOpenCustomizer}
             favorites={favorites}
             onToggleFavorite={toggleFavorite}
           />
        )}
        
        {/* Show Gemini Tools at bottom of all sections */}
        <GeminiTools />
      </main>

      {/* Overlays & Modals */}
      <CartSidebar 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onCheckoutClick={() => setIsCheckoutOpen(true)}
      />

      <ProductCustomizer 
        item={customizingItem}
        isOpen={!!customizingItem}
        onClose={() => setCustomizingItem(null)}
        onAddToCart={handleAddToCart}
      />

      <CheckoutModal 
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartTotal={cartTotal}
        onSubmit={handleCheckoutSubmit}
      />

      <OrderTracker order={activeOrder} />

      <footer className="bg-black py-12 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-serif text-brand-yellow mb-4">CHEEZIOUS</h2>
          <p className="text-gray-500 mb-8">Taste the excellence in every slice.</p>
          <p className="mt-8 text-gray-600 text-xs">&copy; 2025 Cheezious Restaurant. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
