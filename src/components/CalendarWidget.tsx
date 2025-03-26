
import React from 'react';
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
  // For small screens, use a drawer instead
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  if (isMobile) {
    return <MobileCalendarDrawer events={events} isOpen={isOpen} onToggle={onToggle} />;
  }

  // For desktop view - use absolute positioning with animation
  return (
    <>
      <CalendarToggleButton isOpen={isOpen} onClick={onToggle} />
      <DesktopCalendarSidebar events={events} isOpen={isOpen} onToggle={onToggle} />
    </>
  );
};

export default CalendarWidget;
