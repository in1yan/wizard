
import React, { useRef, useEffect } from 'react';
import { Message } from '@/lib/types';
import { Loader2 } from 'lucide-react';
import ChatMessage from './ChatMessage';

interface MessagesListProps {
  messages: Message[];
  isProcessing: boolean;
}

const MessagesList: React.FC<MessagesListProps> = ({ messages, isProcessing }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <div className="max-w-4xl mx-auto">
      {messages.map((message) => (
        <ChatMessage key={message.id} message={message} />
      ))}
      {isProcessing && (
        <div className="flex items-center space-x-2 p-4 text-muted-foreground">
          <Loader2 className="h-4 w-4 animate-spin" />
          <span>Wizard is thinking...</span>
        </div>
      )}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessagesList;
