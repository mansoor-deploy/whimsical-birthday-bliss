
import React, { useState, useEffect } from 'react';
import { Calendar } from 'lucide-react';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const Countdown: React.FC = () => {
  // Set your event date here - format: YYYY, MM (0-based), DD, HH, MM, SS
  const eventDate = new Date(2024, 5, 15, 14, 0, 0);
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = eventDate.getTime() - new Date().getTime();
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    
    return () => clearInterval(timer);
  }, [eventDate]);

  const addToCalendar = () => {
    const formattedDate = eventDate.toISOString().replace(/-|:|\.\d+/g, '');
    const endDate = new Date(eventDate.getTime() + (3 * 60 * 60 * 1000)).toISOString().replace(/-|:|\.\d+/g, '');
    
    const googleCalendarUrl = `https://www.google.com/calendar/render?action=TEMPLATE&text=Emma's First Birthday Celebration&dates=${formattedDate}/${endDate}&details=Join us for Emma's first birthday celebration!&location=1234 Starlight Avenue, Dream City`;
    
    window.open(googleCalendarUrl, '_blank');
  };

  return (
    <section className="py-16 px-4 relative">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="section-title">The Countdown Begins</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 max-w-2xl mx-auto">
          <div className="countdown-item">
            <span className="text-2xl md:text-4xl font-bold text-nightBlue">{timeLeft.days}</span>
            <span className="text-sm md:text-base text-nightBlue/60">Days</span>
          </div>
          <div className="countdown-item">
            <span className="text-2xl md:text-4xl font-bold text-nightBlue">{timeLeft.hours}</span>
            <span className="text-sm md:text-base text-nightBlue/60">Hours</span>
          </div>
          <div className="countdown-item">
            <span className="text-2xl md:text-4xl font-bold text-nightBlue">{timeLeft.minutes}</span>
            <span className="text-sm md:text-base text-nightBlue/60">Minutes</span>
          </div>
          <div className="countdown-item">
            <span className="text-2xl md:text-4xl font-bold text-nightBlue">{timeLeft.seconds}</span>
            <span className="text-sm md:text-base text-nightBlue/60">Seconds</span>
          </div>
        </div>
        
        <button 
          onClick={addToCalendar}
          className="mt-8 inline-flex items-center space-x-2 px-6 py-3 rounded-full bg-gradient-to-r from-softPurple to-softPink text-white font-medium shadow-md transition-all duration-300 hover:shadow-lg hover:scale-105 active:scale-95"
        >
          <Calendar className="w-5 h-5" />
          <span>Add to Calendar</span>
        </button>
      </div>
    </section>
  );
};

export default Countdown;
