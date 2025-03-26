
import React from 'react';
import { CalendarEvent } from '@/types/calendar';
import CalendarHeader from './CalendarHeader';
import CalendarContent from './CalendarContent';

interface DesktopCalendarSidebarProps {
  events: CalendarEvent[];
  isOpen: boolean;
  onToggle: () => void;
}

const DesktopCalendarSidebar: React.FC<DesktopCalendarSidebarProps> = ({
  events,
  isOpen,
  onToggle
}) => {
  return (
    <>
      <div 
        className={`fixed inset-y-0 left-0 z-40 w-full max-w-xs bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } md:absolute md:inset-auto md:top-0 md:bottom-0 md:h-full md:translate-x-[-100%] md:${isOpen ? 'translate-x-0' : 'translate-x-[-100%]'}`}
      >
        <CalendarHeader onClose={onToggle} />
        <div className="p-4 overflow-y-auto h-[calc(100%-60px)]">
          <CalendarContent events={events} />
        </div>
      </div>

      {/* Overlay to close calendar when clicking outside on mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-30 bg-black/20 backdrop-blur-sm md:hidden"
          onClick={onToggle}
        />
      )}
    </>
  );
};

export default DesktopCalendarSidebar;
