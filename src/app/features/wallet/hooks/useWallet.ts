"use client";

import { useState, useCallback } from "react";
import { useToast } from "@/app/components/feedback";
import { useActiveAccount, useConnect, useDisconnect, useActiveWallet, useActiveWalletChain, useSwitchActiveWalletChain } from "thirdweb/react";
import { createWallet, walletConnect } from "thirdweb/wallets";
import { formatAddress } from "@/app/utils/formatting";
import { createThirdwebClient } from "thirdweb";
import { metisChain } from "@/app/config/chain";

// Create ThirdWeb client
const client = createThirdwebClient({
  clientId: process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID!,
});

/**
 * Custom hook for wallet functionality using ThirdWeb v5
 * Provides wallet connection state and functions for external wallets
 * Supports MetaMask, Rabby, OKX Wallet, Trust Wallet, GM2 and WalletConnect
 */
export function useWallet() {
  const { toast } = useToast();
  const account = useActiveAccount();
  const wallet = useActiveWallet();
  const { connect, isConnecting } = useConnect();
  const { disconnect } = useDisconnect();
  const chain = useActiveWalletChain();
  const switchChain = useSwitchActiveWalletChain();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const displayAddress = account?.address ? formatAddress(account.address) : "";

  const walletOptions = [
    { id: "metamask", name: "MetaMask", icon: "/icons/metamask.svg" },
    { id: "walletconnect", name: "WalletConnect", icon: "/icons/walletconnect.svg" },
    { id: "coinbase", name: "Coinbase Wallet", icon: "/icons/coinbase.svg" },
    { id: "trustwallet", name: "Trust Wallet", icon: "/icons/trustwallet.svg" },
    { id: "rabby", name: "Rabby", icon: "/icons/rabby.svg" },
    { id: "okx", name: "OKX Wallet", icon: "/icons/okx.svg" },
    { id: "gm2", name: "GM2", icon: "/icons/gm2.svg" }
  ];

  const connectWallet = useCallback(async (walletId: string) => {
    try {
      toast.info("Connecting Wallet", "Please approve the connection request in your wallet.");
      
      let selectedWallet;
      switch (walletId) {
        case "metamask":
          selectedWallet = createWallet("io.metamask");
          break;
        case "walletconnect":
          selectedWallet = walletConnect();
          break;
        case "coinbase":
          selectedWallet = createWallet("com.coinbase.wallet");
          break;
        case "trustwallet":
          selectedWallet = createWallet("com.trustwallet.app");
          break;
        case "rabby":
          selectedWallet = createWallet("io.rabby");
          break;
        case "okx":
          selectedWallet = createWallet("com.okex.wallet");
          break;
        case "gm2":
          selectedWallet = createWallet("social.gm2");
          break;
        default:
          selectedWallet = createWallet("io.metamask");
      }
      
      await connect(selectedWallet);
      
      toast.success("Wallet Connected", "Your wallet has been successfully connected.");
    } catch (error: any) {
      toast.error("Connection Failed", error.message || "Failed to connect wallet. Please try again.");
    }
  }, [connect, toast]);

  const disconnectWallet = useCallback(async () => {
    try {
      if (wallet) {
        await disconnect(wallet);
        setIsDropdownOpen(false);
        
        toast.success("Wallet Disconnected", "Your wallet has been successfully disconnected.");
      }
    } catch (error: any) {
      toast.error("Disconnect Failed", error.message || "Failed to disconnect wallet. Please try again.");
    }
  }, [disconnect, wallet, toast]);

  const copyAddressToClipboard = useCallback(async () => {
    if (account?.address) {
      try {
        await navigator.clipboard.writeText(account.address);
        toast.success("Address Copied", "Wallet address copied to clipboard.");
      } catch (error) {
        toast.error("Copy Failed", "Failed to copy address to clipboard.");
      }
    }
  }, [account?.address, toast]);

  const handleNetworkSwitch = useCallback(async (chainId: number) => {
    if (!switchChain) {
      toast.error("Network Switch Failed", "Your wallet does not support network switching.");
      return;
    }

    try {
      toast.info("Switching Network", "Please approve the network switch in your wallet.");
      
      // Switch to Metis Andromeda chain
      await switchChain(metisChain);
      
      toast.success("Network Switched", "Successfully switched to the requested network.");
    } catch (error: any) {
      toast.error("Network Switch Failed", error.message || "Failed to switch network. Please try again.");
    }
  }, [switchChain, toast]);

  return {
    isConnected: !!account,
    isConnecting,
    address: account?.address,
    displayAddress,
    walletOptions,
    connectWallet,
    disconnectWallet,
    copyAddressToClipboard,
    handleNetworkSwitch,
    isDropdownOpen,
    setIsDropdownOpen,
    chain
  };
} 