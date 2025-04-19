
import React, { useState } from 'react';
import { Youtube } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { processYoutubeVideo } from '@/lib/api';
import { VideoInfo } from '@/lib/types';

interface YoutubeProcessorProps {
  onVideoProcessed?: (video: VideoInfo) => void;
  className?: string;
}

const YoutubeProcessor: React.FC<YoutubeProcessorProps> = ({ onVideoProcessed, className }) => {
  const [url, setUrl] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const extractVideoId = (url: string): string | null => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const videoId = extractVideoId(url);
    
    if (!videoId) {
      toast({
        title: "Invalid YouTube URL",
        description: "Please enter a valid YouTube video URL",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);
    try {
      const result = await processYoutubeVideo(videoId);
      toast({
        title: "Success",
        description: result.message,
      });
      
      if (onVideoProcessed) {
        onVideoProcessed({
          id: videoId,
          title: result.title,
          url: url
        });
      }
      
      setUrl('');
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to process video",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className={`wizard-card w-full p-6 space-y-4 ${className}`}>
      <div className="flex items-center space-x-2">
        <Youtube className="h-5 w-5 text-wizard-primary" />
        <h2 className="text-lg font-medium">Process YouTube Video</h2>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter YouTube video URL"
            className="w-full"
            disabled={isProcessing}
          />
        </div>
        
        <Button
          type="submit"
          className="w-full"
          disabled={!url || isProcessing}
        >
          {isProcessing ? "Processing..." : "Process Video"}
        </Button>
      </form>
    </div>
  );
};

export default YoutubeProcessor;
