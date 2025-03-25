"use client";

import { client, client as thirdwebClient, wallets } from "@/app/config/client";
import { useState } from "react";
import type { ThirdwebContract } from "thirdweb";
import {
  ClaimButton,
  ConnectButton,
  darkTheme,
  MediaRenderer,
  NFTMedia,
  NFTProvider,
  useActiveAccount
} from "thirdweb/react";
import { QuantitySelector } from "./QuantitySelector";

interface IMintCardProps {
  contract: ThirdwebContract;
  displayName: string;
  description: string;
  contractImage: string;
  pricePerToken: number | null;
  currencySymbol: string | null;
  isERC1155: boolean;
  isERC721: boolean;
  tokenId: bigint;
  className?: string;
}

export function MintCard({
  contract,
  displayName,
  description,
  contractImage,
  pricePerToken,
  currencySymbol: _currencySymbol,
  isERC1155,
  isERC721,
  tokenId,
  className = "",
}: IMintCardProps) {
  const [quantity, setQuantity] = useState(1);
  const [useCustomAddress, setUseCustomAddress] = useState(false);
  const [customAddress, setCustomAddress] = useState("");
  const [notification, setNotification] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });
  const account = useActiveAccount();
  
  // Always use METIS as the currency symbol for display
  const currencySymbol = "METIS";

  if (pricePerToken === null || pricePerToken === undefined) {
    console.error("Invalid pricePerToken");
    return null;
  }
  
  // Handle notification display
  const showNotification = (type: "success" | "error", message: string) => {
    setNotification({ type, message });
    // Auto-dismiss after 5 seconds
    setTimeout(() => {
      setNotification({ type: null, message: "" });
    }, 5000);
  };

  return (
    <div className={`bg-ancient-wisdom border border-oracle-orange/20 rounded-xl overflow-hidden shadow-card-normal ${className}`}>
      <div className="p-4">
        <div className="aspect-square overflow-hidden rounded-lg mb-4 relative">
          {isERC1155 ? (
            <NFTProvider contract={contract} tokenId={tokenId}>
              <NFTMedia
                loadingComponent={<div className="w-full h-full bg-sinister-black/30 animate-pulse" />}
                className="w-full h-full object-cover"
              />
            </NFTProvider>
          ) : (
            <MediaRenderer
              client={client}
              className="w-full h-full object-cover"
              alt={displayName}
              src={contractImage || "/placeholder.svg?height=400&width=400"}
            />
          )}
          {pricePerToken > 0 && (
            <div className="absolute top-2 right-2 bg-sinister-black/70 text-oracle-white px-2 py-1 rounded-full text-sm font-semibold">
              {pricePerToken} {currencySymbol}/each
            </div>
          )}
        </div>

        <h2 className="text-2xl font-heading text-oracle-orange mb-2">{displayName}</h2>
        <p className="text-oracle-white/70 mb-4">{description}</p>

        <div className="flex items-center justify-between mb-4">
          <QuantitySelector quantity={quantity} setQuantity={setQuantity} />
          <div className="text-base pr-1 font-semibold text-oracle-white">
            Total: {pricePerToken * quantity} {currencySymbol}
          </div>
        </div>

        <div className="mb-4">
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="custom-address"
              checked={useCustomAddress}
              onChange={(e) => setUseCustomAddress(e.target.checked)}
              className="rounded border-oracle-orange/30 bg-sinister-black"
            />
            <label
              htmlFor="custom-address"
              className={`${useCustomAddress ? "text-oracle-white" : "text-oracle-white/50"} cursor-pointer`}
            >
              Mint to a custom address
            </label>
          </div>
        </div>

        {useCustomAddress && (
          <div className="mb-4">
            <input
              id="address-input"
              type="text"
              placeholder="Enter recipient address"
              value={customAddress}
              onChange={(e) => setCustomAddress(e.target.value)}
              className="w-full p-2 rounded border border-oracle-orange/30 bg-sinister-black text-oracle-white"
            />
          </div>
        )}
        
        {/* Notification area */}
        {notification.type && (
          <div 
            className={`mb-4 p-3 rounded-md ${
              notification.type === 'success' 
                ? 'bg-quantum-entanglement/20 text-oracle-white border border-quantum-entanglement/40' 
                : 'bg-cosmic-combustion/20 text-oracle-white border border-cosmic-combustion/40'
            } animation-glitch-text`}
          >
            <div className="flex items-center">
              <span className="mr-2">
                {notification.type === 'success' ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-quantum-entanglement" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-cosmic-combustion" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                )}
              </span>
              <span>{notification.message}</span>
              <button 
                onClick={() => setNotification({ type: null, message: "" })}
                className="ml-auto text-oracle-white/70 hover:text-oracle-white transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        )}

        {account ? (
          <ClaimButton
            contractAddress={contract.address}
            chain={contract.chain}
            client={contract.client}
            claimParams={
              isERC1155
                ? {
                    type: "ERC1155",
                    tokenId: tokenId,
                    quantity: BigInt(quantity),
                    to: useCustomAddress && customAddress ? customAddress : undefined,
                    from: account.address,
                  }
                : isERC721
                ? {
                    type: "ERC721",
                    quantity: BigInt(quantity),
                    to: useCustomAddress && customAddress ? customAddress : undefined,
                    from: account.address,
                  }
                : {
                    type: "ERC20",
                    quantity: String(quantity),
                    to: useCustomAddress && customAddress ? customAddress : undefined,
                    from: account.address,
                  }
            }
            className="w-full py-2 px-4 bg-cosmic-combustion hover:bg-cosmic-combustion/90 text-oracle-white font-heading rounded-md transition-colors"
            onTransactionSent={() => {
              console.log("Minting NFT...");
              showNotification("success", "Transaction sent! Your NFT is being minted...");
            }}
            onTransactionConfirmed={() => {
              console.log("Minted successfully!");
              showNotification("success", `Successfully minted ${quantity} ${displayName} NFT${quantity > 1 ? 's' : ''}!`);
            }}
            onError={(err) => {
              console.error("Mint error:", err.message);
              showNotification("error", `Failed to mint: ${err.message}`);
            }}
          >
            Mint {quantity} NFT{quantity > 1 ? "s" : ""}
          </ClaimButton>
        ) : (
          <div className="w-full">
            <ConnectButton
              client={thirdwebClient}
              wallets={wallets}
              theme={darkTheme({
                colors: { accentText: "hsl(31, 88%, 44%)" },
              })}
              connectButton={{ label: "Connect Wallet to Mint" }}
              connectModal={{
                size: "compact",
                showThirdwebBranding: false,
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
} 