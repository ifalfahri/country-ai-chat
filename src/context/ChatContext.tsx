import { createContext, ReactNode, useState } from "react";
import { generateAIResponse } from "../services/nim-api";

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
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
};

const ChatContext = createContext<ChatContextType>({} as ChatContextType);

export const ChatProvider = ({ children }: { children: ReactNode }) => {
  const [messages, setMessages] = useState<Message[]>(() => [
    {
      content:
        "Hi! I'm your AI Country Assistant. Feel free to ask me about any country's culture, travel, or translation.",
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendMessage = async (content: string) => {
    if (!content.trim()) return;

    setMessages((prev) => [
      ...prev,
      {
        content: content.trim(),
        isUser: true,
        timestamp: new Date(),
      },
    ]);

    try {
      setIsTyping(true);
      setError(null);

      // Add empty AI message that will be updated with streamed content
      setMessages((prev) => [
        ...prev,
        {
          content: "",
          isUser: false,
          timestamp: new Date(),
        },
      ]);

      let fullResponse = "";
      await generateAIResponse(content, (chunk) => {
        fullResponse += chunk;
        // Update the last message with accumulated chunks
        setMessages((prev) => {
          const newMessages = [...prev];
          newMessages[newMessages.length - 1].content = fullResponse;
          return newMessages;
        });
      });
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Failed to get response. Please try again.";
      setError(errorMessage);
      setMessages((prev) => prev.slice(0, -1)); // Remove the last empty AI message
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <ChatContext.Provider
      value={{ messages, isTyping, error, sendMessage, setMessages }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export { ChatContext };
