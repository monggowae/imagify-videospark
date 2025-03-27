
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { 
  DownloadIcon, 
  ShareIcon, 
  HeartIcon, 
  Trash2Icon, 
  ImageIcon,
  VideoIcon
} from 'lucide-react';
import { AspectRatio } from '@/components/ui/aspect-ratio';

export interface Creation {
  id: string;
  url: string;
  prompt: string;
  type: 'image' | 'video';
  createdAt: Date;
}

interface CreationCardProps {
  creation: Creation;
  onDelete?: (id: string) => void;
  className?: string;
}

const CreationCard = ({ creation, onDelete, className }: CreationCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = creation.url;
    link.download = `creation-${creation.id}.${creation.type === 'image' ? 'png' : 'mp4'}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Check out my creation!',
        text: creation.prompt,
        url: creation.url
      }).catch(console.error);
    } else {
      navigator.clipboard.writeText(creation.url)
        .then(() => alert('Link copied to clipboard!'))
        .catch(console.error);
    }
  };

  const formattedDate = creation.createdAt.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <div 
      className={cn(
        'glass rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-lg',
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <AspectRatio ratio={16/9} className="relative overflow-hidden bg-secondary/50">
        {!isLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-secondary/50">
            {creation.type === 'image' 
              ? <ImageIcon className="h-8 w-8 text-muted-foreground/40" /> 
              : <VideoIcon className="h-8 w-8 text-muted-foreground/40" />
            }
          </div>
        )}
        
        {creation.type === 'image' ? (
          <img
            src={creation.url}
            alt={creation.prompt}
            className={cn(
              'w-full h-full object-cover transition-all duration-500',
              isLoaded ? 'opacity-100' : 'opacity-0',
              isHovered ? 'scale-[1.03]' : 'scale-100'
            )}
            onLoad={() => setIsLoaded(true)}
          />
        ) : (
          <video
            src={creation.url}
            className={cn(
              'w-full h-full object-cover transition-all duration-500',
              isLoaded ? 'opacity-100' : 'opacity-0',
              isHovered ? 'scale-[1.03]' : 'scale-100'
            )}
            onLoadedData={() => setIsLoaded(true)}
            muted
            loop
            autoPlay
            playsInline
          />
        )}
        
        <div 
          className={cn(
            'absolute inset-0 bg-gradient-to-t from-black/60 to-transparent p-4 flex flex-col justify-end transition-opacity duration-300',
            isHovered ? 'opacity-100' : 'opacity-0'
          )}
        >
          <p className="text-white text-sm line-clamp-2 text-balance mb-2">
            {creation.prompt}
          </p>
          <div className="flex justify-between items-center">
            <span className="text-white/80 text-xs">{formattedDate}</span>
            <div className="flex space-x-1">
              <Button
                size="icon"
                variant="ghost"
                className="h-8 w-8 rounded-full bg-white/10 hover:bg-white/20 text-white"
                onClick={() => setIsLiked(!isLiked)}
              >
                <HeartIcon className={cn('h-4 w-4', isLiked && 'fill-red-500 text-red-500')} />
              </Button>
              <Button
                size="icon"
                variant="ghost"
                className="h-8 w-8 rounded-full bg-white/10 hover:bg-white/20 text-white"
                onClick={handleDownload}
              >
                <DownloadIcon className="h-4 w-4" />
              </Button>
              <Button
                size="icon"
                variant="ghost"
                className="h-8 w-8 rounded-full bg-white/10 hover:bg-white/20 text-white"
                onClick={handleShare}
              >
                <ShareIcon className="h-4 w-4" />
              </Button>
              {onDelete && (
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-8 w-8 rounded-full bg-white/10 hover:bg-red-500/70 text-white"
                  onClick={() => onDelete(creation.id)}
                >
                  <Trash2Icon className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        </div>
      </AspectRatio>
    </div>
  );
};

export default CreationCard;
