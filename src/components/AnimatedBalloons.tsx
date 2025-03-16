
import React, { useEffect, useState, useRef } from 'react';

interface Balloon {
  id: number;
  left: string;
  delay: string;
  size: string;
  color: string;
  duration: string;
}

const AnimatedBalloons: React.FC = () => {
  const [balloons, setBalloons] = useState<Balloon[]>([]);
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const colors = [
      'bg-babyBlue',
      'bg-softPink',
      'bg-mintGreen',
      'bg-softPurple',
      'bg-starYellow',
      'bg-softPeach'
    ];
    
    const generateBalloons = () => {
      const numberOfBalloons = window.innerWidth < 768 ? 5 : 8;
      const newBalloons: Balloon[] = [];
      
      for (let i = 0; i < numberOfBalloons; i++) {
        newBalloons.push({
          id: i,
          left: `${(i * (100 / numberOfBalloons)) + Math.random() * 10}%`,
          delay: `${Math.random() * 2}s`,
          size: `${Math.random() * 20 + 40}px`,
          color: colors[Math.floor(Math.random() * colors.length)],
          duration: `${Math.random() * 2 + 8}s`
        });
      }
      
      setBalloons(newBalloons);
    };
    
    generateBalloons();
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
        }
      },
      { threshold: 0.2 }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <div ref={sectionRef} className="relative h-64 md:h-80 overflow-hidden my-16">
      {balloons.map((balloon) => (
        <div
          key={balloon.id}
          className={`balloon ${balloon.color} ${visible ? 'opacity-100' : 'opacity-0'}`}
          style={{
            left: balloon.left,
            bottom: '-80px',
            width: balloon.size,
            height: `calc(${balloon.size} * 1.2)`,
            animationDelay: balloon.delay,
            animationDuration: balloon.duration,
            transform: visible ? 'translateY(-100vh)' : 'translateY(0)',
            transition: `opacity 0.5s ease, transform ${balloon.duration} ease-out ${balloon.delay}`,
            borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
          }}
        >
          <div 
            className="absolute bottom-0 left-1/2 w-1 h-12 bg-white/50"
            style={{ transform: 'translateX(-50%)' }}
          ></div>
        </div>
      ))}
    </div>
  );
};

export default AnimatedBalloons;
