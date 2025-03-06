"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { useActiveAccount, useActiveWallet, useDisconnect, useConnect } from "thirdweb/react";
import { createWallet, type Wallet } from "thirdweb/wallets";
import { client } from "@/app/client";
import { chain } from "@/app/constants/chain";

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
  const account = useActiveAccount();
  const wallet = useActiveWallet();
  const { disconnect: disconnectWallet } = useDisconnect();
  const { connect, isConnecting, error } = useConnect();
  
  const [copied, setCopied] = useState(false);

  // Determine connection state
  const isConnected = !!account;
  
  // Format address for display
  const displayAddress = account?.address 
    ? `${account.address.substring(0, 6)}...${account.address.substring(account.address.length - 4)}`
    : undefined;

  // Handle wallet connection
  const handleConnect = async (walletId: string) => {
    try {
      await connect(async () => {
        // Instantiate the wallet
        const selectedWallet = createWallet(walletId as any);
        
        // Connect the wallet
        await selectedWallet.connect({
          client,
          chain,
        });
        
        // Return the connected wallet
        return selectedWallet;
      });
    } catch (connectError) {
      console.error("Failed to connect wallet:", connectError);
    }
  };

  // Handle wallet disconnection
  const handleDisconnect = async () => {
    try {
      if (wallet) {
        await disconnectWallet(wallet);
        console.log("Wallet disconnected successfully");
      } else {
        console.log("No wallet connected to disconnect");
      }
    } catch (disconnectError) {
      console.error("Error disconnecting wallet:", disconnectError);
    }
  };

  // Copy address to clipboard
  const copyAddressToClipboard = () => {
    if (account?.address) {
      navigator.clipboard.writeText(account.address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Context value
  const value: WalletContextType = {
    isConnected,
    isConnecting,
    address: account?.address,
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