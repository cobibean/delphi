"use client";

import { useState } from "react";
import Link from "next/link";
import { FiImage, FiPackage } from "react-icons/fi";

export default function CreateListingPage() {
  const [activeModal, setActiveModal] = useState(false);
  
  return (
    <main className="bg-oracle-black min-h-screen pt-6">
      {/* Coming Soon Banner */}
      <div className="coming-soon-banner mb-8">
        <span className="font-heading tracking-wider">CREATE LISTING FEATURE COMING SOON</span>
      </div>
      
      <div className="container mx-auto px-4">
        {/* NFT Generator Card */}
        <section className="mb-16">
          <div className="max-w-4xl mx-auto">
            <h1 className="font-heading text-3xl text-oracle-orange mb-6">CREATE OPTIONS</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* NFT Generator Card */}
              <Link href="/create/nft-generator">
                <div className="bg-ancient-wisdom rounded-xl p-8 border border-oracle-orange/20 shadow-card-normal hover:shadow-card-hover transition-all cursor-pointer">
                  <div className="w-16 h-16 bg-cosmic-connection rounded-full flex items-center justify-center mb-4">
                    <FiImage className="h-8 w-8 text-oracle-white" />
                  </div>
                  <h3 className="font-heading text-xl text-oracle-turquoise mb-2">NFT Generator</h3>
                  <p className="text-oracle-white/70">
                    Create a generative NFT collection by combining different trait layers.
                  </p>
                </div>
              </Link>
              
              {/* Direct Listing Card */}
              <div 
                className="bg-ancient-wisdom rounded-xl p-8 border border-oracle-orange/20 shadow-card-normal opacity-70 cursor-not-allowed"
                onClick={() => setActiveModal(true)}
              >
                <div className="w-16 h-16 bg-cosmic-connection rounded-full flex items-center justify-center mb-4">
                  <FiPackage className="h-8 w-8 text-oracle-white" />
                </div>
                <h3 className="font-heading text-xl text-oracle-turquoise mb-2">Direct Listing</h3>
                <p className="text-oracle-white/70">
                  Create a direct listing for your existing NFT (Coming Soon).
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Form Preview/Mockup Section */}
        <section className="mb-16">
          <div className="max-w-4xl mx-auto bg-ancient-wisdom rounded-xl p-8 border border-oracle-orange/20 shadow-card-normal">
            <h1 className="font-heading text-3xl text-oracle-orange mb-6">CREATE YOUR LISTING</h1>
            
            <div className="space-y-8">
              {/* Image Upload Area */}
              <div className="border-2 border-dashed border-oracle-orange/30 rounded-xl p-8 flex flex-col items-center justify-center bg-oracle-black/20">
                <div className="w-24 h-24 bg-cosmic-connection rounded-full flex items-center justify-center mb-4 animate-oracle-pulse">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-oracle-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                </div>
                <h3 className="font-heading text-xl text-oracle-turquoise mb-2">Upload Your NFT</h3>
                <p className="text-oracle-white/70 text-center mb-4">
                  Drag and drop or click to upload your image (PNG, JPG, GIF, MP4)
                </p>
                <button
                  onClick={() => setActiveModal(true)}
                  className="btn-secondary py-2 px-4"
                >
                  <span>Upload File</span>
                </button>
              </div>
              
              {/* Form Fields */}
              <div className="space-y-6">
                <div>
                  <label className="input-label">NFT Name</label>
                  <input 
                    type="text" 
                    className="input w-full" 
                    placeholder="Enter a name for your NFT"
                    disabled
                  />
                </div>
                
                <div>
                  <label className="input-label">Description</label>
                  <textarea 
                    className="input w-full h-32 resize-none" 
                    placeholder="Describe your NFT in detail"
                    disabled
                  ></textarea>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="input-label">Price (METIS)</label>
                    <input 
                      type="number" 
                      className="input w-full" 
                      placeholder="0.00"
                      disabled
                    />
                  </div>
                  
                  <div>
                    <label className="input-label">Royalty Percentage</label>
                    <input 
                      type="number" 
                      className="input w-full" 
                      placeholder="0-10%"
                      disabled
                    />
                  </div>
                </div>
                
                <div>
                  <label className="input-label">Collection</label>
                  <select className="input w-full" disabled>
                    <option>Select a collection</option>
                  </select>
                </div>
                
                <div className="pt-4">
                  <button
                    onClick={() => setActiveModal(true)}
                    className="btn-primary w-full"
                  >
                    <span className="relative z-10">CREATE LISTING</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <section className="mb-16">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-heading text-2xl text-oracle-orange mb-4">GET NOTIFIED WHEN READY</h2>
            <p className="text-oracle-white/70 mb-8 max-w-2xl mx-auto">
              Our team is working hard to bring you an amazing NFT listing experience. 
              Be among the first to know when the feature is ready.
            </p>
            <button
              onClick={() => setActiveModal(true)}
              className="btn-secondary"
            >
              <span>SUBSCRIBE FOR UPDATES</span>
            </button>
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
                  We're working on bringing you amazing listing creation features.
                </p>
                <div className="flex justify-center my-6">
                  <div className="w-24 h-24 bg-cosmic-connection rounded-full flex items-center justify-center animate-oracle-pulse overflow-hidden">
                    <span className="font-heading text-4xl text-oracle-white glitch-text" data-text="C">
                      C
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
    </main>
  );
} 