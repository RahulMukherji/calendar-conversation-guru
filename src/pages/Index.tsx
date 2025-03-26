
import React from 'react';
import { useAuth } from '@/hooks/useAuth';
import LayoutManager from './index/LayoutManager';
import { useMessageHandler } from './index/MessageHandler';

const Index = () => {
  const { isAuthenticated, loading, login, logout } = useAuth();
  const { 
    messages, 
    isProcessing, 
    events, 
    handleSendMessage 
  } = useMessageHandler(isAuthenticated, loading);

  return (
    <LayoutManager
      isAuthenticated={isAuthenticated}
      loading={loading}
      messages={messages}
      isProcessing={isProcessing}
      events={events}
      onSendMessage={handleSendMessage}
      onLogin={login}
      onLogout={logout}
    />
  );
};

export default Index;
