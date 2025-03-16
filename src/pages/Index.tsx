
import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
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
        <section className="py-12 px-4">
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
        <section className="py-12 px-4 bg-gradient-to-r from-mintGreen/40 to-babyBlue/40">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="section-title mb-8">Join The Celebration</h2>
            
            <div className="glass-panel rounded-2xl p-8 md:p-12 max-w-2xl mx-auto mt-8">
              <p className="text-nightBlue font-medium mb-6">
                We would be delighted to have you join us for Emma's first birthday celebration!
              </p>
              
              <Link to="/rsvp" className="btn-primary inline-block">
                RSVP Now
              </Link>
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
