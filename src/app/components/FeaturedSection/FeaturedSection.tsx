"use client";

import { useEffect, useState, useContext } from 'react';
import { JsonRpcProvider } from 'ethers';
import Link from "next/link";
import { ThemeContext } from "@/app/context/ThemeContext";

const provider = new JsonRpcProvider(process.env.NEXT_PUBLIC_METIS_RPC_URL);
const MARKETPLACE_ADDRESS = process.env.NEXT_PUBLIC_MARKETPLACE_ADDRESS;

export default function FeaturedSection() {
  const [isMounted, setIsMounted] = useState(false);
  const [marketStats, setMarketStats] = useState({
    nfts: 500,
    collections: 20,
    users: 1000,
    trades: 5000,
  });
  // Get mode from context
  const { isDegenMode } = useContext(ThemeContext);
  // Track mouse position for dynamic hover effects
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  // Add glitch effect state
  const [glitchActive, setGlitchActive] = useState(false);

  useEffect(() => {
    // Set mounted state and initialize random values on client
    setIsMounted(true);
    
    // Only set random stats on client
    setMarketStats({
      nfts: Math.floor(Math.random() * 10000) + 500,
      collections: Math.floor(Math.random() * 100) + 20,
      users: Math.floor(Math.random() * 5000) + 1000,
      trades: Math.floor(Math.random() * 20000) + 5000,
    });

    // Add mouse move listener to track position for dynamic effects
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    
    // Random glitch effect for degen mode
    if (isDegenMode) {
      const glitchInterval = setInterval(() => {
        if (Math.random() > 0.7) {
          setGlitchActive(true);
          setTimeout(() => setGlitchActive(false), 200 + Math.random() * 500);
        }
      }, 3000);
      
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        clearInterval(glitchInterval);
      };
    }
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isDegenMode]);

  // Simple placeholder during SSR
  if (!isMounted) {
    return <div className="w-full min-h-[70vh] bg-gutter-glow"></div>;
  }

  // Generate dark particles on client only
  const particleCount = isDegenMode ? 8 : 3;
  const darkParticles = [...Array(particleCount)].map((_, i) => ({
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    size: `${Math.random() * 3 + 1}px`,
    opacity: Math.random() * 0.5 + 0.2,
    // Add subtle movement based on mouse position
    transform: `translateX(${(mousePosition.x % 30) - 15}px) translateY(${(mousePosition.y % 30) - 15}px)`
  }));

  // Dark symbols for the background
  const darkSymbols = isDegenMode ? ['†', '⛧', '⍟', '⚰️', '☠️', '🔥', '⚔️', '🩸'] : ['†', '⛧', '⍟'];
  
  return (
    <div className="w-full">
      {/* Hero Section */}
      <div className={`relative w-full min-h-[70vh] overflow-hidden flex flex-col items-center justify-center p-8 
        ${isDegenMode ? 'border-2 border-sinister-red/30' : 'border-2 border-sinister-orange/20'} 
        bg-gutter-glow`}>
        
        {/* Dark particles */}
        {darkParticles.map((particle, i) => (
          <div 
            key={i} 
            className={`absolute pointer-events-none select-none transition-transform duration-300 ease-out
              ${isDegenMode ? 'text-sinister-red' : 'text-sinister-orange'}`}
            style={{ 
              top: particle.top, 
              left: particle.left,
              opacity: particle.opacity,
              transform: particle.transform
            }}
          >
            {darkSymbols[Math.floor(Math.random() * darkSymbols.length)]}
          </div>
        ))}
        
        {/* Dark Oracle Symbol - replaces the llama mascot */}
        <div 
          className={`absolute bottom-10 right-10 md:right-20 w-32 md:w-48 h-auto z-10 
            ${isDegenMode ? 'opacity-80' : 'opacity-40'} 
            transition-all duration-500 ease-in-out`}
        >
          <div className={`relative ${glitchActive ? 'animate-glitch' : ''}`}>
            <svg viewBox="0 0 100 100" className={`w-full h-auto filter ${isDegenMode ? 'drop-shadow-blood' : 'drop-shadow-ember'}`}>
              <circle cx="50" cy="50" r="45" fill="none" stroke={isDegenMode ? "#ff2d55" : "#ff7700"} strokeWidth="2" />
              <path d="M50 10 L50 90 M10 50 L90 50 M25 25 L75 75 M25 75 L75 25" 
                stroke={isDegenMode ? "#ff2d55" : "#ff7700"} 
                strokeWidth="2" 
                fill="none" />
              <circle cx="50" cy="50" r="15" fill={isDegenMode ? "#ff2d55" : "#ff7700"} fillOpacity="0.3" />
            </svg>
            {isDegenMode && (
              <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center text-sinister-red text-opacity-70 text-xl">
                ⛧
              </div>
            )}
          </div>
          {isDegenMode && (
            <div className="absolute -top-8 right-0 bg-sinister-red/20 backdrop-blur-sm px-4 py-2 rounded-sm transform -rotate-3">
              <span className="text-blood font-heading text-xs uppercase tracking-widest">Sacrifice Required</span>
            </div>
          )}
        </div>
        
        {/* Content Container */}
        <div className="relative z-10 max-w-5xl mx-auto text-center">
          {/* Title with glitch effect in degen mode */}
          <h1 className={`text-6xl md:text-8xl font-heading mb-6 uppercase tracking-wider
            ${glitchActive ? 'animate-glitch' : ''}
            ${isDegenMode ? 'text-blood' : 'text-sinister-orange'}`}>
            {isDegenMode ? 'Dark Oracle' : 'Delphi'}
          </h1>
          
          <p className={`text-xl font-accent mb-8 ${isDegenMode ? 'text-sinister-scroll' : 'text-sinister-scroll/80'}`}>
            {isDegenMode ? (
              <>The <span className="text-blood font-bold">FORBIDDEN</span> marketplace for the <span className="text-sinister-red font-bold">DAMNED</span>.<br/>Prophecies written in <span className="text-blood font-bold">BLOOD</span>.</>
            ) : (
              <>Your <span className="text-sinister-orange font-bold">EXCLUSIVE</span> marketplace for the most <span className="text-sinister-teal font-bold">VALUABLE</span> NFTs on Metis.<br/>Prophecies that <span className="text-sinister-gold font-bold">TRANSCEND</span> time.</>
            )}
          </p>
          
          {/* Action Buttons */}
          <div className="flex flex-wrap justify-center gap-6 mt-8">
            <Link 
              href="/explore" 
              className={`${isDegenMode ? 'dark-degen-btn-primary' : 'dark-btn-primary'} transition-all duration-300`}
            >
              {isDegenMode ? 'ENTER THE VOID' : 'EXPLORE COLLECTION'}
            </Link>
            <Link 
              href="/create" 
              className={`${isDegenMode ? 'dark-degen-btn-secondary' : 'dark-btn-secondary'} transition-all duration-300`}
            >
              {isDegenMode ? 'SUMMON ASSETS' : 'CREATE NEW'}
            </Link>
          </div>
        </div>
        
        {/* Stats Section */}
        <div className="mt-16 w-full max-w-4xl grid grid-cols-2 md:grid-cols-4 gap-4 relative z-10">
          {[
            { label: 'NFTs', value: marketStats.nfts.toLocaleString(), icon: '⚱️', degenIcon: '🩸', color: 'sinister-orange', degenColor: 'sinister-red' },
            { label: 'Collections', value: marketStats.collections.toLocaleString(), icon: '📜', degenIcon: '⛓️', color: 'sinister-teal', degenColor: 'blood' },
            { label: 'Users', value: marketStats.users.toLocaleString(), icon: '👁️', degenIcon: '💀', color: 'sinister-gold', degenColor: 'sinister-red' },
            { label: 'Trades', value: marketStats.trades.toLocaleString(), icon: '🔮', degenIcon: '⚔️', color: 'sinister-orange', degenColor: 'blood' }
          ].map((stat, index) => (
            <div 
              key={index} 
              className={`${isDegenMode ? 'dark-degen-card' : 'dark-card'} py-4 px-6 text-center transition-transform duration-500`}
            >
              <div className={`text-2xl mb-2 text-${isDegenMode ? stat.degenColor : stat.color}`}>
                {isDegenMode ? stat.degenIcon : stat.icon}
              </div>
              <div className={`font-heading text-2xl ${isDegenMode ? 'text-sinister-scroll' : 'text-sinister-scroll/90'}`}>
                {stat.value}
              </div>
              <div className={`font-accent text-sm uppercase ${isDegenMode ? 'text-sinister-scroll/60' : 'text-sinister-scroll/50'}`}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}