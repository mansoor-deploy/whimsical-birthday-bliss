
import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';

const Header: React.FC = () => {
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      if (headerRef.current) {
        headerRef.current.style.transform = `translateY(${scrollY * 0.4}px)`;
        headerRef.current.style.opacity = `${1 - scrollY * 0.002}`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header ref={headerRef} className="relative h-screen flex flex-col items-center justify-center text-center p-4 overflow-hidden">
      <div className="animate-fade-in">
        <div className="inline-flex items-center justify-center space-x-2 mb-2 bg-softPink/50 backdrop-blur-sm px-4 py-1 rounded-full">
          <Star className="w-4 h-4 text-softPink animate-pulse-soft" />
          <p className="text-sm font-bold text-nightBlue">First Birthday Celebration</p>
          <Star className="w-4 h-4 text-softPink animate-pulse-soft" />
        </div>
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold mb-6 text-nightBlue">
          <span className="block">Little Star</span>
          <span className="block mt-2 text-3xl md:text-5xl lg:text-6xl">Celebration</span>
        </h1>
        <p className="text-lg md:text-xl font-medium text-nightBlue max-w-lg mx-auto">
          Join us for a magical day as we celebrate 
          <span className="font-bold"> Emma's </span> 
          first trip around the sun!
        </p>
        
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to="/rsvp" className="btn-primary inline-block">
            RSVP Now
          </Link>
          <Link to="/gallery" className="px-6 py-3 rounded-full border-2 border-softPurple text-nightBlue font-medium transition-all duration-300 hover:bg-softPurple hover:text-white">
            View Gallery
          </Link>
        </div>
      </div>
      
      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 5V19M12 19L5 12M12 19L19 12" stroke="#7C98B3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    </header>
  );
};

export default Header;
