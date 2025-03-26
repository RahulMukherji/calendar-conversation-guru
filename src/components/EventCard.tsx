
import React from 'react';
import { Card } from "@/components/ui/card";
import { CalendarEvent } from '@/types/calendar';
import { formatDate, formatTime } from '@/lib/dateUtils';
import { CalendarIcon, Clock, MapPin, Users } from 'lucide-react';

interface EventCardProps {
  event: CalendarEvent;
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {
  return (
    <Card className="p-3 bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 w-full animate-scale-in">
      <div className="flex items-start space-x-3">
        <div className="flex-shrink-0 w-1 h-full bg-google-blue rounded-full self-stretch" />
        
        <div className="flex-grow">
          <h3 className="font-medium text-gray-900">{event.title}</h3>
          
          <div className="mt-2 space-y-1.5">
            {event.date && (
              <div className="flex items-center text-sm text-gray-600">
                <CalendarIcon className="h-4 w-4 mr-2 text-google-blue" />
                <span>{formatDate(new Date(event.date))}</span>
              </div>
            )}
            
            {(event.startTime || event.endTime) && (
              <div className="flex items-center text-sm text-gray-600">
                <Clock className="h-4 w-4 mr-2 text-google-green" />
                <span>
                  {event.startTime && formatTime(event.startTime)}
                  {event.endTime && ` - ${formatTime(event.endTime)}`}
                </span>
              </div>
            )}
            
            {event.location && (
              <div className="flex items-center text-sm text-gray-600">
                <MapPin className="h-4 w-4 mr-2 text-google-red" />
                <span>{event.location}</span>
              </div>
            )}
            
            {event.attendees && event.attendees.length > 0 && (
              <div className="flex items-center text-sm text-gray-600">
                <Users className="h-4 w-4 mr-2 text-google-yellow" />
                <span>{event.attendees.length} attendee{event.attendees.length !== 1 ? 's' : ''}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default EventCard;
