import { createContext, useState, ReactNode } from 'react';
import { generateAIResponse } from '../services/nim-api';

type Message = {
  content: string;
  isUser: boolean;
  timestamp: Date;
  isLoading?: boolean;
};

type ChatContextType = {
  messages: Message[];
  isTyping: boolean;
  error: string | null;
  sendMessage: (message: string) => Promise<void>;
};

const ChatContext = createContext<ChatContextType>({} as ChatContextType);

export const ChatProvider = ({ children }: { children: ReactNode }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendMessage = async (content: string) => {
    if (!content.trim()) return;

    // Add user message
    setMessages(prev => [...prev, {
      content: content.trim(),
      isUser: true,
      timestamp: new Date()
    }]);

    try {
      setIsTyping(true);
      setError(null);

      // Add temporary AI typing indicator
      setMessages(prev => [...prev, {
        content: '...',
        isUser: false,
        timestamp: new Date(),
        isLoading: true
      }]);

      const response = await generateAIResponse(content);
      
      // Replace typing indicator with actual response
      setMessages(prev => 
        prev.filter(msg => !msg.isLoading).concat({
          content: response || "I couldn't generate a response.",
          isUser: false,
          timestamp: new Date()
        })
      );
    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : 'Failed to get response. Please try again.';
        setError(errorMessage);
        setMessages(prev => prev.filter(msg => !msg.isLoading));
      } finally {
        setIsTyping(false);
      }
  };


  return (
    <ChatContext.Provider value={{ messages, isTyping, error, sendMessage }}>
      {children}
    </ChatContext.Provider>
  );
};

export { ChatContext };