"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import ThirdwebConnectButton from "./ThirdwebConnectButton";
import { motion, AnimatePresence } from "framer-motion";
import ListingOptionsModal from "../ListingOptions/ListingOptionsModal";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [particleEffect, setParticleEffect] = useState(false);
  const [showListingModal, setShowListingModal] = useState(false);
  
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
    
    // Random particle effects
    const particleInterval = setInterval(() => {
      if (Math.random() > 0.7) {
        setParticleEffect(true);
        setTimeout(() => setParticleEffect(false), 2000);
      }
    }, 5000);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(particleInterval);
    };
  }, []);

  // Simple placeholder during SSR
  if (!isMounted) {
    return (
      <header className="h-20 bg-transparent">
        <div className="container mx-auto"></div>
      </header>
    );
  }

  // Header background based on scroll position
  const headerClasses = scrolled
    ? 'bg-oracle-black-void/90 shadow-card-hover backdrop-blur-md py-3 border-b border-oracle-orange/10'
    : 'bg-transparent py-5';

  // Navigation items with "coming soon" status
  const navItems = [
    { name: "Profile", href: "/profile", comingSoon: true },
    { name: "Create Listing", href: "/create", comingSoon: false },
    { name: "Stats", href: "/stats", comingSoon: true },
    { name: "Earn", href: "/earn", comingSoon: true },
  ];

  const handleNavClick = (item: { name: string; href: string; comingSoon: boolean }) => {
    if (item.comingSoon) {
      setActiveModal(item.name);
      return;
    }
    
    if (item.name === "Create Listing") {
      setShowListingModal(true);
      return;
    }
  };

  // Particle effect for space background
  const renderParticles = () => {
    if (!particleEffect) return null;
    
    return (
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-oracle-orange-hot"
            initial={{ 
              x: Math.random() * window.innerWidth, 
              y: Math.random() * 80,
              opacity: 0 
            }}
            animate={{ 
              x: Math.random() * window.innerWidth, 
              y: Math.random() * 80,
              opacity: [0, 0.8, 0],
              scale: [0, 1.5, 0]
            }}
            transition={{ 
              duration: 2,
              delay: i * 0.1,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>
    );
  };

  return (
    <header className={`neural-net sticky top-0 z-50 transition-all duration-300 ${headerClasses}`}>
      <div className="container flex items-center justify-between h-20 relative">
        {/* Space background particle effect */}
        {renderParticles()}
        
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2 hover:scale-105 transition-transform duration-300">
          <div className="relative h-10 w-10 overflow-hidden">
            <motion.img 
              src="/images/delphi-logo.svg" 
              alt="Delphi" 
              className="h-full w-full object-contain"
              animate={{ 
                filter: particleEffect ? [
                  "brightness(1) hue-rotate(0deg)",
                  "brightness(1.5) hue-rotate(45deg)",
                  "brightness(1) hue-rotate(0deg)"
                ] : "brightness(1)"
              }}
              transition={{ duration: 2, ease: "easeInOut" }}
            />
          </div>
          <div>
            <span className="font-heading text-2xl text-oracle-orange tracking-wide">DELPHI</span>
            <span className="hidden md:block text-xs text-oracle-white/60 accent-text">the center of the world</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <motion.button 
              key={item.name} 
              onClick={() => handleNavClick(item)}
              className="font-heading text-oracle-white hover:text-oracle-orange transition-colors duration-300 tracking-widest relative group"
              whileHover={{ 
                scale: 1.05,
                textShadow: "0 0 8px rgba(255, 95, 31, 0.5)"
              } as any}
            >
              {item.name}
              <motion.span 
                className="absolute -bottom-1 left-0 h-0.5 bg-oracle-orange"
                initial={{ width: 0 }}
                whileHover={{ width: "100%" }}
                transition={{ duration: 0.3 }}
              />
              {item.comingSoon && (
                <motion.span 
                  className="absolute -top-1 -right-1 flex h-2 w-2"
                  animate={{ 
                    scale: [1, 1.2, 1],
                    opacity: [0.7, 1, 0.7]
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-oracle-turquoise opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-oracle-turquoise"></span>
                </motion.span>
              )}
            </motion.button>
          ))}
        </nav>

        {/* Wallet Button */}
        <div className="hidden md:block">
          <ThirdwebConnectButton />
        </div>

        {/* Mobile Menu Button */}
        <motion.button 
          className="md:hidden text-oracle-white p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          whileTap={{ scale: 0.95 }}
        >
          {mobileMenuOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </motion.button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            className="md:hidden bg-oracle-black-void/95 backdrop-blur-md border-t border-oracle-orange/10"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="container py-4">
              <nav className="flex flex-col space-y-4">
                {navItems.map((item) => (
                  <motion.button 
                    key={item.name} 
                    onClick={() => handleNavClick(item)}
                    className="font-heading text-oracle-white hover:text-oracle-orange transition-colors duration-300 py-2 tracking-widest flex items-center justify-between"
                    whileHover={{ x: 5 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {item.name}
                    {item.comingSoon && (
                      <span className="badge-turquoise">Coming Soon</span>
                    )}
                  </motion.button>
                ))}
                <div className="pt-4 border-t border-oracle-orange/10">
                  <ThirdwebConnectButton />
                </div>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Coming Soon Modal */}
      <AnimatePresence>
        {activeModal && (
          <motion.div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-oracle-black-void/80"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveModal(null)}
          >
            <motion.div 
              className="bg-oracle-black-matter border border-oracle-orange/20 rounded-xl w-full max-w-md shadow-card-hover"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", damping: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 relative overflow-hidden">
                {/* Background effect */}
                <div className="absolute inset-0 bg-cosmic-connection opacity-10"></div>
                
                <div className="relative z-10">
                  <div className="flex justify-between items-center mb-4">
                    <motion.h3 
                      className="font-heading text-2xl text-oracle-orange"
                      animate={{ 
                        textShadow: [
                          "0 0 0px rgba(255, 95, 31, 0)",
                          "0 0 10px rgba(255, 95, 31, 0.5)",
                          "0 0 0px rgba(255, 95, 31, 0)"
                        ]
                      } as any}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      Coming Soon
                    </motion.h3>
                    <motion.button 
                      onClick={() => setActiveModal(null)}
                      className="text-oracle-white/70 hover:text-oracle-orange"
                      whileHover={{ rotate: 90 }}
                      transition={{ duration: 0.3 }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </motion.button>
                  </div>
                  <div className="mb-6">
                    <p className="text-oracle-white mb-4">
                      We're working on bringing you amazing {activeModal.toLowerCase()} features.
                    </p>
                    <div className="flex justify-center my-6">
                      <motion.div 
                        className="w-24 h-24 bg-cosmic-combustion rounded-full flex items-center justify-center overflow-hidden"
                        animate={{ 
                          boxShadow: [
                            "0 0 0px rgba(255, 95, 31, 0)",
                            "0 0 30px rgba(255, 95, 31, 0.5)",
                            "0 0 0px rgba(255, 95, 31, 0)"
                          ]
                        } as any}
                        transition={{ duration: 3, repeat: Infinity }}
                      >
                        <span className="font-heading text-4xl text-oracle-white">
                          {activeModal[0]}
                        </span>
                      </motion.div>
                    </div>
                    <p className="text-oracle-white/70 text-sm">
                      Stay tuned for updates! Built by Vesta & Yeti-Apes.
                    </p>
                  </div>
                  <motion.button 
                    onClick={() => setActiveModal(null)}
                    className="btn-primary w-full bg-cosmic-combustion relative overflow-hidden group"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {/* Energy burst animation on hover */}
                    <span className="absolute inset-0 w-full h-full bg-white/20 transform scale-0 group-hover:scale-100 rounded-full transition-transform duration-500 origin-center"></span>
                    <span className="relative z-10">Got it</span>
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Listing Options Modal */}
      <AnimatePresence>
        {showListingModal && (
          <ListingOptionsModal onClose={() => setShowListingModal(false)} />
        )}
      </AnimatePresence>
    </header>
  );
}