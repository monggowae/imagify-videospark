
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { toast } from 'sonner';

type CreditContextType = {
  credits: number;
  deductCredits: (amount: number) => boolean;
};

const CreditContext = createContext<CreditContextType | undefined>(undefined);

export const DEFAULT_CREDITS = 1000;
const CREDITS_STORAGE_KEY = 'user_credits';

export const CreditProvider = ({ children }: { children: ReactNode }) => {
  const [credits, setCredits] = useState<number>(() => {
    const savedCredits = localStorage.getItem(CREDITS_STORAGE_KEY);
    return savedCredits ? parseInt(savedCredits, 10) : DEFAULT_CREDITS;
  });

  useEffect(() => {
    localStorage.setItem(CREDITS_STORAGE_KEY, credits.toString());
  }, [credits]);

  const deductCredits = (amount: number): boolean => {
    if (credits >= amount) {
      setCredits(prevCredits => prevCredits - amount);
      return true;
    } else {
      toast.error("Not enough credits for this operation");
      return false;
    }
  };

  return (
    <CreditContext.Provider value={{ credits, deductCredits }}>
      {children}
    </CreditContext.Provider>
  );
};

export const useCredits = (): CreditContextType => {
  const context = useContext(CreditContext);
  if (context === undefined) {
    throw new Error('useCredits must be used within a CreditProvider');
  }
  return context;
};
