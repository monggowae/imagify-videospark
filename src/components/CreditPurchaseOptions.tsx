
import React from 'react';
import { CreditCard, Check } from 'lucide-react';
import { toast } from 'sonner';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useCredits } from '@/context/CreditContext';

type CreditPlan = {
  id: string;
  credits: number;
  price: number;
  highlight?: boolean;
};

const creditPlans: CreditPlan[] = [
  {
    id: 'basic',
    credits: 500,
    price: 4.99,
  },
  {
    id: 'standard',
    credits: 2000,
    price: 14.99,
    highlight: true,
  },
  {
    id: 'premium',
    credits: 5000,
    price: 29.99,
  },
];

const CreditPurchaseOptions = () => {
  const { credits, deductCredits } = useCredits();

  // In a real app, this would connect to a payment processor
  const handlePurchase = (plan: CreditPlan) => {
    // This is a demo function - in a real app, this would open a payment modal
    toast.success(`Successfully purchased ${plan.credits} credits!`);
    
    // This is just for demo - in a real app, credits would be added after payment confirmation
    // We're using the existing context but in reverse (we're adding, not deducting)
    deductCredits(-plan.credits);
  };

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-xl font-bold">Upgrade Your Credits</h2>
        <p className="text-muted-foreground mt-1">Purchase additional credits to generate more content</p>
      </div>
      
      <div className="grid gap-4">
        {creditPlans.map((plan) => (
          <Card 
            key={plan.id}
            className={`overflow-hidden ${plan.highlight ? 'border-primary shadow-md ring-1 ring-primary' : ''}`}
          >
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center justify-between">
                <span>{plan.credits} Credits</span>
                <span className="text-lg font-bold">${plan.price}</span>
              </CardTitle>
              <CardDescription>
                {plan.highlight && <span className="text-primary font-medium">Best value</span>}
              </CardDescription>
            </CardHeader>
            <CardContent className="pb-3">
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 mt-1 text-primary" />
                  <span>Generate {Math.floor(plan.credits / 5)} images</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 mt-1 text-primary" />
                  <span>Generate {Math.floor(plan.credits / 15)} videos</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button 
                className="w-full" 
                variant={plan.highlight ? "default" : "outline"}
                onClick={() => handlePurchase(plan)}
              >
                <CreditCard className="mr-2 h-4 w-4" />
                Purchase Now
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CreditPurchaseOptions;
