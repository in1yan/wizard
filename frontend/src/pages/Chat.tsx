import React, { useState, useRef, useEffect } from 'react';
import { Message, FileInfo, ChatState } from '@/lib/types';
import { Send, Loader2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import ChatMessage from '@/components/ChatMessage';
import FileUpload from '@/components/FileUpload';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import { useToast } from '@/hooks/use-toast';
import { uploadFiles, sendMessage } from '@/lib/api';

const Chat: React.FC = () => {
  const [chatState, setChatState] = useState<ChatState>({
    messages: [],
    files: [],
    isProcessing: false,
    isFirstUpload: true
  });
  
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const { toast } = useToast();
  
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatState.messages]);
  
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);
  
  const handleFilesUploaded = async (newFiles: FileInfo[]) => {
    try {
      await uploadFiles(newFiles.map(f => f.data!).filter(Boolean));
      
      setChatState(prev => ({
        ...prev,
        files: [...prev.files, ...newFiles],
        isFirstUpload: false
      }));
      
      if (newFiles.length > 0) {
        const fileNames = newFiles.map(f => f.name).join(', ');
        const systemMessage: Message = {
          id: crypto.randomUUID(),
          role: 'assistant',
          content: `I've received the following files: ${fileNames}. How can I help you with these documents?`,
          timestamp: new Date()
        };
        
        setChatState(prev => ({
          ...prev,
          messages: [...prev.messages, systemMessage]
        }));
      }
    } catch (error) {
      toast({
        title: 'Upload failed',
        description: 'Failed to upload files. Please try again.',
        variant: 'destructive'
      });
    }
  };
  
  const handleDeleteFile = (id: string) => {
    setChatState(prev => ({
      ...prev,
      files: prev.files.filter(file => file.id !== id)
    }));
    
    toast({
      title: 'File removed',
      description: 'The file has been removed from the chat.'
    });
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
  };
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  
  const handleSendMessage = async () => {
    if (inputValue.trim() === '' || chatState.isProcessing) return;
    
    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: 'user',
      content: inputValue.trim(),
      timestamp: new Date()
    };
    
    setChatState(prev => ({
      ...prev,
      messages: [...prev.messages, userMessage],
      isProcessing: true
    }));
    
    setInputValue('');
    
    try {
      const botResponse = await sendMessage(userMessage.content);
      
      const assistantMessage: Message = {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: botResponse,
        timestamp: new Date()
      };
      
      setChatState(prev => ({
        ...prev,
        messages: [...prev.messages, assistantMessage],
        isProcessing: false
      }));
    } catch (error) {
      toast({
        title: 'Message failed',
        description: 'Failed to send message. Please try again.',
        variant: 'destructive'
      });
      
      setChatState(prev => ({
        ...prev,
        isProcessing: false
      }));
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <Header />
      
      <div className="flex flex-grow overflow-hidden pt-16">
        <Sidebar 
          files={chatState.files}
          onFilesUploaded={handleFilesUploaded}
          onDeleteFile={handleDeleteFile}
        />
        
        <div className="flex-grow flex flex-col h-full chat-container">
          <div className="flex-grow overflow-y-auto p-4">
            {chatState.messages.length === 0 && chatState.isFirstUpload ? (
              <div className="h-full flex flex-col items-center justify-center">
                <div className="max-w-md w-full wizard-card">
                  <h2 className="text-xl font-medium mb-4 text-center">
                    Upload Files to Begin
                  </h2>
                  <FileUpload 
                    onFilesUploaded={handleFilesUploaded} 
                    className="w-full" 
                  />
                </div>
              </div>
            ) : (
              <div className="max-w-4xl mx-auto">
                {chatState.messages.map((message) => (
                  <ChatMessage key={message.id} message={message} />
                ))}
                {chatState.isProcessing && (
                  <div className="flex items-center space-x-2 p-4 text-muted-foreground">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Wizard is thinking...</span>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            )}
          </div>
          
          <div className="border-t border-border p-4">
            <div className="max-w-4xl mx-auto">
              <div className="flex space-x-2">
                <Textarea
                  ref={inputRef}
                  value={inputValue}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask about your documents..."
                  className="resize-none bg-card/70"
                  disabled={chatState.isProcessing || (chatState.files.length === 0 && chatState.isFirstUpload)}
                  rows={1}
                />
                <Button 
                  onClick={handleSendMessage} 
                  className="wizard-button"
                  disabled={chatState.isProcessing || inputValue.trim() === '' || (chatState.files.length === 0 && chatState.isFirstUpload)}
                >
                  {chatState.isProcessing ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Send className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
