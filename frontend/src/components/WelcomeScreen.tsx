
import React from 'react';
import FileUpload from './FileUpload';
import YoutubeProcessor from './YoutubeProcessor';
import { FileInfo, VideoInfo } from '@/lib/types';

interface WelcomeScreenProps {
  onFilesUploaded: (files: FileInfo[]) => void;
  onVideoProcessed: (video: VideoInfo) => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onFilesUploaded, onVideoProcessed }) => {
  return (
    <div className="h-full flex flex-col items-center justify-center space-y-6">
      <div className="max-w-md w-full">
        <YoutubeProcessor onVideoProcessed={onVideoProcessed} />
      </div>
      <div className="max-w-md w-full wizard-card">
        <h2 className="text-xl font-medium mb-4 text-center">
          Upload Files to Begin
        </h2>
        <FileUpload onFilesUploaded={onFilesUploaded} className="w-full" />
      </div>
    </div>
  );
};

export default WelcomeScreen;
