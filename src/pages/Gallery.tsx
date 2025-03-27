
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import CreationCard, { Creation } from '@/components/CreationCard';
import { loadCreations, saveCreations } from '@/utils/generationUtils';
import { toast } from 'sonner';
import { PlusIcon, FolderIcon } from 'lucide-react';

const Gallery = () => {
  const [creations, setCreations] = useState<Creation[]>([]);
  const [filter, setFilter] = useState<'all' | 'image' | 'video'>('all');

  useEffect(() => {
    const loadedCreations = loadCreations();
    setCreations(loadedCreations);
  }, []);

  const handleDelete = (id: string) => {
    const updatedCreations = creations.filter(creation => creation.id !== id);
    setCreations(updatedCreations);
    saveCreations(updatedCreations);
    toast.success('Creation deleted');
  };

  const filteredCreations = filter === 'all' 
    ? creations 
    : creations.filter(creation => creation.type === filter);

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Your Gallery</h1>
          <p className="text-muted-foreground mt-1">Browse and manage your creations</p>
        </div>
        
        <div className="flex items-center space-x-2">
          <div className="glass rounded-full overflow-hidden p-1">
            <Button
              variant="ghost"
              className={`rounded-full ${filter === 'all' ? 'bg-primary text-primary-foreground' : ''}`}
              onClick={() => setFilter('all')}
            >
              All
            </Button>
            <Button
              variant="ghost"
              className={`rounded-full ${filter === 'image' ? 'bg-primary text-primary-foreground' : ''}`}
              onClick={() => setFilter('image')}
            >
              Images
            </Button>
            <Button
              variant="ghost"
              className={`rounded-full ${filter === 'video' ? 'bg-primary text-primary-foreground' : ''}`}
              onClick={() => setFilter('video')}
            >
              Videos
            </Button>
          </div>
          
          <Link to="/">
            <Button className="rounded-full btn-hover">
              <PlusIcon className="h-4 w-4 mr-1" />
              Create New
            </Button>
          </Link>
        </div>
      </div>
      
      {filteredCreations.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
          {filteredCreations.map((creation) => (
            <CreationCard
              key={creation.id}
              creation={creation}
              onDelete={handleDelete}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-[60vh] text-center max-w-md mx-auto">
          <div className="w-20 h-20 bg-secondary/70 rounded-full flex items-center justify-center mb-6">
            <FolderIcon className="h-10 w-10 text-muted-foreground/50" />
          </div>
          <h3 className="text-xl font-medium">Your gallery is empty</h3>
          <p className="text-muted-foreground mt-2 mb-6">
            Start creating amazing images and videos to build your collection.
          </p>
          <Link to="/">
            <Button size="lg" className="rounded-full btn-hover">
              <PlusIcon className="h-4 w-4 mr-2" />
              Create Your First Creation
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Gallery;
