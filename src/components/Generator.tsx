
import React, { useState } from 'react';
import PromptInput from './PromptInput';
import CreationCard, { Creation } from './CreationCard';
import LoadingIndicator from './LoadingIndicator';
import { cn } from '@/lib/utils';
import { generateImage, generateVideo } from '@/utils/generationUtils';
import { toast } from 'sonner';

interface GeneratorProps {
  onSave: (creation: Creation) => void;
  className?: string;
}

const Generator = ({ onSave, className }: GeneratorProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [currentCreation, setCurrentCreation] = useState<Creation | null>(null);

  const handleGenerate = async (prompt: string, type: 'image' | 'video') => {
    setIsLoading(true);
    setCurrentCreation(null);
    
    try {
      let result;
      
      if (type === 'image') {
        result = await generateImage(prompt);
      } else {
        result = await generateVideo(prompt);
      }
      
      const newCreation: Creation = {
        id: crypto.randomUUID(),
        url: result.url,
        prompt,
        type,
        createdAt: new Date(),
      };
      
      setCurrentCreation(newCreation);
      
    } catch (error) {
      console.error('Generation failed:', error);
      toast.error('Generation failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = () => {
    if (currentCreation) {
      onSave(currentCreation);
      toast.success('Creation saved to your gallery!');
    }
  };

  return (
    <div className={cn('w-full max-w-5xl mx-auto', className)}>
      <PromptInput 
        onSubmit={handleGenerate}
        isLoading={isLoading}
        className="mb-8"
      />
      
      <div className="mt-12 h-[400px] flex items-center justify-center">
        {isLoading ? (
          <div className="flex flex-col items-center">
            <LoadingIndicator size="lg" withText />
          </div>
        ) : currentCreation ? (
          <div className="w-full max-w-xl animate-scale-in">
            <CreationCard 
              creation={currentCreation}
              className="w-full"
            />
            <div className="flex justify-center mt-6">
              <button
                onClick={handleSave}
                className="bg-primary text-primary-foreground px-6 py-3 rounded-full font-medium transition-all hover:shadow-lg hover:bg-primary/90 active:scale-95"
              >
                Save to Gallery
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center space-y-4 max-w-md mx-auto">
            <div className="h-20 w-20 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-6">
              <div className="h-10 w-10 bg-primary/20 rounded-full flex items-center justify-center animate-pulse-subtle">
                <div className="h-5 w-5 bg-primary rounded-full"></div>
              </div>
            </div>
            <h2 className="text-2xl font-medium text-foreground">Create something amazing</h2>
            <p className="text-muted-foreground">
              Enter a prompt above to generate stunning images or short videos using AI.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Generator;
