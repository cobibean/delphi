"use client";

import Link from "next/link";
import WalletConnection from "./WalletConnection";
import { useState, useEffect, useContext } from "react";
import { ThemeContext } from "@/app/context/ThemeContext";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [glitchActive, setGlitchActive] = useState(false);
  // Get mode from context
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
    
    // Random glitch effect
    const glitchInterval = setInterval(() => {
      if (Math.random() > 0.8) {
        setGlitchActive(true);
        setTimeout(() => setGlitchActive(false), 150);
      }
    }, 5000);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(glitchInterval);
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
    ? 'hover:scale-110 animate-flicker' 
    : 'hover:scale-105';

  // Get nav item hover effect based on mode
  const getNavHoverEffect = (index: number) => {
    if (!isDegenMode) return '';
    return index % 2 === 0 ? 'hover:animate-glitch' : 'hover:text-blood';
  };
  
  // Header gradient based on mode
  const headerGradient = scrolled
    ? isDegenMode
      ? 'bg-gutter-glow shadow-dark backdrop-blur-md py-2 border-b border-sinister-orange/30'
      : 'bg-gradient-to-r from-sinister-black to-gray-900 shadow-dark backdrop-blur-md py-2 border-b border-sinister-orange/20'
    : 'bg-transparent py-4';

  // Navigation items with hover effects that change based on mode
  const navItems = [
    { name: "EXPLORE", href: "/explore" },
    { name: "CREATE", href: "/create" },
    { name: "PROFILE", href: "/profile" },
    { name: "ABOUT", href: "/about" },
  ];

  return (
    <header 
      className={`sticky top-0 z-50 transition-all duration-500 ${headerGradient} ${glitchActive ? 'animate-glitch' : ''}`}
    >
      <nav className="container mx-auto px-4 flex justify-between items-center">
        {/* Branding - changes based on mode */}
        <div className="flex items-center space-x-3">
          <div className="relative h-14 w-14 overflow-hidden">
            <div className={`absolute inset-0 flex items-center justify-center rounded-brutal ${
              isDegenMode 
                ? 'bg-oracle-embers' 
                : 'bg-gradient-to-br from-sinister-orange to-sinister-teal'
            } transition-all duration-300 ${
              isDegenMode ? 'animate-flicker' : ''
            }`}>
              <img 
                src="/images/delphi-logo.svg" 
                alt="Delphi Logo" 
                className={`h-10 w-10 transform transition-all duration-300 ${logoHoverEffect}`}
              />
            </div>
            <div className={`absolute inset-0 border ${
              isDegenMode ? 'border-sinister-red/70' : 'border-sinister-orange/70'
            } rounded-brutal scorched-border`}></div>
          </div>
          <span className={`font-heading text-3xl font-bold text-transparent bg-clip-text ${
            isDegenMode 
              ? 'bg-oracle-embers' 
              : 'bg-tarnished-fortune'
          } transition-all duration-300 uppercase tracking-wide ${
            isDegenMode ? 'animate-flicker' : ''
          }`}>
            {isDegenMode ? 'DARK ORACLE' : 'DELPHI'}
          </span>
        </div>

        {/* Navigation Links - effects change based on mode */}
        <ul className="hidden md:flex items-center gap-8">
          {navItems.map((item, index) => (
            <li key={item.name}>
              <Link 
                href={item.href} 
                className={`font-heading font-bold relative py-2 px-3 group text-sinister-scroll ${
                  isDegenMode ? 'hover:text-sinister-red' : 'hover:text-sinister-orange'
                } transition-all duration-300 ${getNavHoverEffect(index)}`}
              >
                {item.name}
                <span className={`absolute bottom-0 left-0 w-0 h-0.5 ${
                  isDegenMode ? 'bg-sinister-red' : 'bg-sinister-orange'
                } transition-all duration-300 group-hover:w-full`}></span>
              </Link>
            </li>
          ))}
          
          {/* Mode Toggle Switch */}
          <li className="ml-4">
            <button 
              onClick={toggleMode}
              className={`relative inline-flex items-center h-6 rounded-brutal w-12 transition-colors duration-300 focus:outline-none ${
                isDegenMode 
                  ? 'bg-sinister-red' 
                  : 'bg-sinister-orange'
              }`}
              aria-pressed={isDegenMode}
            >
              <span className="sr-only">
                {isDegenMode ? 'Switch to Professional Mode' : 'Switch to Dark Degen Mode'}
              </span>
              <span 
                className={`inline-block w-5 h-5 transform transition-transform duration-300 rounded-brutal ${
                  isDegenMode 
                    ? 'translate-x-6 bg-sinister-black text-xs flex items-center justify-center' 
                    : 'translate-x-1 bg-sinister-scroll text-xs flex items-center justify-center'
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
            className={`relative mr-4 md:hidden inline-flex items-center h-6 rounded-brutal w-12 transition-colors duration-300 focus:outline-none ${
              isDegenMode 
                ? 'bg-sinister-red' 
                : 'bg-sinister-orange'
            }`}
            aria-pressed={isDegenMode}
          >
            <span className="sr-only">
              {isDegenMode ? 'Switch to Professional Mode' : 'Switch to Dark Degen Mode'}
            </span>
            <span 
              className={`inline-block w-5 h-5 transform transition-transform duration-300 rounded-brutal ${
                isDegenMode 
                  ? 'translate-x-6 bg-sinister-black text-xs flex items-center justify-center' 
                  : 'translate-x-1 bg-sinister-scroll text-xs flex items-center justify-center'
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