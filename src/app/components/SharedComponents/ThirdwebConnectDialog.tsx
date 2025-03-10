"use client";

// This is a clean, minimal implementation specifically for the ThirdWeb connect dialog
// We create it from scratch to avoid any potential issues

import React from "react";
import { createThirdwebClient } from "thirdweb";
import { ConnectButton, darkTheme } from "thirdweb/react";
import { inAppWallet, createWallet } from "thirdweb/wallets";
import { THIRDWEB_CLIENT_ID } from "@/app/constants/contracts";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Create a dedicated QueryClient for this component
const queryClient = new QueryClient();

// Create ThirdWeb client
const client = createThirdwebClient({
  clientId: THIRDWEB_CLIENT_ID,
});

// Define Metis chain with correct types
const metisChain = {
  id: 1088,
  name: "Metis Andromeda",
  rpc: "https://andromeda.metis.io/?owner=1088",
  nativeCurrency: {
    decimals: 18,
    name: "Metis",
    symbol: "METIS",
  },
  testnet: true,
} as const;

// Define wallet options exactly as requested
const wallets = [
  inAppWallet({
    auth: {
      options: [
        "google",
        "telegram",
        "discord",
        "x",
        "passkey",
        "phone",
      ],
    },
  }),
  createWallet("io.metamask"),
  createWallet("com.coinbase.wallet"),
  createWallet("io.rabby"),
  createWallet("com.okex.wallet"),
  createWallet("com.trustwallet.app"),
];

// The actual component
function ConnectButtonComponent() {
  return (
    <ConnectButton
      client={client}
      wallets={wallets}
      theme={darkTheme({
        colors: {
          accentText: "hsl(15, 100%, 60%)",
          separatorLine: "hsl(187, 88%, 51%)",
        },
      })}
      connectButton={{ 
        label: "Sign In",
        className: "bg-cosmic-combustion text-oracle-white font-heading px-4 py-2 rounded-lg"
      }}
      connectModal={{
        title: "Connect to Delphi",
        size: "wide",
        showThirdwebBranding: false,
      }}
      accountAbstraction={{
        chain: metisChain,
        sponsorGas: true,
      }}
    />
  );
}

// Export with QueryClientProvider wrapper
export default function ThirdwebConnectDialog() {
  return (
    <QueryClientProvider client={queryClient}>
      <ConnectButtonComponent />
    </QueryClientProvider>
  );
} 