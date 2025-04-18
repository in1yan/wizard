import React, { useState, useRef, useEffect } from 'react';
import { Send } from 'lucide-react';

interface MessageInputProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
}

const MessageInput: React.FC<MessageInputProps> = ({ onSendMessage, disabled = false }) => {
  const [message, setMessage] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  }, [message]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (message.trim() && !disabled) {
      onSendMessage(message);
      setMessage('');
      
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative">
      <div className="relative flex items-center bg-gradient-to-r from-purple-900/30 to-indigo-900/30 rounded-xl border border-purple-500/20 pr-12 focus-within:border-purple-400 focus-within:ring-1 focus-within:ring-purple-400 transition-all backdrop-blur-sm">
        <textarea
          ref={textareaRef}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Cast your message..."
          disabled={disabled}
          className="w-full py-3 px-4 bg-transparent border-none resize-none focus:outline-none max-h-32 text-purple-100 placeholder-purple-300/50"
          rows={1}
        />
        <button
          type="submit"
          disabled={!message.trim() || disabled}
          className={`absolute right-2 rounded-lg p-2 transition-all duration-300
            ${message.trim() && !disabled 
              ? 'bg-gradient-to-r from-purple-500 to-indigo-600 text-white hover:from-purple-600 hover:to-indigo-700 shadow-lg shadow-purple-500/20' 
              : 'bg-purple-900/30 text-purple-300/50 cursor-not-allowed'
            }`}
        >
          <Send size={18} />
        </button>
      </div>
    </form>
  );
};

export default MessageInput;