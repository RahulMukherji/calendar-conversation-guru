
import React, { useEffect, useState } from 'react';
import { CalendarEvent } from '@/types/calendar';
import CalendarToggleButton from './calendar/CalendarToggleButton';
import MobileCalendarDrawer from './calendar/MobileCalendarDrawer';
import DesktopCalendarSidebar from './calendar/DesktopCalendarSidebar';

interface CalendarWidgetProps {
  events?: CalendarEvent[];
  isOpen: boolean;
  onToggle: () => void;
}

const CalendarWidget: React.FC<CalendarWidgetProps> = ({ 
  events = [], 
  isOpen,
  onToggle
}) => {
  const [isMobile, setIsMobile] = useState(false);
  
  // Check for mobile screen size on mount and window resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  if (isMobile) {
    return <MobileCalendarDrawer events={events} isOpen={isOpen} onToggle={onToggle} />;
  }

  // For desktop view
  return (
    <>
      <CalendarToggleButton isOpen={isOpen} onClick={onToggle} />
      <DesktopCalendarSidebar events={events} isOpen={isOpen} onToggle={onToggle} />
    </>
  );
};

export default CalendarWidget;
