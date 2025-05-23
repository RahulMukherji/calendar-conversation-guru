
import { useState, useEffect } from 'react';
import { ChatMessageProps } from '@/components/ChatMessage';
import { CalendarEvent } from '@/types/calendar';
import { useToast } from '@/hooks/use-toast';
import EventCarousel from './EventCarousel';

export const useMessageHandler = (isAuthenticated: boolean, loading: boolean) => {
  const { toast } = useToast();
  const [messages, setMessages] = useState<ChatMessageProps[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [events, setEvents] = useState<CalendarEvent[]>([]);

  // Initialize with welcome message when authentication state changes
  useEffect(() => {
    if (!loading) {
      setMessages([
        {
          content: isAuthenticated 
            ? "Hi there! I'm your Calendar Assistant. How can I help with your schedule today?" 
            : "Welcome! Please sign in with your Google account to start managing your calendar.",
          type: 'agent',
          timestamp: new Date(),
        }
      ]);
    }
  }, [isAuthenticated, loading]);

  // Initialize with mock events data
  useEffect(() => {
    if (isAuthenticated) {
      const today = new Date();
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);
      const nextWeek = new Date(today);
      nextWeek.setDate(nextWeek.getDate() + 7);
      
      // Sample events
      const mockEvents: CalendarEvent[] = [
        {
          title: 'Team Standup',
          date: today.toISOString().split('T')[0],
          startTime: '10:00',
          endTime: '10:30',
          location: 'Google Meet',
          attendees: ['john@example.com', 'sarah@example.com'],
        },
        {
          title: 'Product Review',
          date: tomorrow.toISOString().split('T')[0],
          startTime: '14:00',
          endTime: '15:00',
          location: 'Conference Room A',
          attendees: ['product@example.com', 'design@example.com'],
        },
        {
          title: 'Quarterly Planning',
          date: nextWeek.toISOString().split('T')[0],
          startTime: '09:00',
          endTime: '12:00',
          location: 'Main Office',
          attendees: ['team@example.com'],
        }
      ];
      
      setEvents(mockEvents);
    }
  }, [isAuthenticated]);
  
  const handleSendMessage = async (message: string) => {
    // Add user message to chat
    const userMessage: ChatMessageProps = {
      content: message,
      type: 'user',
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setIsProcessing(true);
    
    try {
      // Special case for "hi" command - show all available content cards
      if (message.toLowerCase() === "hi") {
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Create a response with all event types
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        const nextWeek = new Date(today);
        nextWeek.setDate(nextWeek.getDate() + 7);
        
        const demoEvents: CalendarEvent[] = [
          {
            title: 'Regular Meeting',
            date: today.toISOString().split('T')[0],
            startTime: '10:00',
            endTime: '10:30',
            location: 'Google Meet',
            attendees: ['john@example.com', 'sarah@example.com'],
          },
          {
            title: 'All-day Event',
            date: tomorrow.toISOString().split('T')[0],
            isAllDay: true,
            location: 'Conference Center',
            description: 'Company-wide training day',
          },
          {
            title: 'Multi-attendee Meeting',
            date: nextWeek.toISOString().split('T')[0],
            startTime: '13:00',
            endTime: '14:00',
            location: 'Conference Room B',
            attendees: ['team@example.com', 'client@example.com', 'sales@example.com', 'design@example.com'],
            description: 'Quarterly business review with all stakeholders',
          },
          {
            title: 'Tentative Event',
            date: today.toISOString().split('T')[0],
            startTime: '15:00',
            endTime: '16:00',
            status: 'tentative',
            description: 'Pending confirmation from attendees',
          },
          {
            title: 'Cancelled Meeting',
            date: tomorrow.toISOString().split('T')[0],
            startTime: '09:00',
            endTime: '10:00',
            status: 'cancelled',
            description: 'This meeting was cancelled',
          }
        ];
        
        // First response with regular event cards
        const initialResponse: ChatMessageProps = {
          content: "Here are examples of all the available calendar event card types:",
          type: 'agent',
          timestamp: new Date(),
          events: demoEvents,
        };
        
        setMessages(prev => [...prev, initialResponse]);
        
        // Second response with carousel of events
        await new Promise(resolve => setTimeout(resolve, 500));
        const carouselResponse: ChatMessageProps = {
          content: "And here's a carousel view of your upcoming events that you can easily scroll through:",
          type: 'agent',
          timestamp: new Date(),
          customContent: (
            <EventCarousel events={demoEvents} />
          ),
        };
        
        setMessages(prev => [...prev, carouselResponse]);
        
        // Also add these events to the calendar widget
        setEvents(prev => [...prev, ...demoEvents]);
        
      } else {
        // Simulate a response from the LLM agent
        // In a real implementation, this would call your LLM API
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Mock response based on message content
        let response: ChatMessageProps;
        let responseEvents: CalendarEvent[] = [];
        
        // Simple logic to demonstrate event cards
        if (message.toLowerCase().includes('schedule') || message.toLowerCase().includes('meeting')) {
          const today = new Date();
          
          responseEvents = [
            {
              title: 'Team Standup',
              date: today.toISOString().split('T')[0],
              startTime: '10:00',
              endTime: '10:30',
              location: 'Google Meet',
              attendees: ['john@example.com', 'sarah@example.com'],
            }
          ];
          
          response = {
            content: "I've scheduled a 'Team Standup' for today at 10:00 AM. Here are the details:",
            type: 'agent',
            timestamp: new Date(),
            events: responseEvents,
          };
          
          // Add the event to our events list
          setEvents(prev => [...prev, ...responseEvents]);
        } else if (message.toLowerCase().includes('tomorrow')) {
          const tomorrow = new Date();
          tomorrow.setDate(tomorrow.getDate() + 1);
          
          responseEvents = [
            {
              title: 'Product Review',
              date: tomorrow.toISOString().split('T')[0],
              startTime: '14:00',
              endTime: '15:00',
              location: 'Conference Room A',
              attendees: ['product@example.com', 'design@example.com'],
            }
          ];
          
          response = {
            content: "Here's your meeting for tomorrow:",
            type: 'agent',
            timestamp: new Date(),
            events: responseEvents,
          };
          
          // Add the event to our events list
          setEvents(prev => [...prev, ...responseEvents]);
        } else {
          response = {
            content: "I can help you manage your calendar. You can ask me to schedule meetings, check your availability, or manage existing events. What would you like to do?",
            type: 'agent',
            timestamp: new Date(),
          };
        }
        
        setMessages(prev => [...prev, response]);
      }
    } catch (error) {
      console.error('Error processing message:', error);
      
      toast({
        title: 'Error',
        description: 'Failed to process your request. Please try again.',
        variant: 'destructive',
      });
      
      // Add error message to chat
      setMessages(prev => [
        ...prev, 
        {
          content: "I'm sorry, I encountered an error while processing your request. Please try again.",
          type: 'system',
          timestamp: new Date(),
        }
      ]);
    } finally {
      setIsProcessing(false);
    }
  };

  return {
    messages,
    isProcessing,
    events,
    handleSendMessage,
    setEvents
  };
};
