"use client";

import { useEffect, useState } from 'react';
import { JsonRpcProvider } from 'ethers';
import Link from "next/link";

const provider = new JsonRpcProvider(process.env.NEXT_PUBLIC_METIS_RPC_URL);
const MARKETPLACE_ADDRESS = process.env.NEXT_PUBLIC_MARKETPLACE_ADDRESS;

// Temporary mock data for FeaturedCard since we don't have access to the actual components
interface MockListing {
  listingId: string;
  name: string;
  image: string;
  price: string;
}

// Temporary FeaturedCard component
function FeaturedCard({ listing }: { listing: MockListing }) {
  return (
    <div className="degen-card m-2 p-4 max-w-xs transform" style={{ transform: `rotate(${Math.random() * 4 - 2}deg)` }}>
      <div className="relative h-48 mb-2 overflow-hidden rounded-meme border-2 border-dashed border-psycho-rektPink">
        <img src={listing.image || "https://via.placeholder.com/400"} alt={listing.name} className="w-full h-full object-cover" />
      </div>
      <h3 className="font-comic text-lg text-psycho-orange mb-2">{listing.name}</h3>
      <div className="flex justify-between items-center">
        <span className="font-comic text-psycho-kekGreen">{listing.price} METIS</span>
        <Link href={`/nft/${listing.listingId}`} className="degen-btn-primary py-1 px-3 text-xs">🔥 BUY 🔥</Link>
      </div>
    </div>
  );
}

// Mock function to get featured listings
const getMockFeaturedListings = () => {
  return [
    { listingId: '1', name: 'Degen Ape #420', image: 'https://via.placeholder.com/400x400?text=Degen+Ape', price: '69' },
    { listingId: '2', name: 'Moon Boi #1337', image: 'https://via.placeholder.com/400x400?text=Moon+Boi', price: '42' },
    { listingId: '3', name: 'Psycho Kitty #999', image: 'https://via.placeholder.com/400x400?text=Psycho+Kitty', price: '13.37' },
    { listingId: '4', name: 'Lambo Dreams #777', image: 'https://via.placeholder.com/400x400?text=Lambo+Dreams', price: '88.8' },
  ];
};

export default function FeaturedSection() {
  const [featuredListings, setFeaturedListings] = useState<MockListing[]>([]);
  const [marketStats, setMarketStats] = useState({
    nfts: Math.floor(Math.random() * 10000) + 500,
    collections: Math.floor(Math.random() * 100) + 20,
    users: Math.floor(Math.random() * 5000) + 1000,
    trades: Math.floor(Math.random() * 20000) + 5000,
  });

  useEffect(() => {
    // Using mock data instead of actual API call
    const mockListings = getMockFeaturedListings();
    setFeaturedListings(mockListings);
  }, []);

  if (featuredListings.length === 0) {
    return null;
  }

  return (
    <div className="w-full">
      {/* Hero Section */}
      <div className="relative w-full min-h-[70vh] overflow-hidden flex flex-col items-center justify-center p-8 border-8 border-dashed border-psycho-orange/50">
        {/* Limited emoji particles (reduced from 20 to 5) */}
        {[...Array(5)].map((_, i) => (
          <div 
            key={i} 
            className="absolute text-2xl pointer-events-none select-none"
            style={{ 
              top: `${Math.random() * 100}%`, 
              left: `${Math.random() * 100}%`,
              fontSize: `${Math.random() * 2 + 1}rem`
            }}
          >
            {['🚀', '💎', '🔥', '🤑', '💰'][Math.floor(Math.random() * 5)]}
          </div>
        ))}
        
        {/* Content Container */}
        <div className="relative z-10 max-w-5xl mx-auto text-center">
          {/* Glitchy Title with fewer animations */}
          <h1 className="text-6xl md:text-8xl font-impact mb-6 text-glow-pink">
            <span className="font-comic text-psycho-rektPink">D</span>
            <span className="font-comic text-psycho-kekGreen">E</span>
            <span className="font-comic text-psycho-orange">G</span>
            <span className="font-comic text-psycho-rektPink">E</span>
            <span className="font-comic text-psycho-kekGreen">N</span>
            <span>&nbsp;</span>
            <span className="font-comic text-psycho-turquoise">O</span>
            <span className="font-comic text-psycho-rektPink">R</span>
            <span className="font-comic text-psycho-orange">A</span>
            <span className="font-comic text-psycho-kekGreen">C</span>
            <span className="font-comic text-psycho-rektPink">L</span>
            <span className="font-comic text-psycho-turquoise">E</span>
          </h1>
          
          <p className="text-xl font-comic mb-8 text-psycho-parchment">
            Your <span className="text-psycho-rektPink font-bold">ONE-STOP-SHOP</span> for the most <span className="text-psycho-kekGreen font-bold">🔥 FIRE 🔥</span> NFTs on Metis! 
            <br/>No cap, just straight <span className="text-psycho-orange font-bold">ALPHA</span> for your wallet!
          </p>
          
          {/* Action Buttons */}
          <div className="flex flex-wrap justify-center gap-6 mt-8">
            <Link href="/explore" className="degen-btn-primary">
              🚀 EXPLORE ALPHA 🚀
            </Link>
            <Link href="/create" className="degen-btn-secondary">
              💰 MINT MOAR 💰
            </Link>
          </div>
        </div>
        
        {/* Stats Section */}
        <div className="mt-16 w-full max-w-4xl grid grid-cols-2 md:grid-cols-4 gap-4 relative z-10">
          {[
            { label: 'NFTs', value: marketStats.nfts.toLocaleString(), icon: '🖼️', color: 'rektPink' },
            { label: 'Collections', value: marketStats.collections.toLocaleString(), icon: '📚', color: 'kekGreen' },
            { label: 'Users', value: marketStats.users.toLocaleString(), icon: '👨‍💻', color: 'orange' },
            { label: 'Trades', value: marketStats.trades.toLocaleString(), icon: '💸', color: 'turquoise' }
          ].map((stat, index) => (
            <div key={index} className="degen-card py-4 px-6 text-center">
              <div className={`text-4xl mb-2 text-psycho-${stat.color}`}>{stat.icon}</div>
              <div className="font-comic text-3xl text-white">{stat.value}</div>
              <div className="font-comic text-sm uppercase text-psycho-parchment/60">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Featured Collections */}
      <div className="mt-12 mb-16 py-8 relative">
        <h2 className="text-center text-4xl font-comic font-bold mb-10 mt-8 text-transparent bg-clip-text bg-gradient-to-r from-psycho-rektPink to-psycho-kekGreen text-glow-pink">
          🔥 HOT AF COLLECTION 🔥
        </h2>
        
        <div className="flex overflow-x-auto py-4 px-4 gap-4">
          {featuredListings.map((listing, index) => (
            <FeaturedCard key={index} listing={listing} />
          ))}
        </div>
      </div>
    </div>
  );
}