
import React, { useState, useEffect } from 'react';
import { Video, X } from 'lucide-react';
import { audioRef } from './AudioPlayer';

const FloatingVideo: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [wasAudioPlaying, setWasAudioPlaying] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show bubble when user scrolls to bottom of the page
      const scrollPosition = window.scrollY + window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      
      if (scrollPosition >= documentHeight - 100) {
        setIsVisible(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const openVideo = () => {
    // Remember if audio was playing
    if (audioRef.current && !audioRef.current.paused) {
      setWasAudioPlaying(true);
      audioRef.current.pause();
    }
    setIsOpen(true);
  };

  const closeVideo = () => {
    // Resume audio if it was playing before
    if (audioRef.current && wasAudioPlaying && !audioRef.current.muted) {
      audioRef.current.play();
      setWasAudioPlaying(false);
    }
    setIsOpen(false);
  };

  return (
    <>
      {/* Floating Video Button - Always visible once it appears */}
      <div 
        className={`video-bubble ${isOpen ? 'active' : ''} ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-[-50px]'}`}
        style={{ 
          transition: 'opacity 0.5s ease, transform 0.5s ease',
          opacity: isVisible ? (isOpen ? 0.6 : 1) : 0
        }}
        onClick={openVideo}
      >
        <Video className="w-6 h-6" />
      </div>
      
      {/* Video Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl overflow-hidden w-full max-w-3xl shadow-2xl animate-fade-in">
            <div className="flex items-center justify-between bg-gradient-to-r from-babyBlue to-softPurple p-4">
              <h3 className="text-white font-medium">Special Birthday Message</h3>
              <button 
                onClick={closeVideo}
                className="text-white hover:text-white/80 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="aspect-video relative bg-black">
              {/* Replace with your actual video or embed code */}
              <div className="absolute inset-0 flex items-center justify-center text-white text-center p-8">
                <p className="text-lg">Your special birthday message video would appear here.<br />(Video player placeholder)</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FloatingVideo;
