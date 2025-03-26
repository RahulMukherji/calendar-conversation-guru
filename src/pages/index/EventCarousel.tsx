
import React from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import EventCard from '@/components/EventCard';
import { CalendarEvent } from '@/types/calendar';

interface EventCarouselProps {
  events: CalendarEvent[];
}

const EventCarousel: React.FC<EventCarouselProps> = ({ events }) => {
  return (
    <div className="my-4 w-full">
      <Carousel className="w-full">
        <CarouselContent>
          {events.map((event, index) => (
            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
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
  );
};

export default EventCarousel;
