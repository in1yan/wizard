
import React, { useState, useRef } from 'react';
import { FileInfo } from '@/lib/types';
import { Upload, X, FileText, Check } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface FileUploadProps {
  onFilesUploaded: (files: FileInfo[]) => void;
  className?: string;
  maxFiles?: number;
  maxSizeMB?: number;
  allowedTypes?: string[];
}

const FileUpload: React.FC<FileUploadProps> = ({
  onFilesUploaded,
  className = '',
  maxFiles = 5,
  maxSizeMB = 10,
  allowedTypes = ['application/pdf', 'application/vnd.ms-powerpoint', 'application/vnd.openxmlformats-officedocument.presentationml.presentation', 'text/plain', 'text/markdown', 'text/csv', "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"],
}) => {
  const [dragActive, setDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<FileInfo[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  
  const maxSizeBytes = maxSizeMB * 1024 * 1024;
  
  const validateFiles = (files: File[]): FileInfo[] => {
    if (files.length + selectedFiles.length > maxFiles) {
      toast({
        title: 'Too many files',
        description: `You can upload a maximum of ${maxFiles} files.`,
        variant: 'destructive'
      });
      return [];
    }
    
    const validFiles: FileInfo[] = [];
    
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      
      if (!allowedTypes.includes(file.type)) {
        toast({
          title: 'Invalid file type',
          description: `${file.name} is not a supported file type.`,
          variant: 'destructive'
        });
        continue;
      }
      
      if (file.size > maxSizeBytes) {
        toast({
          title: 'File too large',
          description: `${file.name} exceeds the maximum size of ${maxSizeMB}MB.`,
          variant: 'destructive'
        });
        continue;
      }
      
      validFiles.push({
        id: crypto.randomUUID(),
        name: file.name,
        size: file.size,
        type: file.type,
        uploaded: new Date(),
        data: file
      });
    }
    
    return validFiles;
  };
  
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };
  
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const fileArray = Array.from(e.dataTransfer.files);
      handleFiles(fileArray);
    }
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const fileArray = Array.from(e.target.files);
      handleFiles(fileArray);
    }
  };
  
  const handleFiles = async (fileArray: File[]) => {
    const validFiles = validateFiles(fileArray);
    
    if (validFiles.length > 0) {
      setUploading(true);
      
      try {
        // Don't upload files here - they will be uploaded by the parent component
        // when onFilesUploaded is called
        
        setSelectedFiles(prev => [...prev, ...validFiles]);
        onFilesUploaded(validFiles);
        
        toast({
          title: 'Files uploaded',
          description: `${validFiles.length} file(s) successfully uploaded.`,
          variant: 'default'
        });
      } catch (error) {
        toast({
          title: 'Upload failed',
          description: error instanceof Error ? error.message : 'Failed to upload files',
          variant: 'destructive'
        });
      } finally {
        setUploading(false);
      }
    }
  };
  
  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };
  
  const removeFile = (id: string) => {
    setSelectedFiles(prev => prev.filter(file => file.id !== id));
  };
  
  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + ' bytes';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  return (
    <div className={`w-full ${className}`}>
      <div 
        className={`border-2 border-dashed rounded-xl p-6 transition-all ${
          dragActive 
            ? 'border-wizard-primary bg-wizard-primary/10' 
            : 'border-muted hover:border-wizard-primary/50'
        }`}
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
        onClick={triggerFileInput}
      >
        <input 
          type="file"
          ref={fileInputRef}
          multiple
          onChange={handleChange}
          accept={allowedTypes.join(',')}
          className="hidden"
        />
        
        <div className="flex flex-col items-center justify-center py-4 text-center">
          <Upload className="h-10 w-10 text-wizard-primary mb-2" />
          <h3 className="text-lg font-medium mb-1">
            {uploading ? 'Uploading...' : 'Drag files here or click to browse'}
          </h3>
          <p className="text-muted-foreground text-sm mb-2">
            Upload up to {maxFiles} files (max {maxSizeMB}MB each)
          </p>
          <p className="text-xs text-muted-foreground">
            Supported formats: PDF, TXT, MD, CSV
          </p>
        </div>
      </div>
      
      {selectedFiles.length > 0 && (
        <div className="mt-4 space-y-2">
          <h4 className="text-sm font-medium">Uploaded Files</h4>
          <ul className="space-y-2">
            {selectedFiles.map(file => (
              <li 
                key={file.id}
                className="flex items-center justify-between bg-card/50 rounded-lg p-3"
              >
                <div className="flex items-center">
                  <div className="mr-3 bg-wizard-primary/10 p-2 rounded-md">
                    <FileText className="h-5 w-5 text-wizard-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium truncate max-w-[200px]">{file.name}</p>
                    <p className="text-xs text-muted-foreground">{formatFileSize(file.size)}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Check className="h-4 w-4 text-green-500 mr-2" />
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      removeFile(file.id);
                    }}
                    className="p-1 hover:bg-muted rounded-md"
                  >
                    <X className="h-4 w-4 text-muted-foreground" />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
