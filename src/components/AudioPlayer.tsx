
import React, { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

interface AudioPlayerProps {
  audioSrc: string;
}

// Create a global reference for the audio that can be accessed from other components
export const audioRef = { 
  current: null as HTMLAudioElement | null,
  wasPlayingBeforeVideo: false
};

const AudioPlayer: React.FC<AudioPlayerProps> = ({ audioSrc }) => {
  const [isMuted, setIsMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    // Create audio element
    const audio = new Audio(audioSrc);
    audio.loop = true;
    audioRef.current = audio;
    
    // Try to play immediately on page load
    const playAudio = async () => {
      if (audioRef.current) {
        try {
          await audioRef.current.play();
          setIsPlaying(true);
        } catch (error) {
          console.error("Audio playback failed:", error);
          // Add click listener as a fallback for browsers that block autoplay
          document.addEventListener('click', handleFirstInteraction, { once: true });
        }
      }
    };
    
    const handleFirstInteraction = async () => {
      if (audioRef.current && !isPlaying) {
        try {
          await audioRef.current.play();
          setIsPlaying(true);
        } catch (error) {
          console.error("Audio playback failed even after interaction:", error);
        }
      }
    };
    
    // Try to play immediately
    playAudio();
    
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      document.removeEventListener('click', handleFirstInteraction);
    };
  }, [audioSrc]);

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <button
      onClick={toggleMute}
      className="fixed top-6 right-6 z-50 w-10 h-10 rounded-full glass-panel flex items-center justify-center transition-transform duration-300 hover:scale-110"
      aria-label={isMuted ? "Unmute background music" : "Mute background music"}
    >
      {isMuted ? (
        <VolumeX className="w-5 h-5 text-nightBlue" />
      ) : (
        <Volume2 className="w-5 h-5 text-nightBlue" />
      )}
    </button>
  );
};

export default AudioPlayer;
