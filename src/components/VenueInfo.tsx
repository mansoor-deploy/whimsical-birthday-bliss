
import React, { useEffect, useRef } from 'react';
import { MapPin, Clock, Gift } from 'lucide-react';

const VenueInfo: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      
      const sectionTop = sectionRef.current.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      
      // Calculate how far the section is in the viewport
      const scrollProgress = 1 - (sectionTop / windowHeight);
      
      if (scrollProgress > 0 && scrollProgress < 1) {
        // Apply parallax effect to children
        const children = sectionRef.current.querySelectorAll('.parallax');
        children.forEach((child, index) => {
          const element = child as HTMLElement;
          const speed = index % 2 === 0 ? 0.1 : 0.05;
          element.style.transform = `translateY(${scrollProgress * 50 * speed}px)`;
        });
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <section ref={sectionRef} className="py-16 px-4 relative">
      <div className="max-w-4xl mx-auto">
        <h2 className="section-title text-center">Where & When</h2>
        
        <div className="grid md:grid-cols-2 gap-8 mt-12">
          <div className="glass-panel rounded-2xl p-6 animate-fade-in parallax">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 rounded-full bg-babyBlue flex items-center justify-center mr-3">
                <MapPin className="w-5 h-5 text-nightBlue" />
              </div>
              <h3 className="text-xl font-display font-semibold text-nightBlue">Location</h3>
            </div>
            
            <p className="text-nightBlue/70 mb-3">Starlight Gardens</p>
            <p className="text-nightBlue/70 mb-6">1234 Dreamy Lane, Wonderville</p>
            
            <div className="aspect-video rounded-lg overflow-hidden bg-white/50">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d387193.305923!2d-74.25986548248684!3d40.697149419326654!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2s!4v1623675400697!5m2!1sen!2s" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={false} 
                loading="lazy"
                title="Event Location">
              </iframe>
            </div>
          </div>
          
          <div className="grid grid-rows-2 gap-8">
            <div className="glass-panel rounded-2xl p-6 animate-fade-in delay-75 parallax">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-softPink flex items-center justify-center mr-3">
                  <Clock className="w-5 h-5 text-nightBlue" />
                </div>
                <h3 className="text-xl font-display font-semibold text-nightBlue">Date & Time</h3>
              </div>
              
              <p className="text-nightBlue/70">Saturday, June 15, 2024</p>
              <p className="text-nightBlue/70">2:00 PM - 5:00 PM</p>
            </div>
            
            <div className="glass-panel rounded-2xl p-6 animate-fade-in delay-150 parallax">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-mintGreen flex items-center justify-center mr-3">
                  <Gift className="w-5 h-5 text-nightBlue" />
                </div>
                <h3 className="text-xl font-display font-semibold text-nightBlue">Gift Ideas</h3>
              </div>
              
              <p className="text-nightBlue/70 mb-3">Emma loves books, plush toys, and musical instruments.</p>
              <p className="text-nightBlue/70">Your presence is our greatest gift!</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VenueInfo;
