"use client";

import { SocialConnectionsModal } from "@/components/modals";
import { useState } from "react";

export default function ProfilePage() {
  const [activeModal, setActiveModal] = useState(false);
  const [showSocialModal, setShowSocialModal] = useState(false);
  
  return (
    <main className="bg-oracle-black min-h-screen pt-6">
      {/* Coming Soon Banner */}
      <div className="coming-soon-banner mb-8">
        <span className="font-heading tracking-wider">PROFILE FEATURES COMING SOON</span>
      </div>
      
      <div className="container mx-auto px-4">
        {/* Profile Preview Section */}
        <section className="mb-16">
          <div className="max-w-4xl mx-auto bg-ancient-wisdom rounded-xl p-8 border border-oracle-orange/20 shadow-card-normal">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
              <div className="w-32 h-32 rounded-full border-4 border-oracle-orange overflow-hidden flex-shrink-0 shadow-card-hover">
                <div className="w-full h-full bg-oracle-orange/20 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-oracle-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
              </div>
              
              <div className="flex-grow text-center md:text-left">
                <h1 className="font-heading text-3xl text-oracle-orange mb-2">YOUR PROFILE</h1>
                <p className="text-oracle-white/70 mb-4">Connect your wallet to view your NFT collection, transaction history, and more.</p>
                <div className="flex flex-col sm:flex-row gap-4 mt-6">
                  <button
                    onClick={() => setActiveModal(true)}
                    className="btn-primary"
                  >
                    <span className="relative z-10">CONNECT WALLET</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Placeholder Stats/Content Section */}
        <section className="mb-16">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-heading text-2xl text-oracle-orange mb-6 text-center md:text-left">PROFILE DASHBOARD</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="stat-card">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-oracle-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
                </svg>
                <div className="stat-number text-oracle-white/50">--</div>
                <div className="stat-label">NFTs Owned</div>
              </div>
              
              <div className="stat-card">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-oracle-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                </svg>
                <div className="stat-number text-oracle-white/50">--</div>
                <div className="stat-label">Transactions</div>
              </div>
              
              <div className="stat-card">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-oracle-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 11V9a2 2 0 00-2-2m2 4v4a2 2 0 104 0v-1m-4-3H9m2 0h4m6 1a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div className="stat-number text-oracle-white/50">--</div>
                <div className="stat-label">Total Value</div>
              </div>
            </div>
            
            <div className="bg-ancient-wisdom rounded-xl p-6 border border-oracle-orange/20 flex items-center justify-center h-64 mb-8">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto bg-cosmic-connection rounded-full flex items-center justify-center mb-4 animate-oracle-pulse">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-oracle-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
                <h3 className="font-heading text-xl text-oracle-turquoise mb-2">NFT Gallery Preview</h3>
                <p className="text-oracle-white/70">
                  Connect your wallet to view your NFT collection
                </p>
              </div>
            </div>
            
            <div className="text-center">
              <button 
                onClick={() => setShowSocialModal(true)}
                className="btn-primary"
              >
                <span className="relative z-10">GET NOTIFIED WHEN READY</span>
              </button>
            </div>
          </div>
        </section>
      </div>
      
      {/* Coming Soon Modal */}
      {activeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-oracle-black/80">
          <div className="bg-ancient-wisdom border border-oracle-orange/20 rounded-xl w-full max-w-md shadow-card-hover animate-digital-glitch" style={{animationDuration: '0.2s'}}>
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-heading text-2xl text-oracle-orange">Coming Soon</h3>
                <button 
                  onClick={() => setActiveModal(false)}
                  className="text-oracle-white/70 hover:text-oracle-orange"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="mb-6">
                <p className="text-oracle-white mb-4">
                  We&apos;re working on bringing you amazing profile features.
                </p>
                <div className="flex justify-center my-6">
                  <div className="w-24 h-24 bg-cosmic-connection rounded-full flex items-center justify-center animate-oracle-pulse overflow-hidden">
                    <span className="font-heading text-4xl text-oracle-white glitch-text" data-text="P">
                      P
                    </span>
                  </div>
                </div>
                <p className="text-oracle-white/70 text-sm">
                  Stay tuned for updates! Built by Vesta & Yeti-Apes.
                </p>
              </div>
              <button 
                onClick={() => setActiveModal(false)}
                className="btn-primary w-full"
              >
                <span className="relative z-10">Got it</span>
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Social Connections Modal */}
      {showSocialModal && (
        <SocialConnectionsModal onClose={() => setShowSocialModal(false)} />
      )}
    </main>
  );
} 