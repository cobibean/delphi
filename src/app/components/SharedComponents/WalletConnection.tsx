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
  const [bounceEffect, setBounceEffect] = useState(false);
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
  
  // Random bounce effect for the button - but not when dropdown is open
  useEffect(() => {
    if (!isMounted || isDropdownOpen) {
      setBounceEffect(false);
      return;
    }
    
    const interval = setInterval(() => {
      setBounceEffect(true);
      setTimeout(() => setBounceEffect(false), 1000);
    }, 5000 + Math.random() * 5000); // Random interval between 5-10 seconds
    
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

  // Generate random values only on client
  const randomEmoji = isMounted ? ["💰", "🚀", "💎", "🔥", "🌙"][Math.floor(Math.random() * 5)] : "💰";
  const buttonRotation = isMounted && isDegenMode ? `rotate(${Math.random() > 0.5 ? 1 : -1}deg)` : "none";

  // Simple placeholder during SSR
  if (!isMounted) {
    return <div className="h-10 w-40"></div>;
  }

  // Periodic bounce effect for wallet button when connected
  useEffect(() => {
    if (isConnected && isDegenMode) {
      const interval = setInterval(() => {
        setBounceEffect(true);
        setTimeout(() => setBounceEffect(false), 1000);
      }, 30000); // Every 30 seconds
      
      return () => clearInterval(interval);
    }
  }, [isConnected, isDegenMode]);

  return (
    <div className="wallet-dropdown relative">
      {!isConnected ? (
        <div className="relative">
          <ConnectButton
            client={client}
            chain={chain}
            wallets={wallets}
            connectButton={{
              label: isDegenMode ? "CONNECT WALLET 🚀" : "Connect Wallet",
              style: { 
                background: isDegenMode 
                  ? "linear-gradient(to right, #ff0080, #00ff00)"
                  : "linear-gradient(to right, #ed8936, #38b2ac)",
                color: "#ffffff",
                borderRadius: isDegenMode ? "0.75rem 1.25rem 0.5rem 0.25rem" : "0.5rem 1.5rem 0.5rem 0.5rem",
                padding: "0.5rem 1.5rem",
                border: isDegenMode ? "2px dashed rgba(237, 137, 54, 0.7)" : "1px solid rgba(237, 137, 54, 0.7)",
                fontWeight: "bold",
                fontFamily: isDegenMode ? "'Comic Sans MS', 'Comic Neue', cursive" : "'Space Grotesk', sans-serif",
                transition: "all 0.3s ease",
                position: "relative",
                overflow: "hidden",
              },
            }}
          />
          
          {/* Emoji indicator only in degen mode */}
          {isDegenMode && (
            <div className="absolute -top-2 -right-2 text-lg animate-bounce">
              {randomEmoji}
            </div>
          )}
        </div>
      ) : (
        <>
          {/* User Wallet Button - Style based on mode */}
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className={`relative overflow-hidden flex items-center space-x-2 ${
              isDegenMode
                ? 'bg-gradient-to-r from-psycho-black to-psycho-rektPink/20 text-psycho-parchment px-3 py-2 rounded-meme border-2 border-dashed border-psycho-orange/70'
                : 'bg-gradient-to-r from-psycho-black to-psycho-orange/20 text-psycho-parchment px-3 py-2 rounded-oracle border border-psycho-orange/70'
            } transition-all duration-300 ${bounceEffect && !isDropdownOpen ? 'animate-bounce-slow' : 'hover:scale-105'}`}
            disabled={isConnecting}
            style={{ transform: buttonRotation }}
          >
            {/* Wallet address display */}
            <div className="relative flex items-center justify-center">
              <span className={`relative z-10 ${isDegenMode ? 'font-comic' : 'font-body'}`}>{displayAddress}</span>
              
              {/* Animated emoji when dropdown is closed - only in degen mode */}
              {isDegenMode && (
                <div className={`absolute -top-2 -right-2 text-lg ${!isDropdownOpen ? 'animate-pulse-neon' : ''}`}>
                  {!isDropdownOpen ? randomEmoji : '💰'}
                </div>
              )}
            </div>
            
            {/* Dropdown icon */}
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="16" 
              height="16" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="3" 
              strokeLinecap="round" 
              strokeLinejoin="round"
              className={`transition-transform duration-300 ${isDegenMode ? 'text-psycho-kekGreen' : 'text-psycho-orange'} ${isDropdownOpen ? 'rotate-180' : !isDropdownOpen && isDegenMode ? 'animate-bounce' : ''}`}
            >
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </button>
          
          {/* Dropdown Menu - Style based on mode */}
          {isDropdownOpen && (
            <div className={`absolute right-0 mt-2 top-full z-10 w-60 ${
              isDegenMode
                ? 'bg-gradient-to-b from-gray-800 to-psycho-black rounded-meme shadow-meme py-1 border-2 border-dashed border-psycho-rektPink'
                : 'bg-gradient-to-b from-gray-800 to-psycho-black rounded-oracle shadow-oracle py-1 border border-psycho-orange'
            } overflow-hidden`}>
              {/* Header with pattern border */}
              <div className={`px-4 py-3 ${
                isDegenMode 
                  ? 'border-b-2 border-dashed border-psycho-kekGreen/50' 
                  : 'border-b border-psycho-orange/50'
              } relative`}>
                <p className="text-sm text-psycho-parchment">Connected as</p>
                <p className={`text-lg font-bold ${isDegenMode ? 'text-psycho-rektPink' : 'text-psycho-orange'}`}>{displayAddress}</p>
                
                {/* Copy button */}
                <button 
                  onClick={copyAddressToClipboard}
                  className={`absolute right-3 top-1/2 -translate-y-1/2 p-1 ${
                    isDegenMode
                      ? 'text-psycho-kekGreen hover:text-psycho-rektPink'
                      : 'text-psycho-orange hover:text-psycho-turquoise'
                  } transition-colors`}
                >
                  {copied ? (
                    <span className="text-xs">Copied! ✓</span>
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
                  className={`block px-4 py-2 text-sm ${
                    isDegenMode
                      ? 'text-psycho-parchment hover:bg-psycho-rektPink/20 hover:text-psycho-kekGreen'
                      : 'text-psycho-parchment hover:bg-psycho-orange/20 hover:text-psycho-turquoise'
                  } transition-colors`}
                >
                  My Profile
                </Link>
                <Link 
                  href="/my-nfts" 
                  className={`block px-4 py-2 text-sm ${
                    isDegenMode
                      ? 'text-psycho-parchment hover:bg-psycho-rektPink/20 hover:text-psycho-kekGreen'
                      : 'text-psycho-parchment hover:bg-psycho-orange/20 hover:text-psycho-turquoise'
                  } transition-colors`}
                >
                  My NFTs
                </Link>
                <button 
                  onClick={handleDisconnect}
                  className={`w-full text-left block px-4 py-2 text-sm ${
                    isDegenMode
                      ? 'text-psycho-rektPink hover:bg-psycho-rektPink/20'
                      : 'text-psycho-orange hover:bg-psycho-orange/20'
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