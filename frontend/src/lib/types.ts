export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface FileInfo {
  id: string;
  name: string;
  size: number;
  type: string;
  uploaded: Date;
  data?: File;
}

export interface VideoInfo {
  id: string;
  title: string;
  url: string;
}

export interface ChatState {
  messages: Message[];
  files: FileInfo[];
  videos: VideoInfo[];
  isProcessing: boolean;
  isFirstUpload: boolean;
}
