
import React, { useState, useEffect } from 'react';
import ChatContainer from '@/components/ChatContainer';
import { useAuth } from '@/hooks/useAuth';
import { ChatMessageProps } from '@/components/ChatMessage';
import { CalendarEvent } from '@/types/calendar';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const { isAuthenticated, loading, login, logout } = useAuth();
  const { toast } = useToast();
  const [messages, setMessages] = useState<ChatMessageProps[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

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
      // Simulate a response from the LLM agent
      // In a real implementation, this would call your LLM API
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock response based on message content
      let response: ChatMessageProps;
      let mockEvents: CalendarEvent[] = [];
      
      // Simple logic to demonstrate event cards
      if (message.toLowerCase().includes('schedule') || message.toLowerCase().includes('meeting')) {
        mockEvents = [
          {
            title: 'Team Standup',
            date: new Date().toISOString().split('T')[0],
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
          events: mockEvents,
        };
      } else if (message.toLowerCase().includes('tomorrow')) {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        
        mockEvents = [
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
          events: mockEvents,
        };
      } else {
        response = {
          content: "I can help you manage your calendar. You can ask me to schedule meetings, check your availability, or manage existing events. What would you like to do?",
          type: 'agent',
          timestamp: new Date(),
        };
      }
      
      setMessages(prev => [...prev, response]);
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto h-[calc(100vh-4rem)]">
        <ChatContainer
          messages={messages}
          isAuthenticated={isAuthenticated}
          onSendMessage={handleSendMessage}
          onLogin={login}
          onLogout={logout}
          isLoading={isProcessing}
          isAuthLoading={loading}
        />
      </div>
    </div>
  );
};

export default Index;
