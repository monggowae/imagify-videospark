
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { ImageIcon, VideoIcon, SendIcon, SparklesIcon } from 'lucide-react';

interface PromptInputProps {
  onSubmit: (prompt: string, type: 'image' | 'video') => void;
  isLoading: boolean;
  className?: string;
}

const PromptInput = ({ onSubmit, isLoading, className }: PromptInputProps) => {
  const [prompt, setPrompt] = useState('');
  const [type, setType] = useState<'image' | 'video'>('image');
  const [isFocused, setIsFocused] = useState(false);
  const promptRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim() && !isLoading) {
      onSubmit(prompt.trim(), type);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && e.metaKey) {
      handleSubmit(e);
    }
  };

  useEffect(() => {
    if (promptRef.current) {
      promptRef.current.focus();
    }
  }, []);

  const examplePrompts = [
    "A futuristic city with flying cars",
    "Sunset over a serene beach",
    "Animated character in cyberpunk style",
    "Abstract art with vibrant colors"
  ];

  return (
    <div className={cn('w-full max-w-3xl mx-auto', className)}>
      <form 
        onSubmit={handleSubmit}
        className={cn(
          'glass rounded-2xl transition-all duration-300 ease-in-out',
          isFocused ? 'shadow-lg ring-1 ring-primary/20' : 'shadow'
        )}
      >
        <div className="flex items-center px-4 pt-3">
          <span className="bg-primary/10 text-primary text-xs font-medium px-3 py-1 rounded-full flex items-center space-x-1">
            <SparklesIcon className="h-3 w-3" />
            <span>AI Generator</span>
          </span>
          <div className="ml-auto flex space-x-1">
            <Button
              type="button"
              size="sm"
              variant={type === 'image' ? 'default' : 'outline'}
              className={cn(
                'rounded-full h-8',
                type === 'image' ? 'bg-primary' : 'bg-secondary'
              )}
              onClick={() => setType('image')}
              disabled={isLoading}
            >
              <ImageIcon className="h-4 w-4 mr-1" />
              Image
            </Button>
            <Button
              type="button"
              size="sm"
              variant={type === 'video' ? 'default' : 'outline'}
              className={cn(
                'rounded-full h-8',
                type === 'video' ? 'bg-primary' : 'bg-secondary'
              )}
              onClick={() => setType('video')}
              disabled={isLoading}
            >
              <VideoIcon className="h-4 w-4 mr-1" />
              Video
            </Button>
          </div>
        </div>
        
        <div className="p-4 pt-3">
          <Textarea
            ref={promptRef}
            placeholder="Describe what you want to create..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className="border-0 focus-visible:ring-0 resize-none text-base min-h-[80px] bg-transparent p-0"
            maxLength={500}
            disabled={isLoading}
          />
        </div>
        
        {prompt.length === 0 && (
          <div className="px-4 pb-3">
            <p className="text-xs text-muted-foreground mb-2">Try these examples:</p>
            <div className="flex flex-wrap gap-2">
              {examplePrompts.map((examplePrompt, index) => (
                <button
                  key={index}
                  type="button"
                  className="text-xs bg-secondary hover:bg-secondary/80 text-secondary-foreground px-3 py-1.5 rounded-full transition-colors"
                  onClick={() => setPrompt(examplePrompt)}
                  disabled={isLoading}
                >
                  {examplePrompt}
                </button>
              ))}
            </div>
          </div>
        )}
        
        <div className="flex items-center justify-between border-t border-border px-4 py-2">
          <div className="text-xs text-muted-foreground">
            {prompt.length > 0 ? `${prompt.length}/500` : 'Enter your prompt'}
          </div>
          <Button 
            type="submit" 
            size="sm" 
            className="rounded-full btn-hover"
            disabled={!prompt.trim() || isLoading}
          >
            <SendIcon className="h-4 w-4 mr-1" />
            Generate {type === 'image' ? 'Image' : 'Video'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default PromptInput;
