import { useState, useCallback } from 'react';
import { Message } from '../types';

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: 'Hello! I\'m your AI assistant. Upload files or ask me anything.',
      sender: 'ai',
      timestamp: new Date(),
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const addMessage = useCallback((content: string, sender: 'user' | 'ai') => {
    const newMessage: Message = {
      id: Date.now().toString(),
      content,
      sender,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newMessage]);
    return newMessage.id;
  }, []);

  const sendMessage = useCallback(async (content: string) => {
    if (!content.trim()) return;

    addMessage(content, 'user');
    setIsTyping(true);

    try {
      const response = await fetch('http://localhost:8000/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: content }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch response');
      }

      const data = await response.json();
      addMessage(data.response, 'ai');
    } catch (error) {
      addMessage('Sorry, something went wrong. Please try again.', 'ai');
    } finally {
      setIsTyping(false);
    }
  }, [addMessage]);

  return {
    messages,
    isTyping,
    sendMessage,
  };
}