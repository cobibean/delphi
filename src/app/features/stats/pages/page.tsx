"use client";

import { SocialConnectionsModal } from "@/components/modals";
import { useState } from "react";

export default function StatsPage() {
  const [activeModal, setActiveModal] = useState(false);
  const [showSocialModal, setShowSocialModal] = useState(false);
  
  return (
    <main className="bg-oracle-black min-h-screen pt-6">
      {/* Coming Soon Banner */}
      <div className="coming-soon-banner mb-8">
        <span className="font-heading tracking-wider">STATS FEATURES COMING SOON</span>
      </div>
      
      <div className="container mx-auto px-4">
        {/* Stats Preview Section */}
        <section className="mb-16">
          <div className="max-w-5xl mx-auto">
            <h1 className="font-heading text-3xl text-oracle-orange mb-6 text-center">MARKETPLACE ANALYTICS</h1>
            <p className="text-oracle-white/70 text-center mb-12 max-w-3xl mx-auto">
              Detailed statistics and market analytics for Delphi NFT marketplace are being developed. 
              Soon you&apos;ll be able to track sales, volume, trending collections, and more.
            </p>
            
            {/* Sample Charts and Visualizations */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              <div className="bg-ancient-wisdom rounded-xl p-6 border border-oracle-orange/20 shadow-card-normal">
                <h3 className="font-heading text-xl text-oracle-turquoise mb-4">Trading Volume</h3>
                <div className="bg-oracle-black/30 rounded-lg p-4 h-64 flex items-center justify-center mb-4">
                  {/* Placeholder chart visualization */}
                  <div className="w-full h-full relative flex items-end justify-between px-4">
                    <div className="absolute inset-0 flex items-center justify-center text-oracle-white/30">
                      Chart Visualization
                    </div>
                    {/* Mock chart bars */}
                    {[35, 58, 42, 65, 78, 52, 63].map((height, index) => (
                      <div 
                        key={index}
                        className="w-8 bg-oracle-orange/50 rounded-t-sm" 
                        style={{ height: `${height}%` }}
                      ></div>
                    ))}
                  </div>
                </div>
                <div className="flex justify-end">
                  <button
                    onClick={() => setActiveModal(true)}
                    className="text-oracle-turquoise hover:text-oracle-orange text-sm"
                  >
                    View Full Analytics →
                  </button>
                </div>
              </div>
              
              <div className="bg-ancient-wisdom rounded-xl p-6 border border-oracle-orange/20 shadow-card-normal">
                <h3 className="font-heading text-xl text-oracle-turquoise mb-4">Active Listings</h3>
                <div className="bg-oracle-black/30 rounded-lg p-4 h-64 flex items-center justify-center mb-4">
                  {/* Placeholder pie chart visualization */}
                  <div className="w-full h-full relative flex items-center justify-center">
                    <div className="absolute inset-0 flex items-center justify-center text-oracle-white/30">
                      Chart Visualization
                    </div>
                    <div className="w-40 h-40 rounded-full border-8 border-oracle-turquoise relative overflow-hidden">
                      <div className="absolute inset-0 bg-oracle-orange" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 60%, 0% 60%)' }}></div>
                      <div className="absolute inset-0 bg-oracle-purple/70" style={{ clipPath: 'polygon(0 60%, 100% 60%, 100% 85%, 0% 85%)' }}></div>
                      <div className="absolute inset-0 bg-oracle-turquoise/70" style={{ clipPath: 'polygon(0 85%, 100% 85%, 100% 100%, 0% 100%)' }}></div>
                    </div>
                  </div>
                </div>
                <div className="flex justify-end">
                  <button
                    onClick={() => setActiveModal(true)}
                    className="text-oracle-turquoise hover:text-oracle-orange text-sm"
                  >
                    View Full Analytics →
                  </button>
                </div>
              </div>
            </div>
            
            {/* Sample Stats Highlights */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
              <div className="stat-card">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-oracle-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                <div className="stat-number text-oracle-white/50">--</div>
                <div className="stat-label">Total Listings</div>
              </div>
              
              <div className="stat-card">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-oracle-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div className="stat-number text-oracle-white/50">--</div>
                <div className="stat-label">Trading Volume</div>
              </div>
              
              <div className="stat-card">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-oracle-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                <div className="stat-number text-oracle-white/50">--</div>
                <div className="stat-label">Total Sales</div>
              </div>
              
              <div className="stat-card">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-oracle-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
                <div className="stat-number text-oracle-white/50">--</div>
                <div className="stat-label">Avg. Price</div>
              </div>
            </div>
            
            {/* Top Collections Placeholder */}
            <div className="bg-ancient-wisdom rounded-xl p-6 border border-oracle-orange/20 shadow-card-normal mb-12">
              <h3 className="font-heading text-xl text-oracle-turquoise mb-4">Top Collections</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-oracle-orange/20">
                      <th className="text-left py-3 text-oracle-white/80 font-heading">Collection</th>
                      <th className="text-right py-3 text-oracle-white/80 font-heading">Volume</th>
                      <th className="text-right py-3 text-oracle-white/80 font-heading">Floor</th>
                      <th className="text-right py-3 text-oracle-white/80 font-heading">Owners</th>
                      <th className="text-right py-3 text-oracle-white/80 font-heading">Items</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[1, 2, 3, 4, 5].map((_, index) => (
                      <tr key={index} className="border-b border-oracle-black/10">
                        <td className="py-3 text-oracle-white/50">--</td>
                        <td className="py-3 text-oracle-white/50 text-right">--</td>
                        <td className="py-3 text-oracle-white/50 text-right">--</td>
                        <td className="py-3 text-oracle-white/50 text-right">--</td>
                        <td className="py-3 text-oracle-white/50 text-right">--</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
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
                  We&apos;re working on bringing you amazing stats and analytics features.
                </p>
                <div className="flex justify-center my-6">
                  <div className="w-24 h-24 bg-cosmic-connection rounded-full flex items-center justify-center animate-oracle-pulse overflow-hidden">
                    <span className="font-heading text-4xl text-oracle-white glitch-text" data-text="S">
                      S
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