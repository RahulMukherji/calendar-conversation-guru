
import React, { useState } from 'react';
import { Calendar as CalendarUI } from '@/components/ui/calendar';
import { 
  Calendar as CalendarIcon, 
  ChevronLeft, 
  ChevronRight, 
  X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  Collapsible, 
  CollapsibleContent, 
  CollapsibleTrigger 
} from '@/components/ui/collapsible';
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from '@/components/ui/accordion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { CalendarEvent } from '@/types/calendar';
import { formatDate, isToday, isTomorrow } from '@/lib/dateUtils';
import EventCard from '@/components/EventCard';
import { Drawer, DrawerClose, DrawerContent, DrawerTrigger } from '@/components/ui/drawer';

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
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  
  // Get events for the selected date
  const selectedDateStr = selectedDate.toISOString().split('T')[0];
  const eventsForSelectedDate = events.filter(event => event.date === selectedDateStr);
  
  // Group events by day
  const todayEvents = events.filter(event => event.date && isToday(event.date));
  const tomorrowEvents = events.filter(event => event.date && isTomorrow(event.date));
  const futureEvents = events.filter(event => {
    if (!event.date) return false;
    return !isToday(event.date) && !isTomorrow(event.date);
  });

  // For small screens, use a drawer instead
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  if (isMobile) {
    return (
      <Drawer open={isOpen} onOpenChange={onToggle}>
        <DrawerTrigger asChild>
          <Button 
            variant="outline" 
            size="icon" 
            className="fixed top-4 left-4 z-50 md:hidden"
            aria-label="Toggle Calendar"
          >
            <CalendarIcon className="h-5 w-5 text-google-blue" />
          </Button>
        </DrawerTrigger>
        <DrawerContent className="max-h-[90vh] overflow-y-auto">
          <div className="flex items-center justify-between p-4 border-b">
            <div className="flex items-center gap-2 text-google-blue">
              <CalendarIcon className="h-5 w-5" />
              <h2 className="text-sm font-medium">Calendar</h2>
            </div>
            <DrawerClose asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <X className="h-4 w-4" />
              </Button>
            </DrawerClose>
          </div>
          <div className="p-4 overflow-y-auto">
            {renderCalendarContent()}
          </div>
        </DrawerContent>
      </Drawer>
    );
  }

  // For desktop view
  return isOpen ? (
    <div className="fixed inset-0 z-50 bg-black/20 backdrop-blur-sm md:relative md:inset-auto md:bg-transparent md:backdrop-blur-none transition-opacity duration-300">
      <div className="absolute left-0 top-0 h-full max-w-xs w-full bg-white shadow-lg animate-slide-in">
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-2 text-google-blue">
            <CalendarIcon className="h-5 w-5" />
            <h2 className="text-sm font-medium">Calendar</h2>
          </div>
          <Button 
            variant="ghost" 
            size="icon"
            onClick={onToggle}
            className="h-8 w-8"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="p-4 overflow-y-auto h-[calc(100%-60px)]">
          {renderCalendarContent()}
        </div>
      </div>
    </div>
  ) : (
    <Button 
      variant="outline" 
      size="icon" 
      onClick={onToggle}
      className="fixed top-4 left-4 z-50 md:relative md:top-auto md:left-auto"
      aria-label="Toggle Calendar"
    >
      <CalendarIcon className="h-5 w-5 text-google-blue" />
    </Button>
  );
  
  // Helper function to render calendar content
  function renderCalendarContent() {
    return (
      <>
        <CalendarUI
          mode="single"
          selected={selectedDate}
          onSelect={(date) => date && setSelectedDate(date)}
          className="rounded-md border p-3 pointer-events-auto"
        />
        
        <div className="mt-4">
          <p className="text-sm font-medium mb-2 text-gray-700">
            {formatDate(selectedDate)}
          </p>
          
          {eventsForSelectedDate.length > 0 ? (
            <div className="space-y-2">
              {eventsForSelectedDate.map((event, index) => (
                <EventCard key={index} event={event} />
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-500">No events scheduled</p>
          )}
        </div>
        
        {/* Event Carousel */}
        {events.length > 0 && (
          <div className="mt-6">
            <h3 className="text-sm font-medium mb-3 text-gray-700">Upcoming Events</h3>
            <Carousel className="w-full">
              <CarouselContent>
                {events.map((event, index) => (
                  <CarouselItem key={index} className="md:basis-1/2">
                    <EventCard event={event} />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="flex justify-center mt-2">
                <CarouselPrevious className="static translate-y-0 mr-2" />
                <CarouselNext className="static translate-y-0" />
              </div>
            </Carousel>
          </div>
        )}
        
        <Accordion type="single" collapsible className="mt-6">
          {todayEvents.length > 0 && (
            <AccordionItem value="today" className="border-b">
              <AccordionTrigger className="text-sm py-2">
                Today ({todayEvents.length})
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2 pl-2">
                  {todayEvents.map((event, index) => (
                    <div key={index} className="text-sm p-2 border-l-2 border-google-blue">
                      <div className="font-medium">{event.title}</div>
                      {event.startTime && (
                        <div className="text-xs text-gray-500">{event.startTime}</div>
                      )}
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          )}
          
          {tomorrowEvents.length > 0 && (
            <AccordionItem value="tomorrow" className="border-b">
              <AccordionTrigger className="text-sm py-2">
                Tomorrow ({tomorrowEvents.length})
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2 pl-2">
                  {tomorrowEvents.map((event, index) => (
                    <div key={index} className="text-sm p-2 border-l-2 border-green-500">
                      <div className="font-medium">{event.title}</div>
                      {event.startTime && (
                        <div className="text-xs text-gray-500">{event.startTime}</div>
                      )}
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          )}
          
          {futureEvents.length > 0 && (
            <AccordionItem value="upcoming" className="border-b">
              <AccordionTrigger className="text-sm py-2">
                Upcoming ({futureEvents.length})
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2 pl-2">
                  {futureEvents.map((event, index) => (
                    <div key={index} className="text-sm p-2 border-l-2 border-orange-400">
                      <div className="font-medium">{event.title}</div>
                      {event.date && (
                        <div className="text-xs text-gray-500">
                          {new Date(event.date).toLocaleDateString()}
                          {event.startTime && ` · ${event.startTime}`}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          )}
        </Accordion>
      </>
    );
  }
};

export default CalendarWidget;
