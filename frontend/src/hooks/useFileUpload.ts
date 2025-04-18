import { useState, useCallback } from 'react';
import { UploadedFile } from '../types';

export function useFileUpload() {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileUpload = useCallback(async (uploadedFiles: FileList | File[]) => {
    Array.from(uploadedFiles).forEach(async (file) => {
      const newFile: UploadedFile = {
        id: Date.now().toString() + file.name,
        name: file.name,
        size: file.size,
        type: file.type,
        status: 'uploading',
        progress: 0,
      };

      setFiles((prev) => [...prev, newFile]);

      const formData = new FormData();
      formData.append('file', file);

      try {
        const response = await fetch('http://localhost:8000/upload', {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          throw new Error('Failed to upload file');
        }

        setFiles((prev) =>
          prev.map((f) =>
            f.id === newFile.id ? { ...f, status: 'completed', progress: 100 } : f
          )
        );
      } catch (error) {
        setFiles((prev) =>
          prev.map((f) =>
            f.id === newFile.id ? { ...f, status: 'error', error: error.message } : f
          )
        );
      }
    });
  }, []);

  const removeFile = useCallback((id: string) => {
    setFiles((prev) => prev.filter((file) => file.id !== id));
  }, []);

  const handleDragEvents = useCallback((isDraggingState: boolean) => {
    setIsDragging(isDraggingState);
  }, []);

  return {
    files,
    isDragging,
    handleFileUpload,
    removeFile,
    handleDragEvents,
  };
}