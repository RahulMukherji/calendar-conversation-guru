
import React from 'react';
import ChatContainer from '@/components/ChatContainer';
import { ChatMessageProps } from '@/components/ChatMessage';

interface ChatLayoutProps {
  messages: ChatMessageProps[];
  isAuthenticated: boolean;
  onSendMessage: (message: string) => void;
  onLogin: () => void;
  onLogout: () => void;
  isProcessing: boolean;
  loading: boolean;
  isCalendarOpen: boolean;
}

const ChatLayout: React.FC<ChatLayoutProps> = ({
  messages,
  isAuthenticated,
  onSendMessage,
  onLogin,
  onLogout,
  isProcessing,
  loading,
  isCalendarOpen,
}) => {
  return (
    <div className={`h-full transition-all duration-300 ${isCalendarOpen ? 'md:ml-[260px]' : 'ml-0'}`}>
      <ChatContainer
        messages={messages}
        isAuthenticated={isAuthenticated}
        onSendMessage={onSendMessage}
        onLogin={onLogin}
        onLogout={onLogout}
        isLoading={isProcessing}
        isAuthLoading={loading}
      />
    </div>
  );
};

export default ChatLayout;
