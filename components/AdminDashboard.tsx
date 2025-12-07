
import React, { useState } from 'react';
import { ADMIN_KEY } from '../constants';
import { MenuItem, Order, SectionType, VideoItem } from '../types';

interface AdminDashboardProps {
  menuItems: MenuItem[];
  setMenuItems: React.Dispatch<React.SetStateAction<MenuItem[]>>;
  orders: Order[];
  setOrders: React.Dispatch<React.SetStateAction<Order[]>>;
  videos: VideoItem[];
  setVideos: React.Dispatch<React.SetStateAction<VideoItem[]>>;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ menuItems, setMenuItems, orders, setOrders, videos, setVideos }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState<'menu' | 'orders' | 'media'>('orders');

  // Form State for new Item
  const [newItem, setNewItem] = useState<Partial<MenuItem>>({
    category: SectionType.PIZZAS,
    name: '',
    price: '',
    description: '',
    imageUrl: ''
  });

  // Form State for new Video
  const [newVideo, setNewVideo] = useState<Partial<VideoItem>>({
    title: '',
    videoUrl: '',
    thumbnailUrl: ''
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_KEY) {
      setIsAuthenticated(true);
    } else {
      alert('Access Denied: Incorrect Key');
    }
  };

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItem.name || !newItem.price) return;

    const item: MenuItem = {
      id: `new-${Date.now()}`,
      category: newItem.category || SectionType.PIZZAS,
      subCategory: newItem.subCategory || 'New',
      name: newItem.name,
      price: newItem.price,
      description: newItem.description || '',
      imageUrl: newItem.imageUrl || 'https://image.pollinations.ai/prompt/delicious%20food?nologo=true'
    };

    setMenuItems(prev => [...prev, item]);
    setNewItem({ category: SectionType.PIZZAS, name: '', price: '', description: '', imageUrl: '' });
    alert('Item Added!');
  };

  const handleAddVideo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newVideo.title || !newVideo.videoUrl) return;

    const video: VideoItem = {
      id: `vid-${Date.now()}`,
      title: newVideo.title,
      videoUrl: newVideo.videoUrl,
      thumbnailUrl: newVideo.thumbnailUrl || 'https://image.pollinations.ai/prompt/video%20placeholder?nologo=true'
    };

    setVideos(prev => [...prev, video]);
    setNewVideo({ title: '', videoUrl: '', thumbnailUrl: '' });
    alert('Video Added!');
  };

  const handleDeleteItem = (id: string) => {
    if (confirm('Are you sure you want to delete this item?')) {
      setMenuItems(prev => prev.filter(item => item.id !== id));
    }
  };
  
  const handleDeleteVideo = (id: string) => {
    if (confirm('Are you sure you want to delete this video?')) {
      setVideos(prev => prev.filter(v => v.id !== id));
    }
  };

  const handleUpdateOrderStatus = (orderId: string) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: o.status === 'pending' ? 'completed' : 'pending' } : o));
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-brand-dark text-brand-cream relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20 bg-[url('https://image.pollinations.ai/prompt/dark%20restaurant%20kitchen?nologo=true')] bg-cover"></div>
        <form onSubmit={handleLogin} className="relative z-10 bg-black/90 p-8 rounded-xl border border-brand-yellow/30 shadow-2xl w-96 backdrop-blur-md">
          <div className="text-center mb-8">
            <span className="text-4xl">🔐</span>
            <h2 className="text-2xl mt-4 text-brand-yellow font-bold">Admin Portal</h2>
          </div>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter 'Faizan'"
            className="w-full p-3 bg-gray-900 border border-gray-700 rounded mb-6 text-white focus:outline-none focus:border-brand-yellow transition-colors"
          />
          <button type="submit" className="w-full bg-brand-yellow text-brand-dark py-3 rounded font-bold hover:bg-yellow-400 transition transform active:scale-95">
            Unlock Dashboard
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-dark text-brand-cream">
      {/* Admin Header */}
      <header className="bg-black/50 border-b border-gray-800 p-6 sticky top-0 z-30 backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-4">
             <h1 className="text-2xl font-bold text-brand-yellow">Cheezious Admin</h1>
             <div className="flex bg-gray-900 rounded-lg p-1 overflow-x-auto max-w-[200px] md:max-w-none">
               <button 
                 onClick={() => setActiveTab('orders')}
                 className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${activeTab === 'orders' ? 'bg-brand-yellow text-black' : 'text-gray-400 hover:text-white'}`}
               >
                 Orders
               </button>
               <button 
                 onClick={() => setActiveTab('menu')}
                 className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${activeTab === 'menu' ? 'bg-brand-yellow text-black' : 'text-gray-400 hover:text-white'}`}
               >
                 Menu
               </button>
               <button 
                 onClick={() => setActiveTab('media')}
                 className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${activeTab === 'media' ? 'bg-brand-yellow text-black' : 'text-gray-400 hover:text-white'}`}
               >
                 Media
               </button>
             </div>
          </div>
          <button onClick={() => setIsAuthenticated(false)} className="text-sm text-gray-500 hover:text-white underline">Logout</button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-8">
        
        {/* ORDERS TAB */}
        {activeTab === 'orders' && (
          <div className="space-y-6 animate-fade-in">
            <h2 className="text-3xl font-serif mb-6">Recent Orders</h2>
            {orders.length === 0 ? (
               <p className="text-gray-500 italic">No orders placed yet.</p>
            ) : (
              <div className="grid gap-6">
                {orders.map((order) => (
                  <div key={order.id} className="bg-white/5 border border-white/10 rounded-lg p-6 flex flex-col md:flex-row justify-between gap-6">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <span className="font-mono text-brand-yellow text-lg">{order.id}</span>
                        <span className={`text-xs px-2 py-1 rounded uppercase font-bold ${order.status === 'completed' ? 'bg-green-900 text-green-300' : 'bg-yellow-900 text-yellow-300'}`}>
                          {order.status}
                        </span>
                      </div>
                      <p className="text-gray-400 text-sm mb-4">{order.date}</p>
                      <ul className="space-y-1">
                        {order.items.map((item, idx) => (
                          <li key={idx} className="text-sm text-gray-200">
                            {item.quantity}x {item.name}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="flex flex-col items-end justify-between">
                      <p className="text-2xl font-bold text-brand-yellow">Total: Rs. {order.total}</p>
                      <button 
                        onClick={() => handleUpdateOrderStatus(order.id)}
                        className={`mt-4 px-6 py-2 rounded font-bold text-sm transition-colors ${order.status === 'pending' ? 'bg-green-600 hover:bg-green-500' : 'bg-gray-700 hover:bg-gray-600'}`}
                      >
                        {order.status === 'pending' ? 'Mark Completed' : 'Mark Pending'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* MENU TAB */}
        {activeTab === 'menu' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-fade-in">
            {/* Add New Item Form */}
            <div className="lg:col-span-1">
              <div className="bg-white/5 border border-white/10 rounded-lg p-6 sticky top-24">
                <h3 className="text-xl font-bold mb-4 text-brand-yellow">Add New Item</h3>
                <form onSubmit={handleAddItem} className="space-y-4">
                  <div>
                    <label className="block text-xs uppercase text-gray-500 mb-1">Category</label>
                    <select 
                      value={newItem.category}
                      onChange={e => setNewItem({...newItem, category: e.target.value})}
                      className="w-full bg-black border border-gray-700 rounded p-2 text-white"
                    >
                      {Object.values(SectionType).map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs uppercase text-gray-500 mb-1">Name</label>
                    <input 
                      type="text" 
                      value={newItem.name}
                      onChange={e => setNewItem({...newItem, name: e.target.value})}
                      className="w-full bg-black border border-gray-700 rounded p-2 text-white"
                      placeholder="e.g. Mega Pepperoni"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase text-gray-500 mb-1">Price</label>
                    <input 
                      type="text" 
                      value={newItem.price}
                      onChange={e => setNewItem({...newItem, price: e.target.value})}
                      className="w-full bg-black border border-gray-700 rounded p-2 text-white"
                      placeholder="e.g. 1500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase text-gray-500 mb-1">Description</label>
                    <textarea 
                      value={newItem.description}
                      onChange={e => setNewItem({...newItem, description: e.target.value})}
                      className="w-full bg-black border border-gray-700 rounded p-2 text-white h-24"
                      placeholder="Description..."
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase text-gray-500 mb-1">Image URL (Optional)</label>
                    <input 
                      type="text" 
                      value={newItem.imageUrl}
                      onChange={e => setNewItem({...newItem, imageUrl: e.target.value})}
                      className="w-full bg-black border border-gray-700 rounded p-2 text-white text-xs"
                      placeholder="https://..."
                    />
                  </div>
                  <button type="submit" className="w-full bg-brand-yellow text-brand-dark font-bold py-3 rounded hover:bg-yellow-400 transition">
                    Add to Menu
                  </button>
                </form>
              </div>
            </div>

            {/* Existing Menu List */}
            <div className="lg:col-span-2 space-y-4">
               <h3 className="text-xl font-bold mb-4 text-brand-yellow">Current Menu ({menuItems.length})</h3>
               <div className="overflow-hidden rounded-lg border border-gray-800">
                 <table className="w-full text-left bg-black/40">
                   <thead className="bg-white/5 text-gray-400 text-xs uppercase">
                     <tr>
                       <th className="p-4">Item</th>
                       <th className="p-4">Category</th>
                       <th className="p-4">Price</th>
                       <th className="p-4 text-right">Action</th>
                     </tr>
                   </thead>
                   <tbody className="divide-y divide-gray-800">
                     {menuItems.map(item => (
                       <tr key={item.id} className="hover:bg-white/5 transition-colors">
                         <td className="p-4 flex items-center gap-3">
                           <img src={item.imageUrl} alt="" className="w-8 h-8 rounded object-cover bg-gray-800" />
                           <span className="font-bold">{item.name}</span>
                         </td>
                         <td className="p-4 text-sm text-gray-400">{item.category}</td>
                         <td className="p-4 text-brand-yellow text-sm">{item.price}</td>
                         <td className="p-4 text-right">
                           <button 
                             onClick={() => handleDeleteItem(item.id)}
                             className="text-red-500 hover:text-red-400 text-xs uppercase font-bold hover:underline"
                           >
                             Delete
                           </button>
                         </td>
                       </tr>
                     ))}
                   </tbody>
                 </table>
               </div>
            </div>
          </div>
        )}

        {/* MEDIA CENTER TAB */}
        {activeTab === 'media' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-fade-in">
             {/* Upload Form */}
             <div className="lg:col-span-1">
              <div className="bg-white/5 border border-white/10 rounded-lg p-6 sticky top-24">
                <h3 className="text-xl font-bold mb-4 text-brand-yellow">Upload Video</h3>
                <form onSubmit={handleAddVideo} className="space-y-4">
                  <div>
                    <label className="block text-xs uppercase text-gray-500 mb-1">Video Title</label>
                    <input 
                      type="text" 
                      value={newVideo.title}
                      onChange={e => setNewVideo({...newVideo, title: e.target.value})}
                      className="w-full bg-black border border-gray-700 rounded p-2 text-white"
                      placeholder="e.g. Making of Crown Crust"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase text-gray-500 mb-1">Video URL (mp4/hosted)</label>
                    <input 
                      type="text" 
                      value={newVideo.videoUrl}
                      onChange={e => setNewVideo({...newVideo, videoUrl: e.target.value})}
                      className="w-full bg-black border border-gray-700 rounded p-2 text-white"
                      placeholder="https://..."
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase text-gray-500 mb-1">Thumbnail URL</label>
                    <input 
                      type="text" 
                      value={newVideo.thumbnailUrl}
                      onChange={e => setNewVideo({...newVideo, thumbnailUrl: e.target.value})}
                      className="w-full bg-black border border-gray-700 rounded p-2 text-white"
                      placeholder="https://..."
                    />
                  </div>
                  <button type="submit" className="w-full bg-brand-yellow text-brand-dark font-bold py-3 rounded hover:bg-yellow-400 transition">
                    Add Video
                  </button>
                </form>
              </div>
            </div>

            {/* Video List */}
            <div className="lg:col-span-2 space-y-4">
              <h3 className="text-xl font-bold mb-4 text-brand-yellow">Uploaded Videos ({videos.length})</h3>
              <div className="grid gap-4">
                {videos.map(video => (
                  <div key={video.id} className="bg-white/5 border border-white/10 p-4 rounded-lg flex gap-4 items-center">
                    <div className="w-32 aspect-video bg-black rounded overflow-hidden">
                      <img src={video.thumbnailUrl} alt="" className="w-full h-full object-cover opacity-70" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-brand-cream">{video.title}</h4>
                      <p className="text-xs text-gray-500 truncate">{video.videoUrl}</p>
                    </div>
                    <button 
                       onClick={() => handleDeleteVideo(video.id)}
                       className="text-red-500 hover:text-red-400 text-xs uppercase font-bold hover:underline px-4"
                     >
                       Delete
                     </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
