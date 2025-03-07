"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import WalletConnection from "./WalletConnection";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeModal, setActiveModal] = useState<string | null>(null);
  
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
      <header className="h-20 bg-transparent">
        <div className="container mx-auto"></div>
      </header>
    );
  }

  // Header background based on scroll position
  const headerClasses = scrolled
    ? 'bg-oracle-black/90 shadow-card-normal backdrop-blur-md py-3 border-b border-oracle-orange/10'
    : 'bg-transparent py-5';

  // Navigation items with "coming soon" status
  const navItems = [
    { name: "Profile", href: "/profile", comingSoon: true },
    { name: "Create Listing", href: "/create", comingSoon: true },
    { name: "Stats", href: "/stats", comingSoon: true },
    { name: "Earn", href: "/earn", comingSoon: true },
  ];

  const handleNavClick = (item: { name: string; href: string; comingSoon: boolean }) => {
    if (item.comingSoon) {
      setActiveModal(item.name);
      return;
    }
  };

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${headerClasses}`}>
      <div className="container flex items-center justify-between h-20">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2 hover-lift">
          <div className="relative h-10 w-10 overflow-hidden">
            <img 
              src="/images/delphi-logo.svg" 
              alt="Delphi" 
              className="h-full w-full object-contain animate-oracle-pulse"
            />
          </div>
          <div>
            <span className="font-heading text-2xl text-oracle-orange tracking-wide">DELPHI</span>
            <span className="hidden md:block text-xs text-oracle-white/60 accent-text">The Center of the World</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <button 
              key={item.name} 
              onClick={() => handleNavClick(item)}
              className="font-heading text-oracle-white hover:text-oracle-orange transition-colors duration-300 tracking-widest relative group"
            >
              {item.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-oracle-orange transition-all duration-300 group-hover:w-full"></span>
              {item.comingSoon && (
                <span className="absolute -top-1 -right-1 flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-oracle-turquoise opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-oracle-turquoise"></span>
                </span>
              )}
            </button>
          ))}
        </nav>

        {/* Wallet Connection */}
        <div className="hidden md:block">
          <WalletConnection />
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-oracle-white p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
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
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-oracle-black/95 backdrop-blur-md border-t border-oracle-orange/10">
          <div className="container py-4">
            <nav className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <button 
                  key={item.name} 
                  onClick={() => handleNavClick(item)}
                  className="font-heading text-oracle-white hover:text-oracle-orange transition-colors duration-300 py-2 tracking-widest flex items-center justify-between"
                >
                  {item.name}
                  {item.comingSoon && (
                    <span className="badge-turquoise">Coming Soon</span>
                  )}
                </button>
              ))}
              <div className="pt-4 border-t border-oracle-orange/10">
                <WalletConnection />
              </div>
            </nav>
          </div>
        </div>
      )}

      {/* Coming Soon Modal */}
      {activeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-oracle-black/80">
          <div className="bg-ancient-wisdom border border-oracle-orange/20 rounded-xl w-full max-w-md shadow-card-hover animate-digital-glitch" style={{animationDuration: '0.2s'}}>
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-heading text-2xl text-oracle-orange">Coming Soon</h3>
                <button 
                  onClick={() => setActiveModal(null)}
                  className="text-oracle-white/70 hover:text-oracle-orange"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="mb-6">
                <p className="text-oracle-white mb-4">
                  We're working on bringing you amazing {activeModal.toLowerCase()} features.
                </p>
                <div className="flex justify-center my-6">
                  <div className="w-24 h-24 bg-cosmic-connection rounded-full flex items-center justify-center animate-oracle-pulse overflow-hidden">
                    <span className="font-heading text-4xl text-oracle-white glitch-text" data-text={activeModal[0]}>
                      {activeModal[0]}
                    </span>
                  </div>
                </div>
                <p className="text-oracle-white/70 text-sm">
                  Stay tuned for updates! Built by Vesta & Yeti-Apes.
                </p>
              </div>
              <button 
                onClick={() => setActiveModal(null)}
                className="btn-primary w-full"
              >
                <span className="relative z-10">Got it</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}