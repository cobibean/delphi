# Wallet Connection Flow With Thirdweb

## Overview

This document outlines the wallet connection flow in our dApp using the thirdweb framework. The implementation provides a seamless and secure way for users to connect their Web3 wallets to the application.

## Implementation Structure

Our wallet connection implementation consists of two main components:

1. **WalletProvider**: A context provider that manages wallet state
2. **WalletConnection**: A UI component that allows users to connect and interact with their wallet

## WalletProvider

Located at `src/app/providers/WalletProvider.tsx`, this provider:

- Creates and manages the wallet connection state
- Provides methods for connecting and disconnecting wallets
- Formats wallet addresses for display
- Handles wallet address copying functionality

```tsx
// Simplified WalletProvider example
export const WalletProvider: React.FC<WalletProviderProps> = ({ children }) => {
  const account = useActiveAccount();
  const wallet = useActiveWallet();
  const { connect, isConnecting } = useConnect();
  const { disconnect } = useDisconnect();
  
  // State management
  const [copied, setCopied] = useState(false);
  
  // Format address for display
  const displayAddress = useMemo(() => {
    if (!account?.address) return "";
    return `${account.address.substring(0, 6)}...${account.address.substring(account.address.length - 4)}`;
  }, [account]);

  // Connect wallet
  const connectWallet = useCallback(async (walletType: string) => {
    try {
      const newWallet = createWallet(walletType);
      await connect({ wallet: newWallet });
      return true;
    } catch (error) {
      console.error("Error connecting wallet:", error);
      return false;
    }
  }, [connect]);

  // Disconnect wallet
  const disconnectWallet = useCallback(async () => {
    try {
      if (wallet) {
        await disconnect();
        return true;
      }
      return false;
    } catch (error) {
      console.error("Error disconnecting wallet:", error);
      return false;
    }
  }, [wallet, disconnect]);

  // Copy address to clipboard
  const copyAddressToClipboard = useCallback(() => {
    if (account?.address) {
      navigator.clipboard.writeText(account.address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [account]);

  // Context value with all wallet functionality
  const contextValue = {
    isConnected: !!account,
    isConnecting,
    displayAddress,
    connectWallet,
    disconnectWallet,
    copyAddressToClipboard,
    copied,
  };

  return (
    <WalletContext.Provider value={contextValue}>
      {children}
    </WalletContext.Provider>
  );
};
```

## WalletConnection Component

Located at `src/app/components/SharedComponents/WalletConnection.tsx`, this component:

- Renders the "Connect Wallet" button when no wallet is connected
- Shows the connected wallet address and dropdown menu when connected
- Provides options to view profile, NFTs, listings, and disconnect
- Uses the `ConnectButton` from thirdweb for wallet connection

```tsx
// Simplified WalletConnection example
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

  return (
    <div className="relative wallet-dropdown">
      {isConnected ? (
        // Connected wallet UI with dropdown
        // ...
      ) : (
        // Connect wallet button
        <ConnectButton
          client={client}
          wallets={wallets}
          chain={chain}
          // ...
        />
      )}
    </div>
  );
}
```

## Wallet Connection Flow

1. **Initial State**: User visits the application and sees the "Connect Wallet" button
2. **Connection**: User clicks the button and selects a wallet from the available options
3. **Authentication**: The selected wallet initiates the connection process
4. **Connected State**: Once connected, the UI updates to show the connected wallet address
5. **Interaction**: User can now interact with wallet-dependent features
6. **Disconnection**: User can disconnect the wallet through the dropdown menu

## Available Wallet Options

Our implementation supports multiple wallet types:

1. **In-App Wallet**: Email, social logins (Google, Discord, Telegram, X, etc.)
2. **Browser Extensions**: MetaMask, Rabby
3. **Mobile Wallets**: Trust Wallet, and more

## Best Practices

1. **Error Handling**: All wallet interactions are wrapped in try-catch blocks
2. **User Feedback**: Loading states and copy confirmation are shown to users
3. **Address Privacy**: Wallet addresses are truncated for display
4. **Clean Disconnection**: Proper cleanup happens when disconnecting wallets

## References

- [Thirdweb Documentation](https://portal.thirdweb.com/react) 