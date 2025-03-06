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
  // Get mode from context instead of tracking interaction level
  const { isDegenMode } = useContext(ThemeContext);
  // Track mouse position for dynamic hover effects
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

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
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Simple placeholder during SSR
  if (!isMounted) {
    return <div className="w-full min-h-[70vh] bg-gray-900"></div>;
  }

  // Generate emoji particles on client only - fewer at first, more as interaction increases
  const particleCount = Math.min(3 + Math.floor(isDegenMode ? 10 : 0), 7);
  const emojiParticles = [...Array(particleCount)].map((_, i) => ({
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    fontSize: `${Math.random() * 2 + 1}rem`,
    emoji: ['🚀', '💎', '🔥', '🤑', '💰', '🧠', '🏛️', '⚡'][Math.floor(Math.random() * 8)],
    // Add subtle movement based on mouse position for dynamic effect
    transform: `translateX(${(mousePosition.x % 20) - 10}px) translateY(${(mousePosition.y % 20) - 10}px)`
  }));

  // Dynamic rotation for llama based on interaction level
  const llamaRotation = isDegenMode ? 
    `-rotate-${6 + Math.floor(isDegenMode ? 10 : 0)}` : 
    "-rotate-6";

  // Speech bubble changes based on interaction level
  const speechTexts = [
    "To the moon! 🚀",
    "HODL strong! 💎",
    "Trust the Oracle! 🔮",
    "Not financial advice! 😉",
    "We're all gonna make it! 🌈"
  ];
  const currentSpeechText = speechTexts[Math.min(Math.floor(isDegenMode ? 10 : 0), speechTexts.length - 1)];

  return (
    <div className="w-full">
      {/* Hero Section */}
      <div className="relative w-full min-h-[70vh] overflow-hidden flex flex-col items-center justify-center p-8 border-8 border-dashed border-psycho-orange/50">
        {/* Emoji particles with dynamic positioning */}
        {emojiParticles.map((particle, i) => (
          <div 
            key={i} 
            className="absolute text-2xl pointer-events-none select-none transition-transform duration-300 ease-out"
            style={{ 
              top: particle.top, 
              left: particle.left,
              fontSize: particle.fontSize,
              transform: particle.transform
            }}
          >
            {particle.emoji}
          </div>
        ))}
        
        {/* Llama Mascot - gets more animated as interaction increases */}
        <div 
          className={`absolute bottom-0 right-0 md:right-10 w-40 md:w-64 h-auto z-10 transform ${llamaRotation} hover:rotate-0 transition-all duration-500 ease-in-out`}
          // Increase bounce effect with interaction
          style={{
            animation: isDegenMode ? 'bounce 3s infinite' : 'none'
          }}
        >
          <img 
            src="/images/vic-llama.svg" 
            alt="Vic the Llama" 
            className="w-full h-auto filter drop-shadow-glow"
          />
          <div 
            className={`absolute -top-10 right-0 bg-psycho-rektPink px-4 py-2 rounded-full transform rotate-12 font-comic text-white text-sm md:text-base ${
              isDegenMode ? 'animate-bounce' : ''
            }`}
          >
            <span className="whitespace-nowrap">{currentSpeechText}</span>
          </div>
        </div>
        
        {/* Content Container */}
        <div className="relative z-10 max-w-5xl mx-auto text-center">
          {/* Title with measured animation based on interaction level */}
          <h1 className={`text-6xl md:text-8xl font-impact mb-6 text-glow-pink transform transition-transform duration-500 ${
            isDegenMode ? 'hover:-rotate-1' : ''
          }`}>
            <span className="font-comic text-psycho-rektPink">D</span>
            <span className="font-comic text-psycho-kekGreen">E</span>
            <span className="font-comic text-psycho-orange">G</span>
            <span className="font-comic text-psycho-rektPink">E</span>
            <span className="font-comic text-psycho-kekGreen">N</span>
            <span>&nbsp;</span>
            <span className="font-comic text-psycho-turquoise">O</span>
            <span className="font-comic text-psycho-rektPink">R</span>
            <span className="font-comic text-psycho-orange">A</span>
            <span className="font-comic text-psycho-kekGreen">C</span>
            <span className="font-comic text-psycho-rektPink">L</span>
            <span className="font-comic text-psycho-turquoise">E</span>
          </h1>
          
          <p className="text-xl font-comic mb-8 text-psycho-parchment">
            Your <span className="text-psycho-rektPink font-bold">ONE-STOP-SHOP</span> for the most <span className="text-psycho-kekGreen font-bold">🔥 FIRE 🔥</span> NFTs on Metis! 
            <br/>No cap, just straight <span className="text-psycho-orange font-bold">ALPHA</span> for your wallet!
          </p>
          
          {/* Action Buttons - increase animation as interaction level rises */}
          <div className="flex flex-wrap justify-center gap-6 mt-8">
            <Link 
              href="/explore" 
              className={`degen-btn-primary transition-all duration-300 ${
                isDegenMode ? 'hover:scale-105 hover:rotate-1' : ''
              }`}
            >
              🚀 EXPLORE ALPHA 🚀
            </Link>
            <Link 
              href="/create" 
              className={`degen-btn-secondary transition-all duration-300 ${
                isDegenMode ? 'hover:scale-105 hover:-rotate-1' : ''
              }`}
            >
              💰 MINT MOAR 💰
            </Link>
          </div>
        </div>
        
        {/* Stats Section - transform subtly at higher interaction levels */}
        <div className="mt-16 w-full max-w-4xl grid grid-cols-2 md:grid-cols-4 gap-4 relative z-10">
          {[
            { label: 'NFTs', value: marketStats.nfts.toLocaleString(), icon: '🖼️', color: 'rektPink' },
            { label: 'Collections', value: marketStats.collections.toLocaleString(), icon: '📚', color: 'kekGreen' },
            { label: 'Users', value: marketStats.users.toLocaleString(), icon: '👨‍💻', color: 'orange' },
            { label: 'Trades', value: marketStats.trades.toLocaleString(), icon: '💸', color: 'turquoise' }
          ].map((stat, index) => (
            <div 
              key={index} 
              className={`degen-card py-4 px-6 text-center transition-transform duration-500 ${
                isDegenMode ? 'transform hover:scale-105 hover:rotate-1' : ''
              }`}
              style={{
                transform: isDegenMode ? `rotate(${index % 2 === 0 ? 1 : -1}deg)` : 'none'
              }}
            >
              <div className={`text-4xl mb-2 text-psycho-${stat.color}`}>{stat.icon}</div>
              <div className="font-comic text-3xl text-white">{stat.value}</div>
              <div className="font-comic text-sm uppercase text-psycho-parchment/60">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}