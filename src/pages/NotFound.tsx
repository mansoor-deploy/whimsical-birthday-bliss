
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Star } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-cloudWhite to-babyBlue bg-fixed">
      <div className="text-center p-8 glass-panel rounded-2xl max-w-lg animate-fade-in">
        <div className="flex justify-center mb-6">
          <Star className="w-12 h-12 text-softPink animate-pulse-soft" />
        </div>
        <h1 className="text-4xl font-display font-bold mb-4 text-nightBlue">Oops!</h1>
        <p className="text-xl text-nightBlue/70 mb-6">It seems you've wandered to a place that doesn't exist in our little star's universe.</p>
        <a 
          href="/" 
          className="btn-primary inline-block"
        >
          Return to Celebration
        </a>
      </div>
    </div>
  );
};

export default NotFound;
