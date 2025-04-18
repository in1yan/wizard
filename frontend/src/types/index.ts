export interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  isLoading?: boolean;
}

export interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  content?: string | ArrayBuffer | null;
  status: 'uploading' | 'processing' | 'completed' | 'error';
  progress?: number;
  error?: string;
}