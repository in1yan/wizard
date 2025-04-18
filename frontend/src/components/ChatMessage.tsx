
import React, { useEffect, useRef } from 'react';
import { Message } from '@/lib/types';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { UserCircle, Sparkles } from 'lucide-react';

interface ChatMessageProps {
  message: Message;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const messageRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (messageRef.current) {
      messageRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);
  
  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    }).format(date);
  };

  return (
    <div 
      ref={messageRef}
      className={`my-4 ${message.role === 'user' ? 'chat-message-user' : 'chat-message-bot'}`}
    >
      <div className="flex items-start space-x-3">
        <div className="flex-shrink-0 mt-1">
          {message.role === 'user' ? (
            <div className="bg-wizard-secondary p-2 rounded-full">
              <UserCircle className="h-5 w-5 text-white" />
            </div>
          ) : (
            <div className="bg-wizard-primary p-2 rounded-full">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
          )}
        </div>
        
        <div className="flex-grow">
          <div className="flex items-center mb-1">
            <span className="font-medium text-sm">
              {message.role === 'user' ? 'You' : 'Wizard'}
            </span>
            <span className="ml-2 text-xs text-muted-foreground">
              {formatTime(message.timestamp)}
            </span>
          </div>
          
          <div className="prose prose-invert prose-sm max-w-none">
            <ReactMarkdown
              components={{
                code({node, className, children, ...props}) {
                  const match = /language-(\w+)/.exec(className || '');
                  const inline = !match;
                  return !inline ? (
                    <SyntaxHighlighter
                      style={vscDarkPlus}
                      language={match?.[1] || 'text'}
                      PreTag="div"
                      className="rounded-md"
                    >
                      {String(children).replace(/\n$/, '')}
                    </SyntaxHighlighter>
                  ) : (
                    <code className={className} {...props}>
                      {children}
                    </code>
                  );
                }
              }}
            >
              {message.content}
            </ReactMarkdown>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
