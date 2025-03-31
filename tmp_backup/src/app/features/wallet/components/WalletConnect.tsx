import { ConnectButton } from "thirdweb/react";
import { darkTheme } from "thirdweb/react";
import { client, wallets } from "@/config/client";

export function WalletConnect() {
  return (
    <ConnectButton
      client={client}
      wallets={wallets}
      theme={darkTheme({
        colors: { accentText: "hsl(31, 88%, 44%)" },
      })}
      connectButton={{ label: "Sign In" }}
      connectModal={{
        size: "compact",
        showThirdwebBranding: false,
      }}
    />
  );
} 