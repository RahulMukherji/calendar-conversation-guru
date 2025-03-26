
import React, { useState } from 'react';
import CalendarWidget from '@/components/CalendarWidget';
import ChatLayout from './ChatLayout';
import { CalendarEvent } from '@/types/calendar';
import { ChatMessageProps } from '@/components/ChatMessage';

interface LayoutManagerProps {
  isAuthenticated: boolean;
  loading: boolean;
  messages: ChatMessageProps[];
  isProcessing: boolean;
  events: CalendarEvent[];
  onSendMessage: (message: string) => void;
  onLogin: () => void;
  onLogout: () => void;
}

const LayoutManager: React.FC<LayoutManagerProps> = ({
  isAuthenticated,
  loading,
  messages,
  isProcessing,
  events,
  onSendMessage,
  onLogin,
  onLogout,
}) => {
  // Initialize with calendar closed
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const toggleCalendar = () => {
    setIsCalendarOpen(!isCalendarOpen);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 p-0 md:p-4">
      <div className="max-w-6xl mx-auto h-[100vh] md:h-[calc(100vh-4rem)]">
        <div className="relative h-full">
          {/* Calendar Widget */}
          <CalendarWidget 
            events={events} 
            isOpen={isCalendarOpen}
            onToggle={toggleCalendar}
          />
          
          {/* Main Chat Container */}
          <ChatLayout
            messages={messages}
            isAuthenticated={isAuthenticated}
            onSendMessage={onSendMessage}
            onLogin={onLogin}
            onLogout={onLogout}
            isProcessing={isProcessing}
            loading={loading}
            isCalendarOpen={isCalendarOpen}
          />
        </div>
      </div>
    </div>
  );
};

export default LayoutManager;
