"use client";

import { useState, useEffect } from 'react';
import { ConnectButton } from "thirdweb/react";
import Link from 'next/link';
import { motion } from 'framer-motion';
import { client } from '../client';

interface NavItemProps {
  label: string;
  href: string;
  comingSoon?: boolean;
  warpEffect?: 'spatial-echo' | 'quantum-flare' | 'time-dilation' | 'reality-glitch';
}

const NavItem = ({ label, href, comingSoon = false, warpEffect = 'spatial-echo' }: NavItemProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const warpEffects = {
    'spatial-echo': 'after:content-[""] after:absolute after:inset-0 after:opacity-30 after:translate-x-1 after:translate-y-1 after:bg-current after:z-[-1]',
    'quantum-flare': 'before:content-[""] before:absolute before:inset-0 before:opacity-30 before:bg-oracle-turquoise before:blur-md before:scale-110 before:z-[-1]',
    'time-dilation': 'animate-quantum-fluctuation',
    'reality-glitch': 'text-glitch',
  };
  
  return (
    <motion.div
      className="relative mx-4"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ scale: 1.05 }}
    >
      {comingSoon ? (
        <div className={`relative text-oracle-white font-bold cursor-not-allowed ${warpEffects[warpEffect]}`}>
          {label}
          <span className="absolute -top-2 -right-2 bg-oracle-orange text-xs px-2 py-0.5 rounded-full animate-cosmic-pulsation">
            Soon
          </span>
        </div>
      ) : (
        <Link href={href} className={`relative text-oracle-white font-bold ${warpEffects[warpEffect]}`}>
          {label}
        </Link>
      )}
      <motion.div
        className="absolute bottom-0 left-0 h-0.5 bg-oracle-orange"
        initial={{ width: 0 }}
        animate={{ width: isHovered ? '100%' : 0 }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
};

export default function Header() {
  const [scrollPosition, setScrollPosition] = useState(0);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const headerHeight = 80 - (scrollPosition * 0.1 > 20 ? 20 : scrollPosition * 0.1);
  
  return (
    <header 
      className="neural-net fixed top-0 left-0 w-full z-50 transition-all duration-300"
      style={{ 
        height: `${headerHeight}px`,
        background: `linear-gradient(to bottom, rgba(18, 18, 18, 1), rgba(18, 18, 18, ${Math.max(0.8 - scrollPosition * 0.001, 0.5)}))`
      }}
    >
      <div className="container mx-auto h-full flex items-center justify-between px-4">
        <Link href="/" className="dimensional-shift text-3xl font-impact text-oracle-orange animate-reality-distortion">
          DELPHI
        </Link>
        
        <nav className="hidden md:flex items-center">
          <NavItem label="Home" href="/" />
          <NavItem label="Explore" href="/explore" />
          <NavItem label="Profile" href="/profile" comingSoon={true} warpEffect="spatial-echo" />
          <NavItem label="Create Listing" href="/create" comingSoon={false} warpEffect="quantum-flare" />
          <NavItem label="Stats" href="/stats" comingSoon={true} warpEffect="time-dilation" />
          <NavItem label="Create Collection" href="/create-collection" comingSoon={true} warpEffect="reality-glitch" />
        </nav>
        
        <div className="flex items-center">
          <ConnectButton 
            client={client}
            appMetadata={{
              name: "Delphi",
              url: "https://delphi.io",
            }}
          />
        </div>
      </div>
    </header>
  );
} 