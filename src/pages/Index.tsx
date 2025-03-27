
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Generator from '@/components/Generator';
import { Creation } from '@/components/CreationCard';
import { loadCreations, saveCreations } from '@/utils/generationUtils';

const Index = () => {
  const [creations, setCreations] = useState<Creation[]>([]);

  useEffect(() => {
    const loadedCreations = loadCreations();
    setCreations(loadedCreations);
  }, []);

  const handleSaveCreation = (creation: Creation) => {
    const updatedCreations = [creation, ...creations];
    setCreations(updatedCreations);
    saveCreations(updatedCreations);
  };

  return (
    <div className="min-h-screen pb-20">
      <Navbar />
      
      <div className="pt-32 px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-block animate-float">
            <div className="bg-primary/10 text-primary text-sm font-medium px-4 py-1 rounded-full mb-4 inline-flex items-center space-x-1">
              <span>AI-Powered Creation</span>
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-balance mb-4 animate-fade-in">
            Transform Your Ideas into
            <span className="text-primary block mt-1">
              Beautiful Visuals
            </span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto animate-fade-in delay-150">
            Create stunning images and short videos with just a text prompt. Let AI bring your imagination to life.
          </p>
        </div>
        
        <Generator onSave={handleSaveCreation} className="animate-fade-in delay-300" />
      </div>
    </div>
  );
};

export default Index;
