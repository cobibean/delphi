"use client";

import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { useAddress, useDisconnect, useMetamask, useWalletConnect, useCoinbaseWallet } from "@thirdweb-dev/react";

// Types
type WalletContextType = {
  isConnected: boolean;
  isConnecting: boolean;
  address: string | undefined;
  displayAddress: string | undefined;
  connectWallet: (walletId: string) => Promise<void>;
  disconnectWallet: () => Promise<void>;
  copyAddressToClipboard: () => void;
  copied: boolean;
};

// Create context
const WalletContext = createContext<WalletContextType | undefined>(undefined);

// Provider component
export function WalletProvider({ children }: { children: ReactNode }) {
  const address = useAddress();
  const disconnectWallet = useDisconnect();
  const connectMetamask = useMetamask();
  const connectWalletConnect = useWalletConnect();
  const connectCoinbase = useCoinbaseWallet();
  
  const [isConnecting, setIsConnecting] = useState(false);
  const [copied, setCopied] = useState(false);

  // Determine connection state
  const isConnected = !!address;
  
  // Format address for display
  const displayAddress = address 
    ? `${address.substring(0, 6)}...${address.substring(address.length - 4)}`
    : undefined;

  // Handle wallet connection
  const handleConnect = async (walletId: string) => {
    try {
      setIsConnecting(true);
      
      switch (walletId) {
        case "metamask":
          await connectMetamask();
          break;
        case "walletconnect":
          await connectWalletConnect();
          break;
        case "coinbase":
          await connectCoinbase();
          break;
        default:
          console.error("Unsupported wallet type:", walletId);
      }
    } catch (connectError) {
      console.error("Failed to connect wallet:", connectError);
    } finally {
      setIsConnecting(false);
    }
  };

  // Handle wallet disconnection
  const handleDisconnect = async () => {
    try {
      await disconnectWallet();
      console.log("Wallet disconnected successfully");
    } catch (disconnectError) {
      console.error("Error disconnecting wallet:", disconnectError);
    }
  };

  // Copy address to clipboard
  const copyAddressToClipboard = () => {
    if (address) {
      navigator.clipboard.writeText(address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Context value
  const value: WalletContextType = {
    isConnected,
    isConnecting,
    address,
    displayAddress,
    connectWallet: handleConnect,
    disconnectWallet: handleDisconnect,
    copyAddressToClipboard,
    copied,
  };

  return (
    <WalletContext.Provider value={value}>
      {children}
    </WalletContext.Provider>
  );
}

// Custom hook to use wallet context
export function useWallet() {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error("useWallet must be used within a WalletProvider");
  }
  return context;
} 