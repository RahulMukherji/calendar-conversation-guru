
import React from 'react';
import { Avatar } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { CalendarEvent } from '@/types/calendar';
import EventCard from './EventCard';

export type MessageType = 'user' | 'agent' | 'system';

export interface ChatMessageProps {
  content: string;
  type: MessageType;
  timestamp: Date;
  events?: CalendarEvent[];
  isLoading?: boolean;
  customContent?: React.ReactNode;
}

const ChatMessage: React.FC<ChatMessageProps> = ({
  content,
  type,
  timestamp,
  events = [],
  isLoading = false,
  customContent,
}) => {
  const formattedTime = new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  }).format(timestamp);

  return (
    <div className={`flex ${type === 'user' ? 'justify-end' : 'justify-start'} mb-4 message-appear`}>
      <div className={`flex ${type === 'user' ? 'flex-row-reverse' : 'flex-row'} max-w-[80%]`}>
        {/* Only show avatar for agent messages, not for user or system messages */}
        {type === 'agent' && (
          <Avatar className="h-8 w-8 mr-2">
            <div className="h-full w-full flex items-center justify-center bg-google-blue text-white font-semibold">
              A
            </div>
          </Avatar>
        )}
        
        <div className={`flex flex-col ${type === 'user' ? 'items-end' : 'items-start'}`}>
          <Card className={`p-3 ${
            type === 'user' 
              ? 'bg-google-blue text-white' 
              : type === 'system'
                ? 'bg-muted'
                : 'bg-white'
          } shadow-sm`}>
            <div className="whitespace-pre-wrap">
              {isLoading ? (
                <div className="flex items-center">
                  <span className="google-loader mr-2" />
                  <span className="text-gray-500">Thinking...</span>
                </div>
              ) : (
                content
              )}
            </div>
          </Card>
          
          {/* Render custom content if provided */}
          {customContent && (
            <div className="mt-2 w-full">{customContent}</div>
          )}
          
          {/* Render event cards if provided */}
          {events && events.length > 0 && (
            <div className="mt-2 space-y-2 w-full">
              {events.map((event, index) => (
                <EventCard key={index} event={event} />
              ))}
            </div>
          )}
          
          <span className="text-xs text-gray-500 mt-1">{formattedTime}</span>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
