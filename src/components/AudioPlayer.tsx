
import React, { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

interface AudioPlayerProps {
  audioSrc: string;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ audioSrc }) => {
  const [isMuted, setIsMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Create audio element
    const audio = new Audio(audioSrc);
    audio.loop = true;
    audioRef.current = audio;
    
    // Auto-play might be blocked by browsers, so we need user interaction
    const startAudio = () => {
      if (audioRef.current) {
        audioRef.current.play()
          .then(() => {
            setIsPlaying(true);
          })
          .catch((error) => {
            console.error("Audio playback failed:", error);
          });
      }
      
      // Remove the event listener after first interaction
      document.removeEventListener('click', startAudio);
    };
    
    document.addEventListener('click', startAudio);
    
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      document.removeEventListener('click', startAudio);
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
