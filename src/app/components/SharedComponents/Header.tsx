"use client";

import Link from "next/link";
import WalletConnection from "./WalletConnection";
import { useState, useEffect } from "react";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [wiggleText, setWiggleText] = useState(-1); // For text animation

  // Handle scroll effects
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  // Random wiggle for nav items
  useEffect(() => {
    const interval = setInterval(() => {
      setWiggleText(Math.floor(Math.random() * 5)); // Random index from 0-4
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Explore", href: "/explore" },
    { name: "Create", href: "/create" },
    { name: "About", href: "/about" },
    { name: "Test", href: "/test" },
  ];

  return (
    <header 
      className={`sticky top-0 z-50 transition-all duration-500 ${
        scrolled 
          ? 'bg-gradient-to-r from-psycho-rektPink/20 to-psycho-kekGreen/20 shadow-neon backdrop-blur-md py-2 border-b-2 border-dashed border-psycho-orange' 
          : 'bg-transparent py-4'
      }`}
      style={{ transform: scrolled ? 'rotate(-1deg)' : 'rotate(0deg)' }}
    >
      {/* Meme particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(10)].map((_, i) => (
          <div 
            key={i} 
            className="absolute h-6 w-6 opacity-20 animate-floating"
            style={{ 
              top: `${Math.random() * 100}%`, 
              left: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.2}s`,
              transform: `rotate(${Math.random() * 360}deg)`,
              backgroundColor: i % 2 === 0 ? '#ff0080' : '#00ff00'
            }}
          />
        ))}
      </div>

      <nav className="container mx-auto px-4 flex justify-between items-center">
        {/* Branding */}
        <div className="flex items-center space-x-3">
          <div className="relative h-14 w-14 overflow-hidden animate-pulse">
            <div className="absolute inset-0 flex items-center justify-center rounded-meme bg-gradient-to-br from-psycho-rektPink to-psycho-kekGreen transform rotate-3">
              <img 
                src="/favicon.ico" 
                alt="Delphi Logo" 
                className="h-10 w-10 transform hover:scale-110 transition-transform duration-300 animate-wiggle" 
              />
            </div>
            <div className="absolute inset-0 border-2 border-dashed border-psycho-orange rounded-meme"></div>
          </div>
          <span className="font-comic text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-psycho-rektPink to-psycho-kekGreen tilt-left animate-pulse">
            ✨ DELPHI ✨
          </span>
        </div>

        {/* Navigation Links */}
        <ul className="hidden md:flex items-center gap-8">
          {navItems.map((item, index) => (
            <li key={item.name} className={`transform ${wiggleText === index ? 'animate-wiggle' : ''}`}>
              <Link href={item.href} className="font-comic font-bold relative py-2 px-3 group text-psycho-parchment hover:text-psycho-rektPink transition-colors duration-300"
                style={{ transform: `rotate(${Math.random() * 6 - 3}deg)` }}>
                {item.name}
                <span className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-psycho-rektPink to-psycho-kekGreen transition-all duration-300 opacity-0 group-hover:opacity-100"></span>
              </Link>
            </li>
          ))}
        </ul>

        {/* Wallet Connection */}
        <div className="flex items-center gap-4">
          <WalletConnection />
          <button className="md:hidden text-psycho-rektPink animate-pulse">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>
        </div>
      </nav>
      
      {/* Random meme badges */}
      <div className="absolute bottom-0 left-4 transform translate-y-1/2">
        <span className="degen-badge mr-2 animate-pulse-neon">🔥 DEGEN 🔥</span>
      </div>
      <div className="absolute bottom-0 right-4 transform translate-y-1/2">
        <span className="degen-badge animate-pulse-neon">💸 APE IN 💸</span>
      </div>
    </header>
  );
}