"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { WalletConnect } from "@/features/wallet/components";
import { motion, AnimatePresence } from "framer-motion";
import { ListingOptionsModal } from "@/features/marketplace/components";

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
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  
  const toggleModal = (modalId: string | null) => {
    if (activeModal === modalId) {
      setActiveModal(null);
    } else {
      setActiveModal(modalId);
    }
  };
  
  const handleListingModalOpen = () => {
    setShowListingModal(true);
  };
  
  const handleListingModalClose = () => {
    setShowListingModal(false);
  };
  
  // Define navigation items
  const navigationItems = [
    { name: "Marketplace", href: "/" },
    { name: "Create", href: "/create" },
    { name: "My NFTs", href: "/my-nfts" },
    { name: "My Listings", href: "/my-listings" },
    { name: "Stats", href: "/stats" },
  ];
  
  // Define header animations
  const headerVariants = {
    hidden: { opacity: 0, y: -15 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5, 
        staggerChildren: 0.1 
      } 
    }
  };
  
  const navItemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 }
  };

  const logoVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.05, transition: { duration: 0.3 } }
  };
  
  const mobileMenuVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: { 
      opacity: 1, 
      height: "auto", 
      transition: { 
        duration: 0.3, 
        ease: "easeInOut" 
      } 
    },
    exit: { 
      opacity: 0, 
      height: 0, 
      transition: { 
        duration: 0.3, 
        ease: "easeInOut" 
      } 
    }
  };
  
  const createButtonVariants = {
    initial: { scale: 1 },
    hover: { 
      scale: 1.05, 
      transition: { duration: 0.2 } 
    },
    tap: { scale: 0.98 }
  };
  
  if (!isMounted) {
    return <div className="h-16 w-full"></div>;
  }
  
  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 
        ${scrolled ? 'bg-cosmic-black/90 backdrop-blur-md shadow-xl' : 'bg-cosmic-black'}
        `}
      >
        <motion.div 
          className="container mx-auto px-4 flex items-center justify-between h-16"
          initial="hidden"
          animate="visible"
          variants={headerVariants}
        >
          {/* Logo */}
          <Link href="/">
            <motion.div 
              className="flex items-center space-x-2"
              variants={logoVariants}
              initial="initial" 
              whileHover="hover"
            >
              <img 
                src="/images/logo/logo-transparent.png" 
                alt="Delphi NFT Marketplace" 
                className="h-10 w-auto"
              />
              <span className="text-2xl font-bold text-oracle-white">Delphi</span>
            </motion.div>
          </Link>
          
          {/* Desktop Navigation */}
          <motion.nav className="hidden md:flex items-center space-x-8">
            {navigationItems.map((item, index) => (
              <motion.div key={index} variants={navItemVariants}>
                <Link href={item.href}>
                  <span className="text-cosmic-grey-300 hover:text-oracle-white transition-colors duration-200">
                    {item.name}
                  </span>
                </Link>
              </motion.div>
            ))}
          </motion.nav>
          
          {/* Right Actions */}
          <div className="flex items-center space-x-4">
            {/* Create Button */}
            <motion.div
              variants={createButtonVariants}
              initial="initial" 
              whileHover="hover" 
              whileTap="tap"
              className="hidden md:block"
            >
              <button 
                onClick={handleListingModalOpen}
                className="bg-cosmic-combustion hover:bg-cosmic-combustion/90 text-oracle-white px-4 py-2 rounded-lg font-heading transition-colors"
              >
                Create
              </button>
            </motion.div>
            
            {/* Connect Wallet Button */}
            <div className="hidden md:block">
              <WalletConnect />
            </div>
            
            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button 
                onClick={toggleMobileMenu}
                className="text-cosmic-grey-200 hover:text-oracle-white"
              >
                {mobileMenuOpen ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </motion.div>
        
        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              className="md:hidden bg-cosmic-black/95 backdrop-blur-md overflow-hidden"
              variants={mobileMenuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <div className="container mx-auto px-4 py-4 space-y-6">
                <nav className="flex flex-col space-y-4">
                  {navigationItems.map((item, index) => (
                    <Link key={index} href={item.href}>
                      <span 
                        className="text-cosmic-grey-300 hover:text-oracle-white transition-colors duration-200 py-2 block"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {item.name}
                      </span>
                    </Link>
                  ))}
                </nav>
                
                <div className="flex flex-col space-y-4">
                  <button 
                    onClick={() => {
                      handleListingModalOpen();
                      setMobileMenuOpen(false);
                    }}
                    className="bg-cosmic-combustion hover:bg-cosmic-combustion/90 text-oracle-white px-4 py-2 rounded-lg font-heading transition-colors"
                  >
                    Create
                  </button>
                  
                  <div className="py-2">
                    <WalletConnect />
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
      
      {/* Spacer for fixed header */}
      <div className="h-16"></div>

      {/* Create Listing Modal */}
      {showListingModal && (
        <ListingOptionsModal 
          onClose={handleListingModalClose} 
        />
      )}
    </>
  );
} 