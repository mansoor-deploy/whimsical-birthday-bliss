
import React, { useEffect, useState } from 'react';

interface Star {
  id: number;
  top: string;
  left: string;
  size: string;
  delay: string;
  duration: string;
}

const StarryBackground: React.FC = () => {
  const [stars, setStars] = useState<Star[]>([]);

  useEffect(() => {
    const generateStars = () => {
      const numberOfStars = window.innerWidth < 768 ? 20 : 35;
      const newStars: Star[] = [];
      
      for (let i = 0; i < numberOfStars; i++) {
        newStars.push({
          id: i,
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`,
          size: `${Math.random() * 4 + 2}px`,
          delay: `${Math.random() * 5}s`,
          duration: `${Math.random() * 3 + 2}s`,
        });
      }
      
      setStars(newStars);
    };

    generateStars();
    
    window.addEventListener('resize', generateStars);
    
    return () => {
      window.removeEventListener('resize', generateStars);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      {stars.map((star) => (
        <div
          key={star.id}
          className="star"
          style={{
            top: star.top,
            left: star.left,
            width: star.size,
            height: star.size,
            animationDelay: star.delay,
            animationDuration: star.duration,
          }}
        />
      ))}
      
      {/* Clouds */}
      <div className="cloud" style={{ top: '15%', left: '10%', width: '100px', height: '50px', opacity: 0.8, animationDelay: '0s' }}></div>
      <div className="cloud" style={{ top: '30%', right: '15%', width: '120px', height: '60px', opacity: 0.7, animationDelay: '2s' }}></div>
      <div className="cloud" style={{ bottom: '20%', left: '20%', width: '80px', height: '40px', opacity: 0.9, animationDelay: '1s' }}></div>
    </div>
  );
};

export default StarryBackground;
