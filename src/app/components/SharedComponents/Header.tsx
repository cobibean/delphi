"use client";

import Link from "next/link";
import WalletConnection from "./WalletConnection";
import { useState, useEffect, useContext } from "react";
import { ThemeContext } from "@/app/context/ThemeContext";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  // Get mode from context instead of tracking interaction level
  const { isDegenMode, toggleMode } = useContext(ThemeContext);
  
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
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
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

  // Determine logo animation based on mode
  const logoHoverEffect = isDegenMode 
    ? 'hover:scale-110 hover:rotate-6' 
    : 'hover:scale-110';

  // Get nav item hover effect based on mode
  const getNavHoverEffect = (index: number) => {
    if (!isDegenMode) return '';
    return index % 2 === 0 ? 'hover:rotate-1' : 'hover:-rotate-1';
  };
  
  // Header gradient based on mode
  const headerGradient = scrolled
    ? isDegenMode
      ? 'bg-gradient-to-r from-psycho-rektPink/30 to-psycho-kekGreen/30 shadow-neon backdrop-blur-md py-2 border-b-2 border-dashed border-psycho-orange'
      : 'bg-gradient-to-r from-psycho-orange/20 to-psycho-turquoise/20 shadow-oracle backdrop-blur-md py-2 border-b border-psycho-orange/50'
    : 'bg-transparent py-4';

  // Navigation items with hover effects that change based on mode
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
        {/* Branding - changes based on mode */}
        <div className="flex items-center space-x-3">
          <div className="relative h-14 w-14 overflow-hidden">
            <div className={`absolute inset-0 flex items-center justify-center rounded-meme ${
              isDegenMode 
                ? 'bg-gradient-to-br from-psycho-rektPink to-psycho-kekGreen' 
                : 'bg-gradient-to-br from-psycho-orange to-psycho-turquoise'
            } transition-all duration-300 ${
              isDegenMode ? 'animate-pulse' : ''
            }`}>
              <img 
                src="/images/delphi-logo.svg" 
                alt="Delphi Logo" 
                className={`h-10 w-10 transform transition-all duration-300 ${logoHoverEffect}`}
              />
            </div>
            <div className={`absolute inset-0 border-2 ${
              isDegenMode ? 'border-dashed border-psycho-orange' : 'border-psycho-orange/70'
            } rounded-meme`}></div>
          </div>
          <span className={`font-comic text-3xl font-bold text-transparent bg-clip-text ${
            isDegenMode 
              ? 'bg-gradient-to-r from-psycho-rektPink to-psycho-kekGreen' 
              : 'bg-gradient-to-r from-psycho-orange to-psycho-turquoise'
          } transition-all duration-300 ${
            isDegenMode ? 'animate-pulse' : ''
          }`}>
            {isDegenMode ? '✨ DEGEN MODE ✨' : '✨ DELPHI ✨'}
          </span>
        </div>

        {/* Navigation Links - effects change based on mode */}
        <ul className="hidden md:flex items-center gap-8">
          {navItems.map((item, index) => (
            <li key={item.name}>
              <Link 
                href={item.href} 
                className={`font-comic font-bold relative py-2 px-3 group text-psycho-parchment ${
                  isDegenMode ? 'hover:text-psycho-rektPink' : 'hover:text-psycho-orange'
                } transition-all duration-300 ${getNavHoverEffect(index)}`}
              >
                {item.name}
                <span className={`absolute bottom-0 left-0 w-0 h-0.5 ${
                  isDegenMode ? 'bg-psycho-rektPink' : 'bg-psycho-orange'
                } transition-all duration-300 group-hover:w-full ${
                  isDegenMode ? 'group-hover:animate-pulse' : ''
                }`}></span>
              </Link>
            </li>
          ))}
          
          {/* Mode Toggle Switch */}
          <li className="ml-4">
            <button 
              onClick={toggleMode}
              className={`relative inline-flex items-center h-6 rounded-full w-12 transition-colors duration-300 focus:outline-none ${
                isDegenMode 
                  ? 'bg-psycho-rektPink' 
                  : 'bg-psycho-orange'
              }`}
              aria-pressed={isDegenMode}
            >
              <span className="sr-only">
                {isDegenMode ? 'Switch to Professional Mode' : 'Switch to Degen Mode'}
              </span>
              <span 
                className={`inline-block w-5 h-5 transform transition-transform duration-300 rounded-full ${
                  isDegenMode 
                    ? 'translate-x-6 bg-psycho-kekGreen text-xs flex items-center justify-center' 
                    : 'translate-x-1 bg-psycho-parchment text-xs flex items-center justify-center'
                }`}
              >
                {isDegenMode ? '🔥' : '🧠'}
              </span>
            </button>
          </li>
        </ul>

        {/* Wallet Connection Button */}
        <div className="relative z-20 flex items-center">
          {/* Mobile Mode Toggle */}
          <button 
            onClick={toggleMode}
            className={`relative mr-4 md:hidden inline-flex items-center h-6 rounded-full w-12 transition-colors duration-300 focus:outline-none ${
              isDegenMode 
                ? 'bg-psycho-rektPink' 
                : 'bg-psycho-orange'
            }`}
            aria-pressed={isDegenMode}
          >
            <span className="sr-only">
              {isDegenMode ? 'Switch to Professional Mode' : 'Switch to Degen Mode'}
            </span>
            <span 
              className={`inline-block w-5 h-5 transform transition-transform duration-300 rounded-full ${
                isDegenMode 
                  ? 'translate-x-6 bg-psycho-kekGreen text-xs flex items-center justify-center' 
                  : 'translate-x-1 bg-psycho-parchment text-xs flex items-center justify-center'
              }`}
            >
              {isDegenMode ? '🔥' : '🧠'}
            </span>
          </button>
          
          <WalletConnection />
        </div>
      </nav>
    </header>
  );
}