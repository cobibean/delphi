"use client";

import { createThirdwebClient } from "thirdweb";
import { ConnectButton, darkTheme } from "thirdweb/react";
import {
  inAppWallet,
  createWallet,
} from "thirdweb/wallets";
import { THIRDWEB_CLIENT_ID } from "@/app/constants/contracts";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

// Create ThirdWeb client
const client = createThirdwebClient({
  clientId: THIRDWEB_CLIENT_ID,
});

// Initialize QueryClient specifically for this component
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: Infinity,
    },
  },
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
  testnet: true, // Must be true to match the expected type
} as const; // Use const assertion to fix type issues

// Define wallet options
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

// Component with the actual connect button
function ConnectButtonInternal() {
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

// Export a wrapped component with its own isolated QueryClientProvider
export default function ThirdwebConnectModal() {
  return (
    <QueryClientProvider client={queryClient}>
      <ConnectButtonInternal />
    </QueryClientProvider>
  );
}
