
import React from 'react';
import { CalendarIcon, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CalendarHeaderProps {
  onClose: () => void;
}

const CalendarHeader: React.FC<CalendarHeaderProps> = ({ onClose }) => {
  return (
    <div className="flex items-center justify-between p-4 border-b">
      <div className="flex items-center gap-2 text-google-blue">
        <CalendarIcon className="h-5 w-5" />
        <h2 className="text-sm font-medium">Calendar</h2>
      </div>
      <Button 
        variant="ghost" 
        size="icon"
        onClick={onClose}
        className="h-8 w-8"
      >
        <X className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default CalendarHeader;
