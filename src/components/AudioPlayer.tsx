
import React, { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

interface AudioPlayerProps {
  audioSrc: string;
}

// Create a global reference for the audio that can be accessed from other components
export const audioRef = { current: null as HTMLAudioElement | null };

const AudioPlayer: React.FC<AudioPlayerProps> = ({ audioSrc }) => {
  const [isMuted, setIsMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    // Create audio element
    const audio = new Audio(audioSrc);
    audio.loop = true;
    audioRef.current = audio;
    
    // Try to play immediately on page load
    const playAudio = () => {
      if (audioRef.current) {
        audioRef.current.play()
          .then(() => {
            setIsPlaying(true);
          })
          .catch((error) => {
            console.error("Audio playback failed:", error);
          });
      }
    };
    
    // Try to play immediately
    playAudio();
    
    // Also add click listener as a fallback for browsers that block autoplay
    document.addEventListener('click', playAudio, { once: true });
    
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      document.removeEventListener('click', playAudio);
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
