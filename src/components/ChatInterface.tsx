import { useEffect, useRef, useState } from "react";
import { FiMessageSquare, FiSend, FiX } from "react-icons/fi";
import styled from "styled-components";
import ReactMarkdown from "react-markdown";
import { useChat } from "../hooks/chatHooks";
import { theme } from "../styles/theme";
import { LoadingDots } from "./LoadingDots";

const FloatingButton = styled.button`
  position: fixed;
  bottom: 1rem;
  right: 1rem;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.secondary};
  color: white;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
  z-index: 1000;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.1);
  }
`;

const ChatWindow = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  bottom: ${({ $isOpen }) => ($isOpen ? "2rem" : "-100vh")};
  right: 2rem;
  width: 400px;
  height: 600px;
  max-height: 80vh;
  background: white;
  border-radius: 2rem;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  transition: all 0.3s ease-in-out;
  display: flex;
  flex-direction: column;
  z-index: 1000;
  overflow: hidden;

  @media (max-width: 768px) {
    width: 90%;
    right: 5%;
    height: 70vh;
  }
`;

const ChatContainer = styled.div`
  background: white;
  border-radius: ${({ theme }) => theme.borderRadius};
  padding: ${({ theme }) => theme.spacing.md};
  height: 600px;
  display: flex;
  flex-direction: column;
  box-shadow: ${({ theme }) => theme.shadow};
  overflow: hidden;
`;

const Messages = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: ${({ theme }) => theme.spacing.sm};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  min-height: 0;

  /* Hide scrollbar for Chrome, Safari and Opera */
  &::-webkit-scrollbar {
    display: none;
  }

  /* Hide scrollbar for IE, Edge and Firefox */
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
`;

const MessageBubble = styled.div<{ $isUser: boolean }>`
  background: ${({ $isUser, theme }) =>
    $isUser ? theme.colors.primary : "#f1f5f9"};
  color: ${({ $isUser }) => ($isUser ? "white" : theme.colors.text)};
  padding: 0.6rem 1.2rem;
  border-radius: 1.5rem;
  max-width: 80%;
  align-self: ${({ $isUser }) => ($isUser ? "flex-end" : "flex-start")};
  word-break: break-word;
  position: relative;
  animation: fadeIn 0.3s ease;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const InputContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  position: relative;
  padding-top: ${({ theme }) => theme.spacing.sm};
`;

const Input = styled.textarea`
  flex: 1;
  padding: 0.8rem 1rem;
  border: 1px solid #cbd5e1;
  border-radius: 1.5rem;
  resize: none;
  height: 3rem;
  font-family: inherit;
  line-height: 1.5;
  overflow-y: auto;
  vertical-align: middle;

  /* Hide scrollbar for Chrome, Safari and Opera */
  &::-webkit-scrollbar {
    display: none;
  }

  /* Hide scrollbar for IE, Edge and Firefox */
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const Button = styled.button`
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  padding: 1rem;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: opacity 0.2s;
  width: 3rem;
  height: 3rem;

  &:hover {
    opacity: 0.9;
  }

  &:disabled {
    background: #cbd5e1;
    cursor: not-allowed;
  }
`;

const ChatHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.2rem;
  border-bottom: 1px solid #e2e8f0;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;
  padding: 0.5rem;

  &:hover {
    color: ${({ theme }) => theme.colors.muted};
  }
`;

const MarkdownContent = styled.div`
  h1, h2, h3 {
    margin: 0.5rem 0;
    font-weight: 600;
  }
  
  p {
    margin: 0.5rem 0;
  }
  
  ul, ol {
    margin: 0.5rem 0;
    padding-left: 1.5rem;
  }
  
  code {
    background: #e2e8f0;
    padding: 0.2rem 0.4rem;
    border-radius: 4px;
    font-size: 0.9em;
  }
  
  blockquote {
    border-left: 3px solid ${({ theme }) => theme.colors.primary};
    margin: 0.5rem 0;
    padding-left: 1rem;
    color: ${({ theme }) => theme.colors.muted};
  }
`;

export const ChatInterface = () => {
  const { messages, isTyping, error, sendMessage } = useChat();
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const toggleChat = () => setIsOpen(!isOpen);

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || isTyping) return;
    
    const userMessage = input.trim();
    setInput("");
    await sendMessage(userMessage);
  };

  return (
    <>
      {!isOpen && (
        <FloatingButton onClick={toggleChat}>
          <FiMessageSquare size={24} />
        </FloatingButton>
      )}

      <ChatWindow $isOpen={isOpen}>
        <ChatHeader>
          <h3>AI Assistant</h3>
          <CloseButton onClick={toggleChat}>
            <FiX size={20} />
          </CloseButton>
        </ChatHeader>
        <ChatContainer>
        <Messages>
            {messages.map((message, i) => (
              <MessageBubble key={i} $isUser={message.isUser}>
                {message.isUser ? (
                  message.content
                ) : (
                  <MarkdownContent>
                    {message.content ? (
                      <ReactMarkdown>{message.content}</ReactMarkdown>
                    ) : (
                      <LoadingDots />
                    )}
                  </MarkdownContent>
                )}
              </MessageBubble>
            ))}
            <div ref={messagesEndRef} />
          </Messages>

          {error && (
            <div style={{ color: "red", padding: "0 1rem" }}>{error}</div>
          )}

          <form onSubmit={handleSubmit}>
            <InputContainer>
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about countries..."
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSubmit();
                  }
                }}
              />
              <Button type="submit" disabled={!input.trim() || isTyping}>
                <FiSend />
              </Button>
            </InputContainer>
          </form>
        </ChatContainer>
      </ChatWindow>
    </>
  );
};
