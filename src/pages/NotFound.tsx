
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-white to-gray-50 p-4">
      <div className="text-center max-w-md animate-fade-in">
        <div className="w-20 h-20 mx-auto mb-6 flex items-center justify-center rounded-full bg-google-blue/10">
          <Calendar className="h-10 w-10 text-google-blue" />
        </div>
        
        <h1 className="text-6xl font-bold mb-4 text-google-blue">404</h1>
        <p className="text-xl text-gray-700 mb-6">Oops! This page doesn't exist in your calendar</p>
        
        <Button 
          asChild
          size="lg" 
          className="bg-google-blue hover:bg-google-blue/90 transition-all"
        >
          <a href="/" className="px-6 py-2 rounded-full">
            Return to Home
          </a>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
