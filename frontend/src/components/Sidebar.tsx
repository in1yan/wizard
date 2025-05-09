
import React, { useState } from 'react';
import { FileInfo, VideoInfo } from '@/lib/types';
import { ChevronLeft, ChevronRight, Files, Trash2, FileText, Youtube } from 'lucide-react';
import FileUpload from './FileUpload';
import YoutubeProcessor from './YoutubeProcessor';

interface SidebarProps {
  files: FileInfo[];
  videos: VideoInfo[];
  onFilesUploaded: (files: FileInfo[]) => void;
  onDeleteFile: (id: string) => void;
  onVideoProcessed: (video: VideoInfo) => void;
  onDeleteVideo?: (id: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  files, 
  videos,
  onFilesUploaded, 
  onDeleteFile,
  onVideoProcessed,
  onDeleteVideo 
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [showUploadPanel, setShowUploadPanel] = useState(false);
  const [showYoutubePanel, setShowYoutubePanel] = useState(false);
  
  const toggleSidebar = () => setIsCollapsed(!isCollapsed);
  const toggleUploadPanel = () => setShowUploadPanel(!showUploadPanel);
  const toggleYoutubePanel = () => setShowYoutubePanel(!showYoutubePanel);
  
  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + ' bytes';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  return (
    <div className={`relative h-full ${isCollapsed ? 'w-14' : 'w-80'} transition-all duration-300 bg-card/80 backdrop-blur-md border-r border-border`}>
      <div className="absolute right-0 top-1/2 -translate-y-1/2 -translate-x-1/2 bg-wizard-dark border border-border rounded-full p-1 cursor-pointer z-10" 
        onClick={toggleSidebar}>
        {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
      </div>
      
      <div className={`flex flex-col h-full ${isCollapsed ? 'items-center py-4' : 'p-4'}`}>
        <div className={`flex items-center justify-between w-full mb-4 ${isCollapsed ? 'flex-col space-y-4' : ''}`}>
          <div className={`flex items-center ${isCollapsed ? 'justify-center' : ''}`}>
            <Files className="text-wizard-primary h-5 w-5" />
            {!isCollapsed && <span className="ml-2 font-medium">Files & Videos</span>}
          </div>
          
          <div className={`flex ${isCollapsed ? 'flex-col space-y-2' : 'space-x-2'}`}>
            <button
              className={`${isCollapsed ? 'p-2' : 'p-2 px-3'} bg-wizard-primary/10 hover:bg-wizard-primary/20 rounded-md flex items-center transition-colors`}
              onClick={toggleUploadPanel}
            >
              <span className={`${isCollapsed ? 'hidden' : ''} mr-2 text-sm`}>Upload</span>
              <FileText className="h-4 w-4" />
            </button>
            
            <button
              className={`${isCollapsed ? 'p-2' : 'p-2 px-3'} bg-wizard-primary/10 hover:bg-wizard-primary/20 rounded-md flex items-center transition-colors`}
              onClick={toggleYoutubePanel}
            >
              <span className={`${isCollapsed ? 'hidden' : ''} mr-2 text-sm`}>YouTube</span>
              <Youtube className="h-4 w-4" />
            </button>
          </div>
        </div>
        
        {showUploadPanel && !isCollapsed && (
          <div className="mb-4 bg-card/70 border border-border rounded-xl p-3">
            <FileUpload onFilesUploaded={onFilesUploaded} className="w-full" />
          </div>
        )}
        
        {showYoutubePanel && !isCollapsed && (
          <div className="mb-4">
            <YoutubeProcessor onVideoProcessed={onVideoProcessed} />
          </div>
        )}
        
        <div className="flex-grow overflow-auto w-full">
          {videos.length > 0 && (
            <div className={`mb-4 ${isCollapsed ? 'px-2' : ''}`}>
              <h3 className={`text-sm font-medium mb-2 ${isCollapsed ? 'sr-only' : ''}`}>Videos</h3>
              <ul className="space-y-2">
                {videos.map(video => (
                  <li 
                    key={video.id}
                    className={`group flex items-center ${
                      isCollapsed ? 'justify-center p-2' : 'justify-between p-3'
                    } bg-muted/30 hover:bg-muted/50 rounded-lg transition-colors`}
                  >
                    <div className="flex items-center overflow-hidden">
                      <Youtube className="h-4 w-4 text-wizard-primary flex-shrink-0" />
                      {!isCollapsed && (
                        <div className="ml-2 overflow-hidden">
                          <p className="text-sm truncate">{video.title}</p>
                          <p className="text-xs text-muted-foreground">YouTube Video</p>
                        </div>
                      )}
                    </div>
                    
                    {!isCollapsed && onDeleteVideo && (
                      <button 
                        className="opacity-0 group-hover:opacity-100 p-1 hover:bg-wizard-dark/50 rounded transition-opacity"
                        onClick={() => onDeleteVideo(video.id)}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </button>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          {files.length > 0 && (
            <div className={`${isCollapsed ? 'px-2' : ''}`}>
              <h3 className={`text-sm font-medium mb-2 ${isCollapsed ? 'sr-only' : ''}`}>Files</h3>
              <ul className="space-y-2">
                {files.map(file => (
                  <li 
                    key={file.id}
                    className={`group flex items-center ${
                      isCollapsed ? 'justify-center p-2' : 'justify-between p-3'
                    } bg-muted/30 hover:bg-muted/50 rounded-lg transition-colors`}
                  >
                    <div className="flex items-center overflow-hidden">
                      <FileText className="h-4 w-4 text-wizard-primary flex-shrink-0" />
                      {!isCollapsed && (
                        <div className="ml-2 overflow-hidden">
                          <p className="text-sm truncate">{file.name}</p>
                          <p className="text-xs text-muted-foreground">{formatFileSize(file.size)}</p>
                        </div>
                      )}
                    </div>
                    
                    {!isCollapsed && (
                      <button 
                        className="opacity-0 group-hover:opacity-100 p-1 hover:bg-wizard-dark/50 rounded transition-opacity"
                        onClick={() => onDeleteFile(file.id)}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </button>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          {files.length === 0 && videos.length === 0 && !isCollapsed && (
            <div className="flex flex-col items-center justify-center h-32 text-center text-muted-foreground">
              <Files className="h-8 w-8 mb-2 opacity-50" />
              <p className="text-sm">No files or videos uploaded yet</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
