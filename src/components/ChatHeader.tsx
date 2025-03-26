
import React from 'react';
import { Mic, Calendar } from 'lucide-react';
import GoogleAuthButton from './GoogleAuthButton';

interface ChatHeaderProps {
  isAuthenticated: boolean;
  onLogin: () => void;
  onLogout: () => void;
  isLoading?: boolean;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({
  isAuthenticated,
  onLogin,
  onLogout,
  isLoading = false,
}) => {
  return (
    <div className="w-full border-b border-gray-200 flex items-center justify-between p-4">
      <div className="flex items-center space-x-2">
        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-google-blue text-white">
          <Calendar className="h-5 w-5" />
        </div>
        <div>
          <h1 className="text-xl font-medium">Calendar Assistant</h1>
          <p className="text-sm text-gray-500">powered by Google Calendar</p>
        </div>
      </div>
      
      <GoogleAuthButton
        onLogin={onLogin}
        onLogout={onLogout}
        isAuthenticated={isAuthenticated}
        isLoading={isLoading}
      />
    </div>
  );
};

export default ChatHeader;
