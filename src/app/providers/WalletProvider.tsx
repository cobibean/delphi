"use client";

import React, { createContext, useContext, ReactNode } from "react";
import { useWallet as useCustomWallet } from "@/app/features/wallet/hooks/useWallet";

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
  wallet: any;
  walletOptions: Array<{ id: string; name: string; icon: string }>;
};

// Create context
const WalletContext = createContext<WalletContextType | undefined>(undefined);

// Provider component
export function WalletProvider({ children }: { children: ReactNode }) {
  // Use our custom hook that implements ThirdWeb v5
  const walletState = useCustomWallet();

  return (
    <WalletContext.Provider value={walletState}>
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