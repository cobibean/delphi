"use client";

import { useState, useEffect } from "react";
import { 
  useAddress, 
  useDisconnect,
  ConnectWallet
} from "@thirdweb-dev/react";
import { useTransaction } from "@/app/providers/TransactionProvider";

export default function WalletConnection() {
  const address = useAddress();
  const disconnect = useDisconnect();
  const { addTransaction } = useTransaction();
  const [isMounted, setIsMounted] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  // Set mounted state on client
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
  
  // Track wallet connection status
  useEffect(() => {
    if (address) {
      addTransaction("success", "Your wallet has been connected successfully.");
    }
  }, [address, addTransaction]);
  
  // Handle disconnect
  const handleDisconnect = () => {
    disconnect();
    setIsDropdownOpen(false);
    addTransaction("info", "Your wallet has been disconnected.");
  };
  
  // Format address for display
  const formatAddress = (addr: string) => {
    return `${addr.substring(0, 6)}...${addr.substring(addr.length - 4)}`;
  };
  
  // Simple placeholder during SSR
  if (!isMounted) {
    return <div className="h-10 w-36 bg-oracle-black-matter/50 rounded-lg"></div>;
  }
  
  return (
    <div className="relative">
      {address ? (
        // Connected state
        <div className="relative">
          <button
            className="bg-cosmic-combustion text-oracle-white px-4 py-2 rounded-lg font-heading"
            onClick={(e) => {
              e.stopPropagation();
              setIsDropdownOpen(!isDropdownOpen);
            }}
          >
            <span className="flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
              <span>{formatAddress(address)}</span>
            </span>
          </button>
          
          {/* Dropdown menu */}
          {isDropdownOpen && (
            <div 
              className="absolute right-0 mt-2 w-48 bg-oracle-black-void border border-oracle-orange/20 rounded-lg shadow-lg"
            >
              <div className="p-2">
                <button 
                  onClick={handleDisconnect}
                  className="w-full text-left px-3 py-2 text-oracle-white hover:bg-oracle-orange/10 rounded-md transition-colors duration-300 flex items-center space-x-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  <span>Disconnect</span>
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        // Not connected - Simple Connect Wallet Button
        <div>
          <ConnectWallet
            theme="dark"
            btnTitle="Sign In"
            modalTitle="Connect Your Wallet"
            modalSize="wide"
            welcomeScreen={{
              title: "Connect to Delphi",
              subtitle: "Connect your wallet to access the Delphi marketplace",
            }}
            modalTitleIconUrl="/images/delphi-logo.svg"
          />
        </div>
      )}
    </div>
  );
} 