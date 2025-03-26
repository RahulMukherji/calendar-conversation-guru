
import React from 'react';
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer';
import CalendarHeader from './CalendarHeader';
import CalendarContent from './CalendarContent';
import CalendarToggleButton from './CalendarToggleButton';
import { CalendarEvent } from '@/types/calendar';

interface MobileCalendarDrawerProps {
  events: CalendarEvent[];
  isOpen: boolean;
  onToggle: () => void;
}

const MobileCalendarDrawer: React.FC<MobileCalendarDrawerProps> = ({
  events,
  isOpen,
  onToggle
}) => {
  return (
    <Drawer open={isOpen} onOpenChange={onToggle}>
      <DrawerTrigger asChild>
        <CalendarToggleButton isOpen={isOpen} onClick={() => {}} isMobile={true} />
      </DrawerTrigger>
      <DrawerContent className="max-h-[90vh] overflow-y-auto">
        <CalendarHeader onClose={onToggle} />
        <div className="p-4 overflow-y-auto">
          <CalendarContent events={events} />
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default MobileCalendarDrawer;
