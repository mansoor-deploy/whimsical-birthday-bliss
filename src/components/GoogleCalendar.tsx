
import React from 'react';
import { Calendar, Check } from 'lucide-react';

const GoogleCalendar: React.FC = () => {
  const addToGoogleCalendar = () => {
    // Set your event details
    const eventDate = new Date(2024, 5, 15, 14, 0, 0); // June 15, 2024 at 2:00 PM
    const endDate = new Date(eventDate.getTime() + (3 * 60 * 60 * 1000)); // 3 hours later
    
    const formattedStart = eventDate.toISOString().replace(/-|:|\.\d+/g, '');
    const formattedEnd = endDate.toISOString().replace(/-|:|\.\d+/g, '');
    
    const eventDetails = {
      title: "Emma's First Birthday Celebration",
      details: "Join us for a magical day as we celebrate Emma's first trip around the sun!",
      location: "Starlight Gardens, 1234 Dreamy Lane, Wonderville",
      start: formattedStart,
      end: formattedEnd
    };
    
    const googleCalendarUrl = `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(eventDetails.title)}&dates=${eventDetails.start}/${eventDetails.end}&details=${encodeURIComponent(eventDetails.details)}&location=${encodeURIComponent(eventDetails.location)}`;
    
    window.open(googleCalendarUrl, '_blank');
  };

  return (
    <section className="py-16 px-4 bg-gradient-to-r from-babyBlue/30 to-softPurple/30">
      <div className="max-w-4xl mx-auto text-center">
        <div className="glass-panel rounded-2xl p-8 md:p-12 shadow-lg">
          <div className="w-16 h-16 rounded-full bg-gradient-to-r from-softPink to-softPurple flex items-center justify-center mx-auto mb-6">
            <Calendar className="w-8 h-8 text-white" />
          </div>
          
          <h2 className="text-2xl md:text-3xl font-display font-semibold text-nightBlue mb-4">
            Save the Date
          </h2>
          
          <p className="text-nightBlue/70 mb-8 max-w-lg mx-auto">
            Add Emma's birthday celebration to your calendar so you won't miss this special day filled with joy, laughter, and magical moments!
          </p>
          
          <button
            onClick={addToGoogleCalendar}
            className="inline-flex items-center space-x-2 px-6 py-3 rounded-full bg-gradient-to-r from-softPurple to-softPink text-white font-medium shadow-md transition-all duration-300 hover:shadow-lg hover:scale-105 active:scale-95"
          >
            <Check className="w-5 h-5" />
            <span>Add to Google Calendar</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default GoogleCalendar;
