
import React from 'react';
import { cn } from '@/lib/utils';

interface LoadingIndicatorProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  withText?: boolean;
  text?: string;
}

const LoadingIndicator = ({
  size = 'md',
  className,
  withText = false,
  text = 'Generating...'
}: LoadingIndicatorProps) => {
  const sizeClasses = {
    sm: 'h-5 w-5',
    md: 'h-8 w-8',
    lg: 'h-12 w-12'
  };

  return (
    <div className={cn('flex flex-col items-center justify-center', className)}>
      <div className="relative">
        <div className={cn(
          'rounded-full border-t-2 border-primary animate-rotate-slow',
          sizeClasses[size]
        )} />
        <div className={cn(
          'absolute top-0 left-0 rounded-full border-2 border-primary/20',
          sizeClasses[size]
        )} />
      </div>
      {withText && (
        <p className="mt-4 text-sm text-muted-foreground animate-pulse-subtle">
          {text}
        </p>
      )}
    </div>
  );
};

export default LoadingIndicator;
