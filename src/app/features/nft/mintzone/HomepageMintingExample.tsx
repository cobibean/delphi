"use client";

import { HomepageMintCard } from "./components";

interface HomepageMintingExampleProps {
  className?: string;
}

export function HomepageMintingExample({ className }: HomepageMintingExampleProps) {
  return (
    <div className={className}>
      <h2 className="text-2xl font-bold mb-4">Featured NFT Collection</h2>
      <HomepageMintCard 
        contractAddress="0x656b65339B2CCd5908B51b993D38d46e3283dB7c" 
        className="max-w-md mx-auto"
      />
    </div>
  );
} 