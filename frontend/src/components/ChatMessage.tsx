import React, { useEffect, useRef } from 'react';
import { Message } from '@/lib/types';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { UserCircle, Sparkles } from 'lucide-react';
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from '@/components/ui/table';

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
                },
                table({node, ...props}) {
                  return (
                    <Table className="my-4 border border-border rounded-lg overflow-hidden">
                      {props.children}
                    </Table>
                  );
                },
                thead({node, ...props}) {
                  return <TableHeader>{props.children}</TableHeader>;
                },
                tbody({node, ...props}) {
                  return <TableBody>{props.children}</TableBody>;
                },
                tr({node, ...props}) {
                  return <TableRow>{props.children}</TableRow>;
                },
                th({node, ...props}) {
                  return <TableHead className="bg-muted">{props.children}</TableHead>;
                },
                td({node, ...props}) {
                  return <TableCell>{props.children}</TableCell>;
                },
                p({node, ...props}) {
                  return <p className="text-foreground mb-4" {...props} />;
                },
                a({node, ...props}) {
                  return <a className="text-wizard-primary hover:text-wizard-accent" {...props} />;
                },
                ul({node, ...props}) {
                  return <ul className="list-disc list-inside mb-4 space-y-1" {...props} />;
                },
                ol({node, ...props}) {
                  return <ol className="list-decimal list-inside mb-4 space-y-1" {...props} />;
                },
                li({node, ...props}) {
                  return <li className="text-foreground" {...props} />;
                },
                blockquote({node, ...props}) {
                  return (
                    <blockquote className="border-l-4 border-wizard-primary pl-4 italic my-4" {...props} />
                  );
                },
                h1({node, ...props}) {
                  return <h1 className="text-2xl font-bold mb-4 text-foreground" {...props} />;
                },
                h2({node, ...props}) {
                  return <h2 className="text-xl font-bold mb-3 text-foreground" {...props} />;
                },
                h3({node, ...props}) {
                  return <h3 className="text-lg font-bold mb-2 text-foreground" {...props} />;
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
