
import { useState } from 'react';
import { Message, FileInfo, ChatState, VideoInfo } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';
import { uploadFiles, sendMessage } from '@/lib/api';

export const useChatState = () => {
  const [chatState, setChatState] = useState<ChatState>({
    messages: [],
    files: [],
    videos: [],
    isProcessing: false,
    isFirstUpload: true
  });
  const { toast } = useToast();

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

  const handleVideoProcessed = (video: VideoInfo) => {
    setChatState(prev => ({
      ...prev,
      videos: [...prev.videos, video],
      isFirstUpload: false
    }));
  };

  const handleDeleteVideo = (id: string) => {
    setChatState(prev => ({
      ...prev,
      videos: prev.videos.filter(video => video.id !== id)
    }));
    
    toast({
      title: 'Video removed',
      description: 'The video has been removed from the chat.'
    });
  };

  return {
    chatState,
    setChatState,
    handleFilesUploaded,
    handleDeleteFile,
    handleVideoProcessed,
    handleDeleteVideo
  };
};
