"use client";

import { SocialConnectionsModal } from "@/components/modals";
import { useState } from "react";
import { useActiveAccount } from "thirdweb/react";
import {
  ProfileAvatar,
  ProfileStats,
  ProfileTabs,
  UserListings,
  UserNFTGallery
} from "../components";
import { ProfileProvider, useProfile } from "../context/ProfileContext";

// Wrap the actual Profile page in the provider
export default function ProfilePage() {
  return (
    <ProfileProvider>
      <ProfileContent />
    </ProfileProvider>
  );
}

// The inner profile content that uses the context
function ProfileContent() {
  const { activeTab, setActiveTab } = useProfile();
  const [showSocialModal, setShowSocialModal] = useState(false);
  const account = useActiveAccount();
  
  const handleConnectClick = () => {
    // Implementation will be handled by ConnectWalletButton component
    console.log("Connect wallet action triggered - UI will handle wallet connection");
    // We're not using the modal directly for now
  };
  
  return (
    <main className="bg-oracle-black min-h-screen pt-6">
      {/* Coming Soon Banner */}
      <div className="coming-soon-banner mb-8">
        <span className="font-heading tracking-wider">PROFILE FEATURES COMING SOON</span>
      </div>
      
      <div className="container mx-auto px-4">
        {/* Profile Header Section */}
        <section className="mb-10">
          <div className="max-w-4xl mx-auto bg-ancient-wisdom rounded-xl p-8 border border-oracle-orange/20 shadow-card-normal">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
              <ProfileAvatar onConnectClick={handleConnectClick} />
              
              <div className="flex-grow text-center md:text-left">
                <h1 className="font-heading text-3xl text-oracle-orange mb-2">
                  {account ? `${account.address.substring(0, 6)}...${account.address.substring(account.address.length - 4)}` : "YOUR PROFILE"}
                </h1>
                <p className="text-oracle-white/70 mb-4">
                  {account 
                    ? "View your NFT collection, transaction history, and more."
                    : "Connect your wallet to view your NFT collection, transaction history, and more."
                  }
                </p>
                {!account && (
                  <div className="flex flex-col sm:flex-row gap-4 mt-6">
                    <button
                      onClick={handleConnectClick}
                      className="btn-primary"
                    >
                      <span className="relative z-10">CONNECT WALLET</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
        
        {/* Tab Navigation */}
        <section className="mb-6">
          <div className="max-w-4xl mx-auto">
            <ProfileTabs />
          </div>
        </section>
        
        {/* Tab Content */}
        <section className="mb-16">
          <div className="max-w-4xl mx-auto">
            {/* Overview Tab */}
            {activeTab === "overview" && (
              <div>
                <ProfileStats 
                  nftCount={0} 
                  transactionCount={0} 
                  totalValue="0" 
                />
                
                <div className="bg-ancient-wisdom rounded-xl p-6 border border-oracle-orange/20 mb-8">
                  <h2 className="font-heading text-2xl text-oracle-orange mb-4">Welcome to Your Profile</h2>
                  <p className="text-oracle-white/80 mb-4">
                    This is your personal dashboard for managing your digital assets and marketplace activity.
                  </p>
                  
                  {!account ? (
                    <div className="text-center py-6">
                      <button 
                        onClick={handleConnectClick}
                        className="btn-primary"
                      >
                        <span className="relative z-10">CONNECT WALLET</span>
                      </button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-night/40 p-4 rounded-lg">
                        <h3 className="font-heading text-xl text-oracle-orange mb-2">Your NFTs</h3>
                        <p className="text-oracle-white/70 mb-3">Explore and manage your NFT collection</p>
                        <ViewCollectionButton setActiveTab={setActiveTab} />
                      </div>
                      
                      <div className="bg-night/40 p-4 rounded-lg">
                        <h3 className="font-heading text-xl text-oracle-orange mb-2">Your Listings</h3>
                        <p className="text-oracle-white/70 mb-3">Manage your marketplace listings</p>
                        <ViewListingsButton setActiveTab={setActiveTab} />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
            
            {/* NFTs Tab */}
            {activeTab === "nfts" && (
              <UserNFTGallery />
            )}
            
            {/* Listings Tab */}
            {activeTab === "listings" && (
              <UserListings />
            )}
          </div>
        </section>
      </div>
      
      {/* Social Connections Modal */}
      {showSocialModal && (
        <SocialConnectionsModal onClose={() => setShowSocialModal(false)} />
      )}
    </main>
  );
}

// Separate components for buttons to avoid React Hooks rules violations
function ViewCollectionButton({ setActiveTab }: { setActiveTab: (tab: string) => void }) {
  return (
    <button 
      onClick={() => setActiveTab("nfts")}
      className="btn-secondary text-sm"
    >
      View Collection
    </button>
  );
}

function ViewListingsButton({ setActiveTab }: { setActiveTab: (tab: string) => void }) {
  return (
    <button 
      onClick={() => setActiveTab("listings")}
      className="btn-secondary text-sm"
    >
      View Listings
    </button>
  );
} 