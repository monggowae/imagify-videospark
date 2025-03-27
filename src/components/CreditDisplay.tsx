
import React from 'react';
import { useCredits } from '@/context/CreditContext';
import { CreditCard } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CreditDisplayProps {
  className?: string;
}

const CreditDisplay = ({ className }: CreditDisplayProps) => {
  const { credits } = useCredits();

  return (
    <div className={cn(
      'bg-primary/10 text-primary rounded-full px-3 py-1.5 flex items-center gap-1.5 font-medium text-sm',
      className
    )}>
      <CreditCard className="h-4 w-4" />
      <span>{credits} credits</span>
    </div>
  );
};

export default CreditDisplay;
