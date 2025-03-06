"use client";

import { useState, useEffect, useContext } from "react";
import { ConnectButton } from "thirdweb/react";
import { createWallet, inAppWallet } from "thirdweb/wallets";
import { client } from "@/app/client";
import { chain } from "@/app/constants/chain";
import Link from "next/link";
import { useWallet } from "@/app/providers/WalletProvider";
import { ThemeContext } from "@/app/context/ThemeContext";

export default function WalletConnection() {
  const { 
    isConnected,
    isConnecting,
    displayAddress,
    disconnectWallet,
    copyAddressToClipboard,
    copied
  } = useWallet();
  
  const { isDegenMode } = useContext(ThemeContext);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [glitchEffect, setGlitchEffect] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  
  // Available wallet options
  const wallets = [
    inAppWallet({
      auth: {
        options: ["google", "discord", "telegram", "email", "x", "phone"],
      },
    }),
    createWallet("io.metamask"),
    createWallet("io.rabby"),
    createWallet("com.trustwallet.app"),
  ];

  // Set mounted state on client
  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  // Close dropdown when clicking outside
  useEffect(() => {
    if (!isMounted) return;
    
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.wallet-dropdown')) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMounted]);
  
  // Random glitch effect for the button - but not when dropdown is open
  useEffect(() => {
    if (!isMounted || isDropdownOpen) {
      setGlitchEffect(false);
      return;
    }
    
    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        setGlitchEffect(true);
        setTimeout(() => setGlitchEffect(false), 200);
      }
    }, 5000); // Every 5 seconds with 30% chance
    
    return () => clearInterval(interval);
  }, [isDropdownOpen, isMounted]);

  // Handle wallet disconnection
  const handleDisconnect = async () => {
    try {
      await disconnectWallet();
      setIsDropdownOpen(false);
      console.log("Disconnected wallet successfully");
    } catch (error) {
      console.error("Error disconnecting wallet:", error);
    }
  };

  // Simple placeholder during SSR
  if (!isMounted) {
    return <div className="h-10 w-40"></div>;
  }

  return (
    <div className="wallet-dropdown relative">
      {!isConnected ? (
        <div className="relative">
          <ConnectButton
            client={client}
            chain={chain}
            wallets={wallets}
            connectButton={{
              label: isDegenMode ? "SIGN IN BLOOD" : "CONNECT WALLET",
              style: { 
                background: isDegenMode 
                  ? "linear-gradient(to right, #ed8936, #b33a3a)"
                  : "linear-gradient(to right, #ed8936, #38b2ac)",
                color: "#ffffff",
                borderRadius: "0.25rem",
                padding: "0.5rem 1.5rem",
                border: isDegenMode ? "1px solid rgba(197, 48, 48, 0.7)" : "1px solid rgba(237, 137, 54, 0.7)",
                fontWeight: "bold",
                fontFamily: "'Impact', 'Anton', 'Bebas Neue', sans-serif",
                letterSpacing: "0.05em",
                textTransform: "uppercase",
                transition: "all 0.4s cubic-bezier(0.77, 0, 0.175, 1)",
                position: "relative",
                overflow: "hidden",
              },
            }}
          />
          
          {/* Static overlay in degen mode */}
          {isDegenMode && (
            <div className="absolute inset-0 filter-static pointer-events-none"></div>
          )}
        </div>
      ) : (
        <>
          {/* User Wallet Button - Style based on mode */}
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className={`relative overflow-hidden flex items-center space-x-2 ${
              isDegenMode
                ? 'bg-gradient-to-r from-sinister-black to-gray-900 text-sinister-scroll px-3 py-2 rounded-brutal border-l-2 border-t-2 border-sinister-red/40'
                : 'bg-gradient-to-r from-sinister-black to-gray-900 text-sinister-scroll px-3 py-2 rounded-brutal border-l-2 border-t-2 border-sinister-orange/40'
            } transition-all duration-300 shadow-dark ${glitchEffect ? 'animate-glitch' : 'hover:shadow-ember'}`}
            disabled={isConnecting}
          >
            {/* Wallet address display */}
            <div className="relative flex items-center justify-center">
              <span className={`relative z-10 font-heading uppercase tracking-wider text-sm ${isDegenMode ? 'text-sinister-red' : 'text-sinister-orange'}`}>{displayAddress}</span>
            </div>
            
            {/* Dropdown icon */}
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="16" 
              height="16" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
              className={`transition-transform duration-300 ${isDegenMode ? 'text-sinister-red' : 'text-sinister-orange'} ${isDropdownOpen ? 'rotate-180' : ''}`}
            >
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </button>
          
          {/* Dropdown Menu - Style based on mode */}
          {isDropdownOpen && (
            <div className={`absolute right-0 mt-2 top-full z-10 w-60 ${
              isDegenMode
                ? 'bg-gutter-glow rounded-brutal shadow-dark py-1 border-l-2 border-t-2 border-sinister-red/40 scorched-border'
                : 'bg-gutter-glow rounded-brutal shadow-dark py-1 border-l-2 border-t-2 border-sinister-orange/40'
            } overflow-hidden`}>
              {/* Header with pattern border */}
              <div className={`px-4 py-3 ${
                isDegenMode 
                  ? 'border-b border-sinister-red/30' 
                  : 'border-b border-sinister-orange/30'
              } relative`}>
                <p className="text-sm text-sinister-scroll/70 uppercase tracking-wider font-heading">Connected as</p>
                <p className={`text-sm font-bold ${isDegenMode ? 'text-sinister-red' : 'text-sinister-orange'} font-heading uppercase`}>{displayAddress}</p>
                
                {/* Copy button */}
                <button 
                  onClick={copyAddressToClipboard}
                  className={`absolute right-3 top-1/2 -translate-y-1/2 p-1 ${
                    isDegenMode
                      ? 'text-sinister-red hover:text-sinister-gold'
                      : 'text-sinister-orange hover:text-sinister-teal'
                  } transition-colors`}
                >
                  {copied ? (
                    <span className="text-xs font-heading">COPIED</span>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                    </svg>
                  )}
                </button>
              </div>
              
              {/* Menu items */}
              <div className="py-1">
                <Link 
                  href="/profile" 
                  className={`block px-4 py-2 text-sm font-heading uppercase tracking-wider ${
                    isDegenMode
                      ? 'text-sinister-scroll hover:bg-sinister-red/10 hover:text-sinister-red'
                      : 'text-sinister-scroll hover:bg-sinister-orange/10 hover:text-sinister-orange'
                  } transition-colors`}
                >
                  My Profile
                </Link>
                <Link 
                  href="/my-nfts" 
                  className={`block px-4 py-2 text-sm font-heading uppercase tracking-wider ${
                    isDegenMode
                      ? 'text-sinister-scroll hover:bg-sinister-red/10 hover:text-sinister-red'
                      : 'text-sinister-scroll hover:bg-sinister-orange/10 hover:text-sinister-orange'
                  } transition-colors`}
                >
                  My NFTs
                </Link>
                <button 
                  onClick={handleDisconnect}
                  className={`w-full text-left block px-4 py-2 text-sm font-heading uppercase tracking-wider ${
                    isDegenMode
                      ? 'text-sinister-red hover:bg-sinister-red/10'
                      : 'text-sinister-orange hover:bg-sinister-orange/10'
                  } transition-colors`}
                >
                  Disconnect
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
} 