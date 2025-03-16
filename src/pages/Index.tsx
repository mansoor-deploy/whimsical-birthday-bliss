
import React, { useRef } from 'react';
import Header from '../components/Header';
import Countdown from '../components/Countdown';
import VenueInfo from '../components/VenueInfo';
import AnimatedBalloons from '../components/AnimatedBalloons';
import AudioPlayer from '../components/AudioPlayer';
import FloatingVideo from '../components/FloatingVideo';
import GoogleCalendar from '../components/GoogleCalendar';
import StarryBackground from '../components/StarryBackground';
import { Heart, Star, Send } from 'lucide-react';
import { useToast } from '../hooks/use-toast';

const Index = () => {
  const mainRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLElement>(null);
  const { toast } = useToast();
  
  // Set custom event date - March 31, 2025
  const eventDate = new Date(2025, 2, 31, 14, 0, 0);
  
  const handleRSVP = (e: React.FormEvent) => {
    e.preventDefault();
    
    toast({
      title: "RSVP Received!",
      description: "Thank you for confirming your attendance. We look forward to celebrating with you!",
      duration: 5000,
    });
  };

  const scrollToGallery = () => {
    if (galleryRef.current) {
      galleryRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

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
        <Countdown eventDate={eventDate} eventTitle="Emma's First Birthday Celebration" />
        
        {/* No gap here - reduced spacing */}
        
        {/* Venue Information */}
        <VenueInfo />
        
        {/* Animated Balloons */}
        <AnimatedBalloons />
        
        {/* Google Calendar Integration */}
        <GoogleCalendar />
        
        {/* Gallery Section */}
        <section id="gallery-section" ref={galleryRef} className="py-12 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="section-title mb-8">Precious Moments</h2>
            
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
            
            <p className="text-nightBlue mt-8 font-medium">
              Photos will be added after the celebration!
            </p>
          </div>
        </section>
        
        {/* RSVP Section */}
        <section id="rsvp-section" className="py-12 px-4 bg-gradient-to-r from-mintGreen/40 to-babyBlue/40">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="section-title mb-8">Join The Celebration</h2>
            
            <div className="glass-panel rounded-2xl p-8 md:p-12 max-w-2xl mx-auto mt-8">
              <p className="text-nightBlue font-medium mb-6">
                We would be delighted to have you join us for Emma's first birthday celebration!
              </p>
              
              <form onSubmit={handleRSVP} className="space-y-6 max-w-md mx-auto">
                <div className="glass-panel rounded-lg p-4">
                  <input 
                    type="text" 
                    placeholder="Full Name" 
                    className="w-full bg-transparent border-b border-nightBlue/20 p-2 focus:outline-none focus:border-softPurple" 
                    required
                  />
                </div>
                
                <div className="glass-panel rounded-lg p-4">
                  <input 
                    type="email" 
                    placeholder="Email Address" 
                    className="w-full bg-transparent border-b border-nightBlue/20 p-2 focus:outline-none focus:border-softPurple" 
                    required
                  />
                </div>
                
                <div className="glass-panel rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <p className="font-medium text-sm text-nightBlue">Will you be attending?</p>
                  </div>
                  <div className="flex gap-4 justify-center">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" name="attending" value="yes" className="accent-softPurple" required />
                      <span>Yes</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" name="attending" value="no" className="accent-softPurple" />
                      <span>No</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" name="attending" value="maybe" className="accent-softPurple" />
                      <span>Maybe</span>
                    </label>
                  </div>
                </div>
                
                <button 
                  type="submit" 
                  className="btn-primary flex items-center justify-center gap-2 mx-auto"
                >
                  <Send className="w-4 h-4" />
                  <span>Send RSVP</span>
                </button>
              </form>
            </div>
          </div>
        </section>
        
        {/* Footer */}
        <footer className="py-8 px-4 text-center text-nightBlue flex flex-col items-center">
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
