
import React, { useRef, useEffect, useState } from 'react';
import ChatMessage, { ChatMessageProps } from './ChatMessage';
import ChatInput from './ChatInput';
import ChatHeader from './ChatHeader';
import { ScrollArea } from "@/components/ui/scroll-area";
import { CalendarEvent } from '@/types/calendar';

interface ChatContainerProps {
  messages: ChatMessageProps[];
  isAuthenticated: boolean;
  onSendMessage: (message: string) => void;
  onLogin: () => void;
  onLogout: () => void;
  isLoading?: boolean;
  isAuthLoading?: boolean;
}

const ChatContainer: React.FC<ChatContainerProps> = ({
  messages,
  isAuthenticated,
  onSendMessage,
  onLogin,
  onLogout,
  isLoading = false,
  isAuthLoading = false,
}) => {
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const [isRecording, setIsRecording] = useState(false);

  // Scroll to bottom when messages change
  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current;
      scrollContainer.scrollTop = scrollContainer.scrollHeight;
    }
  }, [messages]);

  const handleStartRecording = () => {
    setIsRecording(true);
    // This would be where we integrate with audio processing
    console.log('Started recording');
  };

  const handleStopRecording = () => {
    setIsRecording(false);
    // This would be where we stop recording and process the audio
    console.log('Stopped recording');
  };

  return (
    <div className="flex flex-col h-full border rounded-lg shadow-sm overflow-hidden bg-gray-50">
      <ChatHeader 
        isAuthenticated={isAuthenticated} 
        onLogin={onLogin} 
        onLogout={onLogout}
        isLoading={isAuthLoading}
      />
      
      <ScrollArea 
        ref={scrollAreaRef} 
        className="flex-1 p-4 overflow-y-auto"
      >
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center p-6">
            <div className="w-16 h-16 mb-4 flex items-center justify-center rounded-full bg-google-blue/10">
              <Calendar className="h-8 w-8 text-google-blue" />
            </div>
            <h3 className="text-xl font-medium mb-2">Welcome to Calendar Assistant</h3>
            <p className="text-gray-500 max-w-md">
              {isAuthenticated 
                ? "Ask me to schedule meetings, check your availability, or manage your calendar events."
                : "Sign in with your Google account to get started with calendar management."}
            </p>
          </div>
        ) : (
          messages.map((message, index) => (
            <ChatMessage 
              key={index} 
              {...message} 
            />
          ))
        )}
        
        {isLoading && (
          <ChatMessage
            content=""
            type="agent"
            timestamp={new Date()}
            isLoading={true}
          />
        )}
      </ScrollArea>
      
      <div className="p-4 border-t border-gray-200 bg-white">
        <ChatInput
          onSendMessage={onSendMessage}
          onStartRecording={handleStartRecording}
          onStopRecording={handleStopRecording}
          isRecording={isRecording}
          isDisabled={isLoading}
          isAuthenticated={isAuthenticated}
        />
      </div>
    </div>
  );
};

export default ChatContainer;
