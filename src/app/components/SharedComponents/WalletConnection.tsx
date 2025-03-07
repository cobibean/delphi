"use client";

import { useState, useEffect } from "react";
import { useAddress, useDisconnect, useMetamask } from "@thirdweb-dev/react";
import { useTransaction } from "@/app/providers/TransactionProvider";
import { motion, AnimatePresence } from "framer-motion";

export default function WalletConnection() {
  const address = useAddress();
  const disconnect = useDisconnect();
  const connectWithMetamask = useMetamask();
  
  const { addTransaction } = useTransaction();
  
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [energyState, setEnergyState] = useState<'dormant' | 'activating' | 'active' | 'unstable'>('dormant');
  const [pulseEffect, setPulseEffect] = useState(false);
  
  // Handle connection and display status
  useEffect(() => {
    setIsMounted(true);
    
    // Cleanup dropdown if click outside
    const handleClickOutside = (e: MouseEvent) => {
      if (isDropdownOpen) {
        setIsDropdownOpen(false);
      }
    };
    
    document.addEventListener('click', handleClickOutside);
    
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isDropdownOpen]);
  
  // Handle energy state changes
  useEffect(() => {
    if (isHovering) {
      setEnergyState('activating');
      const timer = setTimeout(() => {
        setEnergyState('active');
      }, 300);
      
      // Occasional pulse effects
      const pulseInterval = setInterval(() => {
        if (Math.random() > 0.6) {
          setPulseEffect(true);
          setTimeout(() => setPulseEffect(false), 600);
        }
      }, 2000);
      
      return () => {
        clearTimeout(timer);
        clearInterval(pulseInterval);
      };
    } else {
      setEnergyState('dormant');
    }
  }, [isHovering]);
  
  // Handle connection
  const handleConnect = async () => {
    try {
      setEnergyState('unstable');
      await connectWithMetamask();
      addTransaction("success", "Your wallet has been connected successfully to the interdimensional Delphi nexus.");
    } catch (error) {
      addTransaction("error", error instanceof Error ? error.message : "Failed to connect wallet through the dimensional barrier");
    } finally {
      setEnergyState('dormant');
    }
  };
  
  // Handle disconnection
  const handleDisconnect = () => {
    disconnect();
    addTransaction("info", "Your wallet has been disconnected from the Delphi nexus. Reality stabilizing...");
    setIsDropdownOpen(false);
  };
  
  // Format address for display
  const formatAddress = (addr: string) => {
    return `${addr.substring(0, 6)}...${addr.substring(addr.length - 4)}`;
  };
  
  // Simple placeholder during SSR
  if (!isMounted) {
    return <div className="h-10"></div>;
  }
  
  // Get energy state classes
  const energyClasses = {
    dormant: 'bg-oracle-black/30 border-oracle-orange/50 text-oracle-white/80',
    activating: 'bg-oracle-black/40 border-oracle-turquoise/60 text-oracle-turquoise/90',
    active: 'bg-sinister-black/60 border-sinister-teal text-sinister-teal',
    unstable: 'bg-sinister-black/80 border-oracle-orange animate-pulse text-oracle-white'
  };
  
  if (!address) {
    return (
      <motion.button 
        onClick={handleConnect}
        className={`relative overflow-hidden btn-primary px-5 py-2 font-heading text-sm tracking-wider border-2 
          ${energyClasses[energyState]} 
          transition-colors duration-300`}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.98 }}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        {/* Energy particles */}
        <AnimatePresence>
          {(energyState === 'active' || energyState === 'unstable') && (
            <>
              <motion.div 
                className="absolute w-1 h-1 rounded-full bg-oracle-turquoise"
                initial={{ x: '50%', y: '100%', opacity: 0 }}
                animate={{ 
                  x: ['-50%', '150%', '100%', '0%', '50%'],
                  y: ['100%', '0%', '50%', '80%', '100%'],
                  opacity: [0, 0.8, 0.5, 0.8, 0],
                  scale: [1, 1.5, 1, 1.5, 1]
                }}
                transition={{ duration: 3, repeat: Infinity, repeatType: 'loop' }}
              />
              <motion.div 
                className="absolute w-1 h-1 rounded-full bg-oracle-orange"
                initial={{ x: '10%', y: '100%', opacity: 0 }}
                animate={{ 
                  x: ['10%', '80%', '30%', '90%', '10%'],
                  y: ['100%', '20%', '0%', '50%', '100%'],
                  opacity: [0, 0.6, 0.8, 0.6, 0],
                  scale: [1, 1.2, 1.5, 1.2, 1]
                }}
                transition={{ duration: 2.5, repeat: Infinity, repeatType: 'loop' }}
              />
            </>
          )}
        </AnimatePresence>
        
        {/* Text with glitch effect */}
        <span className={`relative z-10 ${pulseEffect ? 'animate-glitch' : ''}`}>
          {energyState === 'unstable' ? (
            <span className="glitch-text" data-text="CONNECTING...">CONNECTING...</span>
          ) : (
            <span>SIGN IN</span>
          )}
        </span>
        
        {/* Reality distortion field */}
        <motion.div 
          className="absolute inset-0 pointer-events-none"
          animate={{ 
            opacity: energyState === 'active' ? [0.2, 0.3, 0.2] : 0,
            backgroundImage: 'radial-gradient(circle, rgba(0, 209, 193, 0.15) 0%, rgba(0, 0, 0, 0) 70%)'
          }}
          transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse' }}
        />
      </motion.button>
    );
  }
  
  return (
    <div className="relative">
      <motion.button
        onClick={(e) => {
          e.stopPropagation();
          setIsDropdownOpen(!isDropdownOpen);
        }}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        className={`relative flex items-center space-x-2 px-3 py-2 border-2 transition-all duration-300 
          ${energyClasses[energyState]}`}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <span className={`font-heading text-sm tracking-wider ${pulseEffect ? 'animate-glitch' : ''}`}>
          {formatAddress(address)}
        </span>
        
        <motion.svg 
          xmlns="http://www.w3.org/2000/svg" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor" 
          className="w-4 h-4"
          animate={{ rotate: isDropdownOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </motion.svg>
        
        {/* Energy particles */}
        <AnimatePresence>
          {(energyState === 'active' || energyState === 'unstable') && (
            <>
              <motion.div 
                className="absolute w-0.5 h-0.5 rounded-full bg-oracle-turquoise/70 pointer-events-none"
                initial={{ top: '80%', left: '30%', opacity: 0 }}
                animate={{ 
                  top: ['80%', '20%', '40%', '60%', '80%'],
                  left: ['30%', '60%', '80%', '50%', '30%'],
                  opacity: [0, 0.8, 0.6, 0.8, 0],
                  scale: [1, 1.2, 1, 1.2, 1]
                }}
                transition={{ duration: 3, repeat: Infinity, repeatType: 'loop' }}
                exit={{ opacity: 0 }}
              />
              <motion.div 
                className="absolute w-0.5 h-0.5 rounded-full bg-oracle-orange/70 pointer-events-none"
                initial={{ top: '20%', left: '70%', opacity: 0 }}
                animate={{ 
                  top: ['20%', '60%', '80%', '40%', '20%'],
                  left: ['70%', '40%', '20%', '10%', '70%'],
                  opacity: [0, 0.6, 0.8, 0.6, 0],
                  scale: [1, 1.5, 1, 1.5, 1]
                }}
                transition={{ duration: 2.5, repeat: Infinity, repeatType: 'loop' }}
                exit={{ opacity: 0 }}
              />
            </>
          )}
        </AnimatePresence>
      </motion.button>
      
      <AnimatePresence>
        {isDropdownOpen && (
          <motion.div 
            className="absolute right-0 mt-2 w-48 dropdown shadow-dark z-50 border border-oracle-orange/20 bg-sinister-black/90 backdrop-blur-sm"
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          >
            <div className="px-4 py-3 border-b border-sinister-orange/20">
              <div className="text-xs text-sinister-scroll/70">Connected as</div>
              <div className="text-sm font-medium text-sinister-scroll truncate">
                {address}
              </div>
            </div>
            
            <div className="py-1">
              <a 
                href={`https://explorer.metis.io/address/${address}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="dropdown-item flex py-2 px-4 text-sm text-oracle-white hover:bg-oracle-black/40 transition-colors duration-200"
              >
                <motion.span whileHover={{ x: 2 }} transition={{ type: 'spring', stiffness: 300 }}>
                  View on Metis Explorer
                </motion.span>
              </a>
              
              <button 
                onClick={handleDisconnect} 
                className="dropdown-item w-full text-left flex py-2 px-4 text-sm text-oracle-orange hover:bg-oracle-black/40 transition-colors duration-200"
              >
                <motion.span whileHover={{ x: 2 }} transition={{ type: 'spring', stiffness: 300 }}>
                  Disconnect
                </motion.span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 