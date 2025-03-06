"use client";

import Link from "next/link";
import WalletConnection from "./WalletConnection";
import { useState, useEffect } from "react";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  // New state for tracking interaction and time of day
  const [interactionLevel, setInteractionLevel] = useState(0);
  const [isNightMode, setIsNightMode] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
    
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    // Check if it's night time (between 7PM and 6AM) for more playful nighttime effects
    const checkTimeOfDay = () => {
      const currentHour = new Date().getHours();
      setIsNightMode(currentHour >= 19 || currentHour < 6);
    };
    
    // Increase interaction level over time to gradually introduce more playful elements
    const interactionTimer = setInterval(() => {
      setInteractionLevel(prev => Math.min(prev + 1, 10));
    }, 10000); // Every 10 seconds, increase interaction level
    
    checkTimeOfDay();
    const timeChecker = setInterval(checkTimeOfDay, 60000); // Check time every minute
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(interactionTimer);
      clearInterval(timeChecker);
    };
  }, []);

  // Simple placeholder during SSR
  if (!isMounted) {
    return (
      <header className="sticky top-0 z-50 py-4 bg-transparent">
        <div className="container mx-auto px-4 h-14"></div>
      </header>
    );
  }

  // Determine logo animation based on interaction level and time of day
  // More playful at night and with higher interaction
  const logoHoverEffect = isNightMode || interactionLevel > 5 
    ? 'hover:scale-110 hover:rotate-6' 
    : 'hover:scale-110';

  // Get nav item hover effect based on interaction level
  const getNavHoverEffect = (index: number) => {
    if (interactionLevel < 3) return '';
    if (isNightMode || interactionLevel > 7) {
      return index % 2 === 0 ? 'hover:rotate-1' : 'hover:-rotate-1';
    }
    return '';
  };
  
  // Gradually increase header visual effects based on interaction
  const headerGradient = scrolled
    ? isNightMode || interactionLevel > 5
      ? 'bg-gradient-to-r from-psycho-rektPink/30 to-psycho-kekGreen/30 shadow-neon backdrop-blur-md py-2 border-b-2 border-dashed border-psycho-orange'
      : 'bg-gradient-to-r from-psycho-rektPink/20 to-psycho-kekGreen/20 shadow-neon backdrop-blur-md py-2 border-b-2 border-dashed border-psycho-orange'
    : 'bg-transparent py-4';

  // Navigation items with hover effects that increase with interaction
  const navItems = [
    { name: "Explore", href: "/explore" },
    { name: "Create", href: "/create" },
    { name: "Profile", href: "/profile" },
    { name: "About", href: "/about" },
  ];

  return (
    <header 
      className={`sticky top-0 z-50 transition-all duration-500 ${headerGradient}`}
    >
      <nav className="container mx-auto px-4 flex justify-between items-center">
        {/* Branding - more playful with higher interaction */}
        <div className="flex items-center space-x-3">
          <div className="relative h-14 w-14 overflow-hidden">
            <div className={`absolute inset-0 flex items-center justify-center rounded-meme bg-gradient-to-br from-psycho-rektPink to-psycho-kekGreen transition-all duration-300 ${
              isNightMode && interactionLevel > 8 ? 'animate-pulse' : ''
            }`}>
              <img 
                src="/images/delphi-logo.svg" 
                alt="Delphi Logo" 
                className={`h-10 w-10 transform transition-all duration-300 ${logoHoverEffect}`}
              />
            </div>
            <div className="absolute inset-0 border-2 border-dashed border-psycho-orange rounded-meme"></div>
          </div>
          <span className={`font-comic text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-psycho-rektPink to-psycho-kekGreen transition-all duration-300 ${
            isNightMode && interactionLevel > 6 ? 'animate-pulse' : ''
          }`}>
            {isNightMode && interactionLevel > 8 ? '✨ DEGEN MODE ✨' : '✨ DELPHI ✨'}
          </span>
        </div>

        {/* Navigation Links - more effects with higher interaction */}
        <ul className="hidden md:flex items-center gap-8">
          {navItems.map((item, index) => (
            <li key={item.name}>
              <Link 
                href={item.href} 
                className={`font-comic font-bold relative py-2 px-3 group text-psycho-parchment hover:text-psycho-rektPink transition-all duration-300 ${getNavHoverEffect(index)}`}
              >
                {item.name}
                <span className={`absolute bottom-0 left-0 w-0 h-0.5 bg-psycho-rektPink transition-all duration-300 group-hover:w-full ${
                  isNightMode && interactionLevel > 7 ? 'group-hover:animate-pulse' : ''
                }`}></span>
              </Link>
            </li>
          ))}
        </ul>

        {/* Wallet Connection Button */}
        <div className="relative z-20">
          <WalletConnection />
        </div>
      </nav>
    </header>
  );
}