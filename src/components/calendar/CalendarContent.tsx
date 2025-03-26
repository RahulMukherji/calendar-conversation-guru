
import React, { useState } from 'react';
import { Calendar as CalendarUI } from '@/components/ui/calendar';
import { CalendarEvent } from '@/types/calendar';
import { formatDate, isToday, isTomorrow } from '@/lib/dateUtils';
import EventCard from '@/components/EventCard';
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from '@/components/ui/accordion';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface CalendarContentProps {
  events: CalendarEvent[];
}

const CalendarContent: React.FC<CalendarContentProps> = ({ events }) => {
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
};

export default CalendarContent;
