
import React from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CalendarToggleButtonProps {
  isOpen: boolean;
  onClick: () => void;
  isMobile?: boolean;
}

const CalendarToggleButton: React.FC<CalendarToggleButtonProps> = ({
  isOpen,
  onClick,
  isMobile = false
}) => {
  if (isMobile) {
    return (
      <div className="fixed top-4 left-0 z-50 md:hidden">
        <Button
          variant="outline"
          size="sm"
          className="h-8 pl-0 pr-2 border-l-0 rounded-l-none rounded-r-md bg-white shadow-sm"
          aria-label="Toggle Calendar"
          onClick={onClick}
        >
          <ArrowRight className="h-4 w-4 text-google-blue" />
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed top-4 left-0 z-50 md:absolute">
      <Button 
        variant="outline" 
        size="sm" 
        onClick={onClick}
        className="h-8 pl-0 pr-2 border-l-0 rounded-l-none rounded-r-md transition-all duration-300 bg-white shadow-sm"
        aria-label="Toggle Calendar"
      >
        {isOpen ? (
          <ArrowLeft className="h-4 w-4 text-google-blue" />
        ) : (
          <ArrowRight className="h-4 w-4 text-google-blue" />
        )}
      </Button>
    </div>
  );
};

export default CalendarToggleButton;
