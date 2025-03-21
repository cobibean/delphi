"use client";

import { Button } from "@/app/components/ui/Button";
import { client } from "@/app/config/client";
import { useState } from "react";
import type { ThirdwebContract } from "thirdweb";
import {
    ClaimButton,
    MediaRenderer,
    NFTMedia,
    NFTProvider,
    useActiveAccount,
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
  const account = useActiveAccount();
  
  // Always use METIS as the currency symbol for display
  const currencySymbol = "METIS";

  if (pricePerToken === null || pricePerToken === undefined) {
    console.error("Invalid pricePerToken");
    return null;
  }

  return (
    <div className={`bg-gray-100 dark:bg-gray-800 rounded-xl overflow-hidden shadow-md ${className}`}>
      <div className="p-4">
        <div className="aspect-square overflow-hidden rounded-lg mb-4 relative">
          {isERC1155 ? (
            <NFTProvider contract={contract} tokenId={tokenId}>
              <NFTMedia
                loadingComponent={<div className="w-full h-full bg-gray-300 dark:bg-gray-700 animate-pulse" />}
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
            <div className="absolute top-2 right-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded-full text-sm font-semibold">
              {pricePerToken} {currencySymbol}/each
            </div>
          )}
        </div>

        <h2 className="text-2xl font-bold mb-2 dark:text-white">{displayName}</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-4">{description}</p>

        <div className="flex items-center justify-between mb-4">
          <QuantitySelector quantity={quantity} setQuantity={setQuantity} />
          <div className="text-base pr-1 font-semibold dark:text-white">
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
              className="rounded border-gray-300 dark:border-gray-700"
            />
            <label
              htmlFor="custom-address"
              className={`${useCustomAddress ? "" : "text-gray-400"} cursor-pointer`}
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
              className="w-full p-2 rounded border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
            />
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
            className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md transition-colors"
            onTransactionSent={() => console.log("Minting NFT...")}
            onTransactionConfirmed={() => console.log("Minted successfully!")}
            onError={(err) => console.error("Mint error:", err.message)}
          >
            Mint {quantity} NFT{quantity > 1 ? "s" : ""}
          </ClaimButton>
        ) : (
          <Button
            className="w-full"
            onClick={() => console.log("Connect wallet prompt")}
          >
            Connect Wallet to Mint
          </Button>
        )}
      </div>
    </div>
  );
} 