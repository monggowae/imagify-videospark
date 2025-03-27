
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { ImageIcon, VideoIcon, FolderIcon, UserIcon } from 'lucide-react';
import CreditDisplay from './CreditDisplay';

const Navbar = () => {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  const navLinks = [
    { name: 'Create', path: '/', icon: <ImageIcon className="h-4 w-4 mr-2" /> },
    { name: 'Gallery', path: '/gallery', icon: <FolderIcon className="h-4 w-4 mr-2" /> },
    { name: 'Profile', path: '/profile', icon: <UserIcon className="h-4 w-4 mr-2" /> },
  ];

  return (
    <header className={cn(
      'fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out',
      scrolled ? 'glass py-3' : 'bg-transparent py-5'
    )}>
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        <Link 
          to="/" 
          className="flex items-center space-x-2 text-foreground"
          aria-label="Home"
        >
          <div className="relative h-8 w-8 overflow-hidden">
            <div className="absolute inset-0 rounded-full bg-primary/10 flex items-center justify-center animate-pulse-subtle">
              <VideoIcon className="h-5 w-5 text-primary" />
            </div>
          </div>
          <span className="font-medium tracking-tight text-lg">Creato</span>
        </Link>
        
        <div className="flex items-center gap-4">
          <CreditDisplay />
          
          <nav className="glass rounded-full px-4 py-2 backdrop-blur-md">
            <ul className="flex space-x-1">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className={cn(
                      'flex items-center px-4 py-2 rounded-full transition-all duration-300 text-sm font-medium btn-hover',
                      location.pathname === link.path
                        ? 'bg-primary text-primary-foreground'
                        : 'text-foreground/80 hover:text-foreground hover:bg-accent'
                    )}
                  >
                    {link.icon}
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
