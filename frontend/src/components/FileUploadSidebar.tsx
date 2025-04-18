import React from 'react';
import { X } from 'lucide-react';
import FileUpload from './FileUpload';
import { UploadedFile } from '../types';

interface FileUploadSidebarProps {
  isOpen: boolean;
  files: UploadedFile[];
  isDragging: boolean;
  onFileUpload: (files: FileList | File[]) => void;
  onRemoveFile: (id: string) => void;
  onDragEvent: (isDragging: boolean) => void;
  onClose: () => void;
}

const FileUploadSidebar: React.FC<FileUploadSidebarProps> = ({
  isOpen,
  files,
  isDragging,
  onFileUpload,
  onRemoveFile,
  onDragEvent,
  onClose,
}) => {
  return (
    <div
      className={`fixed inset-y-0 left-0 bg-gray-900 dark:bg-gray-800 w-80 transform transition-transform ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } shadow-lg z-50`}
    >
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        <h2 className="text-lg font-semibold text-white">File Upload</h2>
        <button onClick={onClose} aria-label="Close sidebar">
          <X className="text-white" size={20} />
        </button>
      </div>
      <div className="p-4">
        <FileUpload
          files={files}
          isDragging={isDragging}
          onFileUpload={onFileUpload}
          onRemoveFile={onRemoveFile}
          onDragEvent={onDragEvent}
        />
      </div>
    </div>
  );
};

export default FileUploadSidebar;
