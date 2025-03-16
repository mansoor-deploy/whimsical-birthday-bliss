
import React, { useEffect, useRef } from 'react';
import Header from '../components/Header';
import Countdown from '../components/Countdown';
import VenueInfo from '../components/VenueInfo';
import AnimatedBalloons from '../components/AnimatedBalloons';
import AudioPlayer from '../components/AudioPlayer';
import FloatingVideo from '../components/FloatingVideo';
import GoogleCalendar from '../components/GoogleCalendar';
import StarryBackground from '../components/StarryBackground';
import { Heart, Star } from 'lucide-react';

const Index = () => {
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Smooth scroll function for the page
    const smoothScroll = (e: WheelEvent) => {
      e.preventDefault();
      const delta = e.deltaY;
      window.scrollBy({
        top: delta,
        behavior: 'smooth'
      });
    };
    
    // Apply smooth scrolling on desktop
    if (window.innerWidth > 768) {
      window.addEventListener('wheel', smoothScroll, { passive: false });
    }
    
    // Lazy loading images
    const lazyImages = document.querySelectorAll('.lazy-image');
    
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target as HTMLImageElement;
            if (img.dataset.src) {
              img.src = img.dataset.src;
              img.classList.remove('image-blur-loading');
              img.classList.add('image-blur-loaded');
              imageObserver.unobserve(img);
            }
          }
        });
      });
      
      lazyImages.forEach(img => {
        imageObserver.observe(img);
      });
    }
    
    return () => {
      if (window.innerWidth > 768) {
        window.removeEventListener('wheel', smoothScroll);
      }
    };
  }, []);

  return (
    <div ref={mainRef} className="relative min-h-screen">
      {/* Background Elements */}
      <StarryBackground />
      
      {/* Audio Player */}
      <AudioPlayer audioSrc="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" />
      
      {/* Floating Video Button */}
      <FloatingVideo />
      
      {/* Main Content */}
      <main className="relative z-10">
        {/* Header Section */}
        <Header />
        
        {/* Countdown Section */}
        <Countdown />
        
        {/* Animated Balloons */}
        <AnimatedBalloons />
        
        {/* Venue Information */}
        <VenueInfo />
        
        {/* Google Calendar Integration */}
        <GoogleCalendar />
        
        {/* Gallery Section */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="section-title">Precious Moments</h2>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-8">
              {[1, 2, 3, 4, 5, 6].map((index) => (
                <div 
                  key={index} 
                  className="aspect-square rounded-2xl overflow-hidden glass-panel p-2"
                >
                  <div className="w-full h-full rounded-xl bg-softPink/20 flex items-center justify-center">
                    <Star className="w-8 h-8 text-softPink/50" />
                  </div>
                </div>
              ))}
            </div>
            
            <p className="text-nightBlue/70 mt-8">
              Photos will be added after the celebration!
            </p>
          </div>
        </section>
        
        {/* RSVP Section */}
        <section className="py-16 px-4 bg-gradient-to-r from-mintGreen/40 to-babyBlue/40">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="section-title">Join The Celebration</h2>
            
            <div className="glass-panel rounded-2xl p-8 md:p-12 max-w-2xl mx-auto mt-8">
              <p className="text-nightBlue/80 mb-6">
                We would be delighted to have you join us for Emma's first birthday celebration!
              </p>
              
              <button className="btn-primary">
                RSVP Now
              </button>
            </div>
          </div>
        </section>
        
        {/* Footer */}
        <footer className="py-8 px-4 text-center text-nightBlue/60 flex flex-col items-center">
          <div className="flex items-center mb-4">
            <span>Made with</span>
            <Heart className="w-4 h-4 mx-2 text-softPink animate-pulse" />
            <span>for Emma</span>
          </div>
          <p className="text-xs">&copy; 2024 Little Star Celebration</p>
        </footer>
      </main>
    </div>
  );
};

export default Index;
