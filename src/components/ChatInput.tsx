
import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mic, MicOff, Send } from 'lucide-react';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  onStartRecording: () => void;
  onStopRecording: () => void;
  isRecording: boolean;
  isDisabled: boolean;
  isAuthenticated: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({
  onSendMessage,
  onStartRecording,
  onStopRecording,
  isRecording,
  isDisabled,
  isAuthenticated,
}) => {
  const [message, setMessage] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input when component mounts
  useEffect(() => {
    if (inputRef.current && !isDisabled) {
      inputRef.current.focus();
    }
  }, [isDisabled]);

  const handleSendMessage = () => {
    if (message.trim() && !isDisabled) {
      onSendMessage(message);
      setMessage('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleRecordingToggle = () => {
    if (isRecording) {
      onStopRecording();
    } else {
      onStartRecording();
    }
  };

  return (
    <div className="w-full">
      <div className="relative flex items-center">
        <Input
          ref={inputRef}
          type="text"
          placeholder={
            !isAuthenticated 
              ? "Sign in to chat" 
              : isDisabled 
                ? "Processing..." 
                : "Type your message..."
          }
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={isDisabled || !isAuthenticated}
          className="pr-24 py-6 rounded-full border border-gray-300 focus:border-google-blue focus:ring-2 focus:ring-google-blue/20 transition-all"
        />
        
        <div className="absolute right-2 flex space-x-1">
          <Button
            type="button"
            size="icon"
            variant="ghost"
            onClick={handleRecordingToggle}
            disabled={isDisabled || !isAuthenticated}
            className={`rounded-full hover:bg-gray-100 ${
              isRecording ? 'text-google-red animate-pulse-subtle' : 'text-gray-500'
            }`}
          >
            {isRecording ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
          </Button>
          
          <Button
            type="button"
            size="icon"
            onClick={handleSendMessage}
            disabled={!message.trim() || isDisabled || !isAuthenticated}
            className="rounded-full bg-google-blue hover:bg-google-blue/90 text-white"
          >
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatInput;
