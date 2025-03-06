"use client";

import { useState, useEffect } from "react";
import { ConnectButton } from "thirdweb/react";
import { createWallet, inAppWallet } from "thirdweb/wallets";
import { client } from "@/app/client";
import { chain } from "@/app/constants/chain";
import Link from "next/link";
import { useWallet } from "@/app/providers/WalletProvider";

export default function WalletConnection() {
  const { 
    isConnected,
    isConnecting,
    displayAddress,
    disconnectWallet,
    copyAddressToClipboard,
    copied
  } = useWallet();
  
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  // Random catchphrases for connect button
  const catchphrases = [
    "LFG! WAGMI!",
    "APE IN NOW!!",
    "CONNECT SER!",
    "FOMO TIME!",
    "GM DEGENS!",
  ];
  
  const randomCatchphrase = catchphrases[Math.floor(Math.random() * catchphrases.length)];

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

  // Close dropdown when clicking outside
  useEffect(() => {
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
  }, []);

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

  return (
    <div className="relative wallet-dropdown">
      {isConnected ? (
        <div className="flex items-center">
          {/* Connection Status Indicator */}
          <div className="mr-2 hidden md:flex items-center">
            <div className="h-3 w-3 rounded-full bg-psycho-kekGreen mr-1"></div>
            <span className="text-xs font-comic text-psycho-kekGreen">CONNECTED</span>
          </div>
          
          {/* User Wallet Button - Meme Style */}
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="relative overflow-hidden flex items-center space-x-2 bg-gradient-to-r from-psycho-night to-psycho-rektPink/20 text-psycho-parchment px-3 py-2 rounded-meme border-2 border-dashed border-psycho-orange/70 transition-all duration-300 hover:scale-105"
            disabled={isConnecting}
          >
            {/* Wallet address display */}
            <div className="relative flex items-center justify-center">
              <span className="relative z-10 font-comic">{displayAddress}</span>
              
              {/* Single emoji */}
              <div className="absolute -top-2 -right-2 text-lg">
                💰
              </div>
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
              className={`transition-transform duration-300 text-psycho-kekGreen ${isDropdownOpen ? 'rotate-180' : ''}`}
            >
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </button>
          
          {/* Dropdown Menu - Meme Style */}
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 top-full z-10 w-60 bg-gradient-to-b from-gray-800 to-psycho-night rounded-meme shadow-meme py-1 border-2 border-dashed border-psycho-rektPink overflow-hidden">
              {/* Header with meme pattern border */}
              <div className="px-4 py-3 border-b-2 border-dashed border-psycho-kekGreen/50 relative">
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-transparent via-psycho-rektPink/50 to-transparent"></div>
                <p className="text-base font-comic text-psycho-rektPink">🔥 DEGEN WALLET 🔥</p>
                <div className="flex items-center mt-1 group">
                  <p className="text-xs text-psycho-parchment/70 font-mono truncate mr-1">
                    {displayAddress}
                  </p>
                  <button 
                    onClick={copyAddressToClipboard}
                    className="text-psycho-kekGreen hover:text-psycho-rektPink transition-colors duration-300"
                  >
                    {copied ? (
                      <span className="text-lg">✅</span>
                    ) : (
                      <span className="text-lg">📋</span>
                    )}
                  </button>
                </div>
              </div>
              
              {/* Menu items with hover effects */}
              <Link 
                href="/profile" 
                className="block px-4 py-2 text-sm font-comic text-psycho-parchment hover:bg-psycho-rektPink/20 transition-colors duration-300 flex items-center space-x-2"
                onClick={() => setIsDropdownOpen(false)}
              >
                <span className="text-lg">👤</span>
                <span>MY PROFILE</span>
              </Link>
              
              <Link 
                href="/my-nfts" 
                className="block px-4 py-2 text-sm font-comic text-psycho-parchment hover:bg-psycho-rektPink/20 transition-colors duration-300 flex items-center space-x-2"
                onClick={() => setIsDropdownOpen(false)}
              >
                <span className="text-lg">🖼️</span>
                <span>MY JPEGS</span>
              </Link>
              
              <Link 
                href="/my-listings" 
                className="block px-4 py-2 text-sm font-comic text-psycho-parchment hover:bg-psycho-rektPink/20 transition-colors duration-300 flex items-center space-x-2"
                onClick={() => setIsDropdownOpen(false)}
              >
                <span className="text-lg">💸</span>
                <span>MY BAGS</span>
              </Link>
              
              {/* Divider with pattern */}
              <div className="px-2 py-1">
                <div className="h-2 w-full bg-gradient-to-r from-psycho-kekGreen via-psycho-rektPink to-psycho-orange"></div>
              </div>
              
              {/* Disconnect button with warning color */}
              <button 
                className="block w-full text-left px-4 py-2 text-lg font-comic text-white bg-gradient-to-r from-red-700 to-red-900 hover:from-red-600 hover:to-red-800 transition-colors duration-300 flex items-center space-x-2"
                onClick={handleDisconnect}
              >
                <span className="text-xl">💣</span>
                <span>RUG PULL</span>
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="relative group">
          <ConnectButton
            client={client}
            wallets={wallets}
            chain={chain}
            connectButton={{
              label: randomCatchphrase,
              style: { 
                fontSize: "1rem", 
                height: "2.8rem",
                background: "linear-gradient(to right, #ff0080, #00ff00)",
                color: "#ffffff",
                borderRadius: "0.75rem",
                padding: "0.5rem 1.5rem",
                border: "2px dashed rgba(237, 137, 54, 0.7)",
                fontWeight: "bold",
                fontFamily: "'Comic Sans MS', 'Comic Neue', cursive",
                transition: "all 0.3s ease",
                position: "relative",
                overflow: "hidden",
                textShadow: "0 0 5px rgba(255,255,255,0.5)"
              },
            }}
          />
          <div className="absolute -top-2 -right-2 text-xl">
            💰
          </div>
        </div>
      )}
    </div>
  );
} 