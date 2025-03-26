
import React from 'react';
import { CalendarIcon } from 'lucide-react';

interface CalendarHeaderProps {
  onClose: () => void;
}

const CalendarHeader: React.FC<CalendarHeaderProps> = () => {
  return (
    <div className="flex items-center p-4 border-b">
      <div className="flex items-center gap-2 text-google-blue">
        <CalendarIcon className="h-5 w-5" />
        <h2 className="text-sm font-medium">Calendar</h2>
      </div>
    </div>
  );
};

export default CalendarHeader;
