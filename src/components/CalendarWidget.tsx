
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
import { CalendarEvent } from '@/types/calendar';
import { formatDate, isToday, isTomorrow } from '@/lib/dateUtils';

interface CalendarWidgetProps {
  events?: CalendarEvent[];
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

const CalendarWidget: React.FC<CalendarWidgetProps> = ({ 
  events = [], 
  isCollapsed,
  onToggleCollapse
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

  return (
    <div className="h-full flex flex-col bg-gray-50 border-r">
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center gap-2 text-google-blue">
          <CalendarIcon className="h-5 w-5" />
          <h2 className="text-sm font-medium">Calendar</h2>
        </div>
        <Button 
          variant="ghost" 
          size="icon"
          onClick={onToggleCollapse}
          className="h-8 w-8"
        >
          {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <X className="h-4 w-4" />}
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto p-3">
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
                <Card key={index} className="bg-white">
                  <CardContent className="p-3">
                    <div className="text-sm font-medium">{event.title}</div>
                    {event.startTime && event.endTime && (
                      <div className="text-xs text-gray-500">
                        {event.startTime} - {event.endTime}
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-500">No events scheduled</p>
          )}
        </div>
        
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
      </div>
    </div>
  );
};

export default CalendarWidget;
