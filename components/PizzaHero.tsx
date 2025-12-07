import React, { useState, useEffect } from 'react';
import { getImageUrl } from '../constants';
import { SectionType } from '../types';

const PIZZAS = [
  {
    name: 'Classic Pepperoni',
    description: 'Crispy cups of pepperoni on our signature tomato sauce.',
    prompt: 'whole pepperoni pizza top view dark background professional food photography'
  },
  {
    name: 'Tex-Mex Spicy',
    description: 'A fiery blend of jalapenos, corn, and spicy chicken chunks.',
    prompt: 'whole spicy pizza with jalapenos and corn top view dark background professional food photography'
  },
  {
    name: 'Sizzling Fajita',
    description: 'Marinated fajita chicken, green peppers, and onions.',
    prompt: 'whole chicken fajita pizza with green peppers top view dark background professional food photography'
  },
  {
    name: 'Hawaiian Delight',
    description: 'Sweet pineapple chunks paired with savory turkey ham.',
    prompt: 'whole hawaiian pizza with pineapple and ham top view dark background professional food photography'
  },
  {
    name: 'Cheezious Special',
    description: 'The ultimate loaded pizza with everything you love.',
    prompt: 'whole supreme pizza loaded toppings top view dark background professional food photography'
  },
];

const PizzaHero: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [displayedIndex, setDisplayedIndex] = useState(0);

  useEffect(() => {
    // Preload images to prevent white flashes and ensure visibility
    PIZZAS.forEach((pizza, index) => {
      const img = new Image();
      // Use 800x800 for square aspect ratio suitable for the hero circle
      img.src = getImageUrl(pizza.prompt, `hero-${index}`, 800, 800);
    });
  }, []);

  const handleNext = () => {
    if (isAnimating) return;

    setIsAnimating(true);

    // Swap the image and text halfway through the animation
    setTimeout(() => {
      const nextIndex = (displayedIndex + 1) % PIZZAS.length;
      setDisplayedIndex(nextIndex);
      setCurrentIndex(nextIndex); // Sync text with the image swap
    }, 400);

    // Reset animation state
    setTimeout(() => {
      setIsAnimating(false);
    }, 800);
  };

  const currentPizza = PIZZAS[displayedIndex];

  return (
    <div id="view-menu" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-12">
       {/* Background */}
       <div 
          className="absolute inset-0 z-0 parallax-bg opacity-30"
          style={{
            backgroundImage: 'url("https://image.pollinations.ai/prompt/dark%20italian%20restaurant%20ambiance%20wood%20table%20blur?width=1920&height=1080&nologo=true")',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/20 via-brand-dark/90 to-brand-dark z-0"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Text Content */}
            <div className="text-center lg:text-left order-2 lg:order-1 animate-slide-up">
                <div className="inline-block bg-brand-yellow/10 text-brand-yellow px-4 py-1 rounded-full text-sm font-bold uppercase tracking-widest mb-4 border border-brand-yellow/20">
                    Premium Selections
                </div>
                <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-6 leading-tight">
                    <span className="text-brand-yellow">{currentPizza.name.split(' ')[0]}</span> <br/>
                    {currentPizza.name.split(' ').slice(1).join(' ')}
                </h1>
                <p className="text-xl text-gray-400 mb-8 max-w-lg mx-auto lg:mx-0 h-20">
                    {currentPizza.description}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                     <button 
                        onClick={() => document.getElementById(SectionType.PIZZAS)?.scrollIntoView({ behavior: 'smooth' })}
                        className="bg-brand-yellow text-brand-dark px-10 py-4 text-lg uppercase tracking-widest font-bold rounded-full hover:bg-yellow-400 transition-all shadow-lg hover:shadow-brand-yellow/20"
                     >
                        Order Now
                     </button>
                     <button 
                        onClick={handleNext}
                        className="border border-gray-600 text-brand-cream px-10 py-4 text-lg uppercase tracking-widest font-bold rounded-full hover:border-brand-yellow hover:text-brand-yellow transition-all flex items-center justify-center gap-2 group"
                     >
                        Next Pizza
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                     </button>
                </div>
            </div>

            {/* Pizza Animation */}
            <div className="relative order-1 lg:order-2 flex justify-center items-center h-[500px]">
                 {/* Decorative Circle Behind */}
                 <div className="absolute w-[400px] h-[400px] md:w-[500px] md:h-[500px] rounded-full border border-brand-yellow/10 animate-spin-slow"></div>
                 <div className="absolute w-[300px] h-[300px] md:w-[350px] md:h-[350px] rounded-full border border-dashed border-white/5 animate-spin-slow" style={{animationDirection: 'reverse'}}></div>
                 
                 {/* The Pizza Image */}
                 <div className={`relative z-10 w-[350px] h-[350px] md:w-[480px] md:h-[480px] transition-all duration-300`}>
                     <img 
                        key={displayedIndex} // Key forces re-render if needed
                        src={getImageUrl(currentPizza.prompt, `hero-${displayedIndex}`, 800, 800)} 
                        alt={currentPizza.name}
                        className={`w-full h-full object-contain drop-shadow-2xl ${isAnimating ? 'animate-spin-swap' : ''}`}
                     />
                 </div>
                 
                 {/* Floating Price Tag/Badge */}
                 <div className="absolute top-10 right-10 md:right-0 bg-brand-dark/80 backdrop-blur border border-brand-yellow/30 p-4 rounded-xl shadow-2xl animate-bounce" style={{animationDuration: '3s'}}>
                    <span className="block text-xs text-gray-400 uppercase tracking-wider">Starting at</span>
                    <span className="text-2xl font-bold text-brand-yellow">Rs. 950</span>
                 </div>
            </div>
        </div>
    </div>
  );
};

export default PizzaHero;