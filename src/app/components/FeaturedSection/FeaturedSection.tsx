"use client";

import { useState, useEffect } from "react";

export default function FeaturedSection() {
  const [glitchText, setGlitchText] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  
  // Trigger glitch text effect randomly
  useEffect(() => {
    setIsMounted(true);
    
    const glitchInterval = setInterval(() => {
      if (Math.random() > 0.7) {
        setGlitchText(true);
        setTimeout(() => setGlitchText(false), 500);
      }
    }, 5000);
    
    return () => clearInterval(glitchInterval);
  }, []);
  
  // Simple placeholder during SSR
  if (!isMounted) {
    return <div className="h-screen bg-sinister-black"></div>;
  }
  
  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      <div className="container">
        <div className="max-w-4xl mx-auto text-center">
          <h1 
            className={`text-5xl md:text-6xl lg:text-7xl font-heading uppercase mb-8 ${
              glitchText ? 'glitch-text' : 'text-gradient-oracle'
            }`}
            data-text="DARK DEGEN ORACLE"
          >
            DARK DEGEN ORACLE
          </h1>
          
          <p className="text-sinister-scroll/80 text-lg md:text-xl mb-10">
            For those who want the chaos of a late-night DJ set, but in an NFT marketplace. 
            No kiddie stuff, no PC filter—just pure, unhinged degeneracy.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <a href="/explore" className="btn-primary px-8 py-4 text-lg">
              <span className="relative z-10">EXPLORE THE VOID</span>
            </a>
            <a href="/create" className="btn-secondary px-8 py-4 text-lg">
              <span>CREATE NFT</span>
            </a>
          </div>
        </div>
      </div>
      
      {/* Background effects */}
      <div className="absolute inset-0 -z-10 bg-gutter-glow"></div>
      <div className="absolute inset-0 -z-10 opacity-30 distortion-overlay"></div>
      
      {/* Animated elements */}
      <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-sinister-orange/30 rounded-full animate-flicker"></div>
      <div className="absolute bottom-1/3 right-1/3 w-2 h-2 bg-sinister-teal/20 rounded-full animate-flicker delay-300"></div>
      <div className="absolute top-1/2 right-1/4 w-1 h-1 bg-sinister-violet/30 rounded-full animate-flicker delay-700"></div>
    </section>
  );
} 