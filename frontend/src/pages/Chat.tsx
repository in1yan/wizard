
import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { sendMessage } from '@/lib/api';
import { Message } from '@/lib/types';
import { useChatState } from '@/hooks/use-chat-state';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import ChatInput from '@/components/ChatInput';
import MessagesList from '@/components/MessagesList';
import WelcomeScreen from '@/components/WelcomeScreen';

const Chat: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  const { toast } = useToast();
  const {
    chatState,
    setChatState,
    handleFilesUploaded,
    handleDeleteFile,
    handleVideoProcessed,
    handleDeleteVideo
  } = useChatState();
  
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
          videos={chatState.videos}
          onFilesUploaded={handleFilesUploaded}
          onDeleteFile={handleDeleteFile}
          onVideoProcessed={handleVideoProcessed}
          onDeleteVideo={handleDeleteVideo}
        />
        
        <div className="flex-grow flex flex-col h-full chat-container">
          <div className="flex-grow overflow-y-auto p-4">
            {chatState.messages.length === 0 && chatState.isFirstUpload ? (
              <WelcomeScreen 
                onFilesUploaded={handleFilesUploaded}
                onVideoProcessed={handleVideoProcessed}
              />
            ) : (
              <MessagesList 
                messages={chatState.messages}
                isProcessing={chatState.isProcessing}
              />
            )}
          </div>
          
          <ChatInput
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onSend={handleSendMessage}
            isProcessing={chatState.isProcessing}
            isDisabled={chatState.files.length === 0 && chatState.isFirstUpload}
          />
        </div>
      </div>
    </div>
  );
};

export default Chat;
